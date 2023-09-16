import { $, $all, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import { getPlaylist } from '../libs/db-service.js'
//import { isPlaying, playTrack } from './player.js'

const $trackList = $('track-list')

const trackTemplate = await getTemplate('../../templates/components/track')

await setPlaylist()

const $tracks = $all('.track')
$tracks.forEach((track) => {
  track.addEventListener('click', playTrack)
})

async function setPlaylist() {
  const tracks = await getPlaylist()
  console.log(tracks)
  insertMany(Track, tracks, $trackList, true)
}

function Track(data, index) {
  return fillComponent(trackTemplate, { ...data, index })
}

function playTrack(e) {
  
}