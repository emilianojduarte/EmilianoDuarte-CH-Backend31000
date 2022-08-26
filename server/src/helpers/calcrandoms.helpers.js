function crear(cant) {
  let obj = {};
  for (let i = 0; i < cant; i++) {
    const rand = Math.floor(Math.random() * 1000 + 1);
    if (obj.hasOwnProperty(rand)) {
      obj[rand]++;
    } else {
      obj[rand] = 1;
    }
  }
  return obj;
}

process.on("message", (cant) => {
  const obj = crear(cant);
  process.send(obj);
  process.exit();
});

process.send("listo");
