var searchTerm = '';
var userID = $('#userID').html();
//var url = 'http://localhost:3000/';
var url = 'https://prk-night-out.herokuapp.com';

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

  $('body').on('click', '.rsvp',  function() {
    var This = $(this);
    var businessID = This.siblings('.businessID').html();
    rsvp(businessID);

    function rsvp(businessID) {
      var api = url + 'api/rsvp/' + businessID;
      $.get(api, function(response) {
        if (response.message) {
          This.parent().append('<div class="alert alert-warning alert-dismissable"><p>'
          + ' <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span></button>' +
          response.message + '</p></div>')
        }
        else {
        This.removeClass('rsvp').addClass('cancel').html('<i class="fa fa-close" aria-hidden="true"></i>')
        This.siblings('.attending').html(response.attending.length + ' Going ');
      }
      });
    }
  });

  $('body').on('click', '.cancel', function() {
    var This = $(this);
    var businessID = This.siblings('.businessID').html();
    cancel(businessID);

    function cancel(businessID) {
      var api = url + 'api/cancel/' + businessID;
      $.get(api, function(response) {
        This.removeClass('cancel').addClass('rsvp').html('<i class="fa fa-check-square" aria-hidden="true"></i>')
        This.siblings('.attending').html(response.attending.length + ' Going ');
      });
    }
  });

});
function getLocalResults(searchTerm) {
    var api = url + 'api/search/' + searchTerm;
  $.get(api, function(response) {
    var resultsString = '';
    var searchResults = response;
    searchResults.forEach(function(business) {
      var attending = false;
      if (business.attending.indexOf(userID) > -1) {
        attending = true;
      }
      var numAttending = business.attending.length;
      resultsString += '<div class="row result">';
      resultsString += '<div class="col-xs-12 col-sm-3 col-md-2"><img src="' + business.img + '"></div>';
      resultsString +=  '<div class="col-xs-12 col-sm-9 col-md-10"><p><a href="'+business.url+'" target="_blank">' + business.name + '</a>';
      resultsString += '<img class="rating" src="' + business.rating + '">';
      resultsString += '<span class="hidden businessID">' + business._id + '</span><span class="attending">' + numAttending + ' Going </span>';
      if (attending === false) {
        resultsString += '<span class="rsvp"><i class="fa fa-check-square" aria-hidden="true"></i></span>';
      }
      else if (attending === true) {
        resultsString += '<span class="cancel"><i class="fa fa-close" aria-hidden="true"></i></span>'
      }
      resultsString += '</div></p><p>' + business.snippet + '</p></div>';
      resultsString += '</div>';
    });
    $('#searchResults').html(resultsString);
  });
  $('#searchResults').show();
  $('#searchResults').html('<p>Finding bars and restaurants in ' + searchTerm + '...');
}
