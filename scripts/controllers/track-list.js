import { $, $all, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import playerLoader, { playTrack } from './player.js'
import { getPlaylist } from "../libs/db-service.js"
import store from '../store.js'
import { moveToView } from '../libs/views-manager.js'
import { VIEWS } from '../constants.js'

const $trackList = $('track-list')

const trackTemplate = await getTemplate('../../templates/components/track')

export default async function playlistLoader(index) {
  const playlist = await getPlaylist(index)
  insertMany(Track, playlist.tracks, $trackList, true)

  // add events
  const $tracks = $all('.track')
  $tracks.forEach(track => {
    track.addEventListener('click', e => {
      const trackIndex = e.currentTarget.getAttribute('data-index')
      moveToView(VIEWS.player, () => loadAndPlayTrack(trackIndex))
    })
  })

  // update store
  store.playlist.index = index
  store.playlist.tracks = playlist.tracks

  // return main id
  return $trackList
}

function Track(data, index) {
  return fillComponent(trackTemplate, { ...data, index })
}

function loadAndPlayTrack(trackIndex) {
  const currentTrack = store.track.index
  if (store.track.isPlaying && trackIndex === currentTrack) return;
  if (trackIndex !== currentTrack) playerLoader(trackIndex);
  playTrack()
  return $('player')
}