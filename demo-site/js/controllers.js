// home controller
myapp.controller('HomeController', function ($scope,USER_AUTH,$cookies) {
    $scope.header = "Welcome to my AngularJS Demo";
	
});

// about controller
myapp.controller('AboutController', function ($scope,USER_AUTH,$cookies) {
    $scope.header = "About";
	
	
});

// loginlogout Controller
myapp.controller('LoginLogoutController',function(userPersistenceService,$scope,$http,URLS,USER_AUTH,$timeout,$location,$cookies){
  	
	
	USER_AUTH.id = $cookies.get('userauthid') || "";
	USER_AUTH.name = $cookies.get('userauthname') || "";// for login purpose
	
	
	$scope.login = function(){
		
		var url = URLS.baseurl+"action-files/checkuserlogin.php"
		$scope.userdata = {"username":$scope.user.username,"password":$scope.user.password};
		//alert($scope.userdata.username+' '+$scope.userdata.password);
		$scope.msg={"success":"","failure":""};
		
		$scope.userauth={"id":"","name":""};
		
		// Check for Current login //
		if(USER_AUTH.id != '')
		{
			$scope.msg.failure = "Cannot Login. Session is active. Please logout and then login again."
			$timeout(function(){$scope.msg = "";},5000);
			return false;
		}
		
		$http.post(url,$scope.userdata).success(function(data){
				if(data.error)
				{
					$scope.errorusername = data.error.username;
				}
				if(data.success)
				{
					$("#userlogin")[0].reset();
					//alert(data.userauth.uid);
					userPersistenceService.setCookieData(data.userauth.uid, data.userauth.name);
					//USER_AUTH = userPersistenceService.getCookieData();
					USER_AUTH.id = $cookies.get('userauthid');
					USER_AUTH.name = $cookies.get('userauthname');
					//alert(USER_AUTH.id);
					$scope.msg.success = data.success;
					$scope.errorusername = "";
					$timeout(function(){$scope.msg = "";},5000);
				}
				if(data.failure)
				{
					//alert("ok");
					$scope.msg.failure = data.failure;
					$scope.errorusername = "";
					$timeout(function(){$scope.msg = "";},5000);
				}
			
			});
	}
	
	$scope.logout = function(){
			//alert("ok");
			userPersistenceService.clearCookieData();
			
			USER_AUTH.id= "";
			USER_AUTH.msg = "User Logged Out Successfully.";
			
			$location.path('/');
			
			$timeout(function () { USER_AUTH.msg = ""; }, 5000);// for hiding message after some seconds//
			
			
	}
	
});

	
// Registration controller
myapp.controller('RegistrationController',function ($scope,$http,$timeout,URLS,USER_AUTH,$cookies) {
    //$scope.basepath = $("base").attr("href");
    $scope.header = "New Registration";
	
	
	$scope.registration=function(){
		
			$scope.user = {"username":$scope.username,"email":$scope.email,"password":$scope.password};
			var url = URLS.baseurl+"action-files/insertuser.php";
			//alert(url);
			//alert($scope.user.username+" "+$scope.user.email+" "+$scope.user.password);
			
			// 1st $http method //
			$http.post(url,$scope.user).success( function(data) {
					
				  if(data.error)
					{
						$scope.errorusername = data.error.username;
						$scope.erroremail = data.error.email;
					}
					if(data.failure)
					{
						$scope.failuremessage = data.failure;
					}
					if(data.success)
					{
						$scope.errorusername = "";
						$scope.erroremail = "";
						$('#regform')[0].reset(); 
						$scope.successmessage = data.success;
						$timeout(function () { $scope.successmessage = ""; }, 10000);// for hiding message after some seconds//
						
					}
				  
			});
			// 1st $http method //
			
			// 2nd $http method //
			/*$http({
				url : url,
				method : 'POST',
				data : $scope.user,
				headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			})
			.success(function(data){
					
					if(data.error)
					{
						$scope.errorusername = data.error.username;
						$scope.erroremail = data.error.email;
					}
					if(data.failure)
					{
						$scope.failuremessage = data.failure;
					}
					if(data.success)
					{
						$('#regform')[0].reset(); 
						$scope.successmessage = data.success;
						$timeout(function () { $scope.successmessage = ""; }, 10000);// for hiding message after some seconds//
					}
			});*/
			// 2nd $http method //			
		}
});

