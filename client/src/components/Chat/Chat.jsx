//Componentes
import React from "react";
import io from 'socket.io-client';
//Esilos
import './Chat.css';

const socket = io.connect("http://localhost:3001");

function Chat ()  {
    return(
        <section className="sect">
                <h2>Chat</h2>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div id="msgsPool"></div>
                        <form id="msgForm" autoComplete="off" className="col-12">
                            <div className="mb-3 row">
                                <div className="col-6">
                                    <label htmlFor="username" className="form-label">Usuario</label>
                                    <input id="usernameInput" type="email" className="form-control" placeholder="Ingrese una dirección de correo electrónico" name="username" required/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="msg" className="form-label">Mensaje</label>
                                    <input id="msgInput" type="text" className="form-control" placeholder="Ingrese el mensaje a enviar" name="msg" required/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-dark">Enviar</button>
                        </form>
                    </div>
                    <div className="col-1"></div>
                </div>
        </section>
    )
}

export default Chat;