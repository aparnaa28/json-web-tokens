var express=require('express');
var sendAuthToken=require('./auth').sendAuthToken;
var verifyAuthToken=require('./auth').verifyAuthToken;

var app=express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api',(req,res)=>{
    res.json({
        text:"my api"
    })
})

app.post('/api/login',(req,res)=>{


    //check if req.uuid nil
    //get phone num from body
    //http request 2factor.in
    //if response != 200, json (error)
    //if response 200, json(session_id)

    const userid=3;
    sendAuthToken(userid,res);
})

app.post('/api/verify-otp',verifyAuthToken,(req,res)=>{

    //check if req.uuid nil
    //get session_id and otp from body
    //http request 2factor.in send params session_id and otp || get mobile number using session id from mongo
    //promise.all
    //if response not 200, json(error)
    //if response 200, get officer (uuid) using mobile number
    //sendAuthToken(uuid, res);

console.log("OK");
})




app.listen(3000);
