var myAppID= "M4h3pCJlXr8IgJxIwR8WBRqSPHFIAydhcMSNw3XX";
var myRestAPIkey= "XLWmyVv5GnrN9fH2kjdbk3Y3Chg41aFJBs9ARnKT";

exports.get=function(parseClass,fn){
	var queryString="https://api.parse.com/1/classes/"+parseClass;
	var xhr=Titanium.Network.createHTTPClient();
	xhr.setTimeout(60000);
	xhr.onload= function(e) {
         var resp = JSON.parse(this.responseText).results;
         if(fn){
         	fn({
         		success:true,
         		data:resp
         	});
         }
   };
     // function called when an error occurs, including a timeout
     xhr.onerror = function(e) {
         Ti.API.debug(e.error);
         alert('error');
     };
 
 // Prepare the connection.
 xhr.open("GET", queryString);
 xhr.setRequestHeader("X-Parse-Application-Id",myAppID);
 xhr.setRequestHeader("X-Parse-REST-API-Key",myRestAPIkey);
 // Send the request.
 xhr.send();
};
