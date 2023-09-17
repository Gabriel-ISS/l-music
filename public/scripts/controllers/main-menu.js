import { $, $all, insertMany, getTemplate, fillComponent } from '../libs/html-management.js'
import { getListOfPlaylist } from '../libs/db-service.js'
import store from '../store.js'
import { moveToView } from '../libs/views-manager.js';
import { VIEWS } from '../constants.js';
import playlistLoader from './track-list.js';


const playlistTemplate = await getTemplate('../../templates/components/playlist')

const $mainMenu = $('main-menu');


await mainMenuLoader()
export default async function mainMenuLoader() {
  const playlists = await getListOfPlaylist()
  insertMany(Playlist, playlists, $mainMenu, true)

  // add events
  const $playlists = $all('.playlist')
  const $playlistButtons = $all('.playlist>button')
  $playlists.forEach(playlist => {
    playlist.addEventListener('click', showPlaylist)
  })
  $playlistButtons.forEach(btn => {
    btn.addEventListener('click', removePlaylist)
  })

  // return main id
  return $mainMenu
}

function Playlist(data, index) {
  return fillComponent(playlistTemplate, { ...data, index })
}

async function showPlaylist(e) {
  const playlistIndex = e.currentTarget.getAttribute('data-index')
  moveToView(
    VIEWS.playlist,
    async () => await playlistLoader(playlistIndex),
    $mainMenu,
    mainMenuLoader
  )
}

function removePlaylist(e) {
  e.preventDefault()
  const isSure = confirm('¿Estas seguro de eliminar la playlist?')
  if (isSure) {
    // TODO: Eliminar del json
    e.target.parentElement.remove()
  }
}