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
    var query;

    app.models.predict(Clarifai.GENERAL_MODEL, {
        base64: b64
    }).then(
        function (response) {
            let d = response["rawData"]["outputs"][0]["data"]["concepts"];
            console.log(d);
            query = JSON.stringify(d[0]["name"]);
            console.log(query.replace(/['"]+/g, ''));
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
    request.open('GET', 'https://api.giphy.com/v1/gifs/search?' + query + 'api_key=dc6zaTOxFJmzC&tag=', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(request.responseText).data.image_url;
            console.log(data);
            document.getElementById("giphyme").innerHTML = '<center><img src = "' + data + '"  title="GIF via Giphy"></center>';
        } else {
            console.log('reached giphy, but API returned an error');
        }
    };

    request.onerror = function () {
        console.log('connection error');
    };

    request.send();
};