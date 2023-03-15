const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/blog", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, resp) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  resp.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);


app.listen(5000);
