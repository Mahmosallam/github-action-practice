const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

before(async function() {
    this.timeout(60000);
    
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const Schema = mongoose.Schema;
    const dataSchema = new Schema({
        name: String,
        id: Number,
        description: String,
        image: String,
        velocity: String,
        distance: String
    });
    
    const planetModel = mongoose.models.planets || mongoose.model('planets', dataSchema);
    
    await planetModel.insertMany([
        { id: 1, name: 'Mercury', description: 'Smallest planet', image: '/images/mercury.jpg', velocity: '47.87 km/s', distance: '57.9 million km' },
        { id: 2, name: 'Venus', description: 'Hottest planet', image: '/images/venus.jpg', velocity: '35.02 km/s', distance: '108.2 million km' },
        { id: 3, name: 'Earth', description: 'Our home', image: '/images/earth.jpg', velocity: '29.78 km/s', distance: '149.6 million km' },
        { id: 4, name: 'Mars', description: 'Red planet', image: '/images/mars.jpg', velocity: '24.07 km/s', distance: '227.9 million km' },
        { id: 5, name: 'Jupiter', description: 'Largest planet', image: '/images/jupiter.jpg', velocity: '13.07 km/s', distance: '778.5 million km' },
        { id: 6, name: 'Saturn', description: 'Ringed planet', image: '/images/saturn.jpg', velocity: '9.69 km/s', distance: '1.434 billion km' },
        { id: 7, name: 'Uranus', description: 'Sideways planet', image: '/images/uranus.jpg', velocity: '6.81 km/s', distance: '2.871 billion km' },
        { id: 8, name: 'Neptune', description: 'Windiest planet', image: '/images/neptune.jpg', velocity: '5.43 km/s', distance: '4.495 billion km' }
    ]);
});

after(async function() {
    await mongoose.disconnect();
    await mongod.stop();
});
