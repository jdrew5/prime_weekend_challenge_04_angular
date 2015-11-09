var myApp = angular.module('myApp', []);

myApp.controller("MessageController", ['$scope', '$http', function($scope, $http){
    $scope.message = {};
    $scope.messageArray = [];

    $scope.getMessage = function() {
        $http.get('/data').then(function(response){
            $scope.messageArray = response.data;
            console.log("message array", $scope.messageArray);
        });
    };

    $scope.clickButton = function(message){
        console.log("message - form", message);
        $http.post('/data', message).then(function(response){
            $scope.getMessage();
        });
    };

    $scope.getMessage();

}]);

//$(document).ready(function(){
//
//    $("#addMessage").submit(addMessage);
//
//    getData();
//});
//
//function getData(){
//    $.ajax({
//        type: "GET",
//        url: "/data",
//        //data: values,
//        success: function(data){
//            console.log(data);
//            updateDOM(data);
//        }
//    })
//}
//
//function addMessage(){
//    event.preventDefault();
//    var values = {};
//
//    $.each($(this).serializeArray(), function(i, field){
//        values[field.name] = field.value;
//    });
//
//    $.ajax({
//        type: "POST",
//        url: "/data",
//        data: values,
//        success: function(data){
//            getData();
//        }
//    });
//}
//
//function updateDOM(data){
//    $("#messageContainer").empty();
//    $("#addMessage").find("input[type=text]").val("");
//
//    for(var i = 0; i < data.length; i++){
//        var el = "<div class='parent row'>" +
//            "<div class='left'>" + data[i].user_name + "</div>" +
//            "<div class='center'>" + data[i].message + "</div></div>";
//
//        $("#messageContainer").append(el);
//    }
//}
