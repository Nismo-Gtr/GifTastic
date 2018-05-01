$(document).ready(function () {
    var topics = ["Rise Against", "Deftones", "Silverstein", "Fall of Troy", "Minus the Bear", "Maps and Atlases"]
    var API_KEY = "LZIwckN56pSuLgxseZy0SZbHTjDPEfzg";
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&rating=&limit=10&q=";
    var input = $("<input>");
    var submit = $("<button>");
    $(".input").append(input);
    input.addClass("input");
    $(".submit").append(submit);
    submit.addClass("btn btn-info");
    submit.text("Submit");
    
    
    
    
    submit.on("click", function () {
            topics.push($(input).val());
            $("#buttons").append($("<button class='btn btn-info new-button'>" + input.val() + "</button>"));
            $(".new-button").on("click", function (){
                $("#gifs").empty();
                $.ajax({
                    method: "GET",
                            url: requestUrl + $(this).text()
                        }).then(function (response) {
                            console.log(response.data);
                            for (var i = 0; i < response.data.length; i++) {
                                var img = createImage(response, i);
                                // Create element
                                // Set the source of the element
                                $("#gifs").append(img);
                                
                            }
                        });
        });     
    
    });
    
    
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.text(topics[i]);
        button.addClass("btn btn-info");
        
        
        function createImage(response, i) {
            console.log(response, i);
            var img = $("<img>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-animated", response.data[i].images.fixed_height.url);
            img.attr("data-still", response.data[i].images.fixed_height_still.url);
            img.attr("data-state", "still");
            var gifCard = $("<div class='gifCard'>");
            gifCard.append(img);
            var pRating = $("<p>");
            pRating.append("Rating: " + response.data[i].rating);
            gifCard.append(pRating);
            return gifCard;
            
        };
        $("#buttons").append(button);
        
    }

    $("button").on("click", function () {
        $("#gifs").empty();
        $.ajax({
            method: "GET",
                    url: requestUrl + $(this).text()
                }).then(function (response) {
                    console.log(response.data);
                    for (var i = 0; i < response.data.length; i++) {
                        var img = createImage(response, i);
                        // Create element
                        // Set the source of the element
                        $("#gifs").append(img);
                        
                    }
                });
            });
            
            
            $("img").on("click", function () {
                console.log(this);
                console.log("clicked");
            for (i = 0; i < topics.length; i++) {
                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    $(this).attr("data-state", "animated");
                    $(this).attr("src", $(this).attr("data-animated"));
                } else {
                    $(this).attr("data-state", "still");
                    $(this).attr("src", $(this).attr("data-still"));
                }
            }
        })
    });

    // Have not yet figured out how to make the on-click animation start/stop
    // Have not yet figured out how to 



