// We can export fields for docs!
import controllers from "./controllers";

function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

for(let route_id in controllers.stack) {
  console.log('======');
  let route_item = controllers.stack[route_id].route.stack[0];
  let route_controller = route_item.handle.toString();
  let route_view_search_pattern = /render\('([^']*)'/gm;
  let route_view = route_view_search_pattern.exec(route_controller);
  let route_view_name = route_view ? route_view[1] : undefined;

  console.log("Request: ", (route_item.method || "").toUpperCase(), controllers.stack[route_id].route.path);
  console.log("Returns: ", route_view_name);

  if(route_view_name) {
    console.log("View: ");

    let route_view_struct = require('./views/' + route_view_name + '.view.js').view_structure;

    console.log('  Field Name | Type | Title | Description');
    for (let [key, value] of entries(route_view_struct)) {
      console.log("  " + key + " | " + value.type + " | " + value.title + " | " + value.description);
    }
    // console.log(entries(route_view_struct));
  }
}
