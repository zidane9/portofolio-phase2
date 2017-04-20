'use strict'

const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);

let Kota = require('../models/kota');
let server = require('../app');

describe('Kota Testing', () => {
  let token = null;
  beforeEach(function(done){
    //token dummy for testing
    token = generateTokenDummy();

    let newKota = new Kota({
      "kota_id": "1",
      "kota_name": "Bandung",
      "img": "url"
    });
    newKota.save(function(err, user){
      let newKota2 = new Kota({
        "kota_id": "2",
        "kota_name": "Jakarta",
        "img": "urls"
      });
      newKota2.save(function(err, user){
        done();
      });
    });

  });

  afterEach(function(done){
    Kota.remove({}, (err)=>{
      done();
    });
  });

  describe('GET /kota', () =>{
    it('should return all kota', (done)=>{
      chai.request('http://localhost:3000')
      .get('/kota')
      .set('token', token)
      .end((err,res)=>{
        // console.log('--',token);
        if(err){
          console.log('error', err);
        } else {
          // console.log('res body ', res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(2);
        }
        done();
      })
    })
  })

  describe('POST /kota', () =>{
    it('should create and return new kota', (done)=>{
      chai.request('http://localhost:3000')
      .post('/kota')
      // .field('myparam' , 'test')
      .send({
        kota_id: "3",
        kota_name: "Semarang",
        img: "sesuatu"
      })
      .end((err,res)=>{
        if(err){
          console.log('error', err);
        } else {
          // console.log('res body', res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          // res.body.should.have.property('success');
          res.body.should.not.have.property('error');
          res.body.kota_id.should.equal("3");
          res.body.kota_name.should.equal("Semarang");
          res.body.img.should.equal("sesuatu");
        }
        done();
      })
    })
    it('should not create new kota with no kota_id defined', (done)=>{
      chai.request('http://localhost:3000')
      .post('/kota')
      .send({
        kota_name: "Jakarta",
        img: "sesuatu"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('kota_id');
        done();
      })
    })
    it('should not create new user with no kota_name defined', (done)=>{
      chai.request('http://localhost:3000')
      .post('/kota')
      .send({
        kota_id: "2",
        img: "sesuatu"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('kota_name');
        done();
      })
    })
    it('should not create new kota with kota_id duplicate', (done)=>{
      chai.request('http://localhost:3000')
      .post('/kota')
      // .field('myparam' , 'test')
      .send({
        kota_id: "2",
        kota_name: "Jakarta",
        img: "urls"
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

  describe('PUT /kota/:kota_id', () =>{
    it('should update and return updated kota', (done)=>{
      chai.request('http://localhost:3000')
      .put('/kota/' + '1')
      .set('token', token)
      .send({
        kota_id: "1",
        kota_name: "Jakarta",
        img: "test"
      })
      .end((err,res)=>{
          // console.log('res body', res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          // res.body.should.have.property('success');
          res.body.should.not.have.property('errors');
          res.body.kota_id.should.equal("1");
          res.body.kota_name.should.equal("Jakarta");
          res.body.img.should.equal("test");
        done();
      })
    })
    it('should not update kota_id with duplicate kota_id', (done)=>{
      chai.request('http://localhost:3000')
      .put('/kota/'+'2')
      .set('token', token)
      .send({
        kota_id: "1"
      })
      .end((err,res)=>{
        // console.log('res body ', res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errmsg');

        done();
      })
    })
  })

  describe('DELETE /kota/:kota_id', () =>{
    it('should delete a kota', (done)=>{
      chai.request('http://localhost:3000')
      .delete('/kota/' + '2')
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
    it('should not delete a kota if kota not found', (done)=>{
      chai.request('http://localhost:3000')
      .delete('/kota/'+'5')
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
