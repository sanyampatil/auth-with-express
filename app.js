import express from 'express'

const app = express()

app.use('/',(req,res)=>{
 res.status(200).json({data:"JWT auth sever"})

})

export default app