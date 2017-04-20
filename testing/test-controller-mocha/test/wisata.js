'use strict'

const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);

let Wisata = require('../models/wisata');
let Kota = require('../models/kota');
let server = require('../app');

describe('Wisata Testing', () => {
  let token = null;
  beforeEach(function(done){
    //token dummy for testing
    token = generateTokenDummy();

    let newKota = new Kota({
      "kota_id": "jkt",
      "kota_name": "Jakarta",
      "img": "/img/jkt.jpg"
    });
    newKota.save(function(err, kota){
      let newKota2 = new Kota({
        "kota_id": "dps",
        "kota_name": "Denpasar",
        "img": "/img/dps.jpg"
      });
      newKota2.save(function(err, kota2){
        let newWisata = new Wisata({
          "name": "Waterboom Park PIK",
          "address": "pantai indah kapuk no 50",
          "img": "/img/wisata1.jpg",
          "kota": kota._id
        });
        newWisata.save(function(err, wisata){
          let newWisata2 = new Wisata({
            "name": "Taman Mini",
            "address": "jalan pecenongan no 2",
            "img": "/img/wisata2.jpg",
            "kota": kota._id
          });
          newWisata2.save(function(err, wisata2){
            done();
          })
        })
      })
    });

  });

  afterEach(function(done){
    Wisata.remove({}, (err)=>{
      Kota.remove({}, (err)=>{
        done();
      })
    });
  });

  describe('GET /wisata', () =>{
    it('should return all wisata', (done)=>{
      chai.request('http://localhost:3000')
      .get('/wisata')
      .set('token', token)
      .end((err,res)=>{
          // console.log('res body ', res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(2);
        done();
      })
    })
  })

  describe('POST /wisata', () =>{
    it('should create and return new wisata', (done)=>{
      let newKota = new Kota({
        "kota_id": "dpo",
        "kota_name": "Depok",
        "img": "/img/dpo.jpg"
      });
      newKota.save(function(err, kota){
        chai.request('http://localhost:3000')
        .post('/wisata')
        .send({
          "name": "Waterboom Park PIK",
          "address": "pantai indah kapuk no 50",
          "img": "/img/wisata1.jpg",
          "kota": kota._id
        })
        .end((err,res)=>{
            // console.log('res body ', res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.not.have.property('errors');
          res.body.should.not.have.property('errmsg');
          res.body.should.have.property('kota');
          res.body.name.should.equal("Waterboom Park PIK");
          res.body.address.should.equal("pantai indah kapuk no 50");
          res.body.img.should.equal("/img/wisata1.jpg");
          done();
        })
      });
    })
    it('should not create new wisata with no name defined', (done)=>{
      let newKota = new Kota({
        "kota_id": "dpo",
        "kota_name": "Depok",
        "img": "/img/dpo.jpg"
      });
      newKota.save(function(err, kota){
        chai.request('http://localhost:3000')
        .post('/wisata')
        .send({
          "address": "pantai indah kapuk no 50",
          "img": "/img/wisata1.jpg",
          "kota": kota._id
        })
        .end((err,res)=>{
            // console.log('res body ', res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('name');
          done();
        })
      });
    })
    it('should not create new wisata with no kota defined', (done)=>{
      let newKota = new Kota({
        "kota_id": "dpo",
        "kota_name": "Depok",
        "img": "/img/dpo.jpg"
      });
      newKota.save(function(err, kota){
        chai.request('http://localhost:3000')
        .post('/wisata')
        .send({
          "name": "Waterboom Park PIK",
          "address": "pantai indah kapuk no 50",
          "img": "/img/wisata1.jpg"
        })
        .end((err,res)=>{
            // console.log('res body ', res.body);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('kota');
          done();
        })
      });
    })

    describe('PUT /wisata/:id', () =>{
      it('should update wisata', (done)=>{
        let newKota = new Kota({
          "kota_id": "tan",
          "kota_name": "Tangerang",
          "img": "/img/tan.jpg"
        });
        newKota.save(function(err, kota){
          let newWisata = new Wisata({
            "name": "Waterboom Park Tan",
            "address": "jalan wijaya no 2",
            "img": "/img/wisata3.jpg",
            "kota": kota._id
          });
          newWisata.save(function(err, wisata){
            chai.request('http://localhost:3000')
            .put('/wisata/'+ wisata._id)
            .set('token', token)
            .send({
              "name": "Water Park",
              "address": "jalan wijaya no 3",
              "img": "/img/wisata5.jpg"
            })
            .end((err,res)=>{
              // console.log('res body ', res.body);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.not.have.property('errors');
              res.body.should.not.have.property('errmsg');
              res.body.name.should.equal("Water Park");
              res.body.address.should.equal("jalan wijaya no 3");
              res.body.img.should.equal("/img/wisata5.jpg");

              done();
            })
          })
        })
      })
      it('should not update wisata with wisata not found', (done)=>{
        chai.request('http://localhost:3000')
        .put('/wisata/'+'58e73285580d1e186b7c9d64')
        .set('token', token)
        .send({
          "name": "Water Park",
          "address": "jalan wijaya no 3",
          "img": "/img/wisata5.jpg"
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

    describe('DELETE /wisata/:id', () =>{
      it('should delete a wisata', (done)=>{
        let newKota = new Kota({
          "kota_id": "tan",
          "kota_name": "Tangerang",
          "img": "/img/tan.jpg"
        });
        newKota.save(function(err, kota){
          let newWisata = new Wisata({
            "name": "Waterboom Park Tan",
            "address": "jalan wijaya no 2",
            "img": "/img/wisata3.jpg",
            "kota": kota._id
          });
          newWisata.save(function(err, wisata){
            chai.request('http://localhost:3000')
            .delete('/wisata/'+ wisata._id)
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
        });
      })
      it('should not delete a wisata if wisata not found', (done)=>{
        chai.request('http://localhost:3000')
        .delete('/wisata/'+'58e73285580d1e186b7c9d64')
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

  });

  function generateTokenDummy(){
    return jwt.sign({username: "john", role: "admin"}, process.env.SECRETKEYS);
  }

})
