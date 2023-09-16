import store from '../store.js'
import { $ } from './html-management.js';

const $cover = $('cover')

/**
 * Establece los cambios necesarios para el intercambio de vista
 * @param {string} view la vista a la que se quiero mover desde la constante VIEWS
 * @param {() => Promise<HTMLElement>} loader cargador de la vista a la que moverse
 * @param {HTMLElement} $currentView la vista actual
 * @param {() => Promise<HTMLElement>} currentLoader cargador de la vista actual
 */
export async function moveToView(view, loader, $currentView = $(store.views.current), currentLoader = store.views.currentLoader) {
  const $toReplaceView = $currentView
  const $newView = await loader()

  // ensure display
  $toReplaceView.style.cssText = 'display: none;'
  $newView.style.cssText = ''

  // update views
  store.views.prevLoader = currentLoader
  store.views.currentLoader = loader
  store.views.prev = $currentView.getAttribute('id')
  store.views.current = view
}