import { $ } from '../libs/html-management.js'
import store from '../store.js'

const $prevViewBtn = $('prev-view')
const $addSomething = $('add-something')

$prevViewBtn.addEventListener('click', showPrevView)

function showPrevView() {
  store.views.prevLoader()
}