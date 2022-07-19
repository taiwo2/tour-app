import express from "express";
import { createTour, getTours } from "../controller/tour.js";
import {auth} from "../middleware/auth.js"
const router = express.Router();



router.post('/createTour', auth,createTour);
router.get('/', getTours);
// router.post('/signup', signup);
// router.post('/googleSignIn',googleSignIn)
// router.delete('/:id',);

export default router;