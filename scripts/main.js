import { $, getTemplate } from './libs/html-management.js'


const TEMPLATE_PATH = '../templates/'

const $app = $('app')

async function injectTemplates(...templates) {
  let html = ''
  for (const templateName of templates) {
    const path = TEMPLATE_PATH + templateName
    const template = await getTemplate(path)
    html += template
  }
  $app.innerHTML = html
}

await injectTemplates('main-menu', 'track-list', 'player', 'form', 'simple-player')
import('./controllers/main-menu.js')
import('./controllers/player.js')
import('./controllers/track-list.js')