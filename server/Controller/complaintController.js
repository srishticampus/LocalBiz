const Complaint = require("../Models/complaintModel");
const Customer = require("../Models/customerModel");

const submitComplaint = async (req, res) => {
    try {
        const { consumer, description } = req.body;

        // Check if consumer exists
        const existingConsumer = await Customer.findById(consumer);
        if (!existingConsumer) {
            return res.status(404).json({ message: "Consumer not found." });
        }

        const newComplaint = new Complaint({
            consumer,
            description
        });

        await newComplaint.save();

        res.status(201).json({
            message: "Complaint submitted successfully",
            data: newComplaint
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const viewComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('consumer', 'name email'); // Populate consumer details

        res.status(200).json({
            message: "Complaints fetched successfully",
            data: complaints
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    submitComplaint,
    viewComplaints
};
