import { VIEWS } from '../constants.js';
import store from '../store.js'
import { $ } from './html-management.js';

const $simplePlayer = $('simple-player')

/**
 * Establece los cambios necesarios para el intercambio de vista
 * @param {string} view la vista a la que se quiero mover desde la constante VIEWS
 * @param {() => Promise<HTMLElement>} loader cargador de la vista a la que moverse
 * @param {HTMLElement} $currentView la vista actual
 * @param {() => Promise<HTMLElement>} currentLoader cargador de la vista actual
 */
export async function moveToView(view, loader, $currentView = $(store.views.current), currentLoader = store.views.currentLoader) {
  const $toReplaceView = $currentView
  console.log(loader, currentLoader)
  const $newView = await loader()

  if (!$newView) throw new Error("New view loader returns undefined")

  // ensure display
  $toReplaceView.style.cssText = 'display: none;'
  $newView.style.cssText = ''

  // simple player toggle
  if (view == VIEWS.player) {
    $simplePlayer.style.cssText = 'display: none;'
  } else if (VIEWS.player == store.views.current && store.track.isPlaying) {
    $simplePlayer.style.cssText = ''
  }

  // update views
  store.views.prevLoader = currentLoader
  store.views.currentLoader = loader

  const currentView = $currentView.getAttribute('id')
  store.views.prev = currentView
  store.views.current = view
}