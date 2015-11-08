$(document).ready(function(){

    $("#addMessage").submit(addMessage);

    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url: "/data",
        //data: values,
        success: function(data){
            console.log(data);
            updateDOM(data);
        }
    })
}

function addMessage(){
    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    $.ajax({
        type: "POST",
        url: "/data",
        data: values,
        success: function(data){
            getData();
        }
    });
}

function updateDOM(data){
    $("#messageContainer").empty();
    $("#addMessage").find("input[type=text]").val("");

    for(var i = 0; i < data.length; i++){
        var el = "<div class='parent row'>" +
            "<div class='left'>" + data[i].user_name + "</div>" +
            "<div class='center'>" + data[i].message + "</div></div>";

        $("#messageContainer").append(el);
    }
}
