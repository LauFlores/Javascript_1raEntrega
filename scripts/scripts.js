// Productos 

class Producto {
    constructor(nombre, sigla) {
        this.nombre = nombre;
        this.sigla = sigla;
    }
    
    mostrarInfo() {
        return `${this.nombre} (${this.sigla})`;
    }
}

const listaProductos = [
    new Producto('Esmalte semipermanente rojo', 'ER'),
    new Producto('Esmalte semipermanente negro', 'EN'),
    new Producto('Esmalte semipermanente blanco', 'EB'),
    new Producto('Esmalte semipermanente rosa', 'ER'),
    new Producto('Esmalte semipermanente azul', 'EA'),    
    new Producto('Esmalte semipermanente gris', 'EG'),
];

const generarListaDeProductos = (listaDeProductos) => {
    let mensajeDeProductos = 'Productos:';
    let opcion = 0;
    const copiaDeLista = listaDeProductos;
    copiaDeLista.forEach(_producto => {
        opcion++;
        mensajeDeProductos += '\nOpcion ' + opcion + ': '+ _producto.mostrarInfo();
    })
    return mensajeDeProductos;
};

// Iniciar pedido - Saludo al usuario

const precioUnidad = 2500;
const descuentoCombo = 0.10;
const cantidadDeOpciones = 6;

const mensajeBienvenida = `¡Bienvenido a Somos Esmaltes!

Precios:
- Por unidad $${precioUnidad}.
- Llevando un minimo de 6 unidades ${descuentoCombo * 100}% off.

Elegí a continuación la cantidad y color.`;

const saludarUsuario = () => {
    alert (mensajeBienvenida) 
};

// Iniciar Pedido - Proceso de compra

const mensajeProductos = generarListaDeProductos(listaProductos);

const mostrarProducto = () => {
    alert (mensajeProductos);
};

const mensajeSolicitarProducto = `${mensajeProductos}

Ingresa el número de opción elegida:`;

let pedidoUsuario = [];

const agregarOpcionAlPedido = (opcion) => {
    // necesita restar 1 porque los indices del array empiezan en 0
    // y las cantidades fisicas las contamos desde 1 unidad en adelante
    const indice = opcion - 1;
    pedidoUsuario.push(listaProductos[indice].nombre);
};

const solicitarProducto = (numero) => {
    for (let i = 0; i < numero; i++) {
        let opcion = solicitarOpcion(mensajeSolicitarProducto, cantidadDeOpciones);
        agregarOpcionAlPedido(opcion);
    }
};

const ingresarCantidad = () => {
    const cantidad = Number(parseInt(prompt('Ingrese la cantidad que va a llevar:')));
    return cantidad;
};

const verificarCantidadIngresada = (cantidad) => {
    return (cantidad <= 0 || cantidad === null || isNaN(cantidad)) ? 
        false : 
        true;
};

const solicitarCantidad = () => {
    let cantidad = ingresarCantidad();
    while (!verificarCantidadIngresada(cantidad)) {
        cantidad = ingresarCantidad();
    }
    return cantidad;
};

const verificarOpcion = (opcion, cantidadDeOpciones) => {
    return (opcion > 0 && opcion <= cantidadDeOpciones && opcion !== null && !isNaN(opcion)) ?
        true :
        false;
};

const solicitarOpcion = (mensaje, cantidad) => {
    let opcion = Number(parseInt(prompt(`${mensaje}`)));
    while (!verificarOpcion(opcion, cantidad)) {
        opcion = Number(parseInt(prompt(`${mensaje}`)));
    }
    return opcion;
};

const mostrarPedidoEnConsola = (pedido) => {
    let mensaje = 'Los sabores elegidos son:';
    pedido.forEach(item => {
        mensaje += '\n- ' + item;
    })
    console.log(mensaje);
};


// Promociones segun forma de pago

class PromoBancaria {
    constructor(banco, descuento) {
        this.banco = banco;
        this.promocion = descuento;
    }

    mostrarInfo() {
        return `${this.banco} ${(this.promocion * 100)}%`;
    }
}

const generarListaPromociones = (listaDePromociones) => {
    let mensajeDeProductos = 'Tenemos las siguientes promociones bancarias:';
    let opcion = 0;
    const copiaDeLista = listaDePromociones;
    copiaDeLista.forEach(promo => {
        opcion++;
        mensajeDeProductos += '\nOpcion ' + opcion + ': '+ promo.mostrarInfo();
    })
    return mensajeDeProductos;
};

const promocionesBancarias = [
    new PromoBancaria('Banco Nación', 0.15),
    new PromoBancaria('Banco Francés', 0.05),
    new PromoBancaria('Banco HSBC', 0.05),
    new PromoBancaria('Mercado Pago', 0.10),
];


// Modalidades de pago 

const mensajePago = `Modalidad de pago:
- Opción 1: Efectivo
- Opción 2: Crédito`;

const mensajePromos = generarListaPromociones(promocionesBancarias);


// Calculo del total a pagar

const calcularTotal = (cantidad) => {
    return cantidad * precioUnidad;
};

const aplicarDescuento = (total, promocion) => {
    const descuento = total * promocion;
    return total - descuento;
};

const calcularDescuentoCantidad = (cantidad, total) => {
    let totalAPagar = total;
    if (cantidad >= 6 ) {
        totalAPagar = aplicarDescuento(total, descuentoCombo);
    }
    return totalAPagar;
};

const mostrarTotal = (cantidad) => {
    const total = calcularTotal(cantidad);
    alert(`Tu total es: $${total}. A continuación elegí tu opción de pago.`);
};

const procesarPagoEfectivo = (total) => {
    alert(`Pago completo, tu total fue de $${total}`);
    console.log(`El pago final fue de: ${total}`);
};

const calcularDescuentoBancario = (opcion, total) => {
    let resultado;
    if (opcion === 1) {
        resultado = aplicarDescuento(total, promocionesBancarias[0].promocion);
    } else if (opcion === 2) {
        resultado = aplicarDescuento(total, promocionesBancarias[1].promocion);
    } else if (opcion === 3) {
        resultado = aplicarDescuento(total, promocionesBancarias[2].promocion);
    } else if (opcion === 4) {
        resultado = aplicarDescuento(total, promocionesBancarias[3].promocion);
    }
    return resultado;
};

const procesarPagoTarjeta = (opcion, total) => {
    const pago = calcularDescuentoBancario(opcion, total);
    alert(`Pago completo, tu total fue de $${pago}`);
    console.log(`El pago final fue de: ${pago}`);
};

const procesarPago = (total) => {
    const pagoElegido = solicitarOpcion(mensajePago, 2);
    if (pagoElegido === 1) {
        procesarPagoEfectivo(total);
    } else {
        const promoElegida = solicitarOpcion(mensajePromos, 4);
        procesarPagoTarjeta(promoElegida, total);
    }    
};

// Mensaje final

const finalizarPedido = () => {
    alert('¡Gracias por tu compra!')
};

const resetearPedido = () => {
    pedidoUsuario = [];
};

