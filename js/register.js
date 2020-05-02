/**
 * 
 */
var server = localStorage.getItem("server");
$(document).ready(function(){
    debugger;
        if(localStorage.getItem("server")===null){
            app.dialog.alert("Please Enter Server Details first, Click Settings ","Feedback");
            return;
        }
	if(localStorage.getItem("userid") !== null){
		app.router.navigate('/welcomeuser/');
	}
});
function register(){
	debugger;
	var user = {
			first_name : $('#fname').val(),
			last_name : $('#lname').val(),
			middle_name : $('#mname').val(),
			mobile : $('#mobileno').val(),
			emailid : $('#email').val(),
			password : $('#userpassword').val(),
	
	}
	if(user.first_name===""){
		alert("First Name is Mandatory");
		$('#fname').focus();
		return;
	}
	if(user.last_name===""){
		alert("Last Name is Mandatory");
		$('#lname').focus();
		return;
	}
	if(user.mobile===""){
		alert("Mobile No. is Mandatory");
		$('#mobileno').focus();
		return;
	}
	if(user.emailid===""){
		alert("Email id is Mandatory");
		$('#email').focus();
		return;
	}
	if(user.password===""){
		alert("Password can not be empty");
		$('#userpassword').focus();
		return;
	}
	if($('#userpassword').val()!==$('#cpassword').val()){
		alert("Password and Confirm Password are not matched");
		$('#userpassword').focus();
		return;
	}
	
	app.preloader.show();
	$.ajax({
		url: server+'/user/save',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(user),
        success: function (data) {
        	 app.preloader.hide();
        	 debugger;
        	if(data.statusCode==="200"){
        		alertf7(data);
        	}else{
        		alertf7(data);
        	}
        },error : function(data,textStatus, xhr) {
        	app.preloader.hide();
        	if(data.status===0){
        		app.dialog.alert("Server not connected","Feedback");
        		return;
        	}
        	
        	app.dialog.alert("error : "+ data.responseJSON.code+" -" + data.responseJSON.error+"<br/>message : "	+data.responseJSON.message,"Feedback");
        	
		}
        
	});
}
function alertf7(data){
	app.dialog.create({
        title: 'Feedback',
        text: data.message + "<br/> User Id : "+data.id,
        cssClass: 'custom-dialog',
        closeByBackdropClick: 'true',
        buttons: [
            {
                text: 'Ok',
                onClick: function () {
                	debugger;
                	location.href = "index.html";
                },
            },
        ],
    }).open();
}
function login(){
	debugger;
	var user = {
			userid : $('#userid').val(),
			password : $('#password').val(),
	
	}
	if(user.userid==="admin" && user.password==="admin"){
		app.router.navigate('/welcomeuser/');
		return;
	}
	if(user.userid===""){
		alert('Please enter userid');
		$('#userid').focus();
		return;
	}
	if(user.password===""){
		alert('Please enter password');
		$('#password').focus();
		return;
	}
	app.preloader.show();
        try{
	$.ajax({
        url: server+'/user/login',
        type: 'POST',
        data: JSON.stringify(user),
     contentType: "application/json; charset=utf-8",
      dataType: "json",
        success: function (data,textStatus, xhr) {
        		app.preloader.hide();
        		if(xhr.status===204){
        			app.dialog.alert("Invalid username and password","Feedback");
        			return;
        		}else if(xhr.status===200){
        			setSession(data)
                                app.router.navigate('/welcomeuser/');
        		}
        		
        		
        },error:function(data,textStatus, xhr){
             app.preloader.hide();
        	if(data.status===0){
        		app.dialog.alert("Server not Connected","Feedback");
        	}
        	else{
        		app.dialog.alert("error : "+ data.responseJSON.code+" -" + data.responseJSON.error+"<br/>message : "	+data.responseJSON.message,"Feedback");
            	
        	}
        	
        }
	});
    }
        catch(err){
            app.preloader.hide();
            alert(err);
        }
	
}
function setSession(data){
	localStorage.setItem("first_name",data.first_name);
	localStorage.setItem("last_name",data.last_name);
	localStorage.setItem("middle_name",data.middle_name);
	localStorage.setItem("mobile",data.mobile);
	localStorage.setItem("emailid",data.emailid);
	localStorage.setItem("userid",data.userid);
}
function patdetails(){
	app.router.navigate("/patdetails/");
}
function feedback(){
	app.router.navigate("/feedback/");
}
function go_home() {
	   app.router.back('/');
}
function home(){
	clearItems();
	location.href = "index.html";
}
function settings(){
    var ipadress = $('#ipaddress').val();
    var port = $('#port').val();
    var host = $('#host').val();
    if(ipadress===""){
        app.dialog.alert("Enter Ipadress","Feedback");
        return;
    }
    if(port===""){
         app.dialog.alert("Enter port no.","Feedback");
        return;
    }
    localStorage.setItem("ipaddress",ipadress);
    localStorage.setItem("port",port);
    localStorage.setItem("host",host);
    if(ipadress.indexOf("http")<0){
        ipadress = "http://"+ipadress;
    }
    var server = ipadress+":"+port+"/"+host;
    localStorage.setItem("server",server);
    app.dialog.create({
        title: 'Feedback',
        text: "Server added <br/> Server : "+localStorage.getItem("server"),
        cssClass: 'custom-dialog',
        closeByBackdropClick: 'true',
        buttons: [
            {
                text : 'Cancel'
            },
            {
                text: 'Ok',
                onClick: function () {
                	debugger;
                	location.href = "index.html";
                },
                
            },
        ],
    }).open();
}
function clearItems(){
        localStorage.removeItem("first_name");
	localStorage.removeItem("last_name");
	localStorage.removeItem("middle_name");
	localStorage.removeItem("mobile");
	localStorage.removeItem("emailid");
	localStorage.removeItem("userid");
}