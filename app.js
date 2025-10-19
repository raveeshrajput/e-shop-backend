require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require('./routes/auth');
const { verifyToken, isAdmin } = require('./middleware/auth-middleware');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("server running");
});

app.use("/category", isAdmin, categoryRoutes);
app.use("/brand", isAdmin, brandRoutes);
app.use("/product", isAdmin, productRoutes);
app.use("/customer", customerRoutes);
app.use("/auth", authRoutes);

async function connectDb() {
    console.log("MONGO_URI =", process.env.MONGO_URI); // add ye line temporarily
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "e-comm-store-db",
    });
    console.log("mongodb connected");
}
connectDb().catch((err) => {
    console.error(err);
});

app.listen(port, () => {
    console.log(`server started successfully on port ${port}`);
});
