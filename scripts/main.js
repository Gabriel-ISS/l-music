import { $ } from './libs/html-management.js'


const TEMPLATE_PATH = '../templates/'

const $app = $('app')

async function injectTemplates(...templates) {
  let html = ''
  for (const template of templates) {
    const path = TEMPLATE_PATH + template + '.html'
    try {
      const response = await fetch(path)
      if (!response.ok) {
        return;
      }
      const templateHTML = await response.text()
      html += templateHTML
    } catch (error) {
      console.log(error)
    }

  }
  $app.innerHTML = html
}

await injectTemplates('main-menu', 'track-list', 'player', 'form', 'simple-player')
import('./controllers/player.js')
import('./controllers/track-list.js')