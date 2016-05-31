var searchTerm = '';
$(document).ready(function() {
  var userLocation = $('#location').html();
  if (userLocation !== '')  {
    searchTerm = userLocation;
    getLocalResults(searchTerm);
  }

  $('#search').on('click', function() {
    var searchTerm = $('#searchbar').val();
    getLocalResults(searchTerm);
});

$('#local').on('click', function() {
  $('#login').modal('show');
  $('#signIn').modal('hide');
});
});
function getLocalResults(searchTerm) {
    //var uri = 'https://prk-night-out.herokuapp.com/api/search/' + searchTerm;
    var uri = 'http://localhost:3000/api/search/' + searchTerm;
  $.get(uri, function(response) {
    var resultsString = '';
    var searchResults = response;
    searchResults.forEach(function(business) {
      resultsString += '<div class="row result">';
      resultsString += '<div class="col-xs-12 col-sm-3 col-md-2"><img src="' + business.img + '"></div>';
      resultsString +=  '<div class="col-xs-12 col-sm-9 col-md-10"><p><a href="'+business.url+'" target="_blank">' + business.name + '</a>';
      resultsString += '<img class="rating" src="' + business.rating + '">';
      resultsString += '<span class="attending">0 Going</span></p>';
      resultsString += '<p>' + business.snippet + '</p></div>';
      resultsString += '</div>';
    });
    $('#searchResults').html(resultsString);
  });
  $('#searchResults').show();
  $('#searchResults').html('<p>Finding bars and restaurants in ' + searchTerm + '...');
}
