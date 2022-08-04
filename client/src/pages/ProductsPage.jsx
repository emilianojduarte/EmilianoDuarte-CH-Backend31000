//Componentes
import React from "react";
import DinamicTable from "../components/DinamicTable/DinamicTable";
import FakerTable from "../components/FakerTable/FakerTable";

function ProductsPage() {
  return (
    <>
      <h1>Productos</h1>
      <h2>Talba dinámica de productos</h2>
      <FakerTable />
      <DinamicTable />
    </>
  );
}

export default ProductsPage;
