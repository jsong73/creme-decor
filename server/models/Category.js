const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
        versionKey: false,
    }
);

const Category = model("Category", categorySchema);

module.exports = Category;
