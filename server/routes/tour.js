import express from "express";
import { createTour, getTours,getTour, getTourByUser, deleteTour, updateTour, getTourBySearch, 
  getTourByTag, getRelatedTours, likesTour } from "../controller/tour.js";
import {auth} from "../middleware/auth.js"
const router = express.Router();


router.get('/search', getTourBySearch);
router.get('/tag/:tag', getTourByTag);
router.post('/relatedTour', getRelatedTours);
router.get('/', getTours);
router.get('/:id', getTour);

router.post('/createTour', auth,createTour);
router.delete('/:id', auth,deleteTour);
router.patch('/:id', auth,updateTour);
router.get('/userTour/:id', auth,getTourByUser);
router.patch('/like/:id',auth,likesTour)

export default router;