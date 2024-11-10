## T3W8

### Spotify Stats Dashboard 

#### Context Data / Global State
- Spotify API Context Provider
    - Async reducer
        - Endpoints for data handled in a switch statement
        - Save endpoint responses to state

- CSS Theme Context Provider
    - Dark/light/system
    - No reducer, simple context state

#### Routes
- `localhost:3000/`
    - Home page
    - Tiles for different stats:
        - Top 5 songs
        - Top 5 albums
        - Top 5 artists
        - Currently listening
        - Most listened to genre (based on top 5 songs)
        - Larger list of followed artists
        - Saved or top audiobooks
        - Recommended content

- `localhost:3000/search/{userId}/`
    - Search page to get stats of other users
    - "Nice to have" - not a main thing to focus on or build first

#### App Features
- User profile data
    - Different API endpoints for self/current user and for user by id/username
- User's top items
- User's currently playing
- Form to check if user follows an artist
- Animations and styling
- App theme
- Documentation and code comments

#### FrontEnd UI Frameworks 
- [Chakra UI](https://v2.chakra-ui.com/)
- [Material UI](https://mui.com/material-ui/)
- [UI ShadCN](https://ui.shadcn.com/)

#### Deployment & Security
- [Netlify Environment Varibles](https://docs.netlify.com/environment-variables/overview/)

#### Useful Resources
- [Spotify for Developers](https://developer.spotify.com/documentation/web-api)

#### Spotify Usage Flow
1. User clicks button to sign in via Spotify
2. App redirects to Spotify's sign in page
3. User clicks on Spotify to sign in
4. Spotify finishes the sign in and redirects to our designated "redirect URL"
5. React app detects Spotify's sign in result and processes it
6. Save the processed result to state and/or local storage and/or context
7. Components throughout the React app reach up to grab the access tocken and use it in fetch requests

Verifier code process:
1. User clicks button to sign in via Spotify
2. Generate a "verifier" code word and save it to local storage
3. Redirect to Spotify to sign in
4. Spotify redirects back to website to finish the sign in
5. Use the "verifier" code word from localStorage to finish the sign in