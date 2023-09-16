import { $ } from '../libs/html-management.js'
import store from '../store.js'
import formLoader from './form.js'
import { moveToView } from '../libs/views-manager.js'
import { VIEWS } from '../constants.js'

const $prevViewBtn = $('prev-view')
const $addSomething = $('add-something')

$prevViewBtn.addEventListener('click', showPrevView)
$addSomething.addEventListener('click', showForm)

function showForm() {
  moveToView(VIEWS.form, formLoader)
}

function showPrevView() {
  moveToView(store.views.prev, store.views.prevLoader)
}
