//$('#gifbutton').on('click', giphy)
var query;
var animal = "cat";

var b64;

//Handles cat and dog selection
$(document).ready(function () {
    $('input[type=radio][name=optradio]').change(function () {
        switch ($(this).val()) {
        case 'cat':
            swal("Cats! nice choice", "They're pretty aren't they?");
            animal = "cat";
            break;
        case 'dog':
            swal("Puppers! nice choice", "They're pretty aren't they?");
            animal = "dog";
            break;
        }
    });
});

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
            finalquery = "q=" + query + "+" + animal;
            //            console.log(query);
            //            console.log(finalquery);
            //            console.log(query.replace(/['"]+/g, ''));
            if (query == "Happy") {
                //                swal("Awesome! Be " + query + ". Click on the GIF ME button and spread your happiness to all the sad cats."); 
                finalquery = "q= Sad+" + animal
                swal({
                    title: "Awesome! Be " + query + ".",
                    text: "Click on the GIF ME button and spread your happiness to all the sad " + animal,
                    type: "success",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    request = new XMLHttpRequest;
                    request.open('GET', 'https://api.giphy.com/v1/gifs/search?' + finalquery + '&api_key=dc6zaTOxFJmzC&limit=100&rating=pg');
                    console.log(request);


                    request.onload = function () {
                        if (request.status >= 200 && request.status < 400) {
                            var p1 = JSON.parse(request.responseText);
                            console.log(p1);
                            num = Math.floor(Math.random() * 100) + 0
                            console.log(num);
                            link = p1.data[num].images.original.url;
                            //            link = p1.data.fixed_height_downsampled_url;
                            //                            console.log(link);
                            document.getElementById("giphyme").innerHTML = '<center><img src = "' + link + '"  title="GIF via Giphy"></center>';
                        } else {
                            console.log('OH NO WE COULD NOT GIF YOU');
                        }
                    };

                    request.onerror = function () {
                        console.log('connection error');
                    };

                    request.send();
                    setTimeout(function () {
                        swal("Here's a cat gif");
                    }, 2000);
                });


            } else {
                finalquery = "q=Happy+" + animal;
                swal({
                    title: "It look's like you are " + query + ".",
                    text: "I think I know what can cheer your right up. Click on the GIF me button",
                    type: "success",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    request = new XMLHttpRequest;
                    request.open('GET', 'https://api.giphy.com/v1/gifs/search?' + finalquery + '&api_key=dc6zaTOxFJmzC&limit=100&rating=pg');


                    request.onload = function () {
                        if (request.status >= 200 && request.status < 400) {
                            var p1 = JSON.parse(request.responseText);
                            console.log(p1);
                            num = Math.floor(Math.random() * 100) + 0
                            console.log(num);
                            link = p1.data[num].images.original.url;
                            //            link = p1.data.fixed_height_downsampled_url;
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
                    setTimeout(function () {
                        swal("A " + animal + " GIF!");
                    }, 200);
                });

                //                swal("It looks like you're " + query + ".", "Click on the GIF ME button and get a Happy cat gif to cheer you up");


            }

        },
        function (err) {
            alert("FUCK MEEEMEMEMEMEM");

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