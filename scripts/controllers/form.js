import { $, getTemplate, fillComponent } from '../libs/html-management.js'
import store from '../store.js'

const $form = $('form')

const formGroup = await getTemplate('../../templates/components/form-group')

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

function createForm(...fields) {
  return fields.reduce((html, fieldGroup) => {
    const [title, field] = fieldGroup
    html += fillComponent(formGroup, { title, field })
    return html
  }, '')
}

export function showForm() {
  console.log(store)
  const currentView = store.views.current
  switch (currentView) {
    case 'main':
      // insert playlist form
      $form.innerHTML = AddPlaylistForm()
      store.views.setNew('form')
      break;
    case 'playlist':
      //insert track form
      $form.innerHTML = AddTrackForm()
      store.views.setNew('form')
      break;
  }
}