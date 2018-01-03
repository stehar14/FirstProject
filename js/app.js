// CinemaTix Site
// Project 1

$(document).ready(function() {
  $('#discover-results').hide();
});
// On click event listener for #searchButton on searchPage.html 
$("#searchButton").on("click", function() {
  // Prevents page reload
  event.preventDefault();
  // Makes sure that the text box is populated when user clicks submit
  if ($("#searchPhrase").val().trim() === "") {
    alert("That's not a valid input!");
  } else{
  // Removes any previous movie entries from the #movies div   
    $("#movies").empty();
  // Creates a query URL including user search phrase  
    var phrase = $("#searchPhrase").val().trim();
    var movieURL= "https://api.themoviedb.org/3/search/movie?api_key=ac004416c837056eac779513d15becfb&language=en-US&query=" + phrase + "&page=1&include_adult=false"
  // AJAX call to get data from TMDB using query URL  
    $.ajax({
      url: movieURL,
      method: "GET"
    }).done(function(response) {
    // For loop to create 10 collapsible elements and append them to them to the #movies div 
        for (i=0; i<10; i++){
          console.log(response.results[i]);
          // Creating variables to hold response data
          var title = response.results[i].title;
          var released = response.results[i].release_date;
          var plot = response.results[i].overview;
          // Retrieving the URL for the image
          var imgURL = "https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path;
          // Creating a list item for collapsible list #movies
          var movieListItem = $("<li> <div class='collapsible-header movie center' tmdb-id='" + response.results[i].id + "' youtube-search='" + response.results[i].title + " official trailer'><span class='accordion-head-text'>" + response.results[i].title + "</span><a class='add-button btn-floating btn-large waves-effect waves-light red'><i class='material-icons center'>add</i></a></div><div class= 'collapsible-body'><img class='poster col s3 m3 l3' src='https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path + "'><p>" + response.results[i].overview + "</p> <p>Release date: " + response.results[i].release_date + "</p></div></li>" );

          // Putting the moiveListItem below the previous movies
          $("#movies").append(movieListItem);
        }
        // If you click on the add button on a header, don't show/hide collapsible body
        $('.add-button').on('click', function(e) {
          e.stopPropagation();
          Materialize.toast('test', 2000);
        });
    });
  }
});

// On click event listener for dynamically created .collapsible-headers in the #movies div
$("#movies").on("click", ".collapsible-header", function(){
  // Removes any previously loaded youtube videos
  $(".dynamic-iframe").remove();
  // creates query URL including youtube-search attr of the .collapsible-header clicked
  var queryURL= "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDefinition=high&videoEmbeddable=true&key=AIzaSyBbYCvWi07zZ1Dt5MRqAevy4tqRBgtMxiE&q=" + $(this).attr("youtube-search");
  // AJAX call to get data from Youtube Data API using query URL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response.items[0].id.videoId);
    // Insert youtube video in .collapsible-body after .poster
    var youtubeVid = $("<iframe class='dynamic-iframe col s9 m9 l9' width='640' height='360' src='https://www.youtube.com/embed/" + response.items[0].id.videoId + "?enablejsapi=1' frameborder='0' style='border: solid 4px #37474F'></iframe>");
    $(youtubeVid).insertAfter(".poster");    
  });
});

// On click event listener for #discover-submit button on discoverPage.html
$("#discover-submit").on("click", function() {
  // Prevents page reload
  event.preventDefault();
  $('#discover-results').show();
  // Removes any previous movie entries from the #movies list   
  $("#movies").empty();
// Creates variables to hold user inputs from discover search 
  var actor = $("#actor").val().trim();
 

  var actorURL = "https://api.themoviedb.org/3/search/person?api_key=ac004416c837056eac779513d15becfb&query=" + actor;
  $.ajax({
    url: actorURL,
    method: "GET"
  }).done(function(response) {
    var actorId = response.results[0].id;  
  
    var sort = $("#sort").val();
    
    var genre = $("#genre").val();
    var years = snapSlider.noUiSlider.get();
    var lowYear = years[0];
    var highYear = years[1];
    console.log(actor);
    console.log(sort);
   
    console.log(genre);
    console.log(lowYear);
    console.log(highYear);
  // Creates query URL based on user inputs
    var movieURL= "https://api.themoviedb.org/3/discover/movie?api_key=ac004416c837056eac779513d15becfb&original_language=en-US&sort_by=" + sort + "&release_date.gte=" + lowYear + "&release_date.lte=" + highYear + "&with_genres=" + genre + "&with_cast=" + actorId + "&page=1&include_adult=false"
  // AJAX call to get data from TMDB using query URL  
    $.ajax({
      url: movieURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      console.log(movieURL);
    // For loop to create 10 collapsible elements and append them to them to the #movies div 
      for (i=0; i<10; i++){
        console.log(response.results[i]);
        // Creating variables to hold response data
        var title = response.results[i].title;
        var released = response.results[i].release_date;
        var plot = response.results[i].overview;
        // Retrieving the URL for the image
        var imgURL = "https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path;
        // Creating a list item for collapsible list #movies
        var movieListItem = $("<li> <div class='collapsible-header movie center' tmdb-id='" + response.results[i].id + "' youtube-search='" + response.results[i].title + " official trailer'><span class='accordion-head-text'>" + response.results[i].title + "</span><a class='add-button btn-floating btn-large waves-effect waves-light red'><i class='material-icons center'>add</i></a></div><div class= 'collapsible-body'><img class='poster col s3 m3 l3' src='https://image.tmdb.org/t/p/w185/" + response.results[i].poster_path + "'><p>" + response.results[i].overview + "</p> <p>Release date: " + response.results[i].release_date + "</p></div></li>" );

        // Putting the moiveListItem below the previous movies
        $("#movies").append(movieListItem);
      }
      // If you click on the add button on a header, don't show/hide collapsible body
      $('.add-button').on('click', function(e) {
        e.stopPropagation();
        Materialize.toast('test', 2000);
      });
    });
  });
});