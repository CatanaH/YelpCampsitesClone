//run this file to seed database when changes are made to db model
const mongoose = require('mongoose');
const { $where } = require('../models/campground');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "(have you checked that Mongo is running?) Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const campground = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, dolor nihil illum aperiam molestiae porro quae harum blanditiis a cum beatae totam inventore! Cum aut quasi mollitia ea qui assumenda.",
            price:price
        })
        await campground.save();
    }  
}

seedDB().then(() => {
    mongoose.connection.close()
    console.log('DB closed')
})