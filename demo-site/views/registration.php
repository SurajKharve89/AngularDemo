<div id="registration" class="row">
    <div class="col-sm-8 col-md-8 col-lg-8">	
        <h2>Welcome to my AngularJS Demo</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat pretium urna eget gravida. Vestibulum ornare, eros ac luctus dignissim, sem tellus varius orci, sed porta lorem est vitae eros. Proin ornare venenatis facilisis. Nullam suscipit cursus tortor, sit amet malesuada urna egestas at. Aliquam tincidunt mauris tellus. Nulla tincidunt, arcu sed viverra pharetra, ante ipsum pretium odio, ac pulvinar justo magna aliquam lorem. Praesent euismod auctor est quis imperdiet. Morbi a interdum neque. Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat pretium urna eget gravida. Vestibulum ornare, eros ac luctus dignissim, sem tellus varius orci, sed porta lorem est vitae eros. Proin ornare venenatis facilisis. Nullam suscipit cursus tortor, sit amet malesuada urna egestas at. Aliquam tincidunt mauris tellus. Nulla tincidunt, arcu sed viverra pharetra, ante ipsum pretium odio, ac pulvinar justo magna aliquam lorem. Praesent euismod auctor est quis imperdiet. Morbi a interdum neque. Integer facilisis aliquet leo, non sodales nibh eleifend ac. Donec risus tellus, porttitor sit amet gravida non, ullamcorper in velit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla facilisi.</p>
        <!--<h4>BaseURL = {{URLS.baseurl}}</h4>
        <br />-->
    </div>
    <div class="col-sm-4 col-md-4 col-lg-4">
        <h2>{{header}}</h2>
     
        <p ng-show="successmessage" class="success">{{successmessage}}</p>
        <p ng-show="failuremessage" class="error">{{failuremessage}}</p>
        
        <form name="regform" id="regform" ng-submit="regform.$valid && registration()">
        <div class="form-group">
            <label> Name : </label> 
            <input type="text" name="username" class="form-control" ng-model="username" ng-minlength="5" ng-maxlength="20" required>
            <div ng-messages="regform.username.$error" ng-if="regform.username.$touched">
                <span class="error" ng-message="minlength">*&nbsp;Your name is too short.</span>
                <span class="error" ng-message="maxlength">*&nbsp;Your name is too long.</span>
                <span class="error" ng-message="required">*&nbsp;Your name is required.</span>
                <span class="error" ng-show="errorusername">*&nbsp;{{errorusername}}</span><!-- this is for php name validation error -->
            </div>
        </div>
        <div class="form-group">
            <label> Email : </label>
            <input type="email" class="form-control" name="email" ng-model="email" required="required"/>
            
            <div ng-messages="regform.email.$error" ng-if="regform.email.$touched">
                <span class="error" ng-message="email">*&nbsp;Please enter valid Email</span>
                <span class="error" ng-message="required">*&nbsp;Your email is required.</span>
                <span class="error" ng-show="erroremail">*&nbsp;{{erroremail}}</span><!-- this is for php email validation error -->
            </div>
        </div>
        <div class="form-group">
            <label> Password : </label>
            <input type="password" class="form-control" name="password" ng-model="password" required="required" ng-minlength="5" ng-maxlength="20"/>
            <div ng-messages="regform.password.$error" ng-if="regform.password.$touched">
                <span class="error" ng-message="minlength">*&nbsp;Your password is too short.</span>
                <span class="error" ng-message="maxlength">*&nbsp;Your password is too long.</span>
                <span class="error" ng-message="required">*&nbsp;Your Password is required.</span>
            </div>
           
         </div>   
         <input type="submit" value="Submit" />
         </form>
    </div>
</div>