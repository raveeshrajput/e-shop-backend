const express = require("express");
const { getNewProducts, getFeaturedProducts, getProductForListing, getProduct} = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getWishlist, addToWishlist, removeFromWishlist,  } = require("./../handlers/wishlist-handler");
const { getCartItems, addToCart, removeFromCart} = require("./../handlers/shopping-cart-handler");
const { getBrands } = require("../handlers/brand-handler");
const router = express.Router();

router.get("/new-products", async (req, res)=>{
    const products = await getNewProducts();
    res.send(products);
});
router.get("/featured-products", async (req, res)=>{
    const products = await getFeaturedProducts();
    res.send(products);
});

router.get("/categories", async (req, res)=>{
    const categories = await getCategories();
    res.send(categories);
});

router.get("/brands", async (req, res)=>{
    const brands = await getBrands();
    res.send(brands);
});

router.get("/products", async (req, res)=>{
    const { searchTerm, categoryId, sortBy, sortOrder, brandId, pageSize, page} = req.query;
    const products = await getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId);
    res.send(products);
});

router.get("/product/:id", async (req, res)=>{
    const id = req.params['id'];
    const product = await getProduct(id);
    res.send(product);
});

router.get("/wishlists", async (req, res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const items = await getWishlist(userId);
    res.send(items);
});

router.post("/wishlists/:id", async (req, res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const item = await addToWishlist(userId, productId);
    res.send(item);
});

router.delete("/wishlists/:id", async (req, res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    await removeFromWishlist(userId, productId);
    res.send({ message: "Ok"});
});

router.get("/carts", async (req, res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const items = await getCartItems(userId);
    res.send(items);
});

router.post("/carts/:id", async (req, res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await addToCart(userId, productId, quantity);
    res.send(items);
});

router.delete("/carts/:id", async (req, res)=>{
    console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const items = await removeFromCart(userId, productId);
    res.send(items);
});

module.exports = router;