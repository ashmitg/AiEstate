const User = require("../../Models/UserModel");
const useApi = require("../../Models/UserApi");
const Assets = require("../../Models/AssetSchema")

const { createSecretToken } = require("../../util/SecretToken");
const bcrypt = require("bcryptjs");

const Signup = async (req, res, next) => {
  try {

    const { email, password, name, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await User.create({
      email: email,
      name: name,
      password: password,
  });
    const api = await useApi.create({
      createdBy: newUser._id,
      apiKey : "",
    });

    await Assets.create({createdBy: newUser._id});
    const token = createSecretToken(newUser._id);
    
    res.status(200).setHeader('Authorization', `Bearer${token}`).json({ token: token, useremail: newUser.email, name: newUser.name});

  } catch (error) {
    console.error(error);
  }
};
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if(!email || !password ){
      return res.status(400).json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(400).json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);

     res.status(200).setHeader('Authorization', `Bearer${token}`).json({ token: token, useremail: user.email, name: user.name});

    } catch (error) {
    console.error(error);
  }
}
const AccountAuth = async(req, res, next)=>{
  try{

    return res.status(200).json({ status: true, user: req?.user?.name, email: req?.user?.email})
    }
  
  catch (error){
    return res.status(400).json({'error': error});
  }

}
module.exports = {Login, Signup, AccountAuth};