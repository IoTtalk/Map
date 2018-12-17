$(document).ready(function() {
        var socket = io.connect('http://localhost:8866/hpc');

        socket.on('connect', function() {
            socket.emit('connect_event', {data: 'connected!'});
        })

        socket.on('server_response', function(msg) {
            $('#log').append('<br>' + $('<div/>').text('Received #' + ': ' + msg.data).html());
        });

        $('form#emit').submit(function(event) {
                socket.emit('client_event', {data: $('#emit_data').val()});
                return false;
            });
    });