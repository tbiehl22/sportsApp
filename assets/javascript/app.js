$(document).ready(function () {


    $('#submitBtn').click(function (event) {
      event.preventDefault();
  
      var degreeSymbol = String.fromCharCode(176);
      var city = $('#city-input').val();
      console.log(city);
  
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c2fa28678b1d4b3ad38208513c930f6b";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
  
        var condition = response.weather[0].main;
        var city = response.name;
        var temp = response.main.temp;
        var feelsLike = response.main.feels_like;
        var windSpeed = response.wind.speed * 2.237;
        var humidity = response.main.humidity
        var icon = response.weather[0].icon;
  
        function fahrenheitConverter(something) {
          return Math.floor((something - 273.15) * 1.80 + 32)
        };
  
        $("#city").html(city)
        $(".image-title").text("Image From " + city)
        $(".weather").html("<div class=\"degrees\">Temp: " + fahrenheitConverter(temp) + degreeSymbol + "f</div>");
        $(".weather").append("<div class=\"feels-like\">Feels Like: " + fahrenheitConverter(feelsLike) + degreeSymbol + "</div>");
        $(".weather").append("<div class=\"condition\">Condition: " + condition + "</div><img class=\"condition-icon\" src=\"http://openweathermap.org/img/wn/" + icon + "@2x.png\">");
        $(".weather").append("<div class=\"wind-speed\"> Wind Speed: " + Math.round(windSpeed) + "mph</div>");
        $(".weather").append("<div class=\"humididty\"> Humidity: " + humidity + "%</div>");
  
        $('#city-input').val("");
      });
  
      // photo api
      var queryURL2 = "https://api.unsplash.com/photos/random/?client_id=eVbmUHA7GU426U0BE8pSV4E9V9SzHvGktrODKY3ePn8&query=" + city
      console.log(queryURL2);
  
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function (response) {
        $('.location-image').empty()
        var image = $('<img>')
        var text = $('<p>')
        var imageSrc = response.urls.full
        var credit = response.user.name
        image.attr("src", imageSrc)
        image.attr("width", "100%")
        text.addClass("credit-text")
        text.text(credit)
        $('.location-image').append(image)
        $('.location-image').append(text)
  
      });
    });
  
  
    function printToScreen(task, toDoId) {
      var toDoHtml = $("<p>");
      
      toDoHtml.addClass("list-item")
      toDoHtml.attr("id", toDoId);
      toDoHtml.html("<p class=\"item-names\">" + task + "</p>");
      
      // Close Button for ToDo
      var closeButton = $("<button>");
      closeButton.attr("data-to-do", toDoId);
      closeButton.addClass("checkbox");
      closeButton.text("✓");
      
      toDoHtml = toDoHtml.prepend(closeButton);
      $(".todo-list").append(toDoHtml);
      
    };
    var toDoCount = 0;
    
    Object.entries(localStorage).forEach(function (value) {
      printToScreen(value[1], value[0])
      toDoCount++;
      
    })
    //To Do List
    // Add Task
    $('#list-button').click(function (event) {
      event.preventDefault();
      
      
      // Input text for ToDo
      var task = $('#list-input').val().trim();
      var toDoId = "item-" + toDoCount;
      while (localStorage.getItem(toDoId)) {
        toDoCount ++;
        toDoId = "item-" + toDoCount;
      }
      printToScreen(task, toDoId);
      $('#list-input').val("")
      localStorage.setItem(toDoId, task)
      toDoCount++;
  
    })
  
    // Remove Task
    $(document.body).on("click", ".checkbox", function () {
  
      var toDoId = $(this).attr("data-to-do");
      $('#' + toDoId).remove()
      localStorage.removeItem(toDoId)
  
    })
  
    
  
    // Time Updater
    var currentTime = Date.now();
    setInterval(function () {
      var formattedTime = moment.unix(currentTime / 1000).format('LT');
      currentTime = currentTime + 1000;
      $('#time').text(formattedTime)
    }, 1000);
  
  });