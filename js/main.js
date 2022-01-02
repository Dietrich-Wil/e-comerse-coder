/**
 * @challenge: interaccuando con html
 *
 * @version: 1.7.0
 * @author: dietich william.
 * @fecha: 27/12/2021
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
 */
//

// funcion para saludar usuario

function agregartxt1() {
  let usuario = prompt("ingrese su nombre");
  usuario = usuario.toUpperCase();
  var text = document.createTextNode(usuario);
  document.getElementById("saludar").appendChild(text);
}

// entradas
agregartxt1();
class Entradas {
  constructor(sector, precio) {
    this.sector = sector;
    this.precio = precio;
  }

  getEntradasInfo() {
    return "el sector " + this.sector + " tiene un precio de $" + this.precio;
  }
}

let palco = new Entradas("palco", 7000);
let general = new Entradas("general", 2000);
let platea = new Entradas("platea", 3000);

let total = 0;
let tipoEntrada = "";
respuesta = prompt(
  "si desea infomacion antes de comprar inserte 'si' si desea ir a la compra inserte 'comprar' "
);
let printEntrada = [];
function agregarAlCarrito() {
  do {
    let entrada = prompt(
      "¿Que tipo de entrada queres, general, platea, palco",
      "Ej: Platea"
    );
    let cantidad = parseInt(prompt("¿Cuantas queres comprar?", 0));

    let precio = 0;

    switch (entrada) {
      case "general":
        precio = 3000;
        break;
      case "platea":
        precio = 6000;
        break;
      case "palco":
        precio = 12000;
        break;
      default:
        alert("Alguno de los datos ingresados es incorrecto");
        precio = 0;
        cantidad = 0;
    }

    total = parseInt(total + precio * cantidad);
    otroProducto = confirm("¿Querés agregar otro producto?");
    printEntrada.push({ sector: entrada, cantidad: cantidad });
  } while (otroProducto);
}

function aplicarDescuento(total) {
  if (total >= 10000) {
    total = total * 0.8;
  }
  return total;
}

function calcularEnvio(total) {
  let confirmacion = confirm("¿Querés envío a domicilio?");

  if (confirmacion && total >= 6000) {
    alert("Tenés envio gratis. El total de tu compra es $" + total);
  } else if (confirmacion && total < 6000 && total != 0) {
    alert("El envío cuesta $700. El total de tu compra es $" + total);
    total = total + 700;
  } else {
    alert("El total de tu compra es $" + total);
  }

  return total;
}

function masInfo() {
  do {
    tipoEntrada = prompt(
      "¿Que tipo de entrada queres, general, platea, palco",
      "Ej: Platea"
    );

    switch (tipoEntrada) {
      case "general":
        alert(general.getEntradasInfo());
        break;
      case "platea":
        alert(platea.getEntradasInfo());

        break;
      case "palco":
        alert(palco.getEntradasInfo());
        break;
      default:
        alert("Alguno de los datos ingresados es incorrecto");
    }
    moreInfo = confirm("quieres mas informacion?");
  } while (moreInfo);
}

// imprimir lista en dom

function agregarElementos() {
  var lista = document.getElementById("ulListado");
  printEntrada.forEach(function (data, index) {
    var linew = document.createElement("li");
    var contenido = document.createTextNode(
      
      "entradas para el sector " +
      data.sector +
        " x " +
        data.cantidad +
        " UN  " 
    );
    lista.appendChild(linew);
    linew.appendChild(contenido);
  });
}

if (respuesta == "si") {
  masInfo();
} else {
  agregarAlCarrito();
  aplicarDescuento(calcularEnvio(total))
  agregarElementos();
}
