var stompClient = null;

function connect() {
    console.log("Connecting....")
    var socket = new SockJS('/ws-chat-prototype');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        $("#messages").html("");
        console.log('Connected: ' + frame);
        stompClient.subscribe('/feed/response', function (message) {
            showMessage(JSON.parse(message.body).content);
        });
    });
}

function sendMessage() {
    stompClient.send('/app/chatapp', {}, JSON.stringify({'text': $("#text").val()}));

}

function showMessage(message) {
    var date = new Date();
    var time = ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2) + ":" + ('0'+date.getSeconds()).slice(-2);
    $("#messages").append("<tr><td>" + time + " : " + message + "</td></tr>");
    document.getElementById('text').value='';
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#send" ).click(function() {sendMessage(); });
});