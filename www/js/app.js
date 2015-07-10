var myApp = angular.module('starter', ['ionic', 'ui.router', 'ngCordova']);

myApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
myApp.config(function($stateProvider, $urlRouterProvider) {
    //set page transition properties
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

//first page controller
myApp.controller('ListCtrl', function($scope, $state) {

    //$ionicHistory.clearCache().then(function(){ $state.go('view', { imageid : 1 } )});
    $scope.changePage = function() {
        $state.go('view', {
            imageid : 1
        }, {
            reload : true
        });
    };

    $scope.onTakePictureClick = function() {
        $.getJSON(TAKE_PICTURE_URL, function(data) {
            console.debug(grids);
           if(data.status == STATUS_OK){
               
           }
        });

    };
});

//second page and popup  coontroller
myApp.controller('MainCtrl', function($scope, $ionicModal, $http, $state, $ionicScrollDelegate) {

    $scope.hide = [{
        bars : true
    }];

    $scope.data = {};
    $scope.grids = grids;
    //get template
    $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
        $scope.gridModal = modal;
    }, {
        scope : $scope,
        animation : 'slide-in-up'
    });
    //open popup
    $scope.openModal = function(selected) {
        console.log(selected.id);
        $scope.data.selected = selected.id;

        $scope.gridModal.show();
    };
    //close popup
    $scope.closeModal = function() {
        $scope.gridModal.hide();
        $scope.hide.bars = false;
    };
    //ion-refresh function
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
    $ionicScrollDelegate.resize();
});

