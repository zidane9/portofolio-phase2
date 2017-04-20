require('dotenv').config();
const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech')({
projectId: process.env.PROJECTID,
keyFilename: './keyfile.json'
});
const request = {
  config: {
    encoding: 'LINEAR16',
    sampleRate: 16000,
    languageCode: 'id-ID'
  }
};
var helper = {}
helper.cityFind = function (req,res){
  const recognizeStream = speech.createRecognizeStream(request)
    .on('error', console.error)
    .on('data', (data) => {
      if(data.results != ''){
        res.redirect(`/kota/result?input=${data.results}`)
      }
    });
  record.start({
    sampleRate: 16000,
    threshold: 0})
    .pipe(recognizeStream);
    setTimeout(function () {
      record.stop()
    }, 3000)
  console.log('Listening, press Ctrl+C to stop.');
}

helper.placeFind = function (req,res){
  const recognizeStream = speech.createRecognizeStream(request)
    .on('error', console.error)
    .on('data', (data) => {
      if(data.results != ''){
        res.redirect(`/wisata/result?input=${data.results}`)
      }
    });
  record.start({
    sampleRate: 16000,
    threshold: 0})
    .pipe(recognizeStream);
    setTimeout(function () {
      record.stop()
    }, 3000)
  console.log('Listening, press Ctrl+C to stop.');
}

module.exports = helper
