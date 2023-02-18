const {Schema, model} = require("mongoose");
const Order = require("./Order")

const validateEmail = function(email) {
    const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: [validateEmail, "Please fill a valid email address!"],
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order",
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

const User = model("User", userSchema);

module.exports = User;

