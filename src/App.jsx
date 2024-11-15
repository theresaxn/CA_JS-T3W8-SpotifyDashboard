import './styles/App.css'
import { ProfileHeader } from './components/ProfileHeader';
import { TopTracks } from './components/TopTracks';
import { useSpotifyAuthContext } from './contexts/SpotifyAuthProvider';
import { useThemeContext } from './contexts/ThemeContextProvider'

function App() {

  const [currentTheme, toggleTheme, setToSystem] = useThemeContext();
  const {redirectToAuthCodeFlow} = useSpotifyAuthContext();

  return (
    <>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <button onClick={setToSystem}>
        Set to System
      </button>
      <button onClick={redirectToAuthCodeFlow}>
        Sign In via Spotify
      </button>

      <ProfileHeader />
      <TopTracks />
    </>
  )
}

export default App
