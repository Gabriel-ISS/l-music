import { $, $all, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import { playTrack } from './player.js'
import { getPlaylist } from "../libs/db-service.js"
import { state } from '../store.js'

const $trackList = $('track-list')

const trackTemplate = await getTemplate('../../templates/components/track')

export default async function setPlaylist(index) {
  const playlist = await getPlaylist(index)
  insertMany(Track, playlist.tracks, $trackList, true)

  const $tracks = $all('.track')
  $tracks.forEach(track => {
    track.addEventListener('click', loadAndPlayTrack)
  })

  return playlist.tracks
}

function Track(data, index) {
  return fillComponent(trackTemplate, { ...data, index })
}

function loadAndPlayTrack() {
  if (state.isPlaying) return;
  //playTrack()
}