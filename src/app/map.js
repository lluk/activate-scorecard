export default function map(obj, action, filter) {
  let arr = [];
  for(var key in obj) {
    if(!filter || filter(obj[key]))
    {
      let component = action(obj[key], key);
      arr.push(component);
    }
  }
  return arr;
}