var app = (function () {
        "use strict";
    var constants = {
            endpoints: {
                allTexasCities: "http://api.wunderground.com/api/76c2d7e45d437adc/conditions/q/TX.json",
            }
        },
    properties = {
         cities: ["Austin"],
         selectedCity: ""
    },
    listeners = function () {
            $(".add-city").click(function(){
                var input = $("input[name=input-city]").val();
                if(input != ""){
                    $("input[name=input-city]").val("");
                    if($.inArray(input, properties.cities) == -1) {
                        properties.cities.push(input);
                        $('.select-city').append($('<option>', {value:input, text:input}));
                        alert("New City Added Successfully");
                    } else {
                        alert(input+" is allready in the list");
                    }
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
            })
            $(".add-all-tx-cities").click(function() {
                loadAllCitiesOfTexasAjaxCall();
            });
        },
        loadAllCitiesOfTexasAjaxCall = function () {
            $.ajax({
              url : constants.endpoints.allTexasCities,
              dataType : "jsonp",
              success : function(parsed_json) {
                  $(parsed_json['response']['results']).each(function(index, obj) {
                      if($.inArray(obj.city, properties.cities) == -1) {
                          properties.cities.push(obj.city);
                        $('.select-city').append($('<option>', {value:obj.city, text:obj.city}));
                      }
                  });
                  alert("All Cities of Texas are added");
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
