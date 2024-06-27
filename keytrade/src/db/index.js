import mongoose from 'mongoose';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import dotenv from 'dotenv';

dotenv.config();

const dbKey = process.env.ACCESS_KEY;
AdminJS.registerAdapter({ Database, Resource });

const initialize = async () => {
  const db = await mongoose.connect(dbKey);
  console.log(db, 'hello');
  return { db };
};
export default initialize;
