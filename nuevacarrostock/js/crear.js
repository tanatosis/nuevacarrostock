
//botonCrearProducto.addEventListener("click", function() {

async function cargarprod(){

    const formCrearProducto = document.querySelector("#form-crear-producto");
    const inputNombre = document.querySelector("#input-nombre");
    const inputPrecio = document.querySelector("#input-precio");
    const inputLink = document.querySelector("#input-link");
    const inputDescripcion = document.querySelector("#input-descripcion");
    const inputEtiqueta = document.querySelector("#input-etiqueta");
    const inputStock = document.querySelector("#input-stock");
    const inputIdCategoria = document.querySelector("#input-id-categoria");
    const botonCrearProducto = document.querySelector("#crear-producto");

    let producto = {
        id: 0,
        nombre: inputNombre.value,
        precio: inputPrecio.value,
        link: inputLink.value,
        stock: inputStock.value,
        etiqueta: inputEtiqueta.value,
        descripcion: inputDescripcion.value,
        idCategoria: inputIdCategoria.value,
        idSucursal: 9,
    };

    await fetch('https://bsite.net/metalflap/td-producto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(producto)

    })
    
    console.log("hola")

    window.location.href = '../administrador.html'
};