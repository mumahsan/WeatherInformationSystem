var weather = (function ($) {
    "use strict";
    var constants = {
        endpoints: {
            conditions : "",
            forecast: ""
        }
    },
        properties = {
            currentTemp: "",
            forecast: "",
            current : "",
            first: "",
            second: "",
            third: ""
        },
        methods = (function (p, c) {
            var getWeather = function () {
                c.endpoints.conditions = "http://api.wunderground.com/api/76c2d7e45d437adc/conditions/q/TX/"+data.selectedCity+".json";
                c.endpoints.forecast ="http://api.wunderground.com/api/76c2d7e45d437adc/forecast/q/TX/"+data.selectedCity+".json";
               ajaxCallForCurrentTemperature();
           },
           ajaxCallForCurrentTemperature = function (){
               $.ajax({
                  url : c.endpoints.conditions,
                  dataType : "jsonp",
                  success : function(parsed_json) {
                      p.currentTemp = parsed_json['current_observation']['temp_f'];
                      ajaxCallForForeCasting();
                  }
                })
           }, 
            ajaxCallForForeCasting = function (){
                $.ajax({
                  url : c.endpoints.forecast,
                  dataType : "jsonp",
                  success : function(parsed_json) {
                      p.forecast = parsed_json['forecast']['simpleforecast']['forecastday'],
                      p.current = parsed_json['forecast']['simpleforecast']['forecastday'][0],
                      p.first = parsed_json['forecast']['simpleforecast']['forecastday'][1],
                      p.second = parsed_json['forecast']['simpleforecast']['forecastday'][2],
                      p.third = parsed_json['forecast']['simpleforecast']['forecastday'][3];
                      displayWeatherData();
                  }
                })
            },
            displayWeatherData = function (){
                $(".title").text("Weather Updates of "+data.selectedCity);
                $(".current-temparture").text("Current Temperature: "+p.currentTemp);
                $(".weather-data  tr").remove();
                
                $('.weather-data').append("<tr><th>Date and Day of Week</th><th>High Temperature</th><th>Low Temperature</th><th>Climate</th></tr>");
                              
                buildRow(p.current);
                buildRow(p.first);
                buildRow(p.second);
                buildRow(p.third);
            },
            getDate = function (date) {
                return date.weekday +" "+ date.day +" "+ date.monthname +" "+ date.year;
            },
            buildRow = function (object) {
                $('.weather-data > tbody:last-child').append('<tr><td>'+getDate(object.date) 
                                                     +'</td><td>'+object.high.fahrenheit
                                                     +'</td><td>'+object.low.fahrenheit 
                                                     +'</td><td>'+object.conditions
                                                     +"</td><td><button class='view-detail' data-day='"+JSON.stringify(object)+"'>View Details</button>"
                                                     +'</td></tr>'
                                                    );
            },
            listener = function () {
                $(document).on( 'click', '.view-detail', function() {
                    var day = JSON.parse(JSON.stringify($(".view-detail").data("day")));
                     $(".details-data span").remove();
                    $(".details-data").append("<br><span>Date and Day of Week:"+ getDate(day.date) +"</span>");
                    $(".details-data").append("<br><span>Climate:"+ day.conditions +"</span>");
                });
            },
            init = function() {
                   listener();
                   getWeather();
            };
            
            return init;
        }(properties, constants));
 return methods;
}(jQuery));