import express from 'express';
import dotenv  from 'dotenv';
import {OAuth2Client} from 'google-auth-library';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import expressFileupload from 'express-fileupload';

import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import uploadRouter from './routes/upload.js'
import prodcutRouter from './routes/productRoutes.js'





dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

dotenv.config();
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(cors());
app.use(expressFileupload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}
  
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

//connecting mongoose db
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(()=>{
  console.log(`DB Connect`)
});
mongoose.connection.on('Error',err=>{
  console.log(`Error : ${err.message}`, )
})

app.listen(process.env.PORT || 8000, () => {
    console.log(
      `Server is ready at http://localhost:${process.env.PORT || 8000}`
    );
});


app.use('/user', userRouter);
app.use('/api',categoryRouter);
app.use('/api',uploadRouter);
app.use('/api',prodcutRouter)
