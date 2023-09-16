/*
Basado en https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
*/

import { $ } from '../libs/html-management.js'
import store from '../store.js'

const $nowPlaying = $("now-playing");
const $trackImage = $("track-image");
const $trackName = $("track-name");
const $trackArtist = $("track-artist");

const $playPauseBtn = $("play-pause-track");
const $nextBtn = $("next-track");
const $prevBtn = $("prev-track");

const $trackSlider = $("track-slider");
const $volumeSlider = $("volume-slider");
const $currTime = $("current-time");
const $totalDuration = $("total-duration");

$playPauseBtn.addEventListener('click', playPauseTrack);
$nextBtn.addEventListener('click', nextTrack);
$prevBtn.addEventListener('click', prevTrack);
$trackSlider.addEventListener('change', setTrackTime)
$volumeSlider.addEventListener('change', setVolume)

const $audioController = document.createElement('audio');

let updateTimer;

function setBackgroundColor() {
  /* Esto debería cambiar la imagen de fondo 
  let red = Math.floor(Math.random() * 256) + 64
  let green = Math.floor(Math.random() * 256) + 64
  let blue = Math.floor(Math.random() * 256) + 64
  document.body.style.background = `rgb(${[red, green, blue].join(', ')})` */
}

export default function playerLoader(trackIndex) {
  clearInterval(updateTimer)
  resetTrack()

  if (!store.playlist.tracks.length) {
    console.info('Tracks not found')
    return;
  }

  const track = store.playlist.tracks[trackIndex]

  $audioController.src = track.path
  $audioController.load()

  $trackImage.style.backgroundImage = `url(${track.image})`
  $trackName.innerHTML = track.name
  $trackArtist.innerHTML = track.artist
  $nowPlaying.innerHTML = `Reproduciendo pista ${trackIndex + 1} de ${store.playlist.tracks.length}`

  updateTimer = setInterval(updatePlayerTime, 1000)
  $audioController.addEventListener("ended", nextTrack)
  setBackgroundColor()
}

function resetTrack() {
  $currTime.innerHTML = "00:00"
  $totalDuration.innerHTML = "00:00"
  $trackSlider.value = 0
}

function playPauseTrack() {
  if (!store.track.isPlaying) playTrack()
  else pauseTrack()
}

export function playTrack() {
  $audioController.play()
  store.track.isPlaying = true
  $playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function pauseTrack() {
  $audioController.pause()
  store.track.isPlaying = false
  $playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack() {
  if (store.track.index < store.playlist.tracks.length - 1) store.track.index++;
  else store.track.index = 0;
  playerLoader(store.track.index);
  playTrack();
}

function prevTrack() {
  if (store.track.index > 0)
    store.track.index -= 1;
  else store.track.index = store.playlist.tracks.length;
  playerLoader(store.track.index);
  playTrack();
}

function setTrackTime() {
  const sliderTime = $audioController.duration * ($trackSlider.value / 100);
  $audioController.currentTime = sliderTime;
}

function setVolume() {
  $audioController.volume = $volumeSlider.value / 100;
}

function updatePlayerTime() {
  if (isNaN($audioController.duration)) return;

  const { currentTime, duration } = $audioController

  $trackSlider.value = currentTime * (100 / duration)

  const timeFormatter = time => time < 10 ? '0' + time : time
  let currentMinutes = timeFormatter(Math.floor(currentTime / 60))
  let currentSeconds = timeFormatter(Math.floor(currentTime - currentMinutes * 60))
  let durationMinutes = timeFormatter(Math.floor(duration / 60))
  let durationSeconds = timeFormatter(Math.floor(duration - durationMinutes * 60))

  $currTime.textContent = currentMinutes + ":" + currentSeconds;
  $totalDuration.textContent = durationMinutes + ":" + durationSeconds;
}

