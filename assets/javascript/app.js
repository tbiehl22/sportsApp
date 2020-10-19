var button;
var newTopic = ""; 

var buttonGenerator = function (){
	 $("#buttonArea").empty();
	for(i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-warning").attr("data",topics[i]);
		$("#buttonArea").append(button);
	};
}

$("#buttonArea").on("click", ".btn", function(){
  		var thing = $(this).attr("data");
          var queryURL = "https://api.giphy.com/v1/gifs/search?q="
           + thing + "&api_key=RZzd630ID7ZK2LVJ8AKPcyBBp1Acn9fP&limit=10";



  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
	          	var topicDiv = $("<div>");
	 			
	 			var p = $("<p>");
	 			p.text(results[i].rating);
	 			var p = $("<p>").text("Rating: " + results[i].rating);

	 			var topicImage = $("<img>").addClass("orangeBorder");
	 			
	 			topicDiv.append(topicImage);
	 			topicDiv.append(p); 			
	 			$("#gifArea").prepend(topicDiv);
 			}
  		})
  })

// The form takes the value from the input box and adds it into the topics  array. The buttonGenerator function is called that takes each topic in the array remakes the buttons on the page.


$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
	newTopic = $("#topic-input").val();
	topics.push(newTopic);
	console.log(topics);
	buttonGenerator();
});



buttonGenerator();