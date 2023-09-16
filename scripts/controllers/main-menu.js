import { $, $all, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import { getListOfPlaylist } from '../libs/db-service.js'
import store from '../store.js'

const $mainMenu = $('main-menu');

const playlistTemplate = await getTemplate('../../templates/components/playlist')

await setPlaylists()

const $playlists = $all('.playlist')
const $playlistButtons = $all('.playlist>button')

$playlists.forEach(playlist => {
  playlist.addEventListener('click', showPlaylist)
})
$playlistButtons.forEach(btn => {
  btn.addEventListener('click', removePlaylist)
})

async function setPlaylists() {
  const playlists = await getListOfPlaylist()
  insertMany(Playlist, playlists, $mainMenu, true)
}

function Playlist(data, index) {
  return fillComponent(playlistTemplate, { ...data, index })
}

async function showPlaylist(e) {
  store.views.setNew('playlist')
  store.loadTracks(e.target.getAttribute('data-index'))
}

function removePlaylist(e) {
  e.preventDefault()
  const isSure = confirm('¿Estas seguro de eliminar la playlist?')
  if (isSure) {
    // TODO: Eliminar del json
    e.target.parentElement.remove()
  }
}