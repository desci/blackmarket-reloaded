define(["angularApp"],function(n){n.controller("PrestigeCtrl",["$scope","$interval","$timeout",function(n,i,t){n.init=function(){game.options.angularInit||(game.options.angularInit=!0),game.prestige.angularInit()},t(n.init)}])});