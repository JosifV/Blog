const controls = require("./controls");

module.exports = app => {
  app.post("/log/:username/:password", controls.logEvent);

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
};
