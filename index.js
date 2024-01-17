import { config } from 'dotenv'
config()
import app from "./app.js";

import dbconnection from "./config/DBconnection.js";
const PORT = process.env.PORT || 2000

dbconnection()
 .then(()=>{
  console.log("connect to db")
 })

app.listen(PORT,()=>{
 console.log(`server is runnig at http://localhost:${PORT}`)


})
 