var jwt=require('jsonwebtoken');
var fs=require('fs');

var privateKEY = fs.readFileSync('./app.rsa')
// openssl rsa -in app.rsa -pubout > app.rsa.pub
var publicKEY = fs.readFileSync('./app.rsa.pub')

var JWTOptions = {
  algorithm:  "RS256"
}

let verifyAuthToken = (req, res, next) => {
  let token = req.headers['auth'];
  if (token) {
    jwt.verify(token, publicKEY, JWTOptions, (err, body) => {
      if (err) {
        return res.json({
          message: 'Token is not valid'
        });
      } else {
        res.status(200).json({auth:token});
      req.userId = body.userId
      console.log(body.userId);
      next()
      }
    });
  }
  else {
    return res.json({
      message: 'Auth token is not supplied'
    });
  }
}

let sendAuthToken = (userId,res) => {
    try{
      token = jwt.sign({userId}, privateKEY, JWTOptions)
      return res.json({auth:token});
    } catch {
      return res.send(500).json({
        message: 'Internal Server Error. Please try again later'
      });
    }
  }

module.exports = {
 verifyAuthToken, 
 sendAuthToken
}
