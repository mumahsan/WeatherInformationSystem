var app = (function () {
        "use strict";
    var properties = {
         cities: ["Austin"],
         selectedCity: ""
    },
    listeners = function () {
            $(".add-city").click(function(){
                var input = $("input[name=input-city]").val();
                if(input != ""){
                    $("input[name=input-city]").val("");
                    properties.cities.push(input);
                    $('.select-city').append($('<option>', {value:input, text:input}));
                    alert("New City Added Successfully");
                } else {
                    alert("Please enter city");
                }
            });
            $(".check-weather").click(function(){
                var city = $(".select-city").val();
                if(city == "0") {
                    alert("Please Select City!");
                } else {
                   properties.selectedCity = city;
                   weather($); 
                }
            });
        },
        init = function() {
            $('.select-city').append($('<option>', {value:properties.cities[0], text:properties.cities[0]}));
            listeners();
        };
    init();
    return {
        properties: properties,
        init: init,
        test: {
            listeners: listeners
        }
    }
}());
