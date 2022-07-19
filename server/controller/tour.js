import express from 'express';
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
  try {
    const tours = await tourModel.find();
    res.status(200).json(tours)
  } catch (error) {
    res.status(404).json({message: "something wrong"})
  }
}