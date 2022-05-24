import express from "express"
// import cluster from "cluster";
// import {cpus} from "os"
import fs from "fs"
import dotenv from "dotenv";
import {SecretsManager} from "@aws-sdk/client-secrets-manager";
const client = new SecretsManager({ region: "ap-south-1" });

// const params= {
//         region : "ap-south-1",
//         secretName : "arn:aws:secretsmanager:ap-south-1:148515099987:secret:mysecrets-AfSyL3",
//         secret: "mysecrets",
//         // decodedBinarySecret,
// }
// async/await.

const retrieveSecrets = async() => {
    try {

        const data = await client.getSecretValue({SecretId:"mysecrets"})
      
        console.log(data)
      
        const secretsJSON = JSON.parse(data.SecretString);
      
        let secretsString = "";
        Object.keys(secretsJSON).forEach((key) => {
            secretsString += `${key}=${secretsJSON[key]}\n`;
        });
        console.log(secretsString)
        return secretsString
        // process data.
      } catch (error) {
          console.log(error)
        // error handling.
      }
    }
      


try {
    //get secretsString:
    const secretsString = await retrieveSecrets();
    console.log(secretsString,",,,,,,,,,,,,,,,,,,,")

    //write to .env file at root level of project:
    fs.writeFileSync(".env", secretsString,  { flag: 'w' });

    //configure dotenv package
    dotenv.config();

    console.log("Server running on port 4000");
} catch (error) {
    //log the error and crash the app
    console.log("Error in setting environment variables", error);
    process.exit(-1);
}

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

// if(!cluster.isWorker){
//     console.log("Master started");
//     const NUM_WORKER = cpus().length;
//     for (let i=0; i<NUM_WORKER; i+=1){
//         cluster.fork()
//     }
// } else{
    console.log("Worker");
    app.listen(6000)
// }
