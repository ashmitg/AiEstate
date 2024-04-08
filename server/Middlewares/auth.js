const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res, next) => {

  try{
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ status: false })
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     console.log(err, 'errl')
        return res.status(400).json({ status: false })

    } else {

      const user = await User.findById(data.id)
      req.user = user;
      req.auth = data.id

      user ? next() : res.status(400).json({ status: false });
    }
  })
  }catch(error){
    res.status(200).json({'error': error});
  }
}

module.exports = userVerification;