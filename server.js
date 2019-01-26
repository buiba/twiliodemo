var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/Voice", function (req, res){
    res.set('Content-Type', 'text/xml');
    const VoiceReponse = require('twilio').twiml.VoiceReponse;
    const twiml = new VoiceReponse();
    var recordURL =req.protocol + '://' + req.get('host')  + '/Recorder';
    twiml.play("https://firebasestorage.googleapis.com/v0/b/callcenter2-79faf.appspot.com/o/audio%2Fdefault_greetting.mp3");
    twiml.record({
        recordingStatusCallBack: recordURL,
        method: 'GET',
    });
    res.end(twiml,toString());
});
app.post("/Recorded", function(req, res){
    res.end();
    console.log(req.body)
});
app.use("/", function(req, res){
    res.end("default route");
});
var server = app.listen(process.env.PORT || 8080, function(){
});