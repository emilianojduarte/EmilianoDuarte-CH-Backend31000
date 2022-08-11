//imports

//funciones
const postLogIn = (req, res) => {
  try {
    req.session.user = req.query.name;
    res.json(req.session.user);
  } catch (error) {
    console.log("Ocurrio el siguiente error en la funcion postLogIn: ", error);
  }
};
const getLogIn = async (req, res) => {
  try {
    console.log("usuario en session: ", req.session.user);
    let nombre = req.session.user;
    res.json(nombre);
  } catch (error) {
    console.log("Ocurrio el siguiente error en la funcion getLogIn: ", error);
  }
};
const deletetLogIn = (req, res) => {
  try {
    req.session.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log("Ocurrio el siguiente error en la funcion postLogIn: ", error);
  }
};
export { postLogIn, getLogIn, deletetLogIn };
