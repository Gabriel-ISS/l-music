import { $, getTemplate, fillComponent } from '../libs/html-management.js'

const $simplePlayerContainer = $('simple-player')

const simplePlayer = await getTemplate('../../templates/components/simple-player')


export function updateSimplePlayer(track) {
  $simplePlayerContainer.innerHTML = fillComponent(simplePlayer, track)
}

export function playPauseSP(playing) {
  const $playPauseButton = $('play-pause-icon')

  if (playing) {
    // TODO: fa-pause no anda
    $playPauseButton.className = 'fa-solid fa-play'
  } else {
    $playPauseButton.className = 'fa-solid fa-play'
  }
}