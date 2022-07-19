import jwt from "jsonwebtoken";
import user from "../models/user.js";

const secret = 'test';

export const auth = async (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomerAuth = token.length < 500;
    let decodedData;
    if (token && isCustomerAuth) {
      decodedData = jwt.verify(token,secret);
      req.userId= decodedData?.id
    }else{
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const User = await user.findOne({googleId});
      req.userId = User._id
    }
    next();
  } catch (error) {
    console.log(error)
  }
}