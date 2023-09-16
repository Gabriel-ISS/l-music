import { $, getTemplate, fillComponent } from '../libs/html-management.js'

const $simplePlayerContainer = $('simple-player')
const $startStopButton = $('start-stop-btn')

const simplePlayer = await getTemplate('../../templates/components/simple-player')


export function updateSimplePlayer(track) {
  $simplePlayerContainer.innerHTML = fillComponent(simplePlayer, track)
}

export function changeIcon(playing) {
  if (playing) {
    $startStopButton.classList.replace('fa-play', 'fa-pause')
  } else {
    $startStopButton.classList.replace('fa-pause', 'fa-play')
  }
}