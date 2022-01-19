import mongoose from 'mongoose';
import UserModel from './models/user.model';
import RoomModel from './models/room.model';
import MessageModel from './models/message.model';
import { USERS } from './demo.data';

/**
 * Establish connection to MongoDB Atlas.
 */
export const establishConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://benny:ew5m1BHPC7voOhUB@cluster0.t5z8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
    console.log('Connected to MongoDB.');
  } catch (err) {
    console.error(err);
  }
};

/**
 * Insert demo data.
 */
export const insertDemoData = async () => {
  try {
    USERS.forEach((user) => {
      new UserModel(user)
        .save()
        .then((data: any) => console.log(`User ${data.username} created.`));
    });
  } catch (err) {
    console.error(err);
  }
};
