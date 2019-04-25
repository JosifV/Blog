const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requirements = {
  type: String,
  trim: true,
  required: true
};
const Comments = new Schema({
  author: requirements,
  date: "",
  body: requirements
});

const Posts = new Schema({
  title: requirements,
  author: requirements,
  cathegory: requirements,
  body: requirements,
  date: "",
  comments: [Comments]
});

const Users = new Schema({
  username: requirements,
  password: {
    ...requirements,
    validate(value) {
      if (value.length < 6) {
        throw new Error("Password must be longer that 6 characters");
      }
    }
  },
  posts: [Posts]
});

const UsersSchema = mongoose.model("users", Users);
module.exports = UsersSchema;
