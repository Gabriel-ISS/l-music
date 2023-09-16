import setPlaylist from "./controllers/track-list.js"

export const state = {
  playlistIndex: 0,
  tracks: [],
  trackIndex: 0,
  isPlaying: false,
  loadTracks: async function (index) {
    const tracks = setPlaylist(index)
    this.playlistIndex = index
    this.tracks = tracks
  }
}