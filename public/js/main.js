$(document).ready(function() {
  $('#search').on('click', function() {
    var searchTerm = $('#searchbar').val();
    var uri = 'http://localhost:3000/api/search/' + searchTerm;
    //var uri = 'http://localhost:3000/api/search/Chicago,IL';
    $.get(uri, function(response) {
      var resultsString = '';
      var searchResults = response.businesses;
      console.log(searchResults);
      searchResults.forEach(function(business) {
        resultsString += '<div class="row result">';
        resultsString += '<div class="col-xs-12 col-sm-2"><img src="' + business.image_url + '"></div>';
        resultsString +=  '<div class="col-xs-12 col-sm-10"><p><a href="'+business.url+'">' + business.name + '</a>';
        resultsString += '<img class="rating" src="' + business.rating_img_url + '"></p>';
        resultsString += '<p>' + business.snippet_text + '</p></div>';
        resultsString += '</div>';
      });
      $('#searchResults').html(resultsString);
    });
    $('#searchResults').show();
    $('#searchResults').html('<p>Waiting for search results...');
  });
});
