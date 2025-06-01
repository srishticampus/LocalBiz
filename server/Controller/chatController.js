const Message = require("../Models/messageModel");
const Customer = require("../Models/customerModel");
const Business = require("../Models/bussinessModel");
const Organiser = require("../Models/organiserModel");

const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, onModel, content } = req.body;

        // Basic validation
        if (!sender || !receiver || !onModel || !content) {
            return res.status(400).json({ message: "Sender, receiver, onModel, and content are required." });
        }

        // Optional: Validate if sender and receiver IDs exist in their respective models
        let senderExists = false;
        let receiverExists = false;

        if (onModel === 'customer') {
            senderExists = await Customer.findById(sender);
            receiverExists = await Customer.findById(receiver);
        } else if (onModel === 'bussiness') {
            senderExists = await Business.findById(sender);
            receiverExists = await Business.findById(receiver);
        } else if (onModel === 'organisation') {
            senderExists = await Organiser.findById(sender);
            receiverExists = await Organiser.findById(receiver);
        }

        if (!senderExists || !receiverExists) {
            return res.status(404).json({ message: "Sender or receiver not found in the specified model." });
        }

        const newMessage = new Message({
            sender,
            receiver,
            onModel,
            content
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getChatHistory = async (req, res) => {
    try {
        const { id } = req.params; // Assuming 'id' is the user's ID (customer, business, or organisation)

        // Find messages where the user is either sender or receiver
        const chatHistory = await Message.find({
            $or: [
                { sender: id },
                { receiver: id }
            ]
        })
        .sort({ timestamp: 1 }) // Sort by timestamp ascending
        .populate('sender') // Populate sender details
        .populate('receiver'); // Populate receiver details

        res.status(200).json({
            message: "Chat history fetched successfully",
            data: chatHistory
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendMessage,
    getChatHistory
};
