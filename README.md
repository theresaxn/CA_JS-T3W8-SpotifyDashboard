## T3W8 Tue

### Spotify Stats Dashboard 

#### Content Data / Global State
- Spotify API Content Provider
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
- Animations
- Cool styling
- Good documentation and code comments
- App theme

#### FrontEnd UI Frameworks 
- [Chakra UI](https://v2.chakra-ui.com/)
- [Material UI](https://mui.com/material-ui/)
- [UI ShadCN](https://ui.shadcn.com/)

#### Deployment & Security
- [Netlify Environment Varibles](https://docs.netlify.com/environment-variables/overview/)

#### Useful Links
- [Spotify for Developers](https://developer.spotify.com/documentation/web-api)