//hiding the alert box by default
$('.alert-container').hide();

//an array with default topics
var topics = ['panda', 'dog', 'cat', 'fish', 'lion', 'tiger', 'sea lion'];

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

    //calling the function that checks for a duplicated topic before adding
    CheckDuplicatedTopic();
    
    //below this line overwrites the 10 gifs 
    $('#giphy-container .row').html('');
});

//a function that checks for a duplicated topic
function CheckDuplicatedTopic(){

    //if the query in the search input already includes in the topics array
    if(topics.includes(searchQuery)){

        //an alert will appear which..
        $('.alert-container').slideDown();
        $('.alert-danger').html(searchQuery + " is already existed");

    //if the query is not yet existing
    }else{
         //then the search input value will be added to the array
         topics.push(searchQuery);

         //adds button with the search input value
         ShowTopicButton(searchQuery);
         
         //will also show the 10 gifs after the submission
         ShowGiphyResult();

         //the alert will then hide if it's a success
         $('.alert-container').slideUp();
    }
}


//a click event for the buttons in the sidebar
$('.topic-btn').on('click', function(event){
    event.preventDefault();

    //a variable with the value of the input text box
    searchQuery = $(this).val();

    //shows the 10 gifs when the user clicks the button
    ShowGiphyResult();

    //below this line overwrites the 10 gifs 
    $('#giphy-container .row').html('');
});

//a function that shows the giphy
function ShowGiphyResult(){

    $.ajax({
        url : "https://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=NBFFDFiAlmknq6pwxTbJJdrC3YQs31yb&limit=10",
        method : "GET"
    }).then(function(result){

        //a variable that gets the data
        var searchResult = result.data;
        console.log(result)
        //each array in the data object...
        $.each(searchResult, function(index, value){
            
            //a variable with an image tag
            var image = $('<img>'),

            //a variable with a gif that is "not animated"
                imagePause = searchResult[index].images.fixed_height_still.url,
            //a variable with a gif that is "animated"
                imagePlay = searchResult[index].images.fixed_height.url,
            //a variable with the gif's id
                imageID = searchResult[index].id,
            //a variable with the gif's rating
                imageRating = searchResult[index].rating;
            
            //adding attributes to the image tag
            image.attr('src', imagePause);
            image.attr('id', imageID);
            image.attr('data-state', 'still');
            image.attr('data-still', imagePause);
            image.attr('data-animate', imagePlay)
            image.attr('class', 'giphy')

            //a variable with a div tag that has a class attribute with a value of "col"
            var column = $('<div class="col">');

            //attaching the current image and rating in the column variable
            column.prepend(image);
            column.prepend("<p class='rating'>Rating: " + imageRating + "</p>");

            //adding that column inside the html
            $('#giphy-container .row').append(column);
        });
        
        //making the giphy not animated on the first load until..
        $('.giphy').on('click', function(){

            //a variable with the "data-state" attribute of the current element that will be clicked
            var state = $(this).attr('data-state');

            //if the current state is "still" before the user clicks it
            if (state === "still") {
                
                //the source will change to animate url
                $(this).attr("src", $(this).attr("data-animate"));
                
                //the data-state will set to animate
                $(this).attr("data-state", "animate");

            //if the current state is "animated" before the user clicks it
            } else {

                //the source will change from animate to still
                $(this).attr("src", $(this).attr("data-still"));
                
                //the data-state will set to still
                $(this).attr("data-state", "still");
            }
        })

        //this clears the search input box after the query is being submitted
        $('#search-box').val('');
    });
}

