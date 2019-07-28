$(function() {
    $('#scrapeArticlesButton').on("click", function(event) {
        event.preventDefault();
        $('.articlesScrapedBody').empty();
        $.ajax("/api/all", {
            type: "GET"
        }).then(function(response) {
            let oldLength = response;
            $.ajax("/api/scrape", {
                type: "POST"
            }).then(function(response) {

                $.ajax("/api/reduce", {
                    type: "DELETE"
                }).then(function(response) {
                    let newText = $("<div>");
                    let newLength = response.length;
                    let numberChanged = parseInt(newLength) - parseInt(oldLength);

                    if (numberChanged == 0) {
                        newText.text("News list is updated!")
                        $('.articlesScrapedBody').append(newText)
                        $('#scrapeArticlesModal').modal('show');
                    }

                    else {
                        newText.text(numberChanged + " New Articles are added/scraped!")
                        $('.articlesScrapedBody').append(newText)
                        $('#scrapeArticlesModal').modal('show');
                    }
                })
            })
        })
    });

    $("#closeScrapeButton").on("click", function(event) {
        event.preventDefault();
        $.ajax("/", {
            type: "GET"
        }).then(function() {
            location.reload();
        })
    });

    $('.saveArticleButton').on("click", function(event) {
        event.preventDefault();
        $('.articleSavedBody').empty();
        let articleId = $(this).data("id");

        $.ajax("/api/save/article/" + articleId, {
            type: "PUT"
        }).then(function() {
            let newText = $('<div>');
            newText.text("Pls. see 'Saved News' for the saved article.");
            $('.articleSavedBody').append(newText);
            $('#articleSavedModal').modal('show');
        })
    });

    $('#closeArticleButton').on('click', function(event) {
        event.preventDefault();

        $.ajax("/", {
            type: "GET"
        }).then(function() {
            location.reload();
        })
    });


})