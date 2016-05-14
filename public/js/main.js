$(document).ready(function() {
  $('#search').on('click', function() {
    var searchTerm = $('#searchbar').val();
    var uri = 'http://localhost:3000/api/search/' + searchTerm;
    $.get(uri, function(response) {
      console.log(response);
    });
  });
});
