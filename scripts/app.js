const users = [
  { name: "Klakier, age: 20" },
  { name: "Vasia, age: 18" },
  { name: "Bob, age: 29" },
  { name: "Kasia, age: 45" },
];

console.log(users.sort((a, b) => a.age - b.age));
