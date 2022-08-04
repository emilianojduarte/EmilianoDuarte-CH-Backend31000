//Componentes
import React, { useEffect, useState } from "react";
//Estilos
import "./FakerTable.css";

function FakerTable() {
  //declaraciones
  const [arrayProductos, setArrayProductos] = useState([]);

  //funciones
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/productos-test", {
        method: "get",
      });
      if (!response.ok) {
        throw new Error(
          `Error en GET: Status ${response.status} - ${response.statusText}`
        );
      }
      let data = await response.json();
      setArrayProductos(data);
    } catch (error) {
      console.log("Error en el fetch: ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //return
  return (
    <section className="sect">
      <h3>
        Tabla de productos que hace un GET a /api/productos-test para traer
        todos los productos que se hayan generado con faker
      </h3>
      <div className="row">
        <div className="col-12">
          <table className="table table-dark">
            <thead>
              <tr className="table-dark">
                <th className="table-dark" scope="col">
                  Nombre
                </th>
                <th className="table-dark" scope="col">
                  Precio
                </th>
                <th className="table-dark" scope="col">
                  Foto
                </th>
              </tr>
            </thead>
            <tbody id="producInTable">
              {arrayProductos.map((productInfo, i) => (
                <tr className="table-dark" key={i}>
                  <td className="table-dark">{productInfo.nombre}</td>
                  <td className="table-dark">${productInfo.precio}</td>
                  <td className="table-dark">
                    <img
                      src={productInfo.foto}
                      className="img-table-products"
                      alt="foto de producto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default FakerTable;
