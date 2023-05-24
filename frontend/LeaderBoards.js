$.ajax({
    url: 'serviceHandler.php',
    data: {method: "queryScorePerGame"},
    success: function (result) {
        $.each(result, function(result) {
            var p = $('<p>').text(result);
            $('#LeaderBoards').append(p);
          });
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('Error: ' + textStatus, errorThrown);
    }
});