//var button = document.getElementById("gifbutton");

$('#gifbutton').on('click', giphy)
var query;

var b64;

function visionbase64() {
    // instantiate a new Clarifai app passing in your clientId and clientSecret
    var app = new Clarifai.App(
        'EFu10OAenQzUcWbL421g6akTv03qKpP1LY-nXTCW',
        '8uFy-k4onXl3U_pszMJufXKCu4Q3lw3HWqu5cY1E'
    );

    //TRAIN MY CALRIFAI MODEL BABY!!
//    app.inputs.create([
//            //PUT TRAINING IMAGES HERE
//        {
//            url: "https://samples.clarifai.com/metro-north.jpg"
//            },
//        {
//            url: "https://samples.clarifai.com/wedding.jpg"
//            }
//           concepts: [
//            {
//                id: "happy",
//                value: true
//          }
//        ]
//      ]).then(
//        function (response) {
//            // do something with response
//        },
//        function (err) {
//            // there was an error
//        }
//    );
    //GENERATE A MODEL
    //    app.models.create(
    //        "emotion", [
    //            {
    //                "id": "happy"
    //            },
    //            {
    //                "id": "sad"
    //            },
    //            {
    //                "id": "anger"
    //            },
    //            {
    //                "id": "fear"
    //            }
    //    ]
    //    ).then(
    //        function (response) {
    //            // do something with response
    //        },
    //        function (err) {
    //            // there was an error
    //        }
    //    );
    //TRAIN THE MODEL
    //    app.models.train("{model_id}").then(
    //        function (response) {
    //            // do something with response
    //        },
    //        function (err) {
    //            // there was an error
    //        }
    //    );
    var query;

    app.models.predict(Clarifai.GENERAL_MODEL, {
        base64: b64
    }).then(
        function (response) {
            let d = response["rawData"]["outputs"][0]["data"]["concepts"];
            console.log(d);
            query = d[0]["name"];
            finalquery = "q=" + query + "+cat"
            console.log(query);
            console.log(finalquery);
            //            console.log(query.replace(/['"]+/g, ''));
        },
        function (err) {
            alert("FUCK MEEEMEMEMEME");
            console.log(err);
        }
    );

}




function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('my_result').innerHTML = '<img src="' + data_uri + '"/>';
        b64 = data_uri.replace('data:image/jpeg;base64,', "");
        console.log(b64);
        visionbase64()
        return b64

    });
    console.log(b64);
}






function giphy() {
    //        q = "happy cat"; // search query

    request = new XMLHttpRequest;
    request.open('GET', 'http://api.giphy.com/v1/gifs/search?' + finalquery + '&api_key=dc6zaTOxFJmzC');

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var p1 = JSON.parse(request.responseText);
            link = p1.data[1];
            console.log(link);
            giflink = link.url.replace(/['"]+/g, '');
            console.log(giflink)
            alert(giflink);
            document.getElementById("giphyme").innerHTML = '<center><img src = "' + giflink + '"  title="GIF via Giphy"></center>';
        } else {
            console.log('reached giphy, but API returned an error');
        }
    };

    request.onerror = function () {
        console.log('connection error');
    };

    request.send();
};