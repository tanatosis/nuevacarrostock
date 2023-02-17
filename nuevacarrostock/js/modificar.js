const modificarProducto = async(id) => {

    const formCrearProducto = document.querySelector("#form-crear-producto");
    const inputNombre = document.querySelector("#input-nombre");
    const inputPrecio = document.querySelector("#input-precio");
    const inputLink = document.querySelector("#input-link");
    const inputDescripcion = document.querySelector("#input-descripcion");
    const inputEtiqueta = document.querySelector("#input-etiqueta");
    const inputStock = document.querySelector("#input-stock");
    const inputIdCategoria = document.querySelector("#input-id-categoria");
    const botonCrearProducto = document.querySelector("#modificar-producto")
    
        let producto = {
            id: id,
            nombre: inputNombre.value,
            precio: inputPrecio.value,
            link: inputLink.value,
            stock: inputStock.value,
            etiqueta: inputEtiqueta.value,
            descripcion: inputDescripcion.value,
            idCategoria: inputIdCategoria.value,
            idSucursal: 9,
        }

        console.log(JSON.stringify(producto));

        await fetch('https://bsite.net/metalflap/td-producto',
        {method: 'PUT', 
        body: JSON.stringify(producto),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        })
}

const modificar = async(id) => {
    
        const respuesta = await fetch('https://bsite.net/metalflap/td-producto/idSucursal/9');
        console.log(respuesta);

        const datos = await respuesta.json();

        let producto = '';
        
        producto = datos.find(x => x.id === id);

}