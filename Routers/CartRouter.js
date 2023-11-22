import express from 'express';
import CartManager from '../Manager/CartManager.js';
import ProductManager from '../Manager/ProductManager.js';

const router = express.Router();
const cartManager = new CartManager('Cart.json');
const productManager = new ProductManager('products.json'); 

router.get('/', (req, res) => {
  const allCarts = cartManager.getCarts();
  res.json(allCarts);
});

router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = cartManager.getCartById(Number(cid));
  res.json(cart);
});

router.post('/', (req, res) => {
  const newCart = cartManager.addCart();
  res.json(newCart);
});

router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const cartId = Number(cid);
  const productId = Number(pid);

  try {
    const product = productManager.getProductById(productId);
    const updatedCart = cartManager.addProductToCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

export default router;
