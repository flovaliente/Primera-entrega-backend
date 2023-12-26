(function () {
    const socket = io();
    let products = [];
    const form = document.getElementById("form");
    const deleteForm = document.getElementById("deleteForm");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const code = document.getElementById("code");
    const price = document.getElementById("price");
    const stock = document.getElementById("stock");
    const category = document.getElementById("category");
    const thumbnails = document.getElementById("thumbnails");
    const idInputDelete = document.getElementById("idDelete");
    const productsListSocket = document.getElementById("productsSocket");
    const URL_BASE = `http://localhost:8080/img/`;
  
    deleteForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      Swal.fire({ //Mostrar alerta antes de borrar
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) { //Si se confirma borro, sino muestro en consola que fue cancelado
          Swal.fire(
            "Deleted!",
            `Your file ${idInputDelete.value} has been deleted.`,
            "success"
          );
          let idToDelete;
          ev.preventDefault();
          idToDelete = parseInt(idInputDelete.value);
          socket.emit("idToDelete", idToDelete);
        } else {
          console.log(`The action was cancelled`);
          return;
        }
      });
    });
  
    form.addEventListener("submit", (ev) => {//Para agregar producto
      ev.preventDefault();
      console.log("Form submitted!");
      try {
        products.push({
          title: title.value,
          description: description.value,
          code: code.value,
          price: price.value,
          stock: stock.value,
          category: category.value,
          thumbnails: thumbnails.file,
        });
        socket.emit("productSocket", products);
        showProductSocket(products);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  
    function showProductSocket(products) {
      productsListSocket.innerHTML = "";
      products.forEach((product) => {
        const prod = document.createElement("div");
        prod.className = "card";
        prod.innerHTML = `
        <div class="central">
            <div class="cntrlBox">
                <div class="container-products" id="seccionprod">
                    <div class="products" id="${product._id}">
                        <img src="${product.thumbnails}" class="product__img" width="400" height="430" >
                        <div class="product-description">
                          <h3 class="product__title">${product.title}</h3>
                          <span class="product-price">$ ${product.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        productsListSocket.appendChild(prod);
      });
    }

    //Show realTime Products
    socket.on("products", (...products) => {
      showProductSocket(products);
    });
  
    //Reception Events from Backend
    socket.on("message_everyone", (message) => {
      console.log("message_everyone", message);
    });
  })();