export function $(id) {
  return document.getElementById(id)
}

export function $all(selector) {
  return document.querySelectorAll(selector)
}

export async function getTemplate(templatePath) {
  try {
    const response = await fetch(templatePath + '.html');
    if (!response.ok) return;
    return await response.text();
  } catch (err) {
    console.error(err.message);
  }
}

/**
 * Inserta varios elementos en uno
 * @param {(any) => string} Component Generador del html
 * @param {any[]} data datos para el componente
 * @param {HTMLElement} $element donde se insertara el html
 */
export function insertMany(Component, data, $element, includeIndex = false) {
  $element.innerHTML = data.reduce((html, track, index) => {
    html += includeIndex ? Component(track, index) : Component(track)
    return html
  }, '')
}

export function fillComponent(component, data) {
  const coincidences = component.match(/{{(.*?)}}/g)
  let fill = component
  for (const coincidence of coincidences) {
    const word = coincidence.slice(2, -2)
    fill = fill.replace(coincidence, data[word])
  }
  return fill
}