const Assets = require('../../Models/AssetSchema')
const Car = require('../../Models/assets/CarAssetSchema')
const PropertyAsset = require('../../Models/assets/PropertyAssetSchema')
const StockAsset = require('../../Models/assets/StockAssetSchema')
const BusinessAsset = require('../../Models/assets/BusinessAssetSchema')
const CustomAsset = require('../../Models/assets/CustomAsset')

const mongoose = require('mongoose');

const viewAssets = async (req, res) => {

    try{
        let assets = await Assets.findOne({createdBy: req.auth})
            .populate('assets.cars')
            .populate('assets.houses')
            .populate('assets.stocks')
            .populate('assets.businesses')
            .populate('assets.customs');

        if(!assets){
            return res.status(404).json({status: false, message: "No assets found for this user"});
        }

        return res.status(200).json({status: true, assets: assets.assets});

    } catch (error){
        console.log("error occured", error)
        return res.status(400).json({status: false});
    }
}

const addUpdateAssets = async(req, res) => {
    try{
        let assets = await Assets.findOne({createdBy: req.auth});
        if(!assets){
            assets = new Assets({createdBy: req.auth});
        }

        switch(req?.body?.assetName){
            case "Property":
                try{
                    console.log(req?.body?.Assignment)
                    let property = await PropertyAsset.findById(req?.body?.keyId);
                    if(property){
                        await PropertyAsset.updateOne({_id: req?.body?.keyId}, req.body);
                    }else{
                        property = await PropertyAsset.create({_id: req?.body?.keyId, createdBy: req.auth, Name: req?.body?.Name, Assignment: req?.body?.Assignment, Value: req?.body?.Value, OptString: req?.body?.OptString});
                        assets.assets.houses.push(property._id);
                    }
                }catch (error){
                    throw new Error(error)
                }
                break;
           case "Car":
            try{
                let car = await Car.findById(req?.body?.keyId);
                if(car){
                    await Car.updateOne({_id: req?.body?.keyId}, req.body);
                }else{
                    car = await Car.create({_id: req?.body?.keyId, createdBy: req.auth, Name: req?.body?.Name, Assignment: req?.body?.Assignment, Value: req?.body?.Value, OptString: req?.body?.OptString});
                    assets.assets.cars.push(car._id);
                }
            }catch (error){
                throw new Error(error)
            }
            break;
            case "Stock":
                try{
                    let stock = await StockAsset.findById(req?.body?.keyId);
                    if(stock){
                        await StockAsset.updateOne({_id: req?.body?.keyId}, req.body);
                    }else{
                        console.log(req?.body?.Brokerage)
                        stock = await StockAsset.create({_id: req?.body?.keyId, createdBy: req.auth, Name: req?.body?.Name, Assignment: req?.body?.Assignment, Value: req?.body?.Value, OptString: req?.body?.OptString});
                        assets.assets.stocks.push(stock._id);
                    }
                }catch (error){
                    throw new Error(error)
                }
                break;
            case "Business":
                try{
                    let business = await BusinessAsset.findById(req?.body?.keyId);
                    if(business){
                        await BusinessAsset.updateOne({_id: req?.body?.keyId}, req.body);
                    }else{
                        business = await BusinessAsset.create({_id: req?.body?.keyId, createdBy: req.auth, Name: req?.body?.Name, Assignment: req?.body?.Assignment, Value: req?.body?.Value, OptString: req?.body?.OptString});
                        assets.assets.businesses.push(business._id);
                    }
                }catch (error){
                    throw new Error(error)
                }
                break;
            case "Custom":
                try {
                    let customAsset = await CustomAsset.findById(req?.body?.keyId);
                    if (customAsset) {
                        await CustomAsset.updateOne({_id: req?.body?.keyId}, req.body);
                    } else {
                        customAsset = await CustomAsset.create({
                            _id: req?.body?.keyId,
                            createdBy: req.auth,
                            Name: req?.body?.Name,
                            Assignment: req?.body?.Assignment,
                            Value: req?.body?.Value,
                            OptString: req?.body?.OptString
                        });
                        assets.assets.customs.push(customAsset._id);
                    }
                } catch (error) {
                    throw new Error(error);
                }
                break;

            default:
                console.log("no asset type found init")
                return res.status(400).json({status: false, message: "Invalid asset type"});
        }

        await assets.save();
        return res.status(200).json({status: true}) 
    }catch (error){
        console.log(error, "error")
        return res.status(400).json({status: false})
    }
}

const deleteAsset = async(req, res) => {
    try {
        let assets = await Assets.findOne({createdBy: req.auth});
        console.log(assets)
    } catch(error){
        return res.status(400).json({status: false})
    }

}

module.exports = {viewAssets, addUpdateAssets, deleteAsset}