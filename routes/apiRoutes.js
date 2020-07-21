var db = require("../models");
// const { regexp } = require("sequelize/types/lib/operators");
const { regexp } = require("sequelize");
// var path = require("path");


module.exports = function (app) {
  // Get all examples
  app.get("/api/items", function (req, res) {
    db.Seller.findAll({}).then(function (dbSellers) {
      res.json(dbSellers);
    });
  });

  // Create a new example
  app.post("/api/item", function (req, res) {
   console.log(JSON.stringify(req.body) + ">>>>>>>>>>")
    db.Seller.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      category: req.body.category,
      productTitle: req.body.title,
      price: req.body.price,
      conditionName: req.body.condition,
      linkToImage: req.body.link,
      description: req.body.description
     
    }).then(dbSellers => {
      console.log("success with new item")
      res.json(dbSellers);
    })
      .catch(err => {
        console.log("Failed to create new item");
        console.log(err)
        res.sendStatus(500);
      })
  });

  app.get("/api/items/:id", function (req, res) {
    db.Seller.findAll({ where: { id: req.params.id } }).then(function (dbSellers) {
      res.json(dbSellers);
    });
  });

  // Delete an example by id
  app.delete("/api/items/:id", function (req, res) {
    db.Seller.destroy({ where: { id: req.params.id } }).then(function (dbSellers) {
      res.json(dbSellers);
    });
  });


  app.put('/api/items/:category', function (req, res) {
    db.Seller.update({ show: false },
      {
        where: {
          show: true
        }
      }
    ).then(function () {
      db.Seller.update({ show: true },
        {
          where: {
            category: req.params.category
          }
        })
        .then(function (event) {
          res.json(event);
        });
    })
  });


  app.get('/api/buy/:id', function (req, res) {

    db.Seller.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (Posts) {
        res.render("buyItem", Posts);
      });
  });
};


