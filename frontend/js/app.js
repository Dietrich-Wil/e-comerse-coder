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

import HomeScreen from './HomeScreen.js';
import ProductScreen from './ProductScreen.js';
import { parseRequestUrl } from './utils.js';
import Error404Screen from './Error404Screen.js';
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
};
const router = () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById('main-container');
  main.innerHTML = screen.render();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
