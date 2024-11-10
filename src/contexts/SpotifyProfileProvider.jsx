import { createContext, useContext, useEffect, useState } from "react"
import { useSpotifyAuthContext } from "./SpotifyAuthProvider";

export const defaultProfileData = {
    userId: "",
    email: "",
    uri: "",
    link: "",
    profileImg: ""
};

export const SpotifyProfileContext = createContext(defaultProfileData);

export function useSpotifyProfileData() {
    return useContext(SpotifyProfileContext);
}

export function SpotifyProfileProvider({children}) {
    let [profileData, setProfileData] = useState(defaultProfileData);

    // access auth data from SpotifyAuthProvider so can make more fetch requests
    let {userAuthData} = useSpotifyAuthContext();

    async function fetchProfileData(accessToken) {
        const result = await fetch(
            "https://api.spotify.com/v1/me",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return await result.json();
    };

    useEffect(() => {
        // if auth data has access token, start making fetch requests
        if (userAuthData && userAuthData.access_token) {
            fetchProfileData(userAuthData.access_token).then(profileData => {
                setProfileData(profileData);
            })
        };
        // whenever auth data changes, check and maybe make fetch request
    }, [userAuthData]);

    return (
        <SpotifyProfileContext.Provider value={profileData}>
            {children}
        </SpotifyProfileContext.Provider>
    )
};