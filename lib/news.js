function loadNews(response) {
    var formatDate = function(date) {
        var month = date.getMonth()+1;
        var day = date.getDate()+1;
        return day + '. ' + month + '. ';
    }
    var fixTypoErrors = function(str) {
        return str.replace('<br>', ' ');
    }
    $(document).ready(function() {
        $('#news *').remove();
        var maxVisiblePosts = 5;
        var allPosts = response.data;
        var visiblePosts = allPosts.filter(function(post) {
            return !post.is_deleted;
        });
        var topPosts = visiblePosts.slice(0, maxVisiblePosts);
        if (topPosts.length == 0) {
            $('#news').append('<p>Momentálně nic nového. Žádné zprávy, dobré zprávy?</p>');
        } else {
            topPosts.forEach(function(post) {
                var dateStamp = moment(post.created_at).locale('cs').fromNow();
                var newsItem = $('<p/>').html(fixTypoErrors(post.html));
                newsItem.append($('<br/>'));
                newsItem.append($('<span/>', {'class':'muted'}).html(dateStamp));
                $('#news').append(newsItem);
            });
        }
    });
}
