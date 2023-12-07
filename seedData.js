const dotenv = require('dotenv');
const fs = require('fs');
const colors = require('colors');
const db = require('./config/db');

// Load ENV variables
dotenv.config({ path: './config/config.env' });

// Load Models
const Product = require('./models/Product');
const User = require('./models/User');

// Connect to Mongo Database
const dbConnection = db.connectToDatabase();

// Read The JSON files
const products = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/products.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/users.json`, 'utf-8'));

// Import Sample Data In DB
const importData = async () => {
    try {
        await Product.create(products);
        await User.create(users);
        console.log(`Data successfully imported`.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete all data from DB
const deleteAllData = async () => {
    try {
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log(`All data successfully deleted`.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete a particular user based on username
const deleteUserData = async (username) => {
    try {
        if (!username) {
            throw new Error('Username is required for deletion.');
        }
        await User.deleteOne({ name:username });
        console.log(`User with username ${username} successfully deleted`.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Add a user to DB
const addUser = async (userData) => {
    try {
        // Validate that the user data is provided
        if (!userData || !userData.name || !userData.email || !userData.password) {
            throw new Error('Name, email, and password are required for adding a user.');
        }

        // Create a new user
        const newUser = await User.create(userData);

        console.log(`User added successfully`.green.inverse);
        console.log(newUser);

        process.exit();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Modify username in DB
const modifyUserName = async (oldUsername, newUsername) => {
    try {
        // Validate that both old and new usernames are provided
        if (!oldUsername || !newUsername) {
            throw new Error('Both old and new usernames are required for modification.');
        }

        // Find the user by the old username
        const user = await User.findOne({ name: oldUsername });

        // Check if the user exists
        if (!user) {
            throw new Error(`User with username ${oldUsername} not found.`);
        }

        // Update the username with the new value
        user.name = newUsername;

        // Save the updated user
        await user.save();

        console.log(`Username successfully modified from ${oldUsername} to ${newUsername}`.green.inverse);
        console.log(user);

        process.exit();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Handle command-line arguments
const command = process.argv[2];

switch (command) {
    case '-i':
        importData().then();
        break;
    case '-d':
        const usernameToDelete = process.argv[3];
        if (usernameToDelete) {
            deleteUserData(usernameToDelete).then();
        } else {
            deleteAllData().then();
        }
        break;
    case '-a':
        // Add a user to DB
        const userData = {
            name: process.argv[3],
            email: process.argv[4],
            password: process.argv[5]
        };
        addUser(userData).then();
        break;
    case '-m':
        // Modify username in DB
        const oldUsername = process.argv[3];
        const newUsername = process.argv[4];
        modifyUserName(oldUsername, newUsername).then();
        break;
    default:
        console.log('Invalid command. Use -i to import, -d to delete, -a to add a user, or -m to modify username.');
        process.exit(1);
}
