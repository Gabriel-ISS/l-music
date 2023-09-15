export function $(id) {
  return document.getElementById(id)
}

export async function injectHTML(filePath,elem) {
  try {
      const response = await fetch(filePath);
      if (!response.ok) {
          return;
      }
      const text = await response.text();
      elem.appendChild = text;
  } catch (err) {
      console.error(err.message);
  }
}
