nameApp.controller("ShareController", function($scope, $cordovaSocialSharing) {

	$scope.shareAnywhere = function() {

		$cordovaSocialSharing.share("Sharing : ", "Subject", "file:///storage/emulated/0//GrundigImages/image3.jpg", "http://google.com");
	};
	$scope.shareViaTwitter = function(message, image, link) {
		
		$cordovaSocialSharing.shareViaTwitter(message, image, link).then(function(result) {
			// Success!
			alert("success : " + result);
		}, function(err) {
			// An error occurred. Show a message to the user
			alert("Cannot share on Twitter");
		});
	};

	$scope.shareViaEmail = function() {
		$cordovaSocialSharing.shareViaEmail('Sharing : ', 'Subject', 'zafer_can_05@hotmail.com');
	};
	$scope.shareViaWhatsApp = function(message, id, link) {
	   // alert("whatsapp");
		var image = "file:///storage/emulated/0//GrundigImages/image"; 
		 var index = id.toString();
		 image += index;
		 image += ".jpg";
		$cordovaSocialSharing.shareViaWhatsApp(message, image, link).then(function(result) {
			//alert(result);
			// Success!
		}, function(err) {
			// An error occurred. Show a message to the user
			alert("Cannot share on WhatsApp");
		});
	};
	$scope.shareViaFacebook = function(message, image, link) {
		$cordovaSocialSharing.shareViaFacebook(message, image, link).then(function(result) {
			// Success!
		}, function(err) {
			// An error occurred. Show a message to the user
			alert("Cannot share on Facebook");
		});
	};
	// access multiple numbers in a string like: '0612345678,0687654321'
	$scope.shareViaSMS = function(message, number) {
		$cordovaSocialSharing.shareViaSMS(message, number).then(function(result) {
			alert(result);
			// Success!
		}, function(err) {
			// An error occurred. Show a message to the user
		});
	};
	// TO, CC, BCC must be an array, Files can be either null, string or array

});
