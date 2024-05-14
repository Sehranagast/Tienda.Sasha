const tbody = document.querySelector(".tbody");
let carrito = []; //en esta variable guardamos lo que se va a imprimir y renderizar

//establecer la funcion addToCarritoItem es para agregar nuestro item al carrito, pero esto hay que establecerlo, no funciona porque si
function addToCarritoItem(e) {
  //con la e establecemos que viene con un evento por defecto, el del click
  const button = e.target; //selecciona el boton al que se le hace click
  const item = button.closest(".card"); // la funcion closest es para que tome la 'card' mas cercana
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src; //src porque necesitamos que busque la imagen

  const newItem = {
    //con esta constante estamos creando un objeto, tiene sus respectivas caracteristicas
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  addItemCarrito(newItem); //usamos la funcion de addItemCarrito que envuelve nuestra nueva constante de newItem
}

function addItemCarrito(newItem) {
  const alert = document.querySelector(".alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  const InputElemnto = tbody.getElementsByClassName("input__elemento"); //obtiene el elemento que esta en tbody, de la clase i_e
  //esta funcion es para que se pueda agregar de uno en la cantidad del carrito y no sume de a muchos
  for (let i = 0; i < carrito.length; i++) {
    //recorre primero el carrito - dato principal
    if (carrito[i].title.trim() === newItem.title.trim()) {
      //para verificarlo     - trim 'atribujo de js para los espacios de los lados' si se cumple agrega el producto
      carrito[i].cantidad++; //carrito en posicion i, cuando se cumpla la condicion nos suma 1
      const inputValue = InputElemnto[i]; //el inputelemento esta en la matriz
      inputValue.value++;
      CarritoTotal();
      return null; //para que salga de la funcion principal unicamente
    }
  }

  carrito.push(newItem);

  renderCarrito();
}

function renderCarrito() {
  tbody.innerHTML = ""; //cada vez que se ejecute el tbody
  carrito.map((item) => {
    const tr = document.createElement("tr"); //crearemos un elemento en el tr
    tr.classList.add("ItemCarrito"); // los item.img .tittle .precio de abajo so las variables que se encuentran en 'newItem'
    const Content = ` 
          <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt=""> 
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
          </td>
    
    `;
    //eltbody del index lo copio dentro de la variable content, porque es la que usaremos para agregar los items al carrito a medida que vayamos usando la opcion
    //va a ser renderizado cada vez que se ejecuta la funcion
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
    tr.querySelector(".input__elemento").addEventListener(
      "change",
      sumaCantidad
    );
  });
  //tr.innerHTML = Content; dentro de la const tr que cree arriba, le agrego el 'content' al append le agrego el tr - para ir añadiendo los productos
  CarritoTotal();
}

function CarritoTotal() {
  //es donde se va a imprimir el total
  let Total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  carrito.forEach((item) => {
    //matriz prinncipal
    const precio = Number(item.precio.replace("$", "")); //valor string pero como pasa por el numero, da numero, se usa el replace para cambiar el irem.precio que ya tenia
    Total = Total + precio * item.cantidad; //guarda el valor que se va a imprimir
  });

  itemCartTotal.innerHTML = `Total $${Total}`;
  addLocalStorage();
}

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  const alert = document.querySelector(".remove");

  setTimeout(function () {
    alert.classList.add("remove");
  }, 2000);
  alert.classList.remove("remove");

  tr.remove();
  CarritoTotal();
}

function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
}

function opcionesPago() {
  const button = e.target;
  const item = button.closest;
}

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const productsContainer = document.getElementById("contenedor-productos");

function addLogicToButtons() {
  const Clickbutton = document.querySelectorAll(".addToCardButton"); //establecemos la constante para el boton, que se corre atraves del documento. El 'querySelector' nos permite elegir un #id, una .clase, el ALL se establece para agarrar todos los elementos con el mismo ID

  Clickbutton.forEach((btn) => {
    console.log(btn);
    //aca ponemos nuestra constante y le damos una funcion, que en este caso seria que a cada clickbutton, le vamos a dar la accion de click
    btn.addEventListener("click", addToCarritoItem);
  }); //addEventListener nos captura el evento en este caso de click - 'The method addEventListener() works by adding a function, or an object that implements EventListener , to the list of event listeners for the specified event type on the EventTarget on which it's called'
}

function createProductElement(producto) {
  const productElement = `
  <div class="col d-flex justify-content-center mb-4">
    <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
      <h5 class="card-title pt-2 text-center text-white">${producto.titulo}</h5>
      <img src="${producto.img}" class="card-img-top" alt="${producto.titulo}">
      <div class="card-body">
        <p class="card-text text-white description"><b>${producto.descripcion}</b></p>
        <h5 class="text-white">Precio: <span class="precio">$${producto.precio}</span></h5>
        <div class="d-grid gap-2">
        <button class="btn btn-success button addToCardButton">Añadir a Carrito</button>
      </div>
      </div>
    </div>
  </div>
`;
  productsContainer.innerHTML += productElement;
}

const searchInputText = document.getElementById("search-input-text");
searchInputText.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  productsContainer.innerHTML = "";
  fetch("./js/data.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredProducts = data.productos.filter((producto) => {
        return producto.descripcion.toLowerCase().includes(inputValue);
      });
      filteredProducts.map((producto) => {
        createProductElement(producto);
        addLogicToButtons();
      });
    });
});

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  fetch("./js/data.json")
    .then((response) => response.json())
    .then((data) =>
      data.productos.map((producto) => {
        createProductElement(producto);
        addLogicToButtons();
      })
    );

  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};

function buyProducts() {
  alert("Felicitaciones, tu pedido llegara en los próximos 3 días!");
  localStorage.clear();
  tbody.innerHTML = "";
  // LIMPIAR PRECIO TOTAL
}
