import mongoose from "mongoose";

const PortSchema = new mongoose.Schema({
  user: {
    type: "ObjectId",
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("post", PostSchema);

export default Post;