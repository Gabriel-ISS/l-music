import { $ } from '../libs/html-management.js'
import store from '../store.js'
import { showForm } from './form.js'

const $prevViewBtn = $('prev-view')
const $addSomething = $('add-something')

$prevViewBtn.addEventListener('click', showPrevView)
$addSomething.addEventListener('click', showForm)

function showPrevView() {
  store.views.prevLoader()
}

