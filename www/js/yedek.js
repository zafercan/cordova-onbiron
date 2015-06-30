// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic']).run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}).controller('MainCtrl', function($scope, $ionicModal) {
	$scope.hide = [{
		bars : true
	}];


	$scope.data = {};
	$scope.grids = grids;

	// $scope.grids = [{
	// id: 0,
	// src:  deneme,
	// }, {
	// id: 1,
	// src:  'http://lorempixel.com/400/200/sports/2/',
	// }, {
	// id: 2,
	// src: 'http://lorempixel.com/400/200/sports/3/',
	// }, {
	// id: 3,
	// src: 'http://lorempixel.com/400/200/sports/4/',
	// }, {
	// id: 4,
	// src: 'http://lorempixel.com/400/200/sports/5/',
	// }, {
	// id: 5,
	// src: 'http://lorempixel.com/400/200/sports/6/',
	// }];

	$ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
		$scope.gridModal = modal;
	}, {
		scope : $scope,
		animation : 'slide-in-up'
	});

	// $scope.initialize = function(grids) {
		// console.log();
		// $scope.grids = grids;
	// };

	$scope.openModal = function(selected) {
		console.log(selected.id);
		$scope.data.selected = selected.id;

		$scope.gridModal.show();
	};

	$scope.closeModal = function() {
		$scope.gridModal.hide();
		$scope.hide.bars = false;
	};
});

