<div  class="row" ng-controller="UserProfileController">
    <div class="col-sm-7 col-md-7 col-lg-7">	
    	 <h2>{{header}}</h2>
     
        <p ng-show="successmessage" class="success">{{successmessage}}</p>
        <p ng-show="failuremessage" class="error">{{failuremessage}}</p>
        
        <form name="userprofile" id="userprofile" ng-submit="userprofile.$valid && UpdateProfile()" enctype="multipart/form-data" method="post">
        <div class="form-group">
            <label> Name : </label> 
            <input type="text" name="username" class="form-control" ng-model="username" ng-minlength="5" ng-maxlength="20" required>
            <div ng-messages="userprofile.username.$error" ng-if="userprofile.username.$touched">
                <span class="error" ng-message="minlength">*&nbsp;Your name is too short.</span>
                <span class="error" ng-message="maxlength">*&nbsp;Your name is too long.</span>
                <span class="error" ng-message="required">*&nbsp;Your name is required.</span>
                <span class="error" ng-show="errorusername">*&nbsp;{{errorusername}}</span><!-- this is for php name validation error -->
            </div>
        </div>
        <div class="form-group">
            <label> Email : </label>
            <input type="email" class="form-control" name="email" ng-model="email" required="required"/>
            
            <div ng-messages="userprofile.email.$error" ng-if="userprofile.email.$touched">
                <span class="error" ng-message="email">*&nbsp;Please enter valid Email</span>
                <span class="error" ng-message="required">*&nbsp;Your email is required.</span>
                <span class="error" ng-show="erroremail">*&nbsp;{{erroremail}}</span><!-- this is for php email validation error -->
            </div>

        </div>
        <div class="form-group">
            <label> Profile Pic : </label>
           <!-- <input type="file" class="form-control file-upload" name="files"  ng-file-select="" ng-model="files" translate="subproject.form.select_file" ngf-max-size="2M" ngf-accept="'image/*'"/>-->
            <div class="row">
                <div class="col-sm-5 col-md-5 col-lg-5">
                    <input type="file" fileread="uploadme" onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0]);"> 
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <img id="blah" class="img img-thumbnail" style="width:100px; height:90px;border:0px;">
                </div>
            </div>

            <input type="hidden" ng-model="userid" name="userid" />
         </div>   
         <input type="submit" value="Update" />
         </form>
    </div>
   
    <div class="col-sm-5 col-md-5 col-lg-5">
    <h2>Current Profile Pic</h2>
    <img src="{{URLS.baseurl}}uploads/{{profile_pic}}" ng-model="profile_pic" ng-show="profile_pic" class="img img-thumbnail" style="width:150px; height:150px;"/>
    </div>
</div>

<?php 
          echo "<b>Check valid domain using checkdnsrr() </b><br>";  
          $email = array(); 
          $new = array(); 
          $email = "suraj@giftechnologies.com,atul@gmail.com";
          $getemail = explode(',', $email);
          //print_r($getemail);
          foreach ($getemail as $eemail) {

              $getdomain[] = explode('@', $eemail)[1];
              
          }
          
          //print_r($getdomain);

          foreach ($getdomain as $domain) {
             if(checkdnsrr($domain))
              {
                echo $domain." - domain exists <br>";
              }
              else
              {
                echo $domain." - domain not exists <br>";
              }
          }
?>