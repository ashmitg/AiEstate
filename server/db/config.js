const mongoose = require('mongoose');
const User = require('../Models/UserModel');
const apiKey = require('../Models/UserApi');
const Assets = require('../Models/AssetSchema')

const db = async (url, database) => {

  try {

    const DB_OPTIONS = {
        dbName: database
    }
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(url, DB_OPTIONS);

    let adminExisting = await User.findOne({ role: 'admin' });

    if (adminExisting==null) {
        const user = await User.create({
            email: 'admin@gmail.com',
            name: 'admin',
            password: 'admin$123',
            role: 'admin',
        });
        await apiKey.create({ createdBy: user._id, apiKey: ""});
        await Assets.create({createdBy: user._id});
        console.log("Admin created successfully");
    } else {
        console.log("Admin already exists");
    }
    console.log(`Connected to database: ${database}`);
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}

module.exports = db