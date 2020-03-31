const router = require("express").Router();
const Dictionary = require("../models/dictionary.model");

router.route("/").get((req, res) => {
  Dictionary.find()
    .then(dictionary => res.json(dictionary))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/search/:query").get((req, res) => {
  var query = req.params.query;
  Dictionary.find({
    $text: {
      $search: query
    }
  })
    .then(data => {
      if (data.length != 0) {
        res.json(data);
      } else {
        res.json("No data found");
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const meaning = req.body.meaning;

  Dictionary.find({
    $text: {
      $search: name
    }
  })
    .then(data => {
      if (data.length != 0) {
        res.json("Same name found!!");
        console.log("Same name found!!");
      } else {
        console.log("No same name found, Add!");

        const newDictionary = new Dictionary({
          name,
          meaning
        });

        newDictionary
          .save()
          .then(() => res.json("Dictionary added!"))
          .catch(err => res.status(400).json("Error:" + err));
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
