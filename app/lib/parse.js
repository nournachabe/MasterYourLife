var myAppID= "M4h3pCJlXr8IgJxIwR8WBRqSPHFIAydhcMSNw3XX";
var myRestAPIkey= "XLWmyVv5GnrN9fH2kjdbk3Y3Chg41aFJBs9ARnKT";
exports.EMAILADDRESSES = "EMAILADDRESSES";
exports.GETDATA = "getAllData";
exports.UPDATEDATE = 'getMaxDate';
exports.letter = 'IntroLetter';

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

exports.post = function(parseClass, params, fn) {
	if (parseClass === "EMAILADDRESSES") {
		var queryString = "https://api.parse.com/1/classes/" + parseClass;
	} else {
		var queryString = 'https://api.parse.com/1/functions/' + parseClass;
	}
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(60000);
	xhr.onload = function(s) {
		var r = JSON.parse(xhr.responseText);
		var resp = JSON.parse(xhr.responseText).result;
		//Ti.API.info(JSON.parse(xhr.responseText));
		if (fn) {
			fn({
				success : true,
				data : resp
			});
		}
	};

	xhr.onerror = function(s) {
		Ti.API.info('Request error  ' + parseClass + JSON.stringify(s));
		Ti.API.info('Query string: ' + queryString);
		Ti.API.info('response error: ' + xhr.responseText);
		if (fn) {
			fn({
				success : false,
				error : true,
				message : s
			});
		}
	};
	xhr.open('POST', queryString);
	xhr.setRequestHeader('X-Parse-Application-Id', myAppID);
	xhr.setRequestHeader('X-Parse-REST-API-Key', myRestAPIkey);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(params));
};
