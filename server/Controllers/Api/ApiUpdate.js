const useApi = require("../../Models/UserApi");

const updateApi = async (req, res ) => {
    try {
        const apiKey = req.body.apiKey
        if(!apiKey){
            throw new Error("apiKey not found")
        }
        const filter = { createdBy: req.auth };
        const update = { apiKey: apiKey };

        let doc = await useApi.findOneAndUpdate(filter, update, {
            new: true // This option returns the updated document
        });

        return res.status(200).json({'status': true})
    }
    catch(error){
        res.status(400).json({'status': false, 'error': error});
    }
}

const getApi = async(req, res) =>{
    try{
        const api = await useApi.findOne({createdBy: req.auth});
        console.log(api)
        return res.status(200).json({status: true , apiKey: api.apiKey});
    }catch(error){
        res.status(400).json({'status': false, 'error': error});
    }
}

module.exports = {updateApi, getApi}
