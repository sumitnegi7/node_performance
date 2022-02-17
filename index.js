import express from "express"
import cluster from "cluster";
import {cpus} from "os"


const app = express()

function delay(duration){
    const startTime = Date.now()
    while(Date.now()- startTime< duration){
        // event loop is blocked here
        // sort JSON.stringify  JSON.parse
        // => Multiple node processes(mater => worker)
        // Ref : https://nodejs.org/api/cluster.html
    }
}

app.get("/", (req,res) =>{
    res.send(`performance ex ${process.pid}`)
})


app.get("/timer", (req,res) =>{
    delay(9000);
    res.send(`wait ${process.pid}`)
})

if(!cluster.isWorker){
    console.log("Master started");
    const NUM_WORKER = cpus().length;
    for (let i=0; i<NUM_WORKER; i+=1){
        cluster.fork()
    }
} else{
    console.log("Worker");
    app.listen(3000)
}
