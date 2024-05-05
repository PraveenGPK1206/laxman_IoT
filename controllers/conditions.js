import Conditions from "../models/Conditions.js";

export const createEntry = async(req,res,next)=>{
    const newEntry = new Conditions(req.body);
    try {
        const savedEntry = await newEntry.save();
        res.status(200).json(savedEntry);
    } catch (error) {
        next(error);
    }
};

export const readAllEntries = async(req, res,next)=>{
    try {
        const Entries = await Conditions.find().sort({timestamp: -1}).limit(100);
        //const {_id, _v, ...otherDetails} = Entries._doc;
        res.status(200).json(Entries);
    } catch (error) {
        next(error);
    }
};

export const filterEntries = async (req, res, next) => {
    const { min, max, type, ...others } = req.query;

    console.log(type, min, max);

    try {
        let filteredEntries;
        if(type=="gasVal"){
         filteredEntries = await Conditions.find({ ...others, gasVal: { $gte: min | 0, $lte: max || 30000 }, });
          }
        if(type=="tempVal"){
         filteredEntries = await Conditions.find({ ...others, tempVal: { $gte: min | 0, $lte: max || 1000 }, });
            } 
        if(type=="humidVal"){
         filteredEntries = await Conditions.find({ ...others, humidVal: { $gte: min | 0, $lte: max || 100 }, });
            } 
        res.status(200).json(filteredEntries);
    } catch (error) {
        next(error);
    }
};

export const entriesByLoc = async(req, res, next)=>{
    const loc = req.query.loc;
    try{
        const Entries = await Conditions.find({location: loc}).limit(100);
        res.status(200).json(Entries);
    } catch(error){
        next(error);
    }
};

export const entriesByVal = async(req,res,next)=>{
    const {minT, maxT, minH, maxH, minG, maxG}= req.query;
    try {
        const Entries = await Conditions.find({tempVal:{$gte: minT, $lte: maxT}, gasVal:{$gte: minG, $lte: maxG}, humidVal:{$gte: minH, $lte: maxH}});
        res.status(200).json(Entries);
    } catch (error) {
        next(error);
    }
};
