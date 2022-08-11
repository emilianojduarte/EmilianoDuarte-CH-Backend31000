//Componentes
import React, { useState, useEffect } from "react";
import Chat from "../components/Chat/Chat";
//Estilos
import "./HomePage.css";

function HomePage() {
  const [isLogged, setIsLogued] = useState(false);
  const [name, setName] = useState("");
  const [bye, setBye] = useState(false);
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
  const getName = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/login?name=${name}`,
        {
          method: "post",
          keepalive: true,
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en el fecth: ", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getName();
    setName(data);
    setIsLogued(true);
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
    checkLogged();
  }, [isLogged, bye]);
  return (
    <>
      <h1>Home</h1>
      {isLogged ? (
        <>
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
          <Chat />
        </>
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
                  Nombre
                </label>
                <input
                  id="nameInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength="30"
                  required
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-dark">
                  Enviar
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

export default HomePage;
