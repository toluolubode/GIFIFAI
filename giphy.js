//var button = document.getElementById("gifbutton");

$('#gifbutton').on('click', giphy)
    //var query;

function vision() {
    // instantiate a new Clarifai app passing in your clientId and clientSecret
    var app = new Clarifai.App(
        'EFu10OAenQzUcWbL421g6akTv03qKpP1LY-nXTCW',
        '8uFy-k4onXl3U_pszMJufXKCu4Q3lw3HWqu5cY1E'
    );
    var query;

    // predict the contents of an image by passing in a url
    app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
        function (response) {
            let d = response["rawData"]["outputs"][0]["data"]["concepts"];
            console.log(d);
            query = JSON.stringify(d[0]["name"]);
            console.log(query);


        },
        function (err) {
            console.error(err);
        }
    );

    return query;
}


function giphy() {
    var query = vision();
    console.log(query);
    //    q = "sad"; // search query

    request = new XMLHttpRequest;
    request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + query, true);

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