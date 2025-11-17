import Address from "../models/Address.js";

// Add Address : /api/address/add
export const addAddress = async(req,resp)=>{
    try{
        const {address , userId} = req.body;

        await Address.create({...address,userId})
        resp.json({success: true , message : "Address Added Succesfully"})

    }catch(error){
        console.log(error.message)
        resp.json({success: false , message : error.message})
    }
}

// Get Address : /api/address/get
export const getAddress = async(req,resp)=>{
    try{
        const { userId} = req.query;

        const addresses = await Address.find({userId})
        resp.json({success: true , addresses})

    }catch(error){
        console.log(error.message)
        resp.json({success: false , message : error.message})
    }
}


