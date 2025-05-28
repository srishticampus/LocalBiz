const Event = require("../Models/eventModel");
const Organiser = require("../Models/organiserModel");

const createEvent = async (req, res) => {
    try {
        const { community, type, organizer, date, description } = req.body;

        // Check if community exists
        const existingCommunity = await Organiser.findById(community);
        if (!existingCommunity) {
            return res.status(404).json({ message: "Community not found." });
        }

        const newEvent = new Event({
            community,
            type,
            organizer,
            date,
            description
        });

        await newEvent.save();

        res.status(201).json({
            message: "Event created successfully",
            data: newEvent
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const editEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, organizer, date, description } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { type, organizer, date, description },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found." });
        }

        res.status(200).json({
            message: "Event updated successfully.",
            event: updatedEvent
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    editEvent
};
