/**
 * 
 */
app.on('pageInit', function (page) {
    debugger;
  if(page.route.url === "/welcomeuser/"){
	  if(localStorage.getItem("first_name")!==null)
		  $('#changetitle').html("Welcome "+ localStorage.getItem("first_name") + " "+localStorage.getItem("last_name"))
	  else
		  $('#changetitle').html("Welcome Admin")
  }
  else if(page.route.url === "/settings/"){
      if(localStorage.getItem("server")!==null){
          $('#ipaddress').val(localStorage.getItem("ipaddress"));
          $('#port').val(localStorage.getItem("port"));
          $('#host').val(localStorage.getItem("host"));
      }
  }
});