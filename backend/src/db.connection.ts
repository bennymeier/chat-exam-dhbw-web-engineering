import mongoose from 'mongoose';

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
