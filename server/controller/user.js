import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

import user from '../models/user.js';

const secret = "test"
export const signin = async (req,res) => {
  const {email,password} = req.body;
  try {
    const oldUser = await user.findOne({email});

    if (!oldUser) return res.status(404).json({message: "user doesn't exist"});

    const isPasswordCorrect = await bcryptjs.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credential"});
     const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "1h"});

     res.status(200).json({result: oldUser,token});
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
    console.log(error);
  }
}
export const signup = async (req,res) => {
  const {email,password, firstName, lastName} = req.body;
  try {
    const oldUser = await user.findOne({email})

    if (oldUser) {
      return res.status(400).json({message: "User Already Exist"})
    }
    const hashPassword = await bcryptjs.hash(password,12);

    const result = await user.create({
      email,
      password: hashPassword,
      name: `${firstName}  ${lastName}`
    });

    const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});

    res.status(201).json({result,token});
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
    console.log(error);
  }
}

export const googleSignIn = async (req,res) => {
  const {name,email,token,googleId,} = req.body;

  try {
    const oldUser = await user.findOne({email});
    if (oldUser) {
      const result = {_id: oldUser._id.toString(),email,name};
      return res.status(200).json({result,token});
    }

    const result = user.create({
      email,name,googleId
    });

    res.status(201).json({result,token});
  } catch (error) {
    res.status(500).json({message: "something wrong"});
    console.log(error);
  }
}