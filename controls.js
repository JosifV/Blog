require("dotenv").config();
const UsersSchema = require("./models");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendWelcomeMail } = require("./functions/emailSender");

// get curent time and date
const date = moment().format("MMMM Do YYYY, h:mm:ss a");

module.exports = {
  logEvent: (req, res, next) => {
    const username = req.params.username;
    const password = req.params.password;
    const email = req.params.email;

    let hashedPassword = "";

    // hash the password for better security
    bcrypt
      .hash(password, 8)
      .then(resp => {
        hashedPassword = resp;
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });

    // find user with this username
    UsersSchema.findOne({ username: username })
      // send it to client browser
      .then(user => {
        // if that user exists then...
        if (user) {
          // compare text password with hashed password fetched from the server
          bcrypt
            .compare(password, user.password)
            .then(resp => {
              // ... check if password matches
              if (resp) {
                // ... if they do log him with json-web-token containing his mongo id
                const token = jwt.sign(
                  { _id: user._id },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "30 days"
                  }
                );
                res.send(["SignIn", token]);
                console.log(resp);
              } else {
                // if they do not match print error message
                res.send("Wrong password");
              }
            })
            .catch(err => {
              // if .compare() thwor some error console log it
              console.log(err);
            });
        }
        // if there are no user by that username...
        else {
          // ... create one...
          UsersSchema.create({
            posts: [],
            username: username,
            password: hashedPassword,
            email: email
          }).then(user => {
            // ... and log him in with json-web-token containing his mongo id
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "30 days"
            });
            sendWelcomeMail(email, username);
            res.send(["SignUp", token]);
          });
        }
      })
      .catch(next);
  },
  home: (req, res, next) => {
    UsersSchema.find({})
      .then(resp => {
        // map all users and...
        const posts = resp.map(x => {
          return x.posts;
        });
        // ... send their posts
        res.send(posts);
      })
      .catch(next);
  },
  getByTitle: (req, res, next) => {
    const title = req.params.title;

    UsersSchema.find({})
      .then(resp => {
        // map all users to get their posts...
        const posts = resp.map(x => {
          return x.posts;
        });
        // posts are arrays containing one array per user
        // so we flaten those arrays into one
        const merged = [].concat.apply([], posts);

        // find all posts with that title, or whose title contains part of that word
        const finalProduct = merged.filter(x => {
          const testExp = new RegExp(title);
          if (testExp.test(x.title)) {
            return x;
          }
        });
        // ... and send those posts
        res.send(finalProduct);
      })
      .catch(next);
  },
  getByAuthor: (req, res, next) => {
    const author = req.params.author;

    UsersSchema.find({})
      .then(resp => {
        // map all users to get their posts...
        const posts = resp.map(x => {
          return x.posts;
        });
        // posts are arrays containing one array per user
        // so we flaten those arrays into one
        const merged = [].concat.apply([], posts);

        // find all posts with that author, or whose author contains part of that word
        const finalProduct = merged.filter(x => {
          const testExp = new RegExp(author);
          if (testExp.test(x.author)) {
            return x;
          }
        });
        // ... and send those posts
        res.send(finalProduct);
      })
      .catch(next);
  },
  getByCathegory: (req, res, next) => {
    const cathegory = req.params.cathegory;

    UsersSchema.find({})
      .then(resp => {
        // map all users to get their posts...
        const posts = resp.map(x => {
          return x.posts;
        });
        // posts are arrays containing one array per user
        // so we flaten those arrays into one
        const merged = [].concat.apply([], posts);

        // find all posts with that cathegory, or whose cathegory contains part of that word
        const finalProduct = merged.filter(x => {
          const testExp = new RegExp(cathegory);
          if (testExp.test(x.cathegory)) {
            return x;
          }
        });
        // ... and send those posts
        res.send(finalProduct);
      })
      .catch(next);
  },
  getByContainingWord: (req, res, next) => {
    const containing = req.params.containing;

    UsersSchema.find({})
      .then(resp => {
        // map all users to get their posts...
        const posts = resp.map(x => {
          return x.posts;
        });
        // posts are arrays containing one array per user
        // so we flaten those arrays into one
        const merged = [].concat.apply([], posts);

        // find all posts whose body containt that word, or part of that word
        const finalProduct = merged.filter(x => {
          const testExp = new RegExp(containing);
          if (testExp.test(x.body)) {
            return x;
          }
        });
        // ... and send those posts
        res.send(finalProduct);
      })
      .catch(next);
  },

  create: (req, res, next) => {
    const title = req.params.title;
    const author = req.params.author;
    const cathegory = req.params.cathegory;
    const body = req.params.body;
    const userId = req.params.userId;

    UsersSchema.findById(userId)
      .then(resp => {
        // user posts
        let postArr = [...resp.posts];
        // add one more post to that array
        postArr.push({
          title: title,
          author: author,
          cathegory: cathegory,
          body: body,
          date: date
        });
        // and update posts of that user
        UsersSchema.findByIdAndUpdate(userId, {
          $set: {
            posts: postArr
          }
        })
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
        res.send(resp);
      })
      .catch(next);
  },
  editPost: (req, res, next) => {
    const editedPost = req.body;
    const postId = req.params.postId;
    const userId = req.params.userId;

    UsersSchema.findById(userId)
      .then(resp => {
        // posts of that user
        let postArr = [...resp.posts];
        // all posts that will not be changed
        let allOtherPosts = postArr.filter(obj => {
          return obj._id != postId;
        });
        // one post that will be changed
        let searchedPost = postArr.filter(obj => {
          return obj._id == postId;
        });
        // merge that post with new values
        const updatedPost = Object.assign(searchedPost[0], editedPost);

        // and add that post to array of unchanged posts
        allOtherPosts.push(updatedPost);
        // and update posts of that user
        UsersSchema.findByIdAndUpdate(userId, {
          $set: {
            posts: allOtherPosts
          }
        })
          .then(resp => {
            res.send(resp);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(next);
  },
  deletePost: (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.params.userId;

    UsersSchema.findById(userId)
      .then(resp => {
        // posts of that user
        let postArr = [...resp.posts];
        // all posts that will not be changed
        let allOtherPosts = postArr.filter(obj => {
          return obj._id != postId;
        });
        // and update posts of that user
        UsersSchema.findByIdAndUpdate(userId, {
          $set: {
            posts: allOtherPosts
          }
        })
          .then(resp => {
            res.send(resp);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(next);
  },
  postComment: (req, res, next) => {
    const postId = req.params.postid;
    const userId = req.params.userId;
    const newComment = req.body;

    newComment.date = date;

    UsersSchema.findById(userId)
      .then(resp => {
        // all posts of that user
        let postArr = [...resp.posts];
        // find post that someone wants to comment
        let searchedPost = postArr.filter(obj => {
          return obj._id == postId;
        });
        // all other posts of that user
        let allOtherPost = postArr.filter(obj => {
          return obj._id != postId;
        });
        // array of existing comments from selected post
        let comments = [...searchedPost[0].comments];
        // push new comment to it
        comments.push(newComment);
        // post to be commented
        let postToBeCommented = searchedPost[0];
        // update its comment array with new array
        postToBeCommented.comments = comments;
        // finaly merge unchanged posts with the one that was commented
        const updatedPostArr = allOtherPost.concat(postToBeCommented);
        // and update user posts
        UsersSchema.findByIdAndUpdate(userId, {
          $set: {
            posts: updatedPostArr
          }
        })
          .then(resp => {
            res.send(resp);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(next);
  },
  editComment: (req, res, next) => {
    const commentid = req.params.commentid;
    const postId = req.params.postId;
    const userId = req.params.userId;
    const newComment = req.body;

    newComment.date = date;

    UsersSchema.findById(userId)
      .then(resp => {
        // posts of that user
        let postArr = [...resp.posts];
        // post that not contain comment we want to change
        let allOtherPost = postArr.filter(obj => {
          return obj._id != postId;
        });
        // post that contains comment we want to change
        let searchedPost = postArr.filter(obj => {
          return obj._id == postId;
        });
        // comments of that post
        let comments = [...searchedPost[0].comments];
        // comment we want to change
        let searchedComment = comments.find(obj => {
          return obj._id == commentid;
        });
        // merge this comment with new values
        const updtedComment = Object.assign(searchedComment, newComment);
        // merge updated comment with the rest of the comments
        const finalComments = Object.assign(comments, updtedComment);
        // update searched posts comments
        searchedPost.comments = finalComments;
        // finnaly merge changed post with unchanged posts
        const finalArrOfPosts = allOtherPost.concat(searchedPost[0]);
        // and update that post in db
        /* UsersSchema.findOneAndUpdate(
          { "posts._id": postId }, */
        UsersSchema.findByIdAndUpdate(userId, {
          $set: {
            posts: finalArrOfPosts
          }
        })
          .then(resp => {
            res.send(resp);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(next);
  },
  deleteComment: (req, res, next) => {
    const commentid = req.params.commentid;
    const postId = req.params.postId;
    const userId = req.params.userId;

    UsersSchema.findById(userId)
      .then(resp => {
        // posts of selected user
        let arrOfPosts = [...resp.posts];
        // post that contains comment we want to delete
        let searchedPost = arrOfPosts.filter(obj => {
          return obj._id == postId;
        });
        // comments of that post
        let arrOfComments = [...searchedPost[0].comments];
        // comments that will not be deleted
        let allOtherComments = arrOfComments.filter(obj => {
          return obj._id != commentid;
        });
        // assign those comments as new array
        searchedPost[0].comments = allOtherComments;
        // all posts that was not changed
        let allOtherPost = arrOfPosts.filter(obj => {
          return obj._id != postId;
        });
        // finaly merge unchanged posts with the changed one
        const finalArrOfPosts = allOtherPost.concat(searchedPost[0]);
        // and update user posts
        UsersSchema.findByIdAndUpdate(userId, {
          $set: {
            posts: finalArrOfPosts
          }
        })
          .then(resp => {
            res.send(resp);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(next);
  },
  uploadImg: (req, res, next) => {
    const userId = req.params.userId;

    // assign uploaded image to database
    UsersSchema.findByIdAndUpdate(userId, {
      $set: {
        userImg: req.file.buffer
      }
    })
      .then(resp => {
        console.log(resp);
        res.send();
      })
      .catch(next);
  }
};
