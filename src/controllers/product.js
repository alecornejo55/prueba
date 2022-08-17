const ProductService = require('../services/product.service');
const product = new ProductService();

const getProduct = async (req, res) => {
    try {
        const id = req.params?.id ?? null;
        // console.log(id);
        let products = [];
        if(id == null) {
            products = await product.getAll();
        }
        else {
            products = await product.getById(id);
            if(products === null) {
                throw new Error('producto no encontrado');
            }
        }
        res.send(products);        
    } catch (error) {
        res.send({error: error.message})
    }
}

const saveProduct = async (req, res) => {
    // console.log(req.body);
    const idProduct = await product.save(req.body);
    res.status(200).json({id: idProduct});
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    // console.log(data);
    const resProduct = await product.updateById(id, data);

    res.send("Producto actualizado: " + JSON.stringify(resProduct));
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    await product.deleteById(id);
    res.status(200).json({
        deleted: true,
        message: "Producto eliminado con éxito"
    });
}

module.exports = { getProduct, saveProduct, updateProduct, deleteProduct }