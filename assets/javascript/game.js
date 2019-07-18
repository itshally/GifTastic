//an array with default topics
var topics = ['panda', 'dog', 'cat', 'fish', 'lion', 'tiger', 'sea lion'];
console.log(topics);

//global variable for the data query
var searchQuery;

//a function that adds button on the sidebar
function ShowTopicButton(dataQuery){

    //creating an input tag element
    var topicBtn = $('<input>');
    
    //setting an attribute type
    topicBtn.attr('type', 'button');
    
    //setting an attribute class
    topicBtn.attr('class', 'btn btn-outline-primary topic-btn');
    
    //setting an attribute value
    topicBtn.attr('value', dataQuery);

    //adds new button
    $('.sidebar').append(topicBtn);
}

//a method that creates button for each default value in the array
$.each(topics, function(index, value){
    ShowTopicButton(value);
});


//a click event for the search button
$('#search-btn').on('click', function(event){
    event.preventDefault();
    
    //a variable to get the search input's value
    searchQuery = $('#search-box').val();

    //the search input value is being added to the array
    topics.push(searchQuery);

    //adds button with the search input value
    ShowTopicButton(searchQuery);
    console.log(topics)
    ShowGiphyResult();
});

//a  click event for the buttons in the sidebar
$('.topic-btn').on('click', function(event){
    event.preventDefault();
    console.log($(this).val());

    searchQuery = $(this).val();
    console.log("this is the searchQuery " + searchQuery);
    
    ShowGiphyResult();
    $('#giphy-container .row').html('');
});


function ShowGiphyResult(){
    $.ajax({
        url : "http://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=NBFFDFiAlmknq6pwxTbJJdrC3YQs31yb&limit=10",
        method : "GET"
    }).then(function(result){

        console.log(result);
        console.log("length of the result data is: " + result.data.length)

        var searchResult = result.data;
        
        $.each(searchResult, function(index, value){
            var image = $('<img>');
            var imagePause = searchResult[index].images.fixed_height_still.url;
            var imagePlay = searchResult[index].images.fixed_height.url;
            var imageID = searchResult[index].id;
            image.attr('src', imagePause);
            image.attr('id', imageID);
            image.attr('data-state', 'still');
            image.attr('data-still', imagePause);
            image.attr('data-animate', imagePlay)
            image.attr('class', 'giphy')

                    
            var column = $('<div class="col">');
            column.prepend(image);
            $('#giphy-container .row').append(column);
            // $('#giphy-container .row').replaceWith($('#giphy-container .row .col'));
        });
        
        //make the giphy still 
        $('.giphy').on('click', function(){
            var state = $(this).attr('data-state')
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
        })
        
        //this clears the search input box after the query is being submitted
        $('#search-box').val('');
    });
}

