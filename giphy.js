$('#gifbutton').on('click', giphy)
var query;

var b64;

function visionbase64() {
    // instantiate a new Clarifai app passing in your clientId and clientSecret
    var app = new Clarifai.App(
        '3LT42ODvLUE8dxSL8z2LU34EXV4A7rPZvT2yrDRr',
        'ElxV_fQJeQaZiebwbeK8ifjr55dTE8ja459m2795'
    );

    var query;

    app.models.predict("GIF EMOTION", {
        base64: b64
    }).then(
        function (response) {
            console.log(response);
            let d = response["rawData"]["outputs"][0]["data"]["concepts"];
            //            console.log(d);
            query = d[0]["name"];
            finalquery = "q=" + query + "+cat"
            console.log(query);
            console.log(finalquery);
            console.log(query.replace(/['"]+/g, ''));
            alert("Hey don't be " + query + ". Click on the GIF ME button and get a CAT GIF")
        },
        function (err) {
            alert("FUCK MEEEMEMEMEMEM");
            console.log(err);
        }
    );

}




function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('my_result').innerHTML = '<img src="' + data_uri + '"/>';
        b64 = data_uri.replace('data:image/jpeg;base64,', "");
        //        console.log(b64);
        visionbase64()
        return b64

    });
    //    console.log(b64);
}






function giphy() {
    //        q = "happy cat"; // search query

    request = new XMLHttpRequest;
    request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + finalquery);


    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var p1 = JSON.parse(request.responseText);
            link = p1.data.fixed_height_downsampled_url;
            console.log(link);
            document.getElementById("giphyme").innerHTML = '<center><img src = "' + link + '"  title="GIF via Giphy"></center>';
        } else {
            console.log('OH NO WE COULD NOT GIF YOU');
        }
    };

    request.onerror = function () {
        console.log('connection error');
    };

    request.send();
};