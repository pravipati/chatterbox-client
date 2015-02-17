// YOUR CODE HERE:
var app = {};

app.init = function(){};
app.send = function(message){
  $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
  });
};


app.fetch = function(){
  $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  data: {
  	order: '-createdAt'
  },
  contentType: 'application/json',
  success: function(data){
  	showChat(data);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
  });
};

var showChat = function (data) {
	//store most recent message
	var recentChats = data.results;
	var chatMessage = (recentChats[0].username ? recentChats[0].username : "NO USER ID") + ": " + recentChats[0].text
    //check the room 
    if ( !recentChats[0].roomname ) {
	  console.log(recentChats[0].roomname);
	  placeChats(chatMessage);	
    }
    else if (recentChats[0].roomname === "lobby") {
      placeChats(chatMessage, ".lobby")
    }

    console.log(recentChats[0].roomname);
	$('div').length > 12 ? $('.msg').last().remove() : null;
};

var placeChats = function(chat, room){
	room = room || ".container";
	var chatDiv = "<div class='chat msg'>"+_.escape(chat)+"</div>"
	$(chatDiv).hide().prependTo(room).fadeIn();
}

setInterval(app.fetch, 1000);
