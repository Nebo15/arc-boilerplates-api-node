/**
 * This is a helper function that helps to partially export object fiels,
 * you can thing about it as destructuring object into another object.
 */

export default function exportObjectFields(obj, fields = {}) {
  let tmp = {};
  for (let key in obj) {
    if (typeof fields[key] !== 'undefined') {
      tmp[key] = obj[key];
    }
  }

  return tmp;
}
