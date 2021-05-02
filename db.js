const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect('mongodb+srv://David:CriticalMass@cluster0.xpg1z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('db connection success');
    } catch(err) {
        console.error(err);
    }
} 

module.exports = db