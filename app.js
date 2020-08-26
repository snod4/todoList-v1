const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");


const app = express();


mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model("item", itemsSchema);
const WorkItem = mongoose.model("workItems", itemsSchema);







app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))
app.set('view engine', 'ejs');


const items = ["Buy Food", "Love Food"];
const workItems = ["work"];

app.get("/", function(req, res) {
  const today = new Date();




  const day = date.getDate();

Item.find(function(err, items){
  if(err){
    console.log(err);
  }
  else{
    res.render('list', {
      listTitle: day,
      newListItem: items
    });
  }
});

});


app.post("/", function(req, res) {
  const item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "Work") {
    new WorkItem({name: item}).save();
    res.redirect("/work");
  } else {
    new Item({name: item}).save();
    res.redirect("/");
  };

});


app.get("/work", function(req, res) {
  WorkItem.find(function(err, items){
    if(err){
      console.log(err);
    }
    else{
      
      res.render('list', {
        listTitle: "Work",
        newListItem: items
      });
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
