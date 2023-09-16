import { $, getTemplate, fillComponent } from '../libs/html-management.js'

const $simplePlayerContainer = $('simple-player')

const simplePlayer = await getTemplate('../../templates/components/simple-player')


const mocked = {
  "name": "Night Owl",
  "artist": "Broke For Free",
  "playlist": 'Mi playlist',
  "album": 'random album',
  "image": "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
  "path": "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
}
$simplePlayerContainer.innerHTML = fillComponent(simplePlayer, mocked)