const $ = id => document.getElementById(id)

const $nowPlaying = $("now-playing");
const $trackArt = $("track-art");
const $trackName = $("track-name");
const $trackArtist = $("track-artist");

const $playPauseBtn = $("play-pause-track");
const $nextBtn = $("next-track");
const $prevBtn = $("prev-track");

const $seekSlider = $("seek-slider");
const $volumeSlider = $("volume-slider");
const $currTime = $("current-time");
const $totalDuration = $("total-duration");

let trackIndex = 0;
let isPlaying = false;
let updateTimer;


const $currTrack = document.createElement('audio');

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

  $currTrack.src = track.path
  $currTrack.load()

  $trackArt.style.backgroundImage = `url(${track.image})`
  $trackName.innerHTML = track.name
  $trackArtist.innerHTML = track.artist
  $nowPlaying.innerHTML = `Reproduciendo pista ${trackIndex + 1} de ${trackList.length}`

  updateTimer = setInterval(seekUpdate, 1000)
  $currTrack.addEventListener("ended", nextTrack)
  setBackgroundColor()
}

function resetValues() {
  $currTime.innerHTML = "00:00"
  $totalDuration.innerHTML = "00:00"
  $seekSlider.value = 0
}

function playPauseTrack() {
  if (!isPlaying) playTrack()
  else pauseTrack()
}

function playTrack() {
  $currTrack.play()
  isPlaying = true
  $playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function pauseTrack() {
  $currTrack.pause()
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

function seekTo() {
  const sliderTime = $currTrack.duration * ($seekSlider.value / 100);
  $currTrack.currentTime = sliderTime;
}

function setVolume() {
  $currTrack.volume = $volumeSlider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0

  if (!isNaN($currTrack.duration)) {
    seekPosition = $currTrack.currentTime * (100 / $currTrack.duration)

    $seekSlider.value = seekPosition

    let currentMinutes = Math.floor($currTrack.currentTime / 60)
    let currentSeconds = Math.floor($currTrack.currentTime - currentMinutes * 60)
    let durationMinutes = Math.floor($currTrack.duration / 60)
    let durationSeconds = Math.floor($currTrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    $currTime.textContent = currentMinutes + ":" + currentSeconds;
    $totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

