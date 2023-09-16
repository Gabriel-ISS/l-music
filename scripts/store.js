import setPlaylist from "./controllers/track-list.js"

export default {
  playlist: {
    index: 0,
    tracks: []
  },
  views: {
    current: 'main',
    prev: 'main',
    setNew(newView) {
      this.prev = this.current
      this.current = newView
    },
    prevLoader: () => void 0
  },
  track: {
    index: 0,
    isPlaying: false,
  },
  loadTracks: async function (index) {
    const tracks = setPlaylist(index)
    this.playlist.index = index
    this.tracks = tracks
  }
}