import mongoose from 'mongoose';

/**
 * Establish connection to MongoDB Atlas.
 */
export const establishMongoDBConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://benny:dhbw_exam@cluster0.t5z8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );
    console.log('Connected to MongoDB.');
  } catch (err) {
    console.error(err);
  }
};
