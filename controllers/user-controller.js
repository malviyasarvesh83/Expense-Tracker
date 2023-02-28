const User = require('../models/user');

exports.getUser = (req, res, next) => {
    User.findAll().then((result) => {
        return res.json(result);
    }).catch((err) => {
        console.log(err);
    })
}

exports.postUser = (req, res, next) => {
  console.log("Body : ", req.body);
  const amount = req.body.amount;
  const category = req.body.category;
  const description = req.body.description;
  User.create({
    amount: amount,
    category: category,
    description: description,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId).then((user) => {
        user.destroy();
        res.status(200).json(user);
    }).catch((err) => {
        console.log(err);
    });
}

exports.getEditUser = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        console.log(err);
    });
}

exports.postEditUser = (req, res, next) => {
    const userId = req.params.id;
    const updatedAmount = req.body.amount;
    const updatedCategory = req.body.category;
    const updatedDescription = req.body.description;
    User.findByPk(userId).then((user) => {
        user.amount = updatedAmount;
        user.category = updatedCategory;
        user.description = updatedDescription;
        user.save();
        res.status(200).send(user);
    }).catch((err) => {
        console.log(err);
    });
}