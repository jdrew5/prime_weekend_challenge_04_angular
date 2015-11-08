$(document).ready(function(){

    $("#addMessage").submit(addMessage);
    $("#messageContainer").on('click', '.delete', deletePerson);

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

function deletePerson(){
    var deletedId = {"id" : $(this).data("id")};

    console.log("Meaningful Log: ", deletedId);

    $.ajax({
        type: "DELETE",
        url: "/delete" + deletedId,
        data: deletedId,
        success: function(data){

            getData();
        }
    })
}

function updateDOM(data){
    $("#messageContainer").empty();
    $("#addMessage").find("input[type=text]").val("");


    for(var i = 0; i < data.length; i++){
        var el = "<div class='parent row'>" +
            "<p class='left'>" + data[i].user_name + "</p>" +
            "<p class='center'>" + data[i].message + "</p>" +
            "<button class='delete btn btn-danger' data-id='" +
            data[i].message_id + "'>Delete</button>" +
            "</div>";

        $("#messageContainer").append(el);
    }
}
