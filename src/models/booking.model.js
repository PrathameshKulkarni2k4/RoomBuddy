import mongoose,{Schema} from "mongoose";

const bookingSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    }
},{timestamps: true})


export const Booking = mongoose.model("Booking",bookingSchema)