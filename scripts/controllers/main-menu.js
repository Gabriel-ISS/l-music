import { $, $all, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import { getListOfPlaylist } from '../libs/db-service.js'

const $mainMenu = $('main-menu');

const playlistTemplate = await getTemplate('../../templates/components/playlist')

await setPlaylists()

const $playlistButtons = $all('.playlist>button')
$playlistButtons.forEach((track) => {
  track.addEventListener('click', e => {
    removePlaylist(e)
  })
})

async function setPlaylists() {
  const playlists = await getListOfPlaylist()
  insertMany(Playlist, playlists, $mainMenu, true)
}

function Playlist(data, index) {
  return fillComponent(playlistTemplate, { ...data, index })
}

function removePlaylist(e) {
  const isSure = confirm('¿Estas seguro de eliminar la playlist?')
  if (isSure) {
    // TODO: Eliminar del json
    e.target.parentElement.remove()
  }
}