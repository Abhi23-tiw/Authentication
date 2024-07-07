import express, { response } from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sendMail } from '../helper/sendMail.js';
import { forgetPassword } from '../helper/ForgotPassword.js';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
dotenv.config();

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/api/resetPassword/:token',async(req,res)=>{
  const {token} = req.params;
  const {password} = req.body;
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password,10);
    await User.findByIdAndUpdate({_id:id},{password: hashPassword});
    return res.json({status:true,message:"Update Recorded "})
  } catch (error) {
    return res.json("Invalid Token ")
  }
})
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
