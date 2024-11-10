import { createContext, useContext } from "react"

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

export function SpofileProfileProvider({children}) {
    return (
        <SpofileProfileContext.Provider>
            {children}
        </SpofileProfileContext.Provider>
    )
};