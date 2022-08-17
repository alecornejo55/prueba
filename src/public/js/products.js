const form = document.querySelector('#productForm');
Handlebars.registerHelper("formatDate", function (datetime, format) {
    return new Date(datetime).toLocaleString("es-AR");
});
const renderProducts = async (data) => {
    const template = await fetch('/templates/products.hbs');
    const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ products: data });
	document.querySelector('#products').innerHTML = html;
    const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = btn.dataset.id;
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.value) {
                    // console.log("btnDelete", id, "Fin btnDelete");
                    const product = await fetch(`/api/product/${id}`, {
                        method: 'DELETE'
                    });
                    const data = await product.json();
                    
                    if(data.deleted) {
                        Swal.fire(
                            'Producto eliminado',
                            `El producto ha sido eliminado con éxito`,
                            'success'
                        );
                        getProducts();
                    }
                    else {
                        Swal.fire(
                            'Ha ocurrido un error',
                            `El producto no ha sido eliminado: ${data.message}`,
                            'error'
                        );
                    }
                }
            })
        });
    });
}
const renderProduct = async (data) => {
    const tproducts = document.querySelector('#tproducts');
    if(!tproducts){
        getProducts();
    }
    const html = `
    <tr>
        <td>${data.name}</td>
        <td>${data.description}</td>
        <td>${data.code}</td>
        <td>${data.price}</td>
        <td>${data.stock}</td>
        <td><img src="${data.image}" alt="${data.name}" style="max-height: 30px; vertical-align:middle;"></td>
    </tr>`
    tproducts.innerHTML += html;
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newProducto = {
        name: formData.get('name'),
        description: formData.get('description'),
        code: formData.get('code'),
        price: formData.get('price'),
        stock: formData.get('stock'),
        image: formData.get('image')
    };
    // console.log(newProducto);
    try {
        const product = await fetch('/api/product', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProducto)
        });
        // const data = await product.json();
        // renderProduct(newProducto);
        // socket.emit('new-product', newProducto);
        Swal.fire(
            'Producto guardado',
            `El producto ha sido agregado con éxito`,
            'success'
        );
        getProducts();
        form.reset();
    }
    catch (error) {
        Swal.fire(
            'Ha ocurrido un error',
            `El producto no ha sido guardado: ${error.message}`,
            'error'
        );
        console.warn(error);
    }
});
const getProducts = async () => {
    const divProducts = document.querySelector('#products');
    const htmlLoading = `
        <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <p class="mt-3 text-center text-primary">Cargando productos...</p>
        `;
    divProducts.className = 'd-flex justify-content-center mt-5 row';
    divProducts.innerHTML = htmlLoading;
    const products = await fetch('/api/product');
    const data = await products.json();
    await renderProducts(data);
    divProducts.className = 'row';
}

// iniciamos productos
getProducts();
