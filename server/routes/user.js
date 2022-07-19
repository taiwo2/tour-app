import express from "express";
import { googleSignIn, signin, signup } from "../controller/user.js";
const router = express.Router();
// signup
// router.get('/', );
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/googleSignIn',googleSignIn)
// router.delete('/:id',);

export default router;