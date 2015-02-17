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
  success: function (data) {
  	var recentChats = data.results;
  	var count = 0;
  	setInterval(function(){
  		placeChats((recentChats[count].username ? recentChats[count].username : "NO USER ID")+": "+ recentChats[count].text);
  		count++;
  		$('div').length > 12 ? $('div').last().remove() : null;
  	}, 2000);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
  });
};

var placeChats = function(chat){
	var chatDiv = "<div class='chat msg'>"+_.escape(chat)+"</div>"
	$(chatDiv).hide().prependTo(".container").fadeIn();
}

app.fetch();

$('.submitButton').click(function(){
  var chatMessage = $('input').val();
  alert(chatMessage);
  $('input').val("")
})
