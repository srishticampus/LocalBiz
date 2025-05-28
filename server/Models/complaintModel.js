const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
    {
        consumer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customer",
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "resolved"],
            default: "pending"
        }
    },
    { timeStamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
