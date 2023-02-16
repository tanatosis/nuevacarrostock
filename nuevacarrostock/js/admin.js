const cargarProductos = async() => {

    try {

        const respuesta = await fetch('https://bsite.net/metalflap/td-producto/idSucursal/9');
        console.log(respuesta);

        const datos = await respuesta.json();

        let productos = "";

        datos.forEach(producto => {

            productos +=
                `
                     <img class="producto-imagen" src="${producto.link}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.nombre}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <p>Stock: ${producto.stock}</p>
                    </div>

                    <button class="producto-eliminar" ">eliminar</button>
                    <button class="producto-modificar" ">modificar</button>
                `;

        });
        document.getElementById('contenedor-productos').innerHTML = productos;

    } catch (error) {
        console.log(error);
    }


}

cargarProductos();


/*const botonCrearProducto = document.querySelector("#crear-producto");

botonCrearProducto.addEventListener("click", () => {
    const nuevoProducto = {
        id: productos.length + 1,
        categoria: "Consolas",
        imagen: "img/producto4.jpg",
        titulo: "Nuevo producto",
        precio: 100,
        detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    };

    productos.push(nuevoProducto);
    cargarProductos(productos);
}); */