const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

main()
    .then(console.log("Database Connected"))
    .catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '63a74d399cd3ce88842544f9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, illum necessitatibus, quaerat ratione accusamus corrupti laudantium quia sint praesentium itaque dicta sed doloremque optio exercitationem iusto molestias, ipsa soluta? Delectus.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/da7cgh4tv/image/upload/v1672165375/YelpCamp2/wwxcxibwlo5hiyx3wis9.jpg',
                  filename: 'YelpCamp2/wwxcxibwlo5hiyx3wis9',
                },
                {
                  url: 'https://res.cloudinary.com/da7cgh4tv/image/upload/v1672165375/YelpCamp2/vrykxdbu98zmhgkmm19g.jpg',
                  filename: 'YelpCamp2/vrykxdbu98zmhgkmm19g',
                }
              ]
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});