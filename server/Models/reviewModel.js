const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {
        consumer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customer",
            required: true
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bussiness",
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String
        }
    },
    { timeStamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
