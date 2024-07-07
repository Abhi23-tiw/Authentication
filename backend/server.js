import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/userModel.js';
import { forgetPassword } from './helper/ForgotPassword.js';
import { sendMail } from './helper/sendMail.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/password-reset',forgetPassword)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


app.post("/forgot-password",async(req,res)=>{
  const {email} = req.body;
  try {
    const oldUser = await User.findOne({email});
    if(!oldUser){
      return res.json({status: "User doesn't exist "});
    }
    const secret = JWT_SECRET + oldUser.passsword;
    const token = jwt.sign({email: oldUser.email,id:oldUser._id},secret,{
      expiresIn: "5m",
    });
    const link =- `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    console.log(link);
  } catch (error) {
  }
})

app.get('/reset-password',async(req,res)=>{
  const {id,token}  = req.params;
  console.log(req.params);
})

