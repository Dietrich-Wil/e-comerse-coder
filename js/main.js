/**
 * @challenge: segunda entrega
 *
 * @version: 1.9.0
 * @author: dietich william.
 * @fecha: 2/01/2022
 *
 * History:
 * 1.0.0 : primera entrega
 * 1.0.1 : se agrega historial
 * 1.1.0 : primera entrega
 * 1.1.1 : se agrega historial
 * 1.2.0 : primera entrega
 * 1.2.1 : se agrega historial y se arregla error de identacion
 * 1.3.0 : primera entrega
 * 1.4.0 : primera entrega
 * 1.5.0 : primera entrega
 * 1.6.0 : primera entrega
 * 1.6.1 : correcion de historial, y correcion de conexion entre js y html, se agrega css y estructura de pag
 * 1.7.0 : primera entrega
 * 1.8.0 : primera entrega del chalenge incorporar eventos
 * 1.9.0 : primera entrega de segunda entrega del proyecto final
 */
//

// funcion para saludar usuario

window.onload = function () {
  // Variables
  const baseDeDatos = [
      {
          id: 1,
          nombre: 'Palco',
          precio: 6000,
          imagen: 'https://bolavip.com/ar/_next/image?url=https%3A%2F%2Fbolavip.com%2F__export%2F1630023015794%2Fsites%2Fbolavip%2Fimg%2F2021%2F08%2F26%2Fbora_1.png_1546398727.png&w=1920&q=75'
      },
      {
          id: 2,
          nombre: 'Platea norte',
          precio: 3000,
          imagen: 'https://bolavip.com/ar/_next/image?url=https%3A%2F%2Fbolavip.com%2F__export%2F1630023015794%2Fsites%2Fbolavip%2Fimg%2F2021%2F08%2F26%2Fbora_1.png_1546398727.png&w=1920&q=75'
      },
      {
          id: 3,
          nombre: 'Platea sur',
          precio: 2000,
          imagen: 'https://bolavip.com/ar/_next/image?url=https%3A%2F%2Fbolavip.com%2F__export%2F1630023015794%2Fsites%2Fbolavip%2Fimg%2F2021%2F08%2F26%2Fbora_1.png_1546398727.png&w=1920&q=75'
      },
      {
          id: 4,
          nombre: 'general',
          precio: 1000,
          imagen: 'https://bolavip.com/ar/_next/image?url=https%3A%2F%2Fbolavip.com%2F__export%2F1630023015794%2Fsites%2Fbolavip%2Fimg%2F2021%2F08%2F26%2Fbora_1.png_1546398727.png&w=1920&q=75'
      }

  ];

  let carrito = [];
  let total = 0;
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  const miLocalStorage = window.localStorage;

  // Funciones

  /**
  * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
  */
  function renderizarProductos() {
      baseDeDatos.forEach((info) => {
          // Estructura
          const miNodo = document.createElement('div');
          miNodo.classList.add('card', 'col-sm-4');
          // Body
          const miNodoCardBody = document.createElement('div');
          miNodoCardBody.classList.add('card-body');
          // Titulo
          const miNodoTitle = document.createElement('h5');
          miNodoTitle.classList.add('card-title');
          miNodoTitle.textContent = info.nombre;
          // Imagen
          const miNodoImagen = document.createElement('img');
          miNodoImagen.classList.add('img-fluid');
          miNodoImagen.setAttribute('src', info.imagen);
          // Precio
          const miNodoPrecio = document.createElement('p');
          miNodoPrecio.classList.add('card-text');
          miNodoPrecio.textContent = info.precio + ' AR$';
          // Boton 
          const miNodoBoton = document.createElement('button');
          miNodoBoton.classList.add('btn');
          miNodoBoton.textContent = 'Agregar al carrito';
          miNodoBoton.setAttribute('marcador', info.id);
          miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
          // Insertamos
          miNodoCardBody.appendChild(miNodoImagen);
          miNodoCardBody.appendChild(miNodoTitle);
          miNodoCardBody.appendChild(miNodoPrecio);
          miNodoCardBody.appendChild(miNodoBoton);
          miNodo.appendChild(miNodoCardBody);
          DOMitems.appendChild(miNodo);
      });
  }

  /**
  * Evento para añadir un producto al carrito de la compra
  */
  function anyadirProductoAlCarrito(evento) {
      // Anyadimos el Nodo a nuestro carrito
      carrito.push(evento.target.getAttribute('marcador'))
      // Calculo el total
      calcularTotal();
      // Actualizamos el carrito 
      renderizarCarrito();
      // Actualizamos el LocalStorage
      guardarCarritoEnLocalStorage();
  }

  /**
  * Dibuja todos los productos guardados en el carrito
  */
  function renderizarCarrito() {
      // Vaciamos todo el html
      DOMcarrito.textContent = '';
      // Quitamos los duplicados
      const carritoSinDuplicados = [...new Set(carrito)];
      // Generamos los Nodos a partir de carrito
      carritoSinDuplicados.forEach((item) => {
          // Obtenemos el item que necesitamos de la variable base de datos
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              // ¿Coincide las id? Solo puede existir un caso
              return itemBaseDatos.id === parseInt(item);
          });
          // Cuenta el número de veces que se repite el producto
          const numeroUnidadesItem = carrito.reduce((total, itemId) => {
              // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
              return itemId === item ? total += 1 : total;
          }, 0);
          // Creamos el nodo del item del carrito
          const miNodo = document.createElement('li');
          miNodo.classList.add('list-group-item');
          miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio} AR$`;
          // Boton de borrar
          const miBoton = document.createElement('button');
          miBoton.classList.add('btn');
          miBoton.textContent = 'X';
          miBoton.style.marginLeft = '1rem';
          miBoton.dataset.item = item;
          miBoton.addEventListener('click', borrarItemCarrito);
          // Mezclamos nodos
          miNodo.appendChild(miBoton);
          DOMcarrito.appendChild(miNodo);
      });
  }

  /**
  * Evento para borrar un elemento del carrito
  */
  function borrarItemCarrito(evento) {
      // Obtenemos el producto ID que hay en el boton pulsado
      const id = evento.target.dataset.item;
      // Borramos todos los productos
      carrito = carrito.filter((carritoId) => {
          return carritoId !== id;
      });
      // volvemos a renderizar
      renderizarCarrito();
      // Calculamos de nuevo el precio
      calcularTotal();
      // Actualizamos el LocalStorage
      guardarCarritoEnLocalStorage();

  }

  /**
  * Calcula el precio total teniendo en cuenta los productos repetidos
  */
  function calcularTotal() {
      // Limpiamos precio anterior
      total = 0;
      // Recorremos el array del carrito
      carrito.forEach((item) => {
          // De cada elemento obtenemos su precio
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
              return itemBaseDatos.id === parseInt(item);
          });
          total = total + miItem[0].precio;
      });
      // Renderizamos el precio en el HTML
      DOMtotal.textContent = total.toFixed(2);
  }

  /**
  * Varia el carrito y vuelve a dibujarlo
  */
  function vaciarCarrito() {
      // Limpiamos los productos guardados
      carrito = [];
      // Renderizamos los cambios
      renderizarCarrito();
      calcularTotal();
      // Borra LocalStorage
      localStorage.clear();

  }

  function guardarCarritoEnLocalStorage () {
      miLocalStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function cargarCarritoDeLocalStorage () {
      // ¿Existe un carrito previo guardado en LocalStorage?
      if (miLocalStorage.getItem('carrito') !== null) {
          // Carga la información
          carrito = JSON.parse(miLocalStorage.getItem('carrito'));
      }
  }

  // Eventos
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);

  // Inicio
  cargarCarritoDeLocalStorage();
  renderizarProductos();
  calcularTotal();
  renderizarCarrito();
}