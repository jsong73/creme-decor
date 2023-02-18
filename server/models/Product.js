const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
        versionKey: false,
    }
);

const Product = model("Product", productSchema);

module.exports = Product;
