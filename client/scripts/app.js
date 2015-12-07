// YOUR CODE HERE:
var app;


$(function() {
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    init: function() {
    },
    send: function(message) {
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent. Data: ', data);
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message. Error: ', data);
        }
      });     
    },
    fetch: function() {
      $.ajax({
        url: app.server,
        type: 'GET',
        data: 'JSON.stringify(message)',
        contentType: 'application/json',
        success: function (data) {
          console.log(data);

        },
        error: function (data) {
          console.error('chatterbox: Failed to send message. Error: ', data);
        }
      });     
      
    },
    clearMessages: function(){},
    addMessage: function(){},
    addRoom: function(){}
  }
})


// var message = {
//   username: 'RYAN-BEN',
//   text: 'trololo',
//   roomname: '4chan'
// };