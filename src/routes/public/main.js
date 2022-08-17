const express = require('express');
const public = require('../../controllers/public');
const { checkAuth, checkLogout, checkAdmin } = require('../../middlewares/auth');
const { Router } = express; 
const router = Router();

router.get('/', checkAuth, public.index);

router.get('/login', checkAuth, public.login);

router.get('/signup', checkAuth, public.signup);

router.get('/dashboard', checkLogout, public.dashboard);

router.get('/logout', checkLogout, public.logout);

router.get('/productos', checkLogout, checkAdmin, public.products);

module.exports = router;