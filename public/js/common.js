$('#isbn-input-box').keypress(function (e) {
    if (e.which == 13) {
        var isbn = $(this).val();
        console.log(isbn);
        if (isbn) {
            location.href = '/isbn/'+isbn;
        }
    }
});