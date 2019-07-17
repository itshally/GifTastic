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
    
});

//a  click event for the buttons in the sidebar
$('.topic-btn').on('click', function(event){
    event.preventDefault();
    console.log($(this).val());
    
    $.ajax({
        url : "http://api.giphy.com/v1/gifs/search?q=" + searchQuery + "&api_key=NBFFDFiAlmknq6pwxTbJJdrC3YQs31yb&limit=10",
        method : "GET"
    }).then(function(result){

        console.log(result);
        
        //this clears the search input box after the query is being submitted
        $('#search-box').val('');
    });
})
