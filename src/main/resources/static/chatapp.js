var stompClient = null;

function connect() {
    console.log("Connecting....")
    var socket = new SockJS('/ws-chat-prototype');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true)
        console.log('Connected: ' + frame);
        stompClient.subscribe('/feed/response', function (message) {
            showMessage(JSON.parse(message.body).username, JSON.parse(message.body).content);
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
    } else {
        $("#messageBar").hide();
        $("#tableContainer").hide();
        $("#disconnect").hide();
        $("#name").show();
        $("#name").val('');
        $("#userInfos").hide();
    }
}

function sendMessage() {
    //console.log($("#name").val())  --OK!
    stompClient.send('/app/chatapp', {}, JSON.stringify({'username': $("#name").val(),'text': $("#text").val()}));

}

function showMessage(username, message) {
    //console.log(username+">>>"+$("#name").val()) //--OK
    var name = $("#name").val();
    var date = new Date();
    var time = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) /* + ":" + ('0'+date.getSeconds()).slice(-2)*/;
    if (username == name)
    {
        $("#messages").append("<tr><td>" + "<span style='color: #6c757d'>" + time + "</span>" + "-" + "<span style='color: #dc3545'>You</span>" + ": " + message + "</td></tr>");
    }else{
        $("#messages").append("<tr><td>" + "<span style='color: #6c757d'>" + time + "</span>" + "-" + "<span style='color: #007bff'>"+username+"</span>" + ": " + message + "</td></tr>");
    }
    $("#text").val('');
}

function validateName() {
    var name = $("#name").val();
    if (name) {
        //$("#name").val('');
        $("#name").hide()
        $("#userInfos").text("You are logged on as "+name);
        $("#userInfos").show();
        connect(name);

    }
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#login").click(function () {
        validateName()
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendMessage();
    });
});