import Today from '../models/today';
import Country from '../models/country';
import moment from 'moment';


const postTodaysTest = async (req, res)=>{
    const { tests, cases, recovery, deaths, country } = req.body;
    try {
        console.log(req.body);
       const data = await Today.create({
            todaysTests: tests,
            todaysCases: cases,
            todaysRecovery: recovery,
            todaysDeaths: deaths,
            country
        })
        res.status(200).json({message: "Data recorded successfully", data})
    }catch(e){
        console.log(e);
        res.status(500).json({Error: e})
    }
}

const getTodaysTestData = async (req, res)=>{
    const { country } = req.params;
    try{
        const countryData = await Country.find({ name: country });
        if(countryData.length!=0) {
            console.log(countryData.length);
            const testData = await Today.find({
                                                $and: [
                                                    {country: countryData[0]._id},
                                                    {recordDate: moment().format('YYYY/MM/DD')}
                                                ]
                                              })
            res.status(200).json(testData);
        }else {
            res.status(404).json({message: "Country not found"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({Error: e});
    }
}

export { postTodaysTest, getTodaysTestData }