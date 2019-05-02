const controls = require("./controls");
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000 // limit file size to 1 mb
  },
  fileFilter(req, file, cb) {
    // check file type, it is ok if .jpg .jpeg .png
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // if filter failed send error
      return cb(new Error("Please upload jpg, jpeg or png image"));
    }
    // if all is well send true
    cb(undefined, true);
  }
});
module.exports = app => {
  app.post("/log/:username/:password/:email", controls.logEvent);

  app.get("/", controls.home);

  app.get("/title/:title", controls.getByTitle);

  app.get("/author/:author", controls.getByAuthor);

  app.get("/cathegory/:cathegory", controls.getByCathegory);

  app.get("/containing/:containing", controls.getByContainingWord);

  app.post("/create/:title/:author/:cathegory/:body/:userId", controls.create);

  app.patch("/editpost/:postId/:userId", controls.editPost);

  app.delete("/deletepost/:postId/:userId", controls.deletePost);

  app.post("/comment/:postid/:userId", controls.postComment);

  app.patch("/editcomment/:postId/:userId/:commentid", controls.editComment);

  app.delete(
    "/deletecomment/:postId/:userId/:commentid",
    controls.deleteComment
  );
  app.post(
    "/upload/:userId",
    upload.single("nameOfUpload"),
    controls.uploadImg,
    // this function renders error message
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );
  app.delete("/deleteuser/:userId", controls.deleteUser);
};
