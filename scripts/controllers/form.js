import { getTemplate, fillComponent } from '../libs/html-management.js'


const formGroup = await getTemplate('../../templates/components/form-group')

function AddPlaylistForm() {
  return createForm('nombre')
}

function createForm(...fields) {
  return fields.reduce((html, field) => {
    html += fillComponent(formGroup, { field })
  })
}