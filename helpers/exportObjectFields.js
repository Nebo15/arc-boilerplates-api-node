export default function exportObjectFields(obj, fields = {}) {
  var tmp = {};
  for (var key in obj) {
    if(typeof fields[key] !== 'undefined') {
      tmp[key] = obj[key];
    }
  }

  return tmp;
};
