// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://sumedhbhatkar80:mPqt9HvRshpHGa9r@Cluster0.eapj2k8.mongodb.net/PKTP?retryWrites=true&w=majority');

// Define data schema
const userSchema = {
    name: String,
    email: String,
    phoneNumber: Number,
    Message: String,
    subject: String
};
const User = mongoose.model("Users", userSchema);

// Middleware for data validation
const validateFormData = (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;

    // Check if number has exactly 10 digits and no spaces
    if (/^\d{10}$/.test(phoneNumber)) {
        next();
    } else {
        res.status(400).send("Enter correct phone number");
    }
};

// Middleware for serving static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route for serving index.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Route for serving index1.html
app.get("/index1", (req, res) => {
    res.sendFile(__dirname + "/index1.html");
});

// Route for form submission
app.post("/", validateFormData, (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    // Check if phone number already exists in the db
    User.findOne({ phoneNumber: phoneNumber })
        .then(existingFormData => {
            if (existingFormData) {
                res.send("Phone number already exists. You cannot proceed.");
            } else {
                // Phone number does not exist, save the form data to MongoDB
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    Message: req.body.message,
                    subject: req.body.subject
                });
                newUser.save()
                    .then(() => {
                        res.redirect("/index1");
                    })
                    .catch(err => {
                        console.error("Error saving form data:", err);
                        res.status(500).send("An error occurred while saving form data.");
                    });
            }
        })
        .catch(err => {
            console.error("Error checking existing phone number:", err);
            res.status(500).send("An error occurred while checking existing phone number.");
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
