process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { Transactions, Users, Items, RatingsReviews } = require('../database');


const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const assert = require('assert');
const faker = require('faker');


chai.use(chaiHttp);

let randUser;

describe('Transactions API', () => {
  describe('/GET Transactions', () => {
    before(done => {
      let newTransactions = [];
      let randUser1 = mongoose.Types.ObjectId();
      let randUser2 = mongoose.Types.ObjectId();
      let randItem1 = mongoose.Types.ObjectId();
      let randItem2 = mongoose.Types.ObjectId();

      for (let i = 0; i < 100; i++) {
        let randTransaction = new Transactions({
          from: {
            user_id: randUser1,
            item_id: randItem1
          },
          to: {
            user_id: randUser2,
            item_id: randItem2
          },
          status: 'pending'
        })
        newTransactions.push(randTransaction)
      }
      randUser = randUser1;
      Transactions.insertMany(newTransactions, err => {
        done();
      });
    })
    it('should return 5 transactions when a basic request is made', done => {
      chai.request(server)
        .get(`/transactions?user_id=${randUser}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('results');
          res.body.should.have.property('page');
          res.body.should.have.property('count');
          res.body.page.should.be.eql(0);
          res.body.count.should.be.eql(5);
          res.body.results.length.should.be.eql(5);
          done();
        });
    });
    it('should update the page and count on reponse object', done => {
      let randPage = Math.floor(Math.random() * 2)
      let randCount = Math.floor(Math.random() * 20) + 5
      chai.request(server)
        .get(`/transactions?user_id=${randUser}&page=${randPage}&count=${randCount}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('page');
          res.body.should.have.property('count');
          res.body.page.should.be.eql(randPage);
          res.body.count.should.be.eql(randCount);
          res.body.results.length.should.be.eql(randCount)
          done();
        });
    });
    it('should return results sorted by newest created time', done => {
      chai.request(server)
        .get(`/transactions?user_id=${randUser}&sort=created_at_asc&count=40`)
        .end((err, res) => {
          const lessThan = res.body.results[0].createdAt < res.body.results[30].createdAt
          assert(lessThan)
          done();
        });
    });
    it('should return results sorted by oldest created time', done => {
      chai.request(server)
        .get(`/transactions?user_id=${randUser}&sort=created_at_desc&count=40`)
        .end((err, res) => {
          const greaterThan = res.body.results[0].createdAt > res.body.results[30].createdAt
          assert(greaterThan)
          done();
        });
    });
    it('should return results sorted by recently updated', done => {
      chai.request(server)
        .get(`/transactions?user_id=${randUser}&sort=created_at_desc&count=40`)
        .end((err, res) => {
          const greaterThan = res.body.results[0].updatedAt > res.body.results[30].updatedAt
          assert(greaterThan)
          done();
        });
    });
    after(done => {
      Transactions.deleteMany({}, err => {
        done();
      });
    });
  });

  describe('GET /transactions/user/', () => {
    before(done => {
      const fakeZips = ["08723", "08701", "08742", "08724", "08730", "08736", "08750", "08720"]
      let newUsers = [];
      let newUserIds = []
      for (let i = 0; i < 5; i++) {
        let newUser = new Users({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          location: fakeZips[Math.floor(Math.random() * fakeZips.length)],
          phone: faker.phone.phoneNumberFormat()
        })
        newUsers.push(newUser);
        newUserIds.push(newUser._id)
      }

      Users.insertMany(newUsers);

      let newItems = [];
      let newItemIds = []
      for (let i = 0; i < 10; i++) {
        let newItem = new Items({
          owner: newUserIds[Math.floor(Math.random() * newUserIds.length - 1)],
          name: faker.commerce.productName(),
          type: 'goods',
          availability: true,
          description: faker.commerce.productDescription(),
          image_link: faker.image.imageUrl()
        })
        newItems.push(newItem);
        newItemIds.push(newItem._id);
      }

      Items.insertMany(newItems);

      let newTransactions = [];
      let randUser1 = newUserIds[Math.floor(Math.random() * newUserIds.length - 1)]
      let randUser2 = newItemIds[Math.floor(Math.random() * newItemIds.length - 1)]
      let randItem1 = newUserIds[Math.floor(Math.random() * newUserIds.length - 1)]
      let randItem2 = newItemIds[Math.floor(Math.random() * newItemIds.length - 1)]

      for (let i = 0; i < 10; i++) {
        let randTransaction = new Transactions({
          from: {
            user_id: randUser1,
            item_id: randItem1
          },
          to: {
            user_id: randUser2,
            item_id: randItem2
          },
          status: 'pending'
        })
        newTransactions.push(randTransaction)
      }
      randUser = randUser2;
      Transactions.insertMany(newTransactions, err => {
        done();
      });
    })

    it('should return a successful status code', done => {
      chai.request(server)
        .get(`/transactions/user?user_id=${randUser}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should contain details about the "fromUser"', done => {
      chai.request(server)
        .get(`/transactions/user?user_id=${randUser}`)
        .end((err, res) => {
          console.log(res.body)
          done();
        })
    })

    after(done => {
      Transactions.deleteMany({}, err => {
        Items.deleteMany({}, err => {
          Users.deleteMany({}, err => {
            done();
          });
        });
      });
    });
  });
});