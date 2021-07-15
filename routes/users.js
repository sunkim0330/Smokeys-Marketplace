const { Users } = require('../database');
const { Types } = require('mongoose');

const getUserInfo = async (req, res) => {
  const response = {
    user_id: req.params.id,
    results: []
  }
  let findUser = await Users.find({ _id: req.params.id});

  response.results = findUser;

  res.status(200).send(response);
}

const createNewUser = async (req, res) => {

  let newUser = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location
  })

  newUser.save()
  .then((result) => {
    res.status(201).send(result)
    return;
  })
  .catch(() => res.sendStatus(400))
}

const updateUserInfo = async (req, res) => {
  let filter = { _id: req.params.id};
  let update = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location
  }

  const updateInfo = await Users.updateOne(filter, update, {new: true}, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });

}

module.exports = {
  getUserInfo,
  createNewUser,
  updateUserInfo }