import playlistLoader from "./controllers/track-list.js"
import {VIEWS} from './constants.js'

export default {
  playlist: {
    index: 0,
    tracks: []
  },
  views: {
    prev: VIEWS.main,
    current: VIEWS.main,
    prevLoader: () => void 0,
    currentLoader: () => void 0
  },
  track: {
    index: 0,
    isPlaying: false,
  }
}