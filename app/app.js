'use strict';
angular.module('PalettifyApp', ['ngAnimate'])
 .controller('MainController', function($scope,$http,$timeout) {
     $scope.dataLoaded = false;
     $scope.pContainer = true;
     $scope.backgroundclr = 'whitebg';
     $scope.buttonclr = 'darkbg';
     $scope.invert = true;

     $http({method: 'GET', url: 'app/data.json'})
     .success(function(data) {
       $scope.palette = Math.floor(Math.random()*data.length);
       $scope.titles = [];
       $scope.colors = [];
       for (var i in data) {
         $scope.colors.push(data[i].colors);
         $scope.titles.push(data[i].title);
       }
       angular.element(document.getElementsByClassName('tooltipnow')).tooltip();
       $scope.dataLoaded = true;
     })
     .error(function() {
       console.log('Ooooops! Something went wrong Charlie!');
     });

     $scope.nextPalette = function($event){
       $event.stopPropagation();
       $scope.pContainer = false;
       $timeout(function(){
         var last = $scope.palette;
         var next  = -1;
         while(next===-1||next===last){
           next = Math.floor(Math.random()*$scope.colors.length);
         }
         $scope.palette = next;
         $scope.pContainer = true;
       }, 300);
     };

     $scope.changeBackground = function(){
       if ($scope.backgroundclr==='whitebg') {
         $scope.backgroundclr = 'darkbg';
         $scope.buttonclr = 'whitebg';
         $scope.invert = false;
       }else{
         $scope.backgroundclr = 'whitebg';
         $scope.buttonclr = 'darkbg';
         $scope.invert=true;
       }
     };
});
