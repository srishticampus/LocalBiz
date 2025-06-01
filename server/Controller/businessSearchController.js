const bussinessModel = require("../Models/bussinessModel");

const searchBusinesses = async (req, res) => {
    try {
        const { category, latitude, longitude, maxDistance } = req.query;
        let query = {};

        if (category) {
            query.bussinessCategory = category;
        }

        if (latitude && longitude && maxDistance) {
            query.location = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(maxDistance) // distance in meters
                }
            };
        }

        const businesses = await bussinessModel.find(query);

        res.status(200).json({
            message: "Businesses fetched successfully",
            data: businesses
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    searchBusinesses
};
