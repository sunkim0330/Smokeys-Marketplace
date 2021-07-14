/**
 * @dev Importing database schemas from ./database/index.js
 */
const { Users, Items, Transactions } = require('../database');
const { Types } = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const _memo = {}; // used to memoize zipcode API call for efficiency of requests in quantity and res time

/**
 * @dev This function will GET and return all items in a paginated format.
 * @param { page } req.body Selects the page of results to return. Default 0
 * @param { count } req.body Specifies how many results per page to return. Default 10
 * @param { user_object_id } req.body Specifies the current user. Prevents one's own items from rendering.
 * @param { location } req.body Specifies geographic locale for which to render items.
 * @param { radius } req.body Specifies geographic radius from which to grab zip codes (in miles).
 * @param {*} res On successful GET a 200 status code will be sent
 */
const getItems = async (req, res) => {

  let page = Number(req.body.page) || 0;
  let count = Number(req.body.count) || 10;
  let owner = req.body.user_object_id;
  let location = req.body.location;
  let radius = req.body.radius || 5;
  let sort = { updatedAt : -1 };

  function getZipcodes(location) {
    if (_memo[location]) return _memo[location]
    return _memo[location] = axios.get(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_API_KEY}/radius.json/${location}/${radius}/miles?minimal`);
  }

  let zipcodes = await getZipcodes(location)
  // let zipcodes = await axios.get(`https://www.zipcodeapi.com/rest/${process.env.ZIPCODE_API_KEY}/radius.json/${location}/${radius}/miles?minimal`)

  let data_objects = await Items.aggregate( [ { $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "user_docs" } } ] )
    .limit(count)
    .skip(page * count)
    .sort(sort);

  let response = data_objects.filter(datums => {
    return (datums.owner !== owner) && (datums.availability === true) && (zipcodes.data.zip_codes.includes(datums.user_docs[0].location))
  })

  res.status(200).send(response);
}

/**
 * @dev This function will GET and return all items associated with the given user_id
 * @param { user_object_id } req.params email: Selects the page of results to return.
 * @param {*} res On successful GET a 200 status code will be sent
 */
const getUserItems = async (req, res) => {

  let user_object_id = req.params.user_object_id;
  let sort = { updatedAt : -1 };

  let fetchUserItems = await Items.find({ owner: user_object_id })
    .sort(sort);

  response = fetchUserItems;
  res.status(200).send(response);
}

/**
 * @dev This function will POST a new item to a given user
 * @param { user_object_id } req.params email: Selects the user onto which the item will be added.
 * @param { name, type, description, image_link } req.body required: name; relevant item details. 
 * @param {*} res On successful GET a 201 status code will be sent. On error, 422.
 */
const addItem = async (req, res) => {
  
  // let { name, type, description, image_link } = req.body;

  const newItem = new Items({
    owner: req.params.user_object_id,
    name: req.body.name,
    type: req.body.type,
    availability: true,
    description: req.body.description,
    image_link: req.body.image_link
  })

  newItem.save()
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(422))
}

/**
 * @dev This function will PUT an updated availability on a given item.
 * @param { item_object_id } req.params Required. Selects item to update.
 * @param { availability } req.body Required. New availability of selected item.
 * @param {*} res On successful POST a 204 status code will be sent. On error, 422.
 */
const updateAvailability = async (req, res) => {
  
  let availability = req.body.availability;

  Items.updateOne({ _id: new Types.ObjectId(req.params.item_object_id) },
    { $set:
      { availability: availability }
    })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(422))
}

module.exports = {
    getItems,
    getUserItems,
    addItem,
    updateAvailability
}