import { $, $all, $first, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import { getListOfPlaylist } from '../libs/db-service.js'

const $mainMenu = $('main-menu');

const playlistTemplate = await getTemplate('../../templates/components/playlist')

setPlaylists()

const $playlistButtons = $all('.playlist>button')
$playlistButtons.forEach(element => {
  element.addEventListener('click')
})


async function setPlaylists() {
  const playlists = await getListOfPlaylist()
  insertMany(Playlist, playlists, $mainMenu, true)
}

async function Playlist(name, index) {
  return fillComponent(playlistTemplate, { name, index })
}

function removePlaylist(index) {
  const isSure = confirm('¿Estas seguro de eliminar la playlist?')
  if (isSure) {
    const $playlist = $first(`.playlist[data-index]=${index}`)
  }
}