import app from "./app.js";
const PORT = process.env.PORT || 2000
app.listen(PORT,()=>{
 console.log(`server is runnig at http://localhost:${PORT}`)


})
