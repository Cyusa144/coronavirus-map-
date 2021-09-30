const mongoose = require('mongoose');
import moment from 'moment';
const TodaySchema = new mongoose.Schema({
    todaysTests: {
        type: Number,
        required: true,
        default: 0
    },
    todaysCases: {
        type: Number,
        required: true,
        default: 0
    },
    todaysRecovery: {
        type: Number,
        require: true,
        default: 0
    },
    todaysDeaths: {
        type: Number,
        required: true,
        default: 0
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    recordDate: {
        type: Date,
        default: moment().format('YYYY/MM/DD')
    }
  },
    {
        timestamps: true,
    }
);

const Today = mongoose.model('Today', TodaySchema);
module.exports = Today;