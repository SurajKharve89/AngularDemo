// app module
var myapp = angular.module('myapp', ['ngRoute','ngAnimate','ngMessages','ngCookies','ngFileUpload','simplePagination'])
			.constant('URLS',{ baseurl:'http://localhost:8080/projects/angular/demo-site/'})
			.constant('USER_AUTH',{ id:'', name : '' , email: "", msg : ""})
			.run(function ($rootScope, URLS) { $rootScope.URLS = URLS; })
			.run(function ($rootScope, USER_AUTH) { $rootScope.USER_AUTH = USER_AUTH; });
			

// routes
myapp.config(function ($routeProvider,$locationProvider) {
	$routeProvider
    .when('/',
        {
            controller: 'HomeController',
            templateUrl: 'views/welcome.html'
        })
    .when('/about',
        {
            controller: 'AboutController',
            templateUrl: 'views/about.html'
        })
    .when('/posts',
        {
            controller: 'PostController',
            templateUrl: 'views/posts.html'
        })
	.when('/registration',
		{
			controller:'RegistrationController',
			templateUrl:'views/registration.php'
		})
	.when('/contact',
		{
			controller:'ContactController',
			templateUrl:'views/contact.php'
		})
	.when('/profile',
		{
			controller:'UserProfileController',
			templateUrl:'views/profile.php'
		})	
    .otherwise({ redirectTo: '/' });
	$locationProvider.html5Mode(true);

});

// factory for saving cookie// - old
myapp.factory("userPersistenceService", [
	"$cookies", function($cookies) {
		var userauthid = "";
		var userauthname = "";
		return {
			setCookieData: function(userid, username) {
				userauthid = userid;
				userauthname = username;
				$cookies.put("userauthid", userauthid);
				$cookies.put("userauthname", userauthname);
			},
			getCookieData: function() {
				userauthid = $cookies.get("userauthid");
				userauthname = $cookies.get("userauthname");
				return({'userauthid':userauthid, 'userauthname':userauthname});
				
			},
			clearCookieData: function() {
				userauthid = "";
				userauthname = "";
				
				$cookies.remove('userauthid');
				$cookies.remove('userauthname');
			}
		}
	}
]);


// factory for sendmail service //
myapp.factory("SendMailService",function($http,URLS){
	
	var url = URLS.baseurl+"action-files/sendmail.php";
	var emailto = "";
	var emailfrom = "";
	var emailsubject = "";
	var emailmessage = "";
	return {
			sendmail: function(emailto, emailfrom, emailsubject, emailmessage) {
				 emailto = emailto;
				 emailfrom = emailfrom;
				 emailsubject = emailsubject;
				 emailmessage = emailmessage;
				 
				$http.post(url,{'to':emailto,'from':emailfrom,'subject':emailsubject,'message':emailmessage})
				.success(function(response){
					 alert(response);
					 
				});
			}
		} 	
});

// getusers //
myapp.factory("getusersdataService", function($http,URLS){
	
	var url = URLS.baseurl+"action-files/getusersdata.php";
	
	return{
		
			getusersdata: function(id)
			{
				var userid = id;
				return $http.post(url,{'userid':userid});
			}
		}
	
	});

// file upload	directive user updating user profile image // Important
myapp.directive("fileread", [function () {
    return {
        $scope: {
            fileread: "="
        },
        link: function ($scope, element, attributes) {
            element.bind("change", function (changeEvent) {
            	
                $scope.$apply(function () {

                    $scope.fileread = changeEvent.target.files[0];
                    //alert($scope.fileread.name);
	            });

                // alternate solution for showing image preview before upload//
	            /*var reader = new FileReader();
	           
		        reader.onload = function (e) {
		        	
		            //$scope.blah = e.target.result;
		            $('#blah').attr('src', e.target.result).show();
		        }
		            
		        reader.readAsDataURL(changeEvent.target.files[0]);*/
		        // alternate solution for showing image preview before upload//  

            });
        }
    }
}]);


// Current Menu //
myapp.directive('activenav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function($scope, element,attributes) {
   $scope.location = $location;
   $scope.$watch('location.path()', function(currentPath) {
	  //alert(currentPath +"--"+ '/'+element[0].attributes['href'].nodeValue);
	 if(element[0].attributes['href'].nodeValue === 'base')
	 {
		 var mypath = '/';
	 }
	 else
	 {
		  var mypath = '/'+element[0].attributes['href'].nodeValue;
	 }
	 
     if(currentPath === mypath) {
       element.parent().addClass('active-menu');
     } else {
       element.parent().removeClass('active-menu');
     }
   });
 }
 };
}]);

// FireBase code for showing Online users //
myapp.factory('PresenceService', ['$rootScope',
    function($rootScope) {
      var onlineUsers = 0;

      // Create our references
      var listRef = new Firebase('https://ng-advent-realtime.firebaseio.com/presence/');
      var userRef = listRef.push(); // This creates a unique reference for each user
      var presenceRef = new Firebase('https://ng-advent-realtime.firebaseio.com/.info/connected');

      // Add ourselves to presence list when online.
      presenceRef.on('value', function(snap) {
        if (snap.val()) {
          userRef.set(true);
          // Remove ourselves when we disconnect.
          userRef.onDisconnect().remove();
        }
      });

      // Get the user count and notify the application
      listRef.on('value', function(snap) {
        onlineUsers = snap.numChildren();
        $rootScope.$broadcast('onOnlineUser');
      });

      var getOnlineUserCount = function() {
        return onlineUsers;
      }

      return {
        getOnlineUserCount: getOnlineUserCount
      }
    }
  ]);