//CLASE 2 - ENTREGA

//Creo la clase
class Usuario{
    //constructor
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    //metodos
    getFullName(){
        let fullname = `Nombre completo: ${this.nombre} ${this.apellido}`
        return fullname
    }
    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota);
    }
    countMascotas(){
        let petnames = `Cantidad de mascotas: ${this.mascotas.length}`
        return petnames
    }
    addBook(nuevoNombre, nuevoAutor){
        this.libros.push({nombre: nuevoNombre, autor: nuevoAutor})
    }
    getBookNames(){
        let titles = [];
        for (let i=0; i< this.libros.length ;i++){
            titles.push(this.libros[i].nombre)
        }
        return titles
    }
}

//Instacio la clase
const user0001 = new Usuario ("Emiliano",
    "Duarte",
    [
        {nombre: "El señor de los anillos", autor: "J.R.R. Tolkien"},
        {nombre: "Sombra y hueso", autor: "Leigh Bardugo"},
        {nombre: "En las montañas de la locura", autor: "H.P. Lovecraft"}
    ],
    ["Ulises", "Draco"]
);

//Utilizo los métodos de la clase
console.log(user0001.getFullName());
user0001.addMascota("Ruleman");
console.log(user0001.countMascotas());
user0001.addBook("La materia oscura", "Philip Pullman");
console.log("Titulos de los libros: ", user0001.getBookNames());

