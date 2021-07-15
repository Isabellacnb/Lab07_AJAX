$(document).ready(function () {
  var animals = [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "skunk",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugar glider",
    "chinchilla",
    "hedgehog",
    "hermit crab",
    "pygmy goat",
    "chicken",
    "capybara",
    "teacup pig",
    "serval",
    "salamander",
    "frog",
    "gorilla",
    "tiger",
    "lion",
    "chimpanze",
    "monkey",
  ];

  function populateButtons(arr) {
    $("#animal-buttons").empty();
    arr.forEach((element) => {
      var a = $("<button>");
      a.text(element);
      a.addClass("animal-button");
      a.attr("data-type", element);
      $("#animal-buttons").append(a);
    });
  }

  $("#animal-buttons").on("click", ".animal-button", function () {
    // Empty current animal gifs if any
    $("#animals").empty();

    // Search for term (aka animal type)
    var type = $(this).attr("data-type");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=v2htMVpMxAPyF2PZc3KmMGiXZ08ADnQb&limit=10";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      response.data.forEach((gif) => {
        var animalDiv = $(`<div class='animal-item'>`);
        var rating = gif.rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = gif.images.fixed_height.url;
        var still = gif.images.fixed_height_still.url;

        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
      });
      console.log(response);
    });
  });

  // Can also work good with 'mouseover' instead of 'click'
  $("#animals").on("click", ".animal-image", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function (e) {
    e.preventDefault();
    var newItem = $("input").val();
    animals.push(newItem);
    populateButtons(animals);
  });

  populateButtons(animals);
});
