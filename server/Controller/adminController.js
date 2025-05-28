const jwt = require("jsonwebtoken");
const Customer = require("../Models/customerModel");
const Business = require("../Models/bussinessModel");
const Organiser = require("../Models/organiserModel");
const Complaint = require("../Models/complaintModel");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body; // Changed from userId to email

        // Hardcoded admin credentials (consider fetching from DB in a real app)
        const ADMIN_CREDENTIALS = {
            email: "admin@localbiz.com", // Corrected to email
            password: "admin@123",
        };

        // Check if the provided email matches
        if (email !== ADMIN_CREDENTIALS.email) {
            return res.status(400).json({ message: "Admin not found." });
        }

        // Check if the provided password matches
        if (password !== ADMIN_CREDENTIALS.password) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // Generate a JWT token if login is successful
        const token = jwt.sign({ email: ADMIN_CREDENTIALS.email }, process.env.SECRET_KEY, { expiresIn: "1h" }); // Changed from userId to email

        res.status(200).json({
            message: "Admin logged in successfully",
            token: token,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getAdminRequests = async (req, res) => {
    try {
        const pendingBusinesses = await Business.find({ isAdminApproved: false });
        const pendingOrganisers = await Organiser.find({ isAdminApproved: false });

        res.status(200).json({
            message: "Admin requests fetched successfully",
            data: {
                businesses: pendingBusinesses,
                organisations: pendingOrganisers
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const approveRejectUser = async (req, res) => {
    try {
        const { id } = req.params; // User/Business/Community ID
        const { status, type } = req.body; // status: true for approve, false for reject; type: "customer", "bussiness", "organisation"

        let Model;
        if (type === "customer") {
            Model = Customer;
        } else if (type === "bussiness") {
            Model = Business;
        } else if (type === "organisation") {
            Model = Organiser;
        } else {
            return res.status(400).json({ message: "Invalid user type provided." });
        }

        const user = await Model.findByIdAndUpdate(
            id,
            { isAdminApproved: status },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: `${type} not found.` });
        }

        res.status(200).json({
            message: `${type} approval status updated successfully.`,
            data: user
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const viewComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('consumer', 'name email');

        res.status(200).json({
            message: "Complaints fetched successfully",
            data: complaints
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const resolveComplaint = async (req, res) => {
    try {
        const { id } = req.params; // Complaint ID
        const { status } = req.body; // status: "resolved"

        if (status !== "resolved") {
            return res.status(400).json({ message: "Invalid status provided. Must be 'resolved'." });
        }

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { status: "resolved" },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found." });
        }

        res.status(200).json({
            message: "Complaint resolved successfully.",
            data: complaint
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getPlatformAnalytics = async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const totalBusinesses = await Business.countDocuments();
        const totalOrganisations = await Organiser.countDocuments();
        const activeBusinesses = await Business.countDocuments({ isActive: true });
        const pendingApprovals = await Promise.all([
            Business.countDocuments({ isAdminApproved: false }),
            Organiser.countDocuments({ isAdminApproved: false })
        ]).then(counts => counts.reduce((sum, count) => sum + count, 0));

        res.status(200).json({
            message: "Platform analytics fetched successfully",
            data: {
                totalCustomers,
                totalBusinesses,
                totalOrganisations,
                activeBusinesses,
                pendingApprovals
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    adminLogin,
    getAdminRequests,
    approveRejectUser,
    viewComplaints,
    resolveComplaint,
    getPlatformAnalytics
};
