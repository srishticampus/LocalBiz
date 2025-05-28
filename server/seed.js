const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const adminModel = require("./Models/adminModel");
const customerModel = require("./Models/customerModel");
const bussinessModel = require("./Models/bussinessModel");
const organiserModel = require("./Models/organiserModel");
const reviewModel = require("./Models/reviewModel");
const complaintModel = require("./Models/complaintModel");
const eventModel = require("./Models/eventModel");
const messageModel = require("./Models/messageModel");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/localbiz", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        console.log("Seeding data...");

        // Clear existing data
        await adminModel.deleteMany();
        await customerModel.deleteMany();
        await bussinessModel.deleteMany();
        await organiserModel.deleteMany();
        await reviewModel.deleteMany();
        await complaintModel.deleteMany();
        await eventModel.deleteMany();
        await messageModel.deleteMany();
        console.log("Existing data cleared.");

        // Seed Admin User
        const adminPassword = await bcrypt.hash("admin@123", 10);
        const admin = await adminModel.create({
            email: "admin@localbiz.com", // Corrected field
            password: adminPassword,
        });
        console.log("Admin user seeded:", admin);

        // Seed Customer
        const customerPassword = await bcrypt.hash("customer@123", 10);
        const customer = await customerModel.create({
            name: "John Doe",
            email: "john.doe@example.com",
            password: customerPassword,
            confirmpassword: customerPassword,
            dateOfBirth: new Date("1990-01-15"),
            phone: 1234567890,
            profilePic: { filename: "profile-john.png" },
            address: "123 Main St, Anytown",
            agreed: true,
            isVerified: true,
            isAdminApproved: true
        });
        console.log("Customer seeded:", customer);

        // Seed Business
        const businessPassword = await bcrypt.hash("business@123", 10);
        const business = await bussinessModel.create({
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: businessPassword,
            confirmpassword: businessPassword,
            dateOfBirth: new Date("1985-05-20"),
            phone: 9876543210,
            profilePic: { filename: "profile-jane.png" },
            address: "456 Oak Ave, Business City",
            agreed: true,
            bussinessName: "Jane's Bakery",
            bussinessCategory: "Food",
            bussinessDescription: "Delicious baked goods.",
            bussinessLogo: { filename: "logo-bakery.png" },
            isActive: true,
            isAdminApproved: true,
            isVerified: true,
            location: {
                type: "Point",
                coordinates: [-74.0060, 40.7128] // Example: New York City coordinates
            }
        });
        console.log("Business seeded:", business);

        // Seed Organiser
        const organiserPassword = await bcrypt.hash("organiser@123", 10);
        const organiser = await organiserModel.create({
            organizationName: "Community Hub",
            organizationType: "Non-profit",
            name: "Alice Brown",
            email: "alice.brown@example.com",
            password: organiserPassword,
            confirmpassword: organiserPassword,
            dateOfBirth: new Date("1978-11-10"),
            phone: 1122334455,
            profilePic: { filename: "profile-alice.png" },
            address: "789 Pine Ln, Community Town",
            agreed: true,
            isActive: true,
            isAdminApproved: true,
            isVerified: true,
            members: [business._id] // Add the seeded business as a member
        });
        console.log("Organiser seeded:", organiser);

        // Seed Review
        const review = await reviewModel.create({
            consumer: customer._id,
            business: business._id,
            rating: 5,
            comment: "Great bakery, loved the cookies!"
        });
        console.log("Review seeded:", review);

        // Seed Complaint
        const complaint = await complaintModel.create({
            consumer: customer._id,
            description: "Long waiting times at the bakery.",
            status: "pending"
        });
        console.log("Complaint seeded:", complaint);

        // Seed Event
        const event = await eventModel.create({
            community: organiser._id,
            type: "workshop",
            organizer: "Community Hub",
            date: new Date("2025-06-15T10:00:00Z"),
            description: "Baking workshop for beginners."
        });
        console.log("Event seeded:", event);

        // Seed Message
        const message = await messageModel.create({
            sender: customer._id,
            receiver: business._id,
            onModel: "customer", // Assuming customer is the sender
            content: "Hi, I'd like to inquire about custom cake orders."
        });
        console.log("Message seeded:", message);


        console.log("Data seeding complete!");
        process.exit();

    } catch (error) {
        console.error(`Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

seedData();