// post controller
myapp.controller('PostController', function ($scope,USER_AUTH,$cookies,Pagination) {

    $scope.header = "Posts";

    // define posts json
    $scope.posts =  [{
        "id": "1",
        "title": "Vestibulum Id Ligular",
        "author": "bob",
        "intro": "Aenean lacinia bibendum nulla sed consectetur",
        "extended": "Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
    },{
        "id": "2",
        "title": "Porta Felis Euismod Semper",
        "author": "tom",
        "intro": "Integer facilisis aliquet leo",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "3",
        "title": "Tellus Vehicula Mattis Aenean",
        "author": "jill",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Integer posuere erat a ante venenatis dapibus posuere velit aliquet."
    },{
        "id": "4",
        "title": "Vulputate Ornare Justo",
        "author": "marge",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },{
        "id": "5",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "6",
        "title": "Vulputate Ornare Justo",
        "author": "marge",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi. Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },{
        "id": "7",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "8",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "9",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "10",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "11",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "12",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "13",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "14",
        "title": "Malesuada Vulputate Dolor Commodo",
        "author": "david",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    },{
        "id": "15",
        "title": "Angular is Awesome",
        "author": "suraj",
        "intro": "klasjdflk ljdsfalk sdaf",
        "extended": "Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi."
    }];


    // Start For Pagination
	$scope.pagination = Pagination.getNew(5);
	$scope.pagination.numPages = Math.ceil($scope.posts.length/$scope.pagination.perPage);
	// End For Pagination 

	//For Search 
	$scope.query = {}
    $scope.queryBy = '$'
    // End Fore Search 
});

// contact Controller
myapp.controller('ContactController', function ($scope,USER_AUTH,$cookies,SendMailService) {
    $scope.header = "Contact Us";
	
	
	$scope.user = {"name":"","email":"","message":""};
	$scope.sendmail = function(){
		$scope.user.name = $scope.username;
		$scope.user.email = $scope.useremail;
		var to = 'suraj@giftechnologies.com';
		var from = 'suraj@giftechnologies.com';
		var subject = 'Test Mail';
		$scope.user.message = "Name - "+$scope.user.name+" <br> Email - "+$scope.user.email+" <br> Message - "+$scope.message+"";
		SendMailService.sendmail(to, from, subject, $scope.user.message);
		return false;		
		}
});

// UserProfile controller
myapp.controller('UserProfileController',function ($scope,$http,$timeout,URLS,USER_AUTH,$cookies,$route,getusersdataService,Upload) {
	//$scope.basepath = $("base").attr("href");
    $scope.header = "Edit Profile";
	$scope.userid = $cookies.get('userauthid');
	
	getusersdataService.getusersdata($scope.userid).success(function(data){
			//alert(data.name);
			$scope.username = data.name;
			$scope.email = data.email;
			$scope.userid = data.uid;
			$scope.profile_pic = data.profile_pic;
	});
	
	
	$scope.UpdateProfile = function(){
		
		//alert($scope.fileread.name);
		
		var url = URLS.baseurl+"action-files/update-userdata.php";
		Upload.upload({
				url : url,
				method : 'POST',
				data : {name:$scope.username,email:$scope.email,id:$scope.userid,file: $scope.fileread},
				headers : {'Content-Type': undefined }
			})
		.success(function(data){
			//alert(data);
					if(data.error)
					{
						$scope.errorusername = data.error.username;
						$scope.erroremail = data.error.email;
					}
					if(data.failure)
					{
						$scope.failuremessage = data.failure;
					}
					if(data.success)
					{
						
						$scope.errorusername = "";
				     		$scope.erroremail = "";
						//$("#uploadme").val(""); 
						$scope.successmessage = data.success;
						
						$timeout(function () { $scope.successmessage = ""; $route.reload();}, 3000);// for hiding message after some seconds//
						
					}
			});
		}	

});

// FireBase Contoller for Showing Online users //
myapp.controller('OnlineUsers', ['$scope', 'PresenceService',
    function($scope, PresenceService) {
      $scope.totalViewers = 0;

      $scope.$on('onOnlineUser', function() {
        $scope.$apply(function() {
          $scope.totalViewers = PresenceService.getOnlineUserCount();
        });
      });
    }
  ])