const express = require("express");
const router = express.Router();
const Article = require("./../models/article");

router.get("/new", (req, resp) => {
  resp.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, resp) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) resp.redirect("/");
  resp.render("articles/show", { article: article });
});

router.post("/", async (req, resp) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    resp.redirect(`/articles/${article.slug}`);
  } catch (e) {
    console.log(e);
    resp.render("articles/new", { article: article });
  }
});

router.post("/:id", async (req, resp) => {
  console.log(req.params.id)
  await Article.findByIdAndDelete(req.params.id);
  resp.redirect("/");
});

module.exports = router;
