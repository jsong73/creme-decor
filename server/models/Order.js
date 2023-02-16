const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
    versionKey: false,
}
);

const Order = model("Order", orderSchema);

module.exports = Order;