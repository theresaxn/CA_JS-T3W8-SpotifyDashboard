import { createContext, useContext, useEffect, useState } from "react"

export const spotifyAuthScaffold = {
    access_token: "",
    token_type: "",
    expires_in: "",
    refresh_token: "",
    scope: ""
};

export const SpotifyAuthContext = createContext(spotifyAuthScaffold);

export function useSpotifyAuthContext() {
	return useContext(SpotifyAuthContext);
}

// clientId from app configured in Spotify developer dashboard
const clientId = "9deb3f6272a14666ba47e91d395eac98";

export function SpotifyAuthProvider({children}) {
	// code required for Spotify sign-in process, not usable in API requests
	let [userAuthCode, setUserAuthCode] = useState("");
	// user access tokens and refresh tokens - represents the current signed-in user 
	let [userAuthData, setUserAuthData] = useState(spotifyAuthScaffold);

    // when the page reloads, check if Spotify sign in result has been received
    useEffect(() => {
        // attempts to find any query params from current page URL
        const params = new URLSearchParams(window.location.search);
        // retreive the auth code from query params
        const code = params.get("code");

        // localhost:5173/spotifycallback?code=XXXXXXXXX
        // code = XXXXXXXXX

        setUserAuthCode(code);

        // empty dependency array means that this useEffect only runs on page load and never again
    }, []);

    useEffect(() => {
        async function getAuthData() {
            const authData = await getAuthTokens(clientId, userAuthCode);
            setUserAuthData(authData);
            // // cleans up URL in the browser tab, removing Spotify auth data so it doesn't impace page load useEffect
			// URL before replaceState: localhost:5173/spotifycallback?code=XXXXXXXXX
			// URL after replaceState: localhost:5173
            window.history.replaceState(null, "Spotify Stats Boards", "/")
        }

        if (userAuthCode) {
            getAuthData();
        }

        // when userAuthCode initalises or changes, this useEffect will run
	}, [userAuthCode]);

	async function getAuthTokens(clientId, code){
		const verifier = localStorage.getItem("verifier");

		const params = new URLSearchParams();
		params.append("client_id", clientId);
		params.append("grant_type", "authorization_code");
		params.append("code", code);
        // params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI)
		params.append("redirect_uri", import.meta.env.VITE_SPOTIFY_CALLBACK);
		params.append("code_verifier", verifier);
        // https://api.spotify.com/auth?client_id=XXXXXXXXX&code=XXXXXXXXX

		const result = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded"},
			body: params
		});

		const authTokens = await result.json();
		return authTokens;
	}

    // this sends users to Spotify 
	async function redirectToAuthCodeFlow() {
        // create a security challenge with a verifier value
		const verifier = generateCodeVerifier(128);
		const challenge = await generateCodeChallenge(verifier);
	
        // persist the verifier for the access token step to use later
		localStorage.setItem("verifier", verifier);
	
        // configure the API request to begin the auth flow with Spotify
		const params = new URLSearchParams();
		params.append("client_id", clientId);
		params.append("response_type", "code");
		params.append("redirect_uri", import.meta.env.VITE_SPOTIFY_CALLBACK);
		params.append("scope", "user-top-read user-read-private user-read-email");
		params.append("code_challenge_method", "S256");
		params.append("code_challenge", challenge);
	
		document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
	}
	
    // generates a random alphanumeric value to use as a security code word
	function generateCodeVerifier(length) {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	};
	
    // generates a challenge based on a given "codeVerifier" security code word
	async function generateCodeChallenge(codeVerifier) {
		const data = new TextEncoder().encode(codeVerifier);
		const digest = await window.crypto.subtle.digest('SHA-256', data);
		return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	};

	return(
		<SpotifyAuthContext.Provider value={{userAuthData, redirectToAuthCodeFlow}}>
			{children}
		</SpotifyAuthContext.Provider>
	);
}