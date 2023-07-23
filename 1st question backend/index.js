var express = require("express");
var cors = require("cors");
var axios = require("axios");
require("dotenv").config();

const port = process.env.PORT || 5000;

var app = express();

app.use(cors());

app.get("/", (req, res) => { 
    res.send("Started");
});

app.use(express.json());

async function getAccessToken() {
    const siteuri = process.env.TRAIN_SITE_URI;

    var result = await axios({
        method: "post",
        url: siteuri + "auth",
        data: {
            companyName: "Mohith Trains",
            clientID: process.env.TRAIN_CLIENT_ID,
            clientSecret: process.env.TRAIN_CLIENT_SECRET,
            ownerName: process.env.OWNERNAME,
            ownerEmail: process.env.OWNEREMAIL,
            rollNo: process.env.OWNERROLLNO
        }
    }).catch((error) => {
        return error.message;
    });

    return result;
}

app.post("/api/getAccessToken", async (req, res) => { 
    var result = await getAccessToken();

    if(result.data) { 
        res.send(result.data);
    } else { 
        res.status(400).send(result);
    }
});

async function getTrainDetails(accessCode) {
    
    const siteuri = process.env.TRAIN_SITE_URI;

    var result = await axios({
        method: "get",
        url: siteuri + "trains",
        headers: {
            "Authorization": 'Bearer ' + accessCode
        },
    }).catch((error) => {
        return error.message;
    });

    return result;
}

function checkDeparture(currentHour, currentMin, trainHour, trainMin) {
    const currentTime = currentHour * 60 + currentMin;
    const trainTime = trainHour * 60 + trainMin;
    const timeDifference = trainTime - currentTime;
    return timeDifference >= 0 && timeDifference <= 30;
}
  

async function sortDetials(trains) {

    var now = new Date();
    var currentHour = now.getHours();
    var currentMin = now.getMinutes();

    var trainsToBeIgnored = trians.filter((train) => {
        var trainHours = train.departureTime.Hours;
        var trainMin = train.departureTime.Minutes;
        return !checkDeparture(currentHour, currentMin, trainHours, trainMin);
    });

    trainsToBeIgnored.sort((a, b) => {
            return a.price.sleeper - b.price.sleeper && a.price.AC - b.price.AC && b.seatsAvailable.sleeper - a.seatsAvailable.sleeper && b.seatsAvailable.AC - a.seatsAvailable.AC && b.departureTime.Hours - a.departureTime.Hours && b.departureTime.Minutes - a.departureTime.Minutes && b.departureTime.Seconds - a.departureTime.Seconds;
    });
    console.log(trainsToBeIgnored);
    return trainsToBeIgnored;
}

app.get("/api/sortDetails", async (req, res) => { 
    var result = await sortDetials();
    console.log(result)
    res.send(result);
})

app.post("/api/getTrainDetails", async (req, res) => { 

    var result;
    var response = {
        statusCode: 200,
        body: { "message": "OK" },
    };
    result = await getTrainDetails(req.body.accessCode);

    if(result.data && !result.data.message) { 
        console.log(result.data);
        var sortedTrains = await sortDetials(result.data);
        response = {
            statusCode: 200,
            body: {"accessToken": req.body.accessCode, "message": sortedTrains},
        }; 
    } else { 
        console.log("1")
        if(result.data.message && result.data.message.includes("token is expired")){
            console.log("2") 
            var accessToken = await getAccessToken();
            if(accessToken.data) { 
                console.log("3")
                console.log(accessToken.data);
                var accessCode = accessToken.data.access_token;
                result = await getTrainDetails(accessCode);
                if(result.data) { 
                    console.log("4")
                    console.log(result.data);
                    var sortedTrains = await sortDetials(result.data);
                    response = {
                        statusCode: 200,
                        body: {"accessToken": accessCode, "message": sortedTrains },
                    }; 
                } else { 
                    console.log("5")
                    response = {
                        statusCode: 400,
                        body: { "message":result.data },
                    }; 
                }
            }
        }
    }
    res.status(response.statusCode).send(response);
});

app.listen(port, () => console.log(`server started on port ${port}`));