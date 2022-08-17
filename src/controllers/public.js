const ProductService = require('../services/product.service');
const product = new ProductService();

const login = (req, res) => {
    res.render('login', { title: 'Iniciar sesión' });
}
const signup = (req, res) => {
    res.render('signup', { title: 'Registro' });
}
const dashboard = async (req, res) => {
    const user = {
        name: req.user.name,
        username: req.user.username,
        address: req.user.address,
        age: req.user.age,
        phone: req.user.phone,
        avatar: req.user.avatar,
        admin: req.user.admin,
        cart: req.user.cart
    }
    const products = await product.getAll();
    res.render('dashboard', { title: 'Dashboard', user, products });
}
const index = (req, res) => {
    res.redirect('/login');
}
const logout = (req, res) => {
    req.session.destroy(() => {
        req.session = null
    });
    res.redirect('/login');
}
const products = (req, res) => {
    const user = {
        name: req.user.name,
        username: req.user.username,
        address: req.user.address,
        age: req.user.age,
        phone: req.user.phone,
        avatar: req.user.avatar,
        admin: req.user.admin,
    }
    res.render('products', { title: 'Productos', user });
}
module.exports = {
    login, signup, index, dashboard, logout, products
}