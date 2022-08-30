//Componentes
import React, { useState, useEffect } from "react";
import axios from "axios";
//Estilos
import "./UserLogIn.css";

function UserLogIn({ revisarMostrar }) {
  //variables
  const [name, setName] = useState("");
  const [mailForm, setmailForm] = useState("");
  const [passForm, setPassForm] = useState("");
  const [bye, setBye] = useState(false);
  const [isLogged, setIsLogued] = useState(false);
  const [errorLoggin, setErrorLoggin] = useState(false);
  const [register, setRegister] = useState(false);
  const [registerOK, setRegisterOK] = useState(false);
  //funciones
  // const checkLogged = async () => {
  //   const response = await fetch("http://localhost:3001/login", {
  //     method: "get",
  //     keepalive: true,
  //     credentials: "include",
  //   });
  //   let data = await response.json();
  //   if (data === undefined) {
  //     return "Indefinido";
  //   }
  //   return data;
  // };
  const postLogIn = async (credentials) => {
    const response = await axios.post("http://localhost:3001/login", credentials);
    return response.data;
  };
  const postSingUp = async (datos) => {
    const response = await fetch(`http://localhost:3001/register`, {
      method: "post",
      keepalive: true,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    return response;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = { username: mailForm, password: passForm };
    postLogIn(credentials)
      .then((res) => {
        if (res === "Unauthorized") {
          console.log("Entró en error de credenciales")
          setErrorLoggin(true);
        }
        console.log("pasó la validación");
        setName(res);
        revisarMostrar(true);
        setIsLogued(true);
        setmailForm("");
        setPassForm("");
        setRegister(false);
        setRegisterOK(false);
      })
      .catch((error) => {
        console.log("Error en el fecth post loging: ", error);
        if (
          (error = `SyntaxError: Unexpected token 'U', "Unauthorized" is not valid JSON`)
        ) {
          setErrorLoggin(true);
        }
      });
  };
  const getLogOff = async () => {
    console.log("entró en el getlogoff");
    const response = await axios.get(`http://localhost:3001/logoff`);
    return response.data;
  };
  const handleLogOff = () => {
    getLogOff()
      .then((data) => {
        console.log("data: ", data);
        if (data.ok) {
          setBye(true);
        }
      })
      .catch((error) => {
        console.log("Ocurrio el siguente error en el handleLogOff", error);
      });
  };
  const activateSingUp = (e) => {
    e.preventDefault();
    setErrorLoggin(false);
    setRegister(true);
    return;
  };
  const handleSingUp = async (e) => {
    e.preventDefault();
    let datos = { username: mailForm, password: passForm };
    postSingUp(datos)
      .then((res) => {
        console.log("res antes del json: ", res);
        return res.json();
      })
      .then((info) => {
        if (info.ok === true) {
          setmailForm("");
          setPassForm("");
          setRegister(false);
          setRegisterOK(true);
        }
        return;
      })
      .catch((error) => {
        console.log("Error en el longin", error);
        return;
      });
  };
  useEffect(() => {
    //checkLogged();
  }, [isLogged, errorLoggin, register, bye, registerOK]);
  return (
    <>
      {bye ? (
        <section className="sect">
          <div>
            <p>Adios {name}!</p>
            {setTimeout(() => {
              window.location.reload(true);
            }, 2000)}
          </div>
        </section>
      ) : isLogged ? (
        <section className="sect">
          <div>
            <p>Bienvenido {name}!</p>
            <button
              type="button"
              onClick={handleLogOff}
              className="btn btn-dark"
            >
              Desloguearse
            </button>
          </div>
        </section>
      ) : errorLoggin ? (
        <section className="sect">
          <h2>Login de usuario</h2>
          <div className="row">
            <div className="col-1"></div>
            <form
              id="loginForm"
              autoComplete="off"
              className="col-10"
              onSubmit={handleSingUp}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email/Usuario
                </label>
                <input
                  id="nameInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={mailForm}
                  onChange={(e) => setmailForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Password
                </label>
                <input
                  id="passInput"
                  type="password"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  name="pass"
                  value={passForm}
                  onChange={(e) => setPassForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-dark">
                  Ingresar
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={activateSingUp}
                >
                  Registrarse
                </button>
              </div>
              <div className="mb-3">
                <p>Error de usuario o contraseña</p>
              </div>
            </form>
            <div className="col-1"></div>
          </div>
        </section>
      ) : register ? (
        <section className="sect">
          <h2>Registro de usuario</h2>
          <div className="row">
            <div className="col-1"></div>
            <form
              id="singUpForm"
              autoComplete="off"
              className="col-10"
              onSubmit={handleSingUp}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email/Usuario
                </label>
                <input
                  id="nameInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={mailForm}
                  onChange={(e) => setmailForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Password
                </label>
                <input
                  id="passInput"
                  type="password"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  name="pass"
                  value={passForm}
                  onChange={(e) => setPassForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={(e) => {
                    window.location.reload(true);
                  }}
                >
                  Reresar al LogIn
                </button>
                <button type="submit" className="btn btn-dark">
                  Enviar datos
                </button>
              </div>
            </form>
            <div className="col-1"></div>
          </div>
        </section>
      ) : registerOK ? (
        <section className="sect">
          <h2>Login de usuario</h2>
          <div className="row">
            <div className="col-1"></div>
            <form
              id="loginForm"
              autoComplete="off"
              className="col-10"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email/Usuario
                </label>
                <input
                  id="nameInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={mailForm}
                  onChange={(e) => setmailForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Password
                </label>
                <input
                  id="passInput"
                  type="password"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  name="pass"
                  value={passForm}
                  onChange={(e) => setPassForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-dark">
                  Ingresar
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={activateSingUp}
                >
                  Registrarse
                </button>
              </div>
              <div>
                <p>Usuario registrado correctamente. Ahora puede loguearse.</p>
              </div>
            </form>
            <div className="col-1"></div>
          </div>
        </section>
      ) : (
        <section className="sect">
          <h2>Login de usuario</h2>
          <div className="row">
            <div className="col-1"></div>
            <form
              id="loginForm"
              autoComplete="off"
              className="col-10"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email/Usuario
                </label>
                <input
                  id="nameInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={mailForm}
                  onChange={(e) => setmailForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Password
                </label>
                <input
                  id="passInput"
                  type="password"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  name="pass"
                  value={passForm}
                  onChange={(e) => setPassForm(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-dark">
                  Ingresar
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={(e) => activateSingUp(e)}
                >
                  Registrarse
                </button>
              </div>
            </form>
            <div className="col-1"></div>
          </div>
        </section>
      )}
    </>
  );
}

export default UserLogIn;
