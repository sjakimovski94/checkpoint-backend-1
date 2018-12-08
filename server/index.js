let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://s.jakimovski94:m4k3d0n3c@ds229474.mlab.com:29474/checkpoint-1");
var csv = require("csvtojson");
const fetch = require('node-fetch');


const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());

let csvData = undefined;
csv().fromFile("data.csv").then(function(jsonArrayObj){ 
    csvData = jsonArrayObj[0];
    console.log(csvData);
})

app.get("/newComments",(req,res,next) => {
    return res.json(csvData.new_comments);
});
app.get("/newTasks",(req,res,next) => {
    return res.json(csvData.new_tasks);
});
app.get("/newOrders",(req,res,next) => {
    return res.json(csvData.new_orders);
});
app.get("/tickets",(req,res,next) => {
    return res.json(csvData.tickets);
});

app.get("/dateTime",(req,res,next) => {
    const d = new Date();
    const time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return res.json(time);
});

let MessagesRoutes  = require("./routes/MessagesRoute");
app.use(MessagesRoutes);

let OrdersRoutes  = require("./routes/OrdersRoute");
app.use(OrdersRoutes);

let TasksRoutes  = require("./routes/TasksRoute");
app.use(TasksRoutes);

app.get("/foxes",(req,res,next) => {
    let foxIM = undefined;
    fetch('https://randomfox.ca/floof/')
        .then(res => res.json())
        .then(json => {
            return res.json(json.image);
        });
    
});

//default
app.use((req,res)=>{
    return res.json("Not found! 404")
});


app.listen(3001, (err) => {
if (err) {
  return console.log("Error", err);
}
console.log("Web server is now living in apartment 3001");
})

