let query;

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
    'EFu10OAenQzUcWbL421g6akTv03qKpP1LY-nXTCW',
    '8uFy-k4onXl3U_pszMJufXKCu4Q3lw3HWqu5cY1E'
);

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
    function (response) {
        let d = response["rawData"]["outputs"][0]["data"]["concepts"];
        console.log(d);
        let query = JSON.stringify(d[0]["name"]);
        console.log(query);
        return query;

    },
    function (err) {
        console.error(err);
    }
);


//app.models.predict(Clarifai.GENERAL_MODEL, {
//    base64: "G7p3m95uAl..."
//}).then(
//    function (response) {
//        let d = response["rawData"]["outputs"][0]["data"]["concepts"];
//        console.log(d);
//        let query = JSON.stringify(d[0]["name"]);
//
//    },
//    function (err) {
//        // there was an error
//    }
//);
//console.log(query);