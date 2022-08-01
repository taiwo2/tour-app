import mongoose from 'mongoose';
import tourModel from '../models/tour.js';

export const createTour = async (req,res) => {
  const tour = req.body;

  const newTour= new tourModel({
    ...tour,
    creator: req.userId,
    createdat: new Date().toISOString(),
  })

  try {
    await newTour.save();
    res.status(202).json(newTour)
  } catch (error) {
    res.status(404).json({message: "something wrong"})
  }
}

export const getTours = async (req,res) => {
  const {page} = req.query;

  try {
    // const tours = await tourModel.find();
    // res.status(200).json(tours)
    const limit  = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await tourModel.countDocuments({});
    const tour = await tourModel.find().limit(limit).skip(startIndex);
    res.json({
      data: tour,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit)
    })
  } catch (error) {
    res.status(404).json({message: "something wrong"})
  }
}
export const getTour = async (req,res) => {
  const { id } = req.params;
  try {
    const tours = await tourModel.findById(id);
    res.status(200).json(tours)
  } catch (error) {
    res.status(404).json({message: "something wrong"})
  }
}

export const getTourByUser = async (req,res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message: "user doesn't Exist"});
  }
  const userTour = await tourModel.find({creator: id});
  res.status(200).json(userTour)
}

export const deleteTour = async (req,res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message: `No Tour Exist with id: ${id}`});
    }
    await tourModel.findByIdAndRemove(id);
    res.json({message: "Tour deleted Successfully"})
  } catch (error) {
    res.status(404).json({message: "something wrong"})
    console.log(error);
  }
}
export const updateTour = async (req,res) => {
  const { id } = req.params;
  const {title,description,imageFile,creator,tags} = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message: `No Tour Exist with id: ${id}`});
    }

    const updatedTour = { title,description,imageFile,creator,tags, _id: id}

    await tourModel.findByIdAndUpdate(id,updatedTour,{new: true});
    res.json(updatedTour)
  } catch (error) {
    res.status(404).json({message: "something wrong"})
    console.log(error);
  }
}

export const getTourBySearch = async (req,res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery,"i");
    const tour = await tourModel.find({title});
    res.json(tour);
  } catch (error) {
    res.status(404).json({message: "something wrong"})
    console.log(error);
  }
}
export const getTourByTag = async (req,res) => {
  const { tag } = req.params;

  try {
    const tour = await tourModel.find({tags: {$in: tag}});
    res.json(tour);
  } catch (error) {
    res.status(404).json({message: "something wrong"})
    console.log(error);
  }
}
export const getRelatedTours = async (req,res) => {
  const tags  = req.body;

  try {
    const tour = await tourModel.find({tags: {$in: tags}});
    res.json(tour);
  } catch (error) {
    res.status(404).json({message: "something wrong"})
    console.log(error);
  }
}

export const likesTour = async (req,res) => {
  const {id} = req.params;

  try {
    if (!req.userId){
      res.json({message: "User is not Authenticated"})
    }
    // checking for valid id on mongodb
    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({message: `No Tour Exist with id: ${id}`});
    }

    const tour = await tourModel.findById(id);
    const index = tour.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
      tour.likes.push(req.userId)
    }else {
      tour.likes = tour.likes.filter((id) => id !== String(req.userId))
    }

    const updated = await tourModel.findByIdAndUpdate(id,tour,{new: true})
    res.status(200).json(updated)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}