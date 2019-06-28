const express=require('express');
const bodyParser=require('body-parser');
const user=require('./routes/user.js');
const product=require('./routes/product');
var app=express();
app.listen(8080);
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(express.static("jfxShopping"));
app.use("/user",user);
app.use('/product',product);