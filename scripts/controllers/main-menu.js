import { $, $all, $first, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import { getListOfPlaylist } from '../libs/db-service.js'

const $mainMenu = $('main-menu');

const playlistTemplate = await getTemplate('../../templates/components/playlist')

setPlaylists()

const $playlistButtons = $all('.playlist')
console.log($playlistButtons)
$playlistButtons.forEach((element, index) => {
  console.log(element)
  element.addEventListener('click', (e) => {
    removePlaylist(e, index)
  })
})


async function setPlaylists() {
  const playlists = await getListOfPlaylist()
  insertMany(Playlist, playlists, $mainMenu, true)
}

function Playlist(data, index) {
  return fillComponent(playlistTemplate, { ...data, index })
}

function removePlaylist(e, index) {
  const isSure = confirm('¿Estas seguro de eliminar la playlist?')
  if (isSure) {
    const $playlist = $first(`.playlist[data-index]=${index}`)
    
  }
}