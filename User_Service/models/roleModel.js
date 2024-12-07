import mongoose from "mongoose";

const rollListSchema = new mongoose.Schema({
    
    entries: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userSchema', // Reference to the Role schema
                required: true
            },
            name:{
                type: String,
                required: true
            },
            isActive: {
                type: String,
                enum: ['yes', 'no'], // Allowed values
                default: 'yes',
                required: true,

            }
        }
    ]
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

const RollList = mongoose.model('RollList', rollListSchema);

export default RollList;