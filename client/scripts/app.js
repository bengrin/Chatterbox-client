// YOUR CODE HERE:
var app;


$(function() {
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    
    init: function() {
      app.username = window.location.search.slice(10);
      app.$chats = $('#chats');
      app.$message = $('#message');
      app.$room = $('#room');
      app.fetch();
      $('#send').on('submit', function(){
        app.submit();
        return false;
      })
      setInterval(app.fetch, 1000)
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
        data: {"order": "-createdAt"},
        contentType: 'application/json',
        success: function (data) {
          // console.log(data);
          app.clearMessages();
          results = data.results;
          results.forEach(app.addMessage);
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message. Error: ', data);
        }
      });     
      
    },
    clearMessages: function(){
      app.$chats.children().remove();
    },
    addMessage: function(data){
      $chat = $('<div class="chat"></div>');
      $username = $('<span class="username"></span>');
      $username.text(data.username + ": ").appendTo($chat);
      $message = $('<span></span>');
      $message.text(data.text).appendTo($chat);
      app.$chats.append($chat);

    },
    addRoom: function(){
      app.$room = $('<option value="selected">Lobby</option')
      app.$room
    },
    submit: function(){
      message = {
        username: app.username,
        text: app.$message.val()
      };
      app.send(message);
    }
  }
})

/* NOTES
// var message = {
//   username: 'RYAN-BEN',
//   text: 'trololo',
//   roomname: '4chan'
// };

// <script>alert('');</script>

app.send({username: 'asdf', text:"<script>alert('aasdfasdfa');</script>", roomname: '4chan'})
app.send({username: ";document.createElement('div').text('you got pwned');", text: 'asdf', roomname: '4chan'})

app.send({username: "alert('test')", text: "testing", roomname:"4chat"});

5fL52MigKk
cdR2dwxv9q
FAxnJLPEUs
7FFvRCY3Rt
data: 'where={"roomname":"test"}',  

app.send({username: "e11iteHackerSquad", text: "\"})


*/