//DECLARACIONEs
const { Router } = require('express');
const router = Router();
//listado de productos
const productos = [
    {
        "id": 1,
        "type": "ram",
        "url": "url_del_id_1",
        "enviogratis": false,
        "recomendado": true,
        "price": 3500,
        "description": "1x4GB Kingston ValueRAM DDR3"
    },
    {
        "id": 2,
        "type": "ram",
        "url": "url_del_id_2",
        "enviogratis": true,
        "recomendado": false,
        "price": 5499,
        "description": "1x8GB Kingston Fury DDR4"
    },
    {
        "id": 3,
        "type": "ram",
        "url": "url_del_id_3",
        "enviogratis": true,
        "recomendado": true,
        "price": 16108,
        "description": "2x16GB Kingston Fury Beast DDR4"
    },
    {
        "id": 4,
        "type": "cpuintel",
        "url": "url_del_id_4",
        "enviogratis": true,
        "recomendado": true,
        "price": 26950,
        "description": "10ma Generación Intel i3"
    },
    {
        "id": 5,
        "type": "cpuintel",
        "url": "url_del_id_5",
        "enviogratis": true,
        "recomendado": true,
        "price": 24999,
        "description": "10ma Generación Intel i5"
    },
    {
        "id": 6,
        "type": "cpuintel",
        "url": "url_del_id_6",
        "enviogratis": false,
        "recomendado": true,
        "price": 43399,
        "description": "10ma Generación Intel i7"
    },
    {
        "id": 7,
        "type": "cpuintel",
        "url": "url_del_id_7",
        "enviogratis": true,
        "recomendado": false,
        "price": 55900,
        "description": "10ma Generación Intel i9"
    },
    {
        "id": 8,
        "type": "cpuamd",
        "url": "url_del_id_8",
        "enviogratis": true,
        "recomendado": false,
        "price": 32662,
        "description": "3ra Generación Ryzen 3"
    },
    {
        "id": 9,
        "type": "cpuamd",
        "url": "url_del_id_9",
        "enviogratis": false,
        "recomendado": true,
        "price": 41999,
        "description": "3ra Generación Ryzen 5"
    },
    {
        "id": 10,
        "type": "cpuamd",
        "url": "url_del_id_10",
        "enviogratis": true,
        "recomendado": true,
        "price": 61722,
        "description": "3ra Generación Ryzen 7"
    },
    {
        "id": 11,
        "type": "cpuamd",
        "url": "url_del_id_11",
        "enviogratis": true,
        "recomendado": false,
        "price": 77400,
        "description": "3ra Generación Ryzen 9"
    }
];

//ACCIONES
//get sobre productos, devuelve todo el listado
router.get('/', (req, res) => {
    res.json(productos);
})
//post sobre productos, agrega un producto nuevo y le genera el id.
//al final devuelve el objecto creado con su id.
router.post('/', (req, res) => {
    const { type, url, enviogratis, recomendado, price, description } = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({ id, type, url, enviogratis, recomendado, price, description});
    res.send(productos[ultimo+1]);
})
//get sobre un producto específico
router.get('/:id', (req, res) => {
    let encontrado = productos.find(producto => producto.id == req.params.id);
    let resultado;
    if(encontrado){
        resultado = encontrado;
    } else {
        resultado = {error: 'El producto no existe'};
    }
    res.json(resultado);
})
//put sobre un producto específico
router.put('/:id', (req, res) => {
    let resultado
    const indiceEncontrado = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (indiceEncontrado === -1) {
        resultado = {error: 'El producto no existe'}
    } else {
        productos[indiceEncontrado] = req.body;
        resultado = "Producto actualizado con exito"
    }
    res.json(resultado)
})
//delete sobre un producto específico
router.delete('/:id', (req, res) =>{
    const indiceEncontrado = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    let resultado = "";
    if (indiceEncontrado === -1) {
        resultado = {error: 'El producto no existe'}
    } else {
        productos.splice(indiceEncontrado, 1);
        resultado = "Producto eliminado con éxito"
    }
    res.json(resultado);
})
//export
module.exports = router; 