//Componentes
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
//Estilos
import './DinamicTable.css'

const socket = io.connect("http://localhost:3001");

function DinamicTable () {
    //declaraciones
    const [arrayProductos, setArrayProductos] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [direccion, setDireccion] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    //funciones
    useEffect(() => {
        socket.on('server:products', (productos) => {
            setArrayProductos(productos);
        });
        return () => {
            socket.off();
        };
    },[arrayProductos]);
    function sendProduct (productInfo) {
        socket.emit('client:product', productInfo);
        setName("");
        setDescription("");
        setCode("");
        setDireccion("");
        setPrice(0);
        setStock(0);
    }
    const handleSubmitProduct = (e) => {
        e.preventDefault();
        const timeStamp = new Date();
        const fechayhora = timeStamp.toLocaleString("fr-FR");
        const productInfo = { timestamp: fechayhora, nombre: name, description: description, codigo: code, url: direccion, price: price, stock: stock };
        sendProduct(productInfo);
    }
    //return
    return(
        <>
            <section className="sect">
                <h2>Agregar productos</h2>
                <div className="row">
                    <div className="col-1"></div>
                    <form id="productForm" autoComplete="off" className="col-10" onSubmit={handleSubmitProduct}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre/Titulo de Producto</label>
                            <input id="nameInput" type="text" className="form-control" placeholder="Ingrese el titulo"
                                name="name" value={name} onChange={(e)=>setName(e.target.value)} maxLength="30" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripcion</label>
                            <input id="descriptionInput" type="text" className="form-control" placeholder="Ingrese la descripcion"
                                name="description" value={description} onChange={(e)=>setDescription(e.target.value)} maxLength="200" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Codigo</label>
                            <input id="codeInput" type="text" className="form-control" placeholder="Ingrese codigo de producto"
                                name="code" value={code} onChange={(e)=>setCode(e.target.value)} maxLength="6" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">Direccion de imagen / URL</label>
                            <input id="urlInput" type="text" className="form-control" placeholder="Ingrese url de imagen"
                                name="url" value={direccion} onChange={(e)=>setDireccion(e.target.value)} maxLength="300" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio en pesos</label>
                            <input id="priceInput" type="number" className="form-control" placeholder="Ingrese el precio"
                                name="price" value={price} onChange={(e)=>setPrice(e.target.value)} step="0.01" maxLength="20" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">Stock</label>
                            <input id="stockInput" type="number" className="form-control" placeholder="Ingrese el stock"
                                name="price" value={stock} onChange={(e)=>setStock(e.target.value)} max={999999} required />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-dark">Enviar</button>
                            <button type="reset" className="btn btn-dark">Limpiar</button>
                        </div>
                    </form>
                    <div className="col-1"></div>
                </div>
            </section>
            <section className="sect">
                <h2>Tabla de productos</h2>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <table className="table table-dark">
                            <thead>
                                <tr className="table-dark">
                                    <th className="table-dark" scope="col">Producto</th>
                                    <th className="table-dark" scope="col">Precio</th>
                                    <th className="table-dark" scope="col">Codigo</th>
                                    <th className="table-dark" scope="col">Stock</th>
                                    <th className="table-dark" scope="col">Imagen</th>
                                </tr>
                            </thead>
                            <tbody id="producInTable">
                                {arrayProductos.map((productInfo, i) => (
                                    <tr className="table-dark" key={i}>
                                        <td className="table-dark">{productInfo.description}</td>
                                        <td className="table-dark">{productInfo.price}</td>
                                        <td className="table-dark">{productInfo.codigo}</td>
                                        <td className="table-dark">{productInfo.stock}</td>
                                        <td className="table-dark"><img src={productInfo.url} alt="foto de producto"/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1"></div>
                </div>
            </section>
        </>
    )
}

export default DinamicTable;