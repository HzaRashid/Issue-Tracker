const mongoose = require('mongoose')


const ConnectDB = async () => {
    try {mongoose.set('strictQuery', false)
        const Connection = await mongoose.connect(process.env.MDB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('connected to database');
        } 
    catch (err) {
        console.log(err);
        process.exit(1);
        }
    }
module.exports = ConnectDB