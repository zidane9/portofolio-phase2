'use strict'

const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);

let User = require('../models/user');
let server = require('../app');

describe('User Testing', () => {
  let token = null;
  beforeEach(function(done){
    //token dummy for testing
    token = generateTokenDummy();

    let newUser = new User({
      "username": "john",
      "password": "doe",
      "role": "admin",
      "name": "John Doe",
      "email": "john@doe.com",
      "phone": "08119092811"
    });
    newUser.save(function(err, user){
      let newUser2 = new User({
        "username": "jess",
        "password": "123",
        "role": "secretary",
        "name": "Jessica Alba",
        "email": "jess@alba.com",
        "phone": "08119092822"
      });
      newUser2.save(function(err, user){
        done();
      });
    });

  });

  afterEach(function(done){
    User.remove({}, (err)=>{
      done();
    });
  });

  // describe('GET /users', () =>{
  //   it('should return token', (done)=>{
  //     chai.request('http://localhost:3000')
  //     .post('/login')
  //     // .field('myparam' , 'test')
  //     .send({username: 'john', password: 'doe'})
  //     .end((err,res)=>{
  //       if(err){
  //         console.log('error', err);
  //       } else {
  //         console.log('res body ', res.body);
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');
  //         // res.body.length.should.equal(1);
  //       }
  //       done();
  //     })
  //   })
  // })


  describe('GET /users', () =>{
    it('should return all users', (done)=>{
      chai.request('http://localhost:3000')
      .get('/users')
      .set('token', token)
      .end((err,res)=>{
        // console.log('--',token);
        // if(err){
        //   console.log('error', err);
        // } else {
          // console.log('res body ', res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(2);
        // }
        done();
      })
    })
  })

  describe('POST /users', () =>{
    it('should create and return new user', (done)=>{
      chai.request('http://localhost:3000')
      .post('/users')
      // .field('myparam' , 'test')
      .send({
        name: "Anna Lvitova",
        username: "anna",
        password: "123",
        email: "anna@ymail.com",
        phone: "0811223300",
        role: "secretary"
      })
      .end((err,res)=>{
        // if(err){
        //   console.log('error', err);
        // } else {
          // console.log('res body ', res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          // res.body.should.have.property('success');
          res.body.should.not.have.property('errors');
          res.body.should.not.have.property('errmsg');
          res.body.name.should.equal("Anna Lvitova");
          res.body.username.should.equal("anna");
          res.body.email.should.equal("anna@ymail.com");
          res.body.phone.should.equal("0811223300");
          res.body.role.should.equal("secretary");
          res.body.password.should.not.equal("123");
        // }
        done();
      })
    })
    it('should not create new user with no username defined', (done)=>{
      chai.request('http://localhost:3000')
      .post('/users')
      .send({
        name: "John Travolta",
        password: "123",
        email: "john@ymail.com",
        phone: "0811223300",
        role: "secretary"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('username');
        done();
      })
    })
    it('should not create new user with no password defined', (done)=>{
      chai.request('http://localhost:3000')
      .post('/users')
      .send({
        name: "John Travolta",
        username: "travo",
        email: "john@ymail.com",
        phone: "0811223300",
        role: "secretary"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('password');
        done();
      })
    })
    it('should not create new user with username duplicate', (done)=>{
      chai.request('http://localhost:3000')
      .post('/users')
      // .field('myparam' , 'test')
      .send({
        name: "John Travolta",
        username: "john",
        password: "123",
        email: "john@ymail.com",
        phone: "0811223300",
        role: "secretary"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errmsg');
        // res.body.errors.should.have.property('errmsg');

        done();
      })
    })
  })

  describe('PUT /users/:username', () =>{
    it('should update user', (done)=>{
      chai.request('http://localhost:3000')
      .put('/users/'+'john')
      .set('token', token)
      .send({
        name: "Johna Travolta",
        username: "john",
        password: "12345",
        email: "johna@ymail.com",
        phone: "0811223301",
        role: "admin"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.not.have.property('errors');
        res.body.should.not.have.property('errmsg');
        res.body.name.should.equal("Johna Travolta");
        res.body.username.should.equal("john");
        res.body.email.should.equal("johna@ymail.com");
        res.body.phone.should.equal("0811223301");
        res.body.role.should.equal("admin");
        res.body.password.should.not.equal("12345");

        done();
      })
    })
    it('should not update username with duplicate username', (done)=>{
      chai.request('http://localhost:3000')
      .put('/users/'+'jess')
      .set('token', token)
      .send({
        username: "john"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.username.should.equal("jess");

        done();
      })
    })
    it('should not update user with username not found', (done)=>{
      chai.request('http://localhost:3000')
      .put('/users/'+'frank')
      .set('token', token)
      .send({
        email: "johna@ymail.com"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');

        done();
      })
    })
  })

  describe('DELETE /users/:username', () =>{
    it('should delete a user', (done)=>{
      chai.request('http://localhost:3000')
      .delete('/users/'+'john')
      .set('token', token)
      .end((err,res)=>{
          // console.log('res body ', res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.not.have.property('errors');
          res.body.should.not.have.property('errmsg');
          res.body.should.have.property('ok').eql(1);
          res.body.should.have.property('n').eql(1);
        done();
      })
    })
    it('should not delete a user if user not found', (done)=>{
      chai.request('http://localhost:3000')
      .delete('/users/'+'nami')
      .set('token', token)
      .end((err,res)=>{
          // console.log('res body ', res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.not.have.property('errors');
          res.body.should.not.have.property('errmsg');
          res.body.should.have.property('ok').eql(1);
          res.body.should.have.property('n').eql(0);
        done();
      })
    })
  })

  function generateTokenDummy(){
    return jwt.sign({username: "john", role: "admin"}, process.env.SECRETKEYS);
  }

})
