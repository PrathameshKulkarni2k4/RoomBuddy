import mongoose, {Schema} from "mongoose"; 

const roomSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
    },
    description: {
        type: String,
    },
    capacity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },
    images: {
        type: [String],
    },
    features: {
        type: [String],
        required: true,
    }
},{timestamps: true})

export const Room = mongoose.model("Room",roomSchema)