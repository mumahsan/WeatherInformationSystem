var data = (function () {
    "use strict";
    var cities = ["Austin"],
    selectedCity="";
    $('.select-city').append($('<option>', {value:cities[0], text:cities[0]}));
    return {
        cities: cities,
        selectedCity: selectedCity
    }
}()),
listeners = (function () {
    "use strict";
    $(".add-city").click(function(){
        var input = $("input[name=input-city]").val();
        $("input[name=input-city]").val("");
        data.cities.push(input);
        $('.select-city').append($('<option>', {value:input, text:input}));
        alert("New City Added Successfully");
    });
    $(".check-weather").click(function(){
        var city = $(".select-city").val();
        if(city == "0") {
            alert("Please Select City!");
        } else {
           data.selectedCity = city;
           weather($); 
        }
    });
}());

