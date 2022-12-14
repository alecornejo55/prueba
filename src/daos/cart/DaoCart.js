const { Container } = require('../../containers/Container');
const ProductService = require('../../services/product.service');

const cart = require('../../models/cart');

let app = null;
class DaoCart extends Container {
    constructor(){
        super(cart);
    }
    static getInstance(){
        if(!app){
            app = new DaoCart();
        }
        return app;
    }

    async addProduct(idCart, products) {
        try {
            const product = new ProductService();
            const cartFound = await this.getById(idCart);
            if(cartFound === null) {
                throw new Error('carrito no encontrado');
            }
            for (const p of products) {
                const addProduct = await product.getById(p.id);
                if(addProduct !== null) {
                    const checkProduct = cartFound.products.filter(prod => prod._id == p.id);
                    if(checkProduct.length == 0) {
                        addProduct.stock = 1;
                        cartFound.products.push(addProduct);
                    }
                    else {
                        checkProduct[0].stock++;
                    }
                }
            }
            await this.updateById(idCart, cartFound);
        }
        catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    async deleteProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart);
            if(cartFound === null) {
                throw new Error('carrito no encontrado');
            }
            const productFound = cartFound.products.filter(prod => prod._id != idProd);
            cartFound.products = productFound;
            await this.updateById(idCart, cartFound);
        }
        catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    async getUserCart(id) {
        try {
            const userCartFound = await this.model.findOne({user: id});
            if(userCartFound === null) {
                throw new Error('carrito no encontrado');
            }
            return userCartFound;
        }
        catch(error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = { DaoCart };