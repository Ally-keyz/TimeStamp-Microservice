
// importation of modules
const express = require("express");
const app = express();

//urls parser
app.use(express.json());

//define api end points

app.get("/api/:date?",(req,res)=>{
  try {
    const request = req.params.date

    if(!request){
      let now = new Date();
      return res.json({unix:now.getTime(), utc:now.toUTCString()})
    }

    //check if the date input is a number
    let date = isNaN(request) ? new Date(request) : new Date(Number(request));

    //Handle invalid date
    if(date.toString() == "Invalid Date"){
      return res.json({error:"Invalid Date"});
    }

    res.json({unix:date.getTime(), utc: date.toUTCString()});
  } catch (error) {
    console.log("There is an error",error.message);
    return res.json({error:error.message});
  }
});

const port = 3000;
app.listen(port,()=>{
  console.log(`Listening on port ${port}..... `);
})
