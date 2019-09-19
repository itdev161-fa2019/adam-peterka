import mongoose from 'mongoose';
import config from 'config';

//get the connection string
const db = config.get('mongoURI');

//connect to mongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true
    });
    console.log('Connected to MOngoDB');
  } catch (error) {
    console.error(error.message);
    console.log('uhoh');
    //exit with failure code
    process.exit(1);
  }
};

export default connectDatabase;
