const path = require('path');
const http = require('http');
const express = require('express');
const cors = require("cors");
const app = express();
bodyParser = require('body-parser');
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use('/image',express.static("resources/static/assets/uploads/"));
global.__basedir = __dirname;
global.__baseurl = "http://127.0.0.1:8000"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app);

const db = require("./models/db.js");

db.sequelize.sync({force:false,alter:true}).then(() => {
  console.log("Drop and re-sync db.");
});

app.get('/',function(req,res){
    res.send('hello word')
  })
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/plan.routes")(app);
require("./routes/pin.routes")(app);
require('./routes/watch_video.routes.js')(app);
const PORT =8000 || process.env.PORT
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));