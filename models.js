const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requirements = {
  type: String,
  trim: true,
  required: true
};
const Comments = new Schema(
  {
    author: requirements,
    date: "",
    body: requirements
  },
  {
    timestamps: true
  }
);

const Posts = new Schema(
  {
    title: requirements,
    author: requirements,
    cathegory: requirements,
    body: requirements,
    date: "",
    comments: [Comments]
  },
  {
    timestamps: true
  }
);

const Users = new Schema(
  {
    username: requirements,
    password: {
      ...requirements,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Password must be longer that 6 characters");
        }
      }
    },
    posts: [Posts],
    userImg: {
      type: Buffer
    },
    email: {
      ...requirements,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      }
    }
  },
  {
    timestamps: true
  }
);

const UsersSchema = mongoose.model("users", Users);
module.exports = UsersSchema;
