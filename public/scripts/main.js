import { $, getTemplate } from './libs/html-management.js'


const TEMPLATE_PATH = '../templates/'

const $app = $('app')

async function injectTemplates(...templates) {
  let html = ''
  let i = 0
  for (const templateName of templates) {
    const path = TEMPLATE_PATH + templateName
    const template = await getTemplate(path)
    html += template
    i++;
  }
  $app.innerHTML = html
  for (let i = 2; i < templates.length; i++) {
    $app.children[i].setAttribute('style', 'display: none;')
  }
}

await injectTemplates('navbar', 'main-menu', 'track-list', 'player', 'form', 'simple-player')
import('./controllers/navbar.js')
import('./controllers/main-menu.js')
import('./controllers/track-list.js')
import('./controllers/player.js')
import('./controllers/form.js')
import('./controllers/simple-player.js')