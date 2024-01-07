function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

//Funkcja wyższego poziomu
function calculate(a, b, fn) {
  console.log(fn.name);
  const res = fn(a, b);
  return res;
}

const res = calculate(3, 5, add);
console.log(res);
