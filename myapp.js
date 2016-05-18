var skycons = new Skycons();

//skycons.add("today", Skycons.CLEAR_DAY);
skycons.add("day0_Icon", Skycons.CLEAR_DAY);
skycons.add("day1_Icon", Skycons.CLEAR_DAY);
skycons.add("day2_Icon", Skycons.CLEAR_DAY);
skycons.add("day3_Icon", Skycons.CLEAR_DAY);

// start animation!
skycons.play();

var ChoiseBtn = $(".btn");

var weather = $("#weather");
var WeatherCondition;

var day0_date = $("#day0_date");
var day1_date = $("#day1_date");
var day2_date = $("#day2_date");
var day3_date = $("#day3_date");

var day1_Temp = document.getElementById("day1_Temp");
var day2_Temp = document.getElementById("day2_Temp");
var day3_Temp = document.getElementById("day3_Temp");
var current_Temp;

var cities = ["台北市","新北市","台中市","台南市","高雄市","基隆市","桃園市","新竹市","苗栗市","彰化縣","南投縣","雲林縣","嘉義市", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"];

var city = [];
$("ul").empty();


$.each(cities, function(index, element) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D\""+cities[index]+"\")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    $.getJSON(url, function(data) {
        var page = data.query.results.channel.item;
        current_Temp = Math.round((page.condition.temp - 32) * 5 / 9 );
        list.children('a').text(list.text() + " " + current_Temp + "℃");

        city[index]= {data ,"object" : cities[index]};

        if(city[index].object === "台北市"){
          //get weather
          var cityTemperature = Math.round((page.condition.temp - 32) * 5 / 9 );
          $(".temperature").text(cityTemperature + "℃");

          WeatherCondition = page.condition.text;
          weather.text(" : " + WeatherCondition);

          day0_date.text(page.forecast[0].date);
          day1_date.text(page.forecast[1].date);
          day2_date.text(page.forecast[2].date);
          day3_date.text(page.forecast[3].date);

          var day1_High = Math.round((page.forecast[1].high - 32) * 5 / 9 );
          var day1_Low = Math.round((page.forecast[1].low - 32) * 5 / 9 );
          var day2_High = Math.round((page.forecast[2].high - 32) * 5 / 9 );
          var day2_Low = Math.round((page.forecast[2].low - 32) * 5 / 9 );
          var day3_High = Math.round((page.forecast[3].high - 32) * 5 / 9 );
          var day3_Low = Math.round((page.forecast[3].low - 32) * 5 / 9 );

          day1_Temp.innerHTML = day1_Low + "~" + day1_High + '℃';
          day2_Temp.innerHTML = day2_Low + "~" + day2_High + '℃';
          day3_Temp.innerHTML = day3_Low + "~" + day3_High + '℃';
          //

          icon(page);
        }
    });

    var list = $("<li class='listPart' role='presentation'><a role='menuitem' tabindex='-1' href='#'>" + cities[index] +"</a></li>");
    list.appendTo("ul");
});


/*
Get value from Bootstrap dropdown menu
*/
$('#dropdown li').on('click', function() {
    var city_choise = $(this).text().slice(0, $(this).text().length-4);
    for(var i=0 ; i < city.length; i++){
      if(city_choise === city[i].object){
          var page = city[i].data.query.results.channel.item;    

          //get weaher
          var cityTemperature = Math.round((page.condition.temp - 32) * 5 / 9 );
          $(".temperature").text(cityTemperature + "℃");

          WeatherCondition = page.condition.text;
          weather.text(" : " + WeatherCondition);

          day0_date.text(page.forecast[0].date);
          day1_date.text(page.forecast[1].date);
          day2_date.text(page.forecast[2].date);
          day3_date.text(page.forecast[3].date);

          var day1_High = Math.round((page.forecast[1].high - 32) * 5 / 9 );
          var day1_Low  = Math.round((page.forecast[1].low - 32) * 5 / 9 );
          var day2_High = Math.round((page.forecast[2].high - 32) * 5 / 9 );
          var day2_Low = Math.round((page.forecast[2].low - 32) * 5 / 9 );
          var day3_High = Math.round((page.forecast[3].high - 32) * 5 / 9 );
          var day3_Low = Math.round((page.forecast[3].low - 32) * 5 / 9 );

          day1_Temp.innerHTML = day1_Low   + "~" + day1_High   + '℃';
          day2_Temp.innerHTML = day2_Low   + "~" + day2_High   + '℃';
          day3_Temp.innerHTML = day3_Low + "~" + day3_High + '℃';
          //

          var a = Math.round((page.condition.temp - 32) * 5 / 9 );
          var Choise = city_choise + a + "℃";
          ChoiseBtn.text(Choise);
          icon(page);
      }
    }
});



function icon (page){
      var dayicon = ["day0_Icon","day1_Icon","day2_Icon","day3_Icon"];
      for(var i = 0; i<dayicon.length ;i++){
        var daycode = parseInt(page.forecast[i].code);

        //下雨
        if(daycode === 1 || daycode === 3 || daycode === 4 || daycode === 9 || daycode === 10 || daycode === 11 || daycode === 12 || daycode === 35 || daycode === 37 ||daycode === 38 ||daycode === 39 || daycode === 40 || daycode === 45 ||daycode === 47 || daycode === 48 ){
           skycons.set(dayicon[i], Skycons.RAIN);  
        }
        //風
        else if ( daycode === 0 ||daycode === 2 || daycode === 23 || daycode === 24 ||daycode === 25 ){
           skycons.set(dayicon[i], Skycons.WIND);                 
        }
        //雲
        else if ( daycode === 26 || daycode === 26 || daycode === 28){
           skycons.set(dayicon[i], Skycons.CLOUDY);               
        }
        //下雪
        else if ( daycode === 13 || daycode === 14 || daycode === 15 || daycode === 16 || daycode === 41 || daycode === 42 || daycode === 43 ||daycode === 46){
           skycons.set(dayicon[i], Skycons.SNOW);                 
        }
        //太陽
        else if ( daycode === 32 ||daycode === 34 || daycode === 36){
           skycons.set(dayicon[i], Skycons.CLEAR_DAY);            
        }
        //月亮
        else if ( daycode === 31 ||daycode === 33){
           skycons.set(dayicon[i], Skycons.CLEAR_NIGHT);          
        }
        //雲&太陽
        else if ( daycode === 30 || daycode === 44 ){
           skycons.set(dayicon[i], Skycons.PARTLY_CLOUDY_DAY);    
        }
        //雲&月亮
        else if ( daycode === 29){
           skycons.set(dayicon[i], Skycons.PARTLY_CLOUDY_NIGHT);  
        }
        //下雨&下雪
        else if ( daycode === 5 || daycode === 6 || daycode === 7 || daycode === 8 || daycode === 17 || daycode === 18){
           skycons.set(dayicon[i], Skycons.SLEET);                
        }
        //霧
        else if ( daycode === 19|| daycode === 20 || daycode === 21 || daycode === 22){
           skycons.set(dayicon[i], Skycons.FOG);                  
        }
        else{
            skycons.set(dayicon[i], Skycons.CLEAR_DAY);  
        }
      }
}
