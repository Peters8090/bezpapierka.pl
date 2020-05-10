export const emptyValues = [undefined, null, '', {}, []];

export const getBase64 = file => new Promise ((resolve, reject) => {
  const reader = new FileReader ();
  reader.readAsDataURL (file);
  reader.onload = _ => resolve (reader.result);
  reader.onerror = e => reject (e);
});

Object.filter = (obj, predicate) =>
    Object.keys(obj)
    .filter( key => predicate(obj[key]) )
    .reduce( (res, key) => (res[key] = obj[key], res), {} );