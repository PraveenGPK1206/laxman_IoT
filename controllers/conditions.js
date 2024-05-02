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