// YOUR CODE HERE:
var app;


$(function() {
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    memo: {},
    init: function() {
      app.username = window.location.search.slice(10);
      app.$chats = $('#chats');
      app.$message = $('#message');
      app.$room = $('#roomSelect');
      app.fetch();
      $('#send').on('submit', function(){
        app.submit();
        return false;
      })
      setInterval(app.fetch, 4000)
      //<embed src="https://www.youtube.com/watch?v=2Z4m4lnjxkY" type="application/x-shockwave-flash" width="640" height="385" autoplay="true"></embed>
      //<iframe width="100%" height="1000px" src="https://www.youtube.com/embed/DLzxrzFCyOs?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>
    },
    send: function(message) {
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log(data.roomname);
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
          app.showRoom(results);
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
    addRoom:function(roomname){
        app.$rooms = $('<option></option');
        app.$rooms.text(roomname);
        app.$rooms.appendTo(app.$room)
    },
    showRoom: function(messages){

      var unique = _.unique(messages, function(data){
        return data.roomname;
      })

      _.each(unique, function(room) {
        if(!app.memo[room.roomname]){
          app.addRoom(room.roomname);
          app.memo[room.roomname] = true;
        }
      })

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


$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: 'where={"roomname":"5chan"}',  
//  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent. Data: ', data);
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message. Error: ', data);
  }
});



*/