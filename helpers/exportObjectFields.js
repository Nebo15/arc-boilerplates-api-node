export default function exportObjectFields(obj, fields = {}) {
  let tmp = {};
  for (let key in obj) {
    if (typeof fields[key] !== 'undefined') {
      tmp[key] = obj[key];
    }
  }

  return tmp;
}
