//Componentes
import React, { useState } from "react";
import Chat from "../components/Chat/Chat";
//Estilos
import "./HomePage.css";

function HomePage() {
  const isLogged = false;
  const [name, setName] = useState("");

  return (
    <>
      <h1>Home</h1>
      {isLogged ? (
        <Chat />
      ) : (
        <section className="sect">
          <h2>Login de usuario</h2>
          <div className="row">
            <div className="col-1"></div>
            <form
              id="loginForm"
              autoComplete="off"
              className="col-10"
              onSubmit=""
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
