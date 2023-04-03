import express from "express"
import fetch from "node-fetch"
import cors from "cors"

import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}



const API = process.env.NASA_API



const app = express()
app.use(cors())


app.get('/', (req, res)=>{
    res.send("The Curiosity Server")
})

app.get('/search', async (req,res)=>{
    const cam = req.query.cam
    const sol = req.query.sol
    const rover = req.query.rover
    const result = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${cam}&api_key=${API}`);
    const parsedData = await result.json()
    res.send(parsedData)

})








app.listen(3000, ()=>{console.log("app is listening in port 3000")})