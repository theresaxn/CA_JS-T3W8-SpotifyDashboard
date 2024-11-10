import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider";
import "../styles/TopTracks.css"

export function TopTracks() {
    let {topTracks} = useSpotifyProfileData();

	if (topTracks.items && topTracks.items.length > 0) {
		return (
			<div id="topTracksContainer">
				{topTracks.items.map((track) => {
                    return (
                        <div className="trackCard">
                            <h3>{track.name}</h3>
                            <img src={track.album.images[0].url} /> <br />
                            <h4>By {track.artists.map(artistObj => artistObj.name).join(", ")}</h4>
                            <button>
                                <a href={track.external_urls.spotify}>Listen</a>
                            </button>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div id="topTracksContainer">
            </div>
        )
    }
}