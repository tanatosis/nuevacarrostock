let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");






function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {




        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                
                    <small>Cantidad</small>
                   
                    <p><span class="restar">-</span>${producto.cantidad} <span class="sumar">+</span></p>
                   
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small id="stock">Stock</small>
                    <p>${producto.stock}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${formatPrecio(producto.precio * producto.cantidad)}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);

            if (producto.stock <= 4) {
                let mensajeStock = document.createElement("div");
                mensajeStock.innerHTML = `<small style="color: red;">Quedan solo ${producto.stock} en stock</small>`;
                div.appendChild(mensajeStock);
            }




            let restar = div.querySelector(".restar"); // resta del producto

            restar.addEventListener("click", () => {
                if (producto.cantidad === 1) // no restar la cantidad si es distinto de 1
                    return;
                producto.cantidad--;
                producto.stock++;

                cargarProductosCarrito(); // vuelve a cargar los pruductos restado






            });
            let sumar = div.querySelector(".sumar"); // sumar del producto
            sumar.addEventListener("click", () => {
                if (producto.stock === 1) {
                    alert("No hay stock disponible");
                    return;

                }

                producto.cantidad++;

                producto.stock--;

                cargarProductosCarrito(); // vuelve a cargar los pruductos restado
            })


        })






        actualizarBotonesEliminar();
        actualizarTotal();
        actualizarIva();
        actualizarDespacho();
        totalProducto();

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });



}





function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #102361, #4f72f2)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function() {} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    neto.innerText = `${formatPrecio(totalCalculado)}`;

    return totalCalculado
}


function actualizarIva() {
    let ivaCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad) * 0.19, 0);
    iva.innerText = `${formatPrecio(Math.round(ivaCalculado))}`;

    return Math.round(ivaCalculado)
}

function actualizarDespacho() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    if (totalCalculado < 100000) {
        despacho.innerText = `${formatPrecio(totalCalculado*0.05)}`

    } else if (totalCalculado >= 100000)
        despacho.innerText = `$0`;
    return Math.round(totalCalculado)

}

const precioProducto = actualizarTotal()
const precioIva = actualizarIva()
const precioDespacho = actualizarDespacho()

function formatPrecio(valor) {
    nuevoValor = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
    return nuevoValor;
}

function totalProducto() {

    var precioProducto = actualizarTotal()
    var precioIva = actualizarIva()
    var precioDespacho = actualizarDespacho()

    if (precioProducto + precioIva < 100000) {
        total.innerText = `${formatPrecio(precioProducto + precioIva + Math.round(precioDespacho*0.05))}`
    } else {
        total.innerText = `${formatPrecio(precioProducto + precioIva)}`
    }
}


const nombreInput = document.querySelector('#name');
const dirInput = document.querySelector('#direccion');
const comunaInput = document.querySelector('#comuna');
const regionInput = document.querySelector('#region');
const emailInput = document.querySelector('#email');
const destinatarioInput = document.querySelector('#destinatario');

function verificarForm() {
    if (productosEnCarrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito esta vacio.',
            timer: 1500,
        })
    } else {
        if (nombreInput.value === '' || dirInput.value === '' || dirInput.value === '' || comunaInput.value === '' || regionInput.value === '' || emailInput.value === '' || destinatarioInput.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Faltan datos por completar.',
                timer: 1500,
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Tu compra ha sido confirmada.',
                showConfirmButton: false,
                timer: 1500
            })
            comprarCarrito();
            sendMail();
        }
    };
}

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}
//-----DATOS ENVIO MAIL CON DATOS DE DESPACHO -------------------
function sendMail() {
    var params = {
        titulo: document.getElementById("tituloDespacho"),
        name: document.getElementById("name").value,
        direccion: document.getElementById("direccion").value,
        comuna: document.getElementById("comuna").value,
        region: document.getElementById("region").value,
        email: document.getElementById("email").value,
        destinatario: document.getElementById("destinatario").value,
        resumen: document.querySelector("#carrito-productos").innerHTML,
        Total: document.querySelector("#total").innerHTML,

    };



    const serviceID = "service_o5rfg0e";
    const templateID = "template_uzyk57g";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("name").value = "",
                document.getElementById("direccion").value = "",
                document.getElementById("comuna").value = "",
                document.getElementById("region").value = "",
                document.getElementById("destinatario").value = "",
                document.querySelector("#carrito-productos").innerHTML = "";
            document.querySelector("#total").innerHTML = "";
            console.log(res);

        })
        .catch(err => console.log(err));
}

;