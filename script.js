/*
Basado en https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
*/

const $ = id => document.getElementById(id)

const $nowPlaying = $("now-playing");
const $trackImage = $("track-image");
const $trackName = $("track-name");
const $trackArtist = $("track-artist");

const $playPauseBtn = $("play-pause-track");
const $nextBtn = $("next-track");
const $prevBtn = $("prev-track");

const $trackSlider = $("track-slider");
const $volumeSlider = $("volume-slider");
const $currentTime = $("current-time");
const $totalDuration = $("total-duration");

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

const $audioController = document.createElement('audio');

const trackList = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
]

loadTrack(trackIndex)

function setBackgroundColor() {
  let red = Math.floor(Math.random() * 256) + 64
  let green = Math.floor(Math.random() * 256) + 64
  let blue = Math.floor(Math.random() * 256) + 64
  document.body.style.background = `rgb(${[red, green, blue].join(', ')})`
}

function loadTrack(trackIndex) {
  clearInterval(updateTimer)
  resetValues()

  const track = trackList[trackIndex]

  $audioController.src = track.path
  $audioController.load()

  $trackImage.style.backgroundImage = `url(${track.image})`
  $trackName.innerHTML = track.name
  $trackArtist.innerHTML = track.artist
  $nowPlaying.innerHTML = `Reproduciendo pista ${trackIndex + 1} de ${trackList.length}`

  updateTimer = setInterval(updatePlayerTime, 1000)
  $audioController.addEventListener("ended", nextTrack)
  setBackgroundColor()
}

function resetValues() {
  $currentTime.innerHTML = "00:00"
  $totalDuration.innerHTML = "00:00"
  $trackSlider.value = 0
}

function playPauseTrack() {
  if (!isPlaying) playTrack()
  else pauseTrack()
}

function playTrack() {
  $audioController.play()
  isPlaying = true
  $playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function pauseTrack() {
  $audioController.pause()
  isPlaying = false
  $playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack() {
  if (trackIndex < trackList.length - 1) trackIndex++;
  else trackIndex = 0;
  loadTrack(trackIndex);
  playTrack();
}

function prevTrack() {
  if (trackIndex > 0)
    trackIndex -= 1;
  else trackIndex = trackList.length;
  loadTrack(trackIndex);
  playTrack();
}

function setTime() {
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
  const time = {
    current: {
      minutes: timeFormatter(Math.floor(currentTime / 60)),
      seconds: timeFormatter(Math.floor(currentTime - currentMinutes * 60))
    },
    total: {
      minutes: timeFormatter(Math.floor(duration / 60)),
      seconds: timeFormatter(Math.floor(duration - durationMinutes * 60))
    }
  }
  $currentTime.textContent = time.current.minutes + ":" + time.current.seconds;
  $totalDuration.textContent = time.total.minutes + ":" + time.total.seconds;
}