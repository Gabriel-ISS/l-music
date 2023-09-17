const dbPromise = fetch('/public/db.json')
  .then(res => res.json())
  .catch(e => {
    console.log(e)
  })

export async function getListOfPlaylist() {
  const db = await dbPromise
  // TODO: remover los tracks
  return db
}

export async function getPlaylist(index) {
  const db = await dbPromise
  return db[index]
}