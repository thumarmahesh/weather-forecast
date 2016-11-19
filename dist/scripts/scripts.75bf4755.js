"use strict";angular.module("weatherappApp",["ngRoute"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("weatherappApp").controller("MainCtrl",["$scope","$weather",function(a,b){a.loadingData=!0,b.get(1279233).then(function(b){a.weatherData=b,a.loadingData=!1},function(){a.loadingData=!1,a.dataError=!0}),a.getImage=function(a){return a||(a="01d"),"http://openweathermap.org/img/w/"+a+".png"},a.selectDate=function(b){b&&(a.selectedDate=b,a.dailyData=a.weatherData.list[b])}}]),angular.module("weatherappApp").controller("AboutCtrl",function(){}),angular.module("weatherappApp").directive("navBar",["$location",function(a){return{templateUrl:"views/navbar.html",link:function(b){b.isActive=function(b){var c=b===a.path();return c}}}}]),angular.module("weatherappApp").service("$weather",["$q","$http",function(a,b){var c={};return c.transformJSON=function(a){var b=JSON.parse(JSON.stringify(a)),c=b.list.slice(0);b.list={};for(var d={},e=0;e<c.length;e++){var f=c[e].dt_txt;f=f.split(" ")[0],d[f]=d[f]||[],d[f].push(c[e])}return b.list=d,b},c.get=function(d){var e=a.defer();return b.get("http://api.openweathermap.org/data/2.5/forecast?units=metric&id="+d+"&appid=e59b3d48d4da4b7c9d0884ffe0d8f8a6").then(function(a){var b=c.transformJSON(a.data);e.resolve(b)},function(a){console.log(a),e.reject()}),e.promise},c}]),angular.module("weatherappApp").run(["$templateCache",function(a){a.put("views/about.html",'<nav-bar></nav-bar> <div class="container"> <h3 class="text-center">Credits</h3> <hr> <div class="row marketing"> <h4>Scaffolding: </h4> <p> <a href="https://github.com/yeoman/generator-angular" target="_blank"> <img class="pull-left" src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"> </a> <br> + Angular </p> <div class="clearfix"></div> <br> <br> <br> <h4> Weather Data: </h4> <p> <a href="https://openweathermap.org/" target="_blank"> <img style="width: 250px" src="images/openweathermap.918216d0.svg" alt="OpenWeatherMap"> </a> </p> <div class="clearfix"></div> <br> <br> <br> <h4> Hosting: </h4> <p> <a href="https://openshift.redhat.com" target="_blank"> <img style="background: #333" src="images/openshift.49bf0409.svg" alt="Openshift"> </a> </p> </div> </div>'),a.put("views/main.html",'<nav-bar></nav-bar> <div class="container"> <div class="text-center loader" ng-if="loadingData"> <img src="images/loading.38f35c8c.gif"> </div> <div class="date-container" ng-if="weatherData"> <div class="col-xs-12 report-header"> <h3> Weather forecast - {{weatherData.city.name}}, {{weatherData.city.country}} </h3> </div> <div class="col-xs-6 col-md-4" ng-class="{\'selected\': dt == selectedDate}" ng-repeat="(dt, obj) in weatherData.list" ng-click="selectDate(dt);"> <div class="date-box"> <div class="text-center font-12"> {{obj[0].dt_txt}} </div> <h3 class="text-center"> <div> {{(obj[0].main.temp)}} °C </div> <div title="min-max"> <small class="font-12"> {{(obj[0].main.temp_min)}} °C - {{(obj[0].main.temp_max)}} °C </small> </div> </h3> <div class="text-center"> <img class="weather-img" ng-src="{{getImage(obj[0].weather[0].icon)}}"> <div class="font-18 text-capitalize"> {{ obj[0].weather[0].description }} </div> </div> </div> </div> </div> <div class="text-center date-container" ng-if="dataError"> We are unable to fetch data :( <br> Please visit after sometime! </div> <div class="clearfix"></div> <div class="daily-data-container" ng-if="dailyData"> <h3> Hourly weather forecast - {{selectedDate}} </h3> <table class="table table-striped"> <tr ng-repeat="obj in dailyData"> <td class="text-middle" title="Time"> {{obj.dt_txt.split(\' \')[1]}} </td> <td class="text-middle" title="Temperature"> {{(obj.main.temp)}} °C </td> <td class="text-middle" title="Weather"> <img class="weather-img" ng-src="{{getImage(obj.weather[0].icon)}}"> </td> <td class="text-capitalize text-middle" title="Weather"> {{ obj.weather[0].description }} </td> <td class="text-middle" title="Wind-speed"> {{ obj.wind.speed }} m/s </td> </tr> </table> </div> <div ng-if="weatherData && !dailyData" class="tip"> <small> * Select a date to see hourly weather forecasting. </small> </div> </div>'),a.put("views/navbar.html",'<div class="header"> <div class="navbar navbar-default" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="/">Weather.μθ</a> </div> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <ul class="nav navbar-nav"> <li ng-class="{ active: isActive(\'/\') }"><a href="/">Home</a></li> <li ng-class="{ active: isActive(\'/about\') }"><a ng-href="/about">About</a></li> </ul> </div> </div> </div> </div>')}]);