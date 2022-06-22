//listado de productos
const productos = [
    {
        "id": 1,
        "type": "ram",
        "url": "https://cdn1.iconfinder.com/data/icons/_dock_icons___by_adrenn/128/kingston.png",
        "enviogratis": "0",
        "recomendado": "1",
        "price": 3500,
        "description": "1x4GB Kingston ValueRAM DDR3"
    },
    {
        "id": 2,
        "type": "ram",
        "url": "https://cdn1.iconfinder.com/data/icons/_dock_icons___by_adrenn/128/kingston.png",
        "enviogratis": "1",
        "recomendado": "0",
        "price": 5499,
        "description": "1x8GB Kingston Fury DDR4"
    },
    {
        "id": 3,
        "type": "ram",
        "url": "https://cdn1.iconfinder.com/data/icons/_dock_icons___by_adrenn/128/kingston.png",
        "enviogratis": "1",
        "recomendado": "1",
        "price": 16108,
        "description": "2x16GB Kingston Fury Beast DDR4"
    },
    {
        "id": 4,
        "type": "cpuintel",
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "enviogratis": "1",
        "recomendado": "1",
        "price": 26950,
        "description": "10ma Generación Intel i3"
    },
    {
        "id": 5,
        "type": "cpuintel",
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "enviogratis": "1",
        "recomendado": "1",
        "price": 24999,
        "description": "10ma Generación Intel i5"
    },
    {
        "id": 6,
        "type": "cpuintel",
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "enviogratis": "0",
        "recomendado": "1",
        "price": 43399,
        "description": "10ma Generación Intel i7"
    },
    {
        "id": 7,
        "type": "cpuintel",
        "url": "https://cdn2.iconfinder.com/data/icons/metro-ui-dock/128/Intel.png",
        "enviogratis": "1",
        "recomendado": "0",
        "price": 55900,
        "description": "10ma Generación Intel i9"
    },
    {
        "id": 8,
        "type": "cpuamd",
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "enviogratis": "1",
        "recomendado": "0",
        "price": 32662,
        "description": "3ra Generación Ryzen 3"
    },
    {
        "id": 9,
        "type": "cpuamd",
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "enviogratis": "0",
        "recomendado": "1",
        "price": 41999,
        "description": "3ra Generación Ryzen 5"
    },
    {
        "id": 10,
        "type": "cpuamd",
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "enviogratis": "1",
        "recomendado": "1",
        "price": 61722,
        "description": "3ra Generación Ryzen 7"
    },
    {
        "id": 11,
        "type": "cpuamd",
        "url": "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/15_Amd_logo_logos-128.png",
        "enviogratis": "1",
        "recomendado": "0",
        "price": 77400,
        "description": "3ra Generación Ryzen 9"
    }
];
//funciones
const getProductos = (req, res) => {
    res.render('blockList', {productos});
}
const addProducto = (req, res) => {
    const { type, url, enviogratis, recomendado, price, description } = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({ id, type, url, enviogratis, recomendado, price, description});
    res.redirect('/');
}

//Pendiente de implementar
// const getProducto = (req, res) => {
//     let encontrado = productos.find(producto => producto.id == req.params.id);
//     let resultado;
//     if(encontrado){
//         resultado = encontrado;
//     } else {
//         resultado = {error: 'El producto no existe'};
//     }
//     res.json(resultado);
// }

//export
module.exports = {getProductos, addProducto};