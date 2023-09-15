import { getPlaylist } from '../libs/db-service.js'
import {$} from '../libs/html-management.js'

const $trackList = $('track-list')

let tracks;

async function setTracks() {
  /* tracks = await getPlaylist(playlist)
  $trackList.innerHTML = tracks.reduce((html, track) => {
    html += Track(track, index)
  }, '') */
}

setTracks()

/**
 * 
 * @param {object} track json data
 * @param {string} track.name
 * @param {string} track.artist
 * @param {string} track.image
 * @param {string} track.path
 */
function Track({ name, artist, image, path }, index) {
  return `
    <article class='track'>
      <div>
        <button class="play-track" data-track="${path}">Reproducir</button>
        <img src="${image}"></img>
      </div>
      <div>
        <span>${name} - ${artist}<span>
        <a href="edit.html">Editar</a>
        <button>Eliminar</button>
      </div>
    </article>
  `
}

function removeTrack() {

}