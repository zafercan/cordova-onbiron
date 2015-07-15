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
//change srcImage with timestamp
function refresh(id) {
    for (var i = 0; i < grids.length; i++) {

        var img = grids[i].srcImage;
        grids[i].srcImage = '';
        grids[i].srcImage = grids[i].url + '?timestamp=' + getTimeStamp();

    }
}

//first page controller
myApp.controller('ListCtrl', function($scope, $state, $ionicLoading) {

    //$ionicHistory.clearCache().then(function(){ $state.go('view', { imageid : 1 } )});

    //refresh button click
    $scope.onRefreshClick = function() {
        refresh();
        $scope.changePage();
    };
    //take picture button click
    $scope.onTakePictureClick = function() {
        //show spinner
        $ionicLoading.show({
            content : 'Loading Data',
            animation : 'fade-in',
            showBackdrop : false
        });
        $.getJSON(TAKE_PICTURE_URL, function(data) {
            //console.debug(grids);

            if (data.status == STATUS_OK) {
                $scope.onRefreshClick();
                $scope.changePage();
                $scope.hide();
            }
        });
        //hide spinner
        $scope.hide = function() {
            $ionicLoading.hide();
        };

    };

    // move main page to second page
    $scope.changePage = function() {
        $state.go('view', {
            imageid : 1
        }, {
            reload : true
        });
    };
});

//second page and popup  coontroller
myApp.controller('MainCtrl', function($scope, $ionicModal, $http, $state) {

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
    $scope.pullToRefresh = function() {

        refresh();
        //stop scrolling
        $scope.$broadcast('scroll.refreshComplete');

    };

});

