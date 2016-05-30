<div id="contact" class="row" ng-controller="ContactController">
    <div class="col-sm-5 col-md-5 col-lg-5">
        <h2>{{header}}</h2>
     	<!--<p ng-show="USER_AUTH.id">User Id  = {{USER_AUTH.id}} </p>-->
        <p ng-show="successmessage" class="success">{{successmessage}}</p>
        <p ng-show="failuremessage" class="error">{{failuremessage}}</p>
        
        <form name="contactform" id="contactform" ng-submit="contactform.$valid && sendmail()">
        <div class="form-group">
            <label> Name : </label> 
            <input type="text" name="username" class="form-control" ng-model="username" ng-minlength="5" ng-maxlength="20" required>
            <div ng-messages="contactform.username.$error" ng-if="contactform.username.$touched">
                <span class="error" ng-message="minlength">*&nbsp;Your name is too short.</span>
                <span class="error" ng-message="maxlength">*&nbsp;Your name is too long.</span>
                <span class="error" ng-message="required">*&nbsp;Your name is required.</span>
                
            </div>
        </div>
        <div class="form-group">
            <label> Email : </label>
            <input type="email" class="form-control" name="useremail" ng-model="useremail" required="required"/>
            
            <div ng-messages="contactform.useremail.$error" ng-if="contactform.useremail.$touched">
                <span class="error" ng-message="email">*&nbsp;Please enter valid Email</span>
                <span class="error" ng-message="required">*&nbsp;Your email is required.</span>
          
            </div>
        </div>
        <div class="form-group">
            <label> Message : </label>
            <textarea  class="form-control" name="message" ng-model="message" required="required" ng-minlength="5" ng-maxlength="100"></textarea>
            <div ng-messages="contactform.message.$error" ng-if="contactform.message.$touched">
                <span class="error" ng-message="minlength">*&nbsp;Your Message is too short.</span>
                <span class="error" ng-message="maxlength">*&nbsp;Your Message is too long.</span>
                <span class="error" ng-message="required">*&nbsp;Your Message is required.</span>
            </div>
            
         </div>   
         <input type="submit" value="Send"/>
         </form>
    </div>
</div>