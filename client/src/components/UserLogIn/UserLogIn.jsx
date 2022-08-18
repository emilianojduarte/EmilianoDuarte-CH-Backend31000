//Componentes
import React, { useState, useEffect } from "react";
//Estilos
import "./UserLogIn.css";

function UserLogIn() {
  //variables
  const [name, setName] = useState("");
  const [mailForm, setmailForm] = useState("");
  const [passForm, setPassForm] = useState("");
  const [bye, setBye] = useState(false);
  const [isLogged, setIsLogued] = useState(false);
  //funciones
  const checkLogged = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "get",
        keepalive: true,
        credentials: "include",
      });
      let data = await response.json();
      if (data === undefined) {
        return "Indefinido";
      } else {
        setName(data);
        setIsLogued(true);
        return;
      }
    } catch (error) {
      console.log("Error en el fecth: ", error);
    }
  };
  const postLogIn = async (credentials) => {
    const response = await fetch(`http://localhost:3001/login`, {
      method: "post",
      keepalive: true,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let credentials = { username: mailForm, password: passForm };
    //const data = await postLogIn(credentials);
    postLogIn(credentials)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setName(res);
        setIsLogued(true);
        setmailForm("");
        setPassForm("");
      })
      .catch((error) => {
        console.log("Error en el fecth post loging: ", error);
      });
  };
  const handleLogOff = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/login`, {
        method: "delete",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `Error en GET: Status ${response.status} - ${response.statusText}`
        );
      }
      setIsLogued(false);
      setBye(true);
    } catch (error) {
      console.log("Ocurrio el siguente error en el handleLogOff", error);
    }
  };
  useEffect(() => {
    //checkLogged();
  }, [isLogged]);
  return (
    <>
      {isLogged ? (
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
      ) : bye ? (
        <section className="sect">
          <div>
            <p>Adios {name}!</p>
            {setTimeout(() => {
              setBye(false);
            }, 2000)}
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
                <button type="reset" className="btn btn-dark">
                  Limpiar
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
