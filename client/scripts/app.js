// YOUR CODE HERE:
var app;


$(function() {
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    memo: {},
    friends: {},
    init: function() {
      app.username = window.location.search.slice(10);
      app.$chats = $('#chats');
      app.$message = $('#message');
      app.$roomSelect = $('#roomSelect');
      app.fetch();
      $('#send').on('submit', function(){
        app.submit();
        return false;
      });
      app.$roomSelect.on('change', app.saveRoom);
      app.$chats.on('click', '.username', app.addFriend);

      setInterval(app.fetch, 4000);
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
          //console.log(data);
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
      $username = $('<span class="username"></span>')
      $username.attr('data-username', data.username);
      $username.text(data.username + ": ").appendTo($chat);

      $message = $('<span></span>');
      $message.text(data.text).appendTo($chat);
      if (app.friends[data.username] === true) {
        $message.addClass('friend');
      }
      app.$chats.append($chat);

    },
 
    addFriend: function(evt){
      var username = $(evt.currentTarget).attr('data-username');

      if(username !== undefined){
        console.log('chatterbox: Adding %s as a friend', username);

        app.friends[username] = true;

         var selector = '[data-username="'+username.replace(/"/g, '\\\"')+'"]';
         $(selector).addClass('friend');

      }
    },



    addRoom:function(roomname){
        app.$rooms = $('<option></option');
        app.$rooms.text(roomname);
        app.$rooms.appendTo(app.$roomSelect)
    },
    saveRoom: function(evt) {

      var selectIndex = app.$roomSelect.prop('selectedIndex');
      if (selectIndex === 0) {
        var roomname = prompt('Enter room name');
        if (roomname) {
          app.roomname = roomname;

          app.addRoom(roomname);

          app.$roomSelect.val(roomname);

          app.fetch();
        }
      }
      else {
        app.roomname = app.$roomSelect.val();

        app.fetch();
      }
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
        text: app.$message.val(),
        roomname: app.roomname
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