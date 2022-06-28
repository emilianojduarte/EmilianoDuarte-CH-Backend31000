//DECLARIACIONES

//socket
const socket = io();
//formulario de producto
const productForm = document.querySelector('#productForm');
const urlInput = document.querySelector('#urlInput');
const priceInput = document.querySelector('#priceInput');
const descriptionInput = document.querySelector('#descriptionInput');
//formulario de mensajes
const msgForm = document.querySelector('#msgForm');
const usernameInput = document.querySelector('#usernameInput');
const msgInput = document.querySelector('#msgInput');
const msgsPool = document.querySelector('#msgsPool');

//FUNCIONES
//Productos
function sendProduct (productInfo) {
    socket.emit('client:product', productInfo)
};
async function renderProducts (productos) {
    const response = await fetch('/partials/listProducts.ejs');
    const pagina = await response.text();
    document.querySelector('#producInTable').innerHTML = "";
    productos.forEach(product => {
        const html = ejs.render(pagina, product);
        document.querySelector('#producInTable').innerHTML += html;
    });
}
function submitHandlerProduct (event) {
    event.preventDefault();
    const productoInfo = { url: urlInput.value, price: priceInput.value, description: descriptionInput.value };
    sendProduct(productoInfo);
};
// Mensajes
function sendMsg (msgInfo) {
    socket.emit('client:msg', msgInfo);
}
function renderMsgs (msgsInfo) {
    const html = msgsInfo.map(msgInfo => {
        return(`<div>
        <span class="msgsPool-user">${msgInfo.username}</span>
        [<span class="msgsPool-date">${msgInfo.time}<span>]: 
        <span class="msgsPool-msg">${msgInfo.message}</span>
        </div>`)
    }).join(" ");
    msgsPool.innerHTML = html;
}
function submitHandlerMsg (event) {
    event.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleString("fr-FR");
    const msgInfo = { username: usernameInput.value, time: fechayhora, message: msgInput.value };
    sendMsg(msgInfo);
}
//EVENTOS
//mensajes
msgForm.addEventListener('submit', submitHandlerMsg);
socket.on('server:msgs', renderMsgs);
//productos
productForm.addEventListener('submit', submitHandlerProduct)
socket.on('server:products', renderProducts);