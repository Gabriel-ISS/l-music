import { $, getTemplate, fillComponent } from '../libs/html-management.js'
import store from '../store.js'
import { VIEWS } from '../constants.js'

const $form = $('form')

const formGroup = await getTemplate('../../templates/components/form-group')

export default function formLoader() {
  const currentView = store.views.current
  switch (currentView) {
    case VIEWS.main:
      $form.innerHTML = AddPlaylistForm()
      break;
    case VIEWS.form:
    default:
      $form.innerHTML = AddTrackForm()
      break;
  }
  return $form
}

function AddPlaylistForm() {
  return createForm(
    ['Nombre de playlist *', 'name'],
    ['Link de imagen', 'image']
  )
}

function AddTrackForm() {
  return createForm(
    ['Nombre de la pista *', 'name'],
    ['Artista', 'artist'],
    ['Album', 'album'],
    ['Link de imagen', 'image'],
    ['Link al archivo de audio', 'path']
  )
}

function createForm(...fieldGroups) {
  return fieldGroups.reduce((html, fieldGroup) => {
    const [title, field] = fieldGroup
    html += fillComponent(formGroup, { title, field })
    return html
  }, '')
}