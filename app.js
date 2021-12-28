let express = require('express');
let app = express();

app.use('/public', express.static('public'));


app.engine('html', require('express-art-template'));



var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb'}));

let router = require('./router.js');
app.use(router);


app.listen(3000, function(){
    console.log("The Express app is running at http://127.0.0.1:3000");
});