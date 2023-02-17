const db = require("../config/connection");
const { User, Product, Category } = require("../models");
const userSeeds = require("./userSeeds.json");
const productSeeds = require("./productSeeds.json");
const categorySeeds = require("./categorySeeds.json");

db.once("open", async () => {
    try {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});


        await User.create(userSeeds);
        await Product.create(productSeeds);
        await Category.create(categorySeeds);
    
    } catch (error){
        console.log(error);
        process.exit(1);
    }
        console.log("Done!")
        process.exit(0);
});

