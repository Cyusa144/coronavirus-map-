const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
},
    {
        timestamps: true
    }
)

const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;