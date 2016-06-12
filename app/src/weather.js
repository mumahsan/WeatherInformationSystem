var weather = (function ($) {
    "use strict";
    var constants = {
        endpoints: {
            conditions : "http://api.wunderground.com/api/76c2d7e45d437adc/conditions/q/TX/{selectedCity}.json",
            forecast : "http://api.wunderground.com/api/76c2d7e45d437adc/forecast/q/TX/{selectedCity}.json"
        }
    },
        properties = {
            currentWeather : {
                currentTemp: "",
                heat_index: "",
                dew_point: "",
                wind_speed: "",
                humidity: "",
                weather: ""
            },
            current : "",
            first: "",
            second: "",
            third: ""
        },
        methods = (function (p, c) {
            var getForeCast = function () {
               ajaxCallForForeCasting();
           },
            getCurrentConditions = function () {
                ajaxCallForCurrentTemperature();
            },
           ajaxCallForCurrentTemperature = function (){
               $.ajax({
                  url : c.endpoints.conditions.replace("{selectedCity}", app.properties.selectedCity),
                  dataType : "jsonp",
                  success : function(parsed_json) {
                      if(parsed_json.response.error) {
                          alert(parsed_json.response.error.description);
                      } else {
                          p.currentWeather.currentTemp = parsed_json['current_observation']['temp_f'];
                          p.currentWeather.heat_index = parsed_json['current_observation']['heat_index_f'];
                          p.currentWeather.dew_point = parsed_json['current_observation']['dewpoint_f'];
                          p.currentWeather.wind_speed = parsed_json['current_observation']['wind_mph'];
                          p.currentWeather.humidity = parsed_json['current_observation']['relative_humidity'];
                          p.currentWeather.weather = parsed_json['current_observation']['weather'];
                          $(".details-data").html("");
                          $(".details-data").append("<button class='current-weather-detail btn btn-default'>View Current Weather Details</button>");
                          displayWeatherData();
                      }
                  },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("API service is down");
                    }
                });
           }, 
            ajaxCallForForeCasting = function (){
                $.ajax({
                  url : c.endpoints.forecast.replace("{selectedCity}", app.properties.selectedCity),
                  dataType : "jsonp",
                  success : function(parsed_json) {
                      if(parsed_json.response.error) {
                          alert(parsed_json.response.error.description);
                      } else {
                          p.current = parsed_json['forecast']['simpleforecast']['forecastday'][0],
                          p.first = parsed_json['forecast']['simpleforecast']['forecastday'][1],
                          p.second = parsed_json['forecast']['simpleforecast']['forecastday'][2],
                          p.third = parsed_json['forecast']['simpleforecast']['forecastday'][3];
                          getCurrentConditions();
                      }
                  }
                });
            },
            displayWeatherData = function (){
                $(".title").text("Weather Updates of "+app.properties.selectedCity);
                $(".current-temparture").text("Current Temperature: "+p.currentWeather.currentTemp).append("&#8457;");
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
                                                     +'</td><td>'+object.high.fahrenheit+ "&#8457;"
                                                     +'</td><td>'+object.low.fahrenheit + "&#8457;"
                                                     +'</td><td>'+object.conditions
                                                     +'</td></tr>'
                                                    );
            },
            listener = function () {
                $(document).on( 'click', '.current-weather-detail', function() {
                    $(".details-data span").remove();
                    $(".details-data br").remove();
                    $(".details-data").append("<span><h3>Current Weather Details of "+app.properties.selectedCity+"</h3></span>");
                    $(".details-data").append("<span><b>Date and Day of Week:</b> "+ getDate(p.current.date) +"</span>");
                    $(".details-data").append("<br><span><b>Current Temperature:</b> "+ p.currentWeather.currentTemp +" &#8457;</span>");
                    $(".details-data").append("<br><span><b>Heat Index:</b> "+ p.currentWeather.heat_index +"</span>");
                    $(".details-data").append("<br><span><b>Climate:</b> "+ p.currentWeather.weather +"</span>");
                    $(".details-data").append("<br><span><b>Wind Speed:</b> "+ p.currentWeather.wind_speed +" mph</span>");
                    $(".details-data").append("<br><span><b>Dew Point:</b> "+ p.currentWeather.dew_point +" &#8457;</span>");
                    $(".details-data").append("<br><span><b>Humidity:</b> "+ p.currentWeather.humidity +"</span>");
                });
            },
            init = function() {
                   listener();
                   getForeCast();
            };
            return init;
        }(properties, constants));
 return methods;
}(jQuery));
