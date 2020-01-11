var stompClient = null;

function connect() {
    console.log("Connecting....")
    var socket = new SockJS('/ws-chat-prototype');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true)
        console.log('Connected: ' + frame);
        stompClient.subscribe('/feed/response', function (message) {
            showMessage(JSON.parse(message.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function setConnected(connected) {
    $("#login").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);

    if (connected) {
        $("#tableContainer").show();
        $("#messageBar").show();
        $("#disconnect").show();
    }
    else {
        $("#messageBar").hide();
        $("#tableContainer").hide();
        $("#disconnect").hide();
    }
    $("#messages").html("");
}

function sendMessage() {
    stompClient.send('/app/chatapp', {}, JSON.stringify({'text': $("#text").val()}));

}

function showMessage(message) {
    var date = new Date();
    var time = ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2) /* + ":" + ('0'+date.getSeconds()).slice(-2)*/;
    $("#messages").append("<tr><td>" + "<span style='color: #6c757d'>"+time+"</span>" + " : " + message + "</td></tr>");
    document.getElementById('text').value='';
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#login" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() {sendMessage(); });
});