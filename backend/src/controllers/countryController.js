import Country from '../models/country';

const postCountry = async (req, res)=>{
    const { name } = req.body;
    try {
        const data = await Country.create({
            name
        })
        res.status(200).json({ message: "Country recorded", data })
    }catch(e){
        res.status(500).json({
            Error: e
        })
    }
}

const getCountry = async (req, res)=>{
    try {
        const data = await Country.find();
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({
            Error: e
        })
    }
}


export { postCountry, getCountry };