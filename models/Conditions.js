import mongoose from "mongoose";

const CondnSchema = new mongoose.Schema({
    location:{
        type: String,
        default: "Block-A"
    },
    tempVal:{
        type: Number,
        required: true
    },
    gasVal:{
        type: Number,
        required: true
    },
    humidVal:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required:true
    }
},
    {
        timestamps: true
    }
);

    export default mongoose.model("Condn", CondnSchema)