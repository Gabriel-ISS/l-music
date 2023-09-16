import { $ } from '../libs/html-management.js'
import store from '../store.js'
import formLoader from './form.js'
import { moveToView } from '../libs/views-manager.js'
import { VIEWS } from '../constants.js'
import playlistLoader from './track-list.js'
import mainMenuLoader from './main-menu.js'

const $prevViewBtn = $('prev-view')
const $addSomething = $('add-something')

$prevViewBtn.addEventListener('click', showPrevView)
$addSomething.addEventListener('click', showForm)

function showForm() {
  moveToView(VIEWS.form, formLoader)
}

function showPrevView() {
  switch (store.views.current) {
    case VIEWS.main:
      break;
    case VIEWS.playlist:
      moveToView(VIEWS.main, mainMenuLoader)
      break;
    default:
      moveToView(store.views.prev, async () => await playlistLoader(store.playlist.index))
      break;
  }
}
