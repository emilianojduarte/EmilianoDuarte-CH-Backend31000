//Componentes
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { denormalize, schema } from "normalizr";
//Esilos
import "./Chat.css";

const socket = io.connect("http://localhost:3001");

function Chat() {
  //declaraciones
  const divRef = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [nick, setNick] = useState("");
  const [arrayMensajes, setArrayMensajes] = useState([]);
  const [porcentaje, setPorcentaje] = useState();
  //funciones
  useEffect(() => {
    socket.on("server:msgs", (mensajes) => {
      const { arrayMensajesDesnormalizados, optimizacion } =
        denormalizeMsgs(mensajes);
      setPorcentaje(optimizacion);
      setArrayMensajes(arrayMensajesDesnormalizados);
    });
    return () => {
      socket.off();
    };
  }, [arrayMensajes]);
  function sendMsg(msgInfo) {
    socket.emit("client:msg", msgInfo);
    setMensaje("");
  }
  const handleSubmitMsg = (e) => {
    e.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleString("fr-FR");
    const msgInfo = {
      author: {
        id: correo,
        nombre: nombre,
        apellido: surname,
        edad: age,
        alias: nick,
        avatar: "url_hacia_el_avatar",
      },
      text: mensaje,
      time: fechayhora,
    };
    sendMsg(msgInfo);
  };
  const denormalizeMsgs = (arrayMensajes) => {
    const author = new schema.Entity("author");
    const mensaje = new schema.Entity(
      "mensaje",
      { author: author },
      { idAttribute: "_id" }
    );
    const schemaMensajes = new schema.Entity("mensajes", {
      mensajes: [mensaje],
    });
    const resultadoDesnormalizado = denormalize(
      arrayMensajes.result,
      schemaMensajes,
      arrayMensajes.entities
    );

    const largoNormalizado = JSON.stringify(arrayMensajes).length;
    const largoDesnormalizado = JSON.stringify(resultadoDesnormalizado).length;
    const optimizacion = (
      100 -
      (largoNormalizado * 100) / largoDesnormalizado
    ).toFixed(2);
    const arrayMensajesDesnormalizados = resultadoDesnormalizado.mensajes.map(
      (mensaje) => mensaje._doc
    );

    return { arrayMensajesDesnormalizados, optimizacion };
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ bloc: "end", behavior: "smooth" });
  }, [arrayMensajes]);
  //return
  return (
    <section className="sect">
      <h2>Chat</h2>
      <h3>Compresion mensajes con normalizr: {porcentaje}%</h3>
      <h3>
        Si da negativo es porque la normalizacion incrementó el tamaño total,
        pero es porque hay pocos mensajes
      </h3>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div id="msgsPool">
            {arrayMensajes ? (
              arrayMensajes.map((msgInfo, i) => (
                <div key={i}>
                  <span className="msgsPool-user">{msgInfo.author.id}</span>[
                  <span className="msgsPool-date">{msgInfo.time}</span>]:
                  <span className="msgsPool-msg">{msgInfo.text}</span>
                </div>
              ))
            ) : (
              <div>No hay mensajes en el chat. Se el primero! :D</div>
            )}
            <div ref={divRef}></div>
          </div>
          <form
            id="msgForm"
            autoComplete="off"
            className="col-12"
            onSubmit={handleSubmitMsg}
          >
            <div className="mb-3 row">
              <div className="col-6">
                <label htmlFor="correo" className="form-label">
                  Correo
                </label>
                <input
                  id="usernameInput"
                  type="email"
                  className="form-control"
                  placeholder="Ingrese una dirección de correo electrónico"
                  name="correo"
                  required
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="msg" className="form-label">
                  Mensaje
                </label>
                <input
                  id="msgInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el mensaje a enviar"
                  name="msg"
                  maxLength={200}
                  required
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="nombreInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  maxLength={50}
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="surname" className="form-label">
                  Apellido
                </label>
                <input
                  id="surnameInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su apellido"
                  name="surname"
                  maxLength={50}
                  required
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-6">
                <label htmlFor="age" className="form-label">
                  Edad
                </label>
                <input
                  id="ageInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su edad"
                  name="age"
                  maxLength={2}
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="nick" className="form-label">
                  Alias
                </label>
                <input
                  id="nickInput"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su alias"
                  name="nick"
                  maxLength={50}
                  required
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark">
              Enviar
            </button>
          </form>
        </div>
        <div className="col-1"></div>
      </div>
    </section>
  );
}

export default Chat;
