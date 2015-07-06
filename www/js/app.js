var nameApp = angular.module('starter', ['ionic', 'ui.router', 'ngCordova']);

nameApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
nameApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('index', {
        url : '/',
        templateUrl : 'index.html',
        controller : 'ListCtrl',
        cache : false
    }).state('view', {
        url : '/images',
        templateUrl : 'images.html',
        controller : 'MainCtrl',
        cache : false
    });

    $urlRouterProvider.otherwise("/");

});

nameApp.controller('ListCtrl', function($scope, $state) {
     
     //$ionicHistory.clearCache().then(function(){ $state.go('view', { imageid : 1 } )});
    $scope.changePage = function() {
        $state.go('view', {
            imageid : 1
        },{reload:true});
    };

});

nameApp.controller('ViewCtrl', function($scope, $stateParams, $ionicHistory) {
    console.log($stateParams.imageid);
    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
});

nameApp.controller('MainCtrl', function($scope, $ionicModal, $http,$state) {

    $scope.hide = [{
        bars : true
    }];

    $scope.data = {};
    $scope.grids = grids;

    $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
        $scope.gridModal = modal;
    }, {
        scope : $scope,
        animation : 'slide-in-up'
    });

    $scope.openModal = function(selected) {
        console.log(selected.id);
        $scope.data.selected = selected.id;

        $scope.gridModal.show();
    };

    $scope.closeModal = function() {
        $scope.gridModal.hide();
        $scope.hide.bars = false;
    };

    $scope.doRefresh = function() {


        for (var i = 0; i < $scope.grids.length; i++) {

            var img = $scope.grids[i].srcImage;
            $scope.grids[i].srcImage = 'http://placehold.it/150x150';
            console.log("before : " + $scope.grids[i].srcImage);
            $scope.grids[i].srcImage = img;
            console.log("after : " + $scope.grids[i].srcImage);
        }
// $state.go('view', {
            // imageid : 1
        // },{reload: true});
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
        
        // $http.get("https://dl.dropboxusercontent.com/u/1403240/staj/metadata.json")
// 
        // //angular.element(document.getElementById('main')).scope().initialize(grids);
// 
        // .success(function(data) {
// 
            // var URLs = [];
            // //var grids;
// 
            // var deviceName = data.deviceName;
            // var raspiCamCount = data.raspiCamCount;
// 
            // //$("#imageTitle").innerHTML = "";
// 
            // for (var i = 0; i < raspiCamCount; i++) {
// 
                // URLs[i] = data.cams[i].url;
                // $scope.grids[i].srcImage = URLs[i];
                // $scope.grids[0].title = deviceName;
                // $scope.grids[i].srcImage = 'http://placehold.it/150x150';
// 
                // //document.getElementById("imageTitle").innerHTML = deviceName;
                // //$("#images").append("<li class=\"item\" ><img src=' " + URLs[i] + " ' width='100%' heigth='100%'></li> ");
            // }
        // }).finally(function() {
// 
            // // Stop the ion-refresher from spinning
            // $scope.$broadcast('scroll.refreshComplete');
        // });
    };

});

