import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
});
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    }
})

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Invalid email address"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
       
    },
    role: {
        type: roleSchema,
        required: true,
        default: {
            name: "customer",
            description: ["Can access all features"]
        }
    },
    address: {
        type: addressSchema,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active"
    }
},{timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;