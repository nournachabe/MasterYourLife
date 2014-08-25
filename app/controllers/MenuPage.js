var args = arguments[0] || {};

function fillValues(){
var profile=JSON.parse(Ti.App.Properties.getString("userProfile"));
var cores=JSON.parse(Ti.App.Properties.getString("coreValues")).cores;
$.userLabel.text=profile.name;
$.image.image=profile.image.nativePath;
$.buttonsImage.text = cores[0];
	for ( i = 1; i < cores.length; i++) {
		$.buttonsImage.text += "\n" + cores[i];
	}
}
//alert(JSON.stringify(profile)+"/n"+JSON.stringify(cores));


//Main:
//$.win.open();
var api = require('api');
fillValues();
/*var dialog = Ti.UI.createAlertDialog({
	message : 'Tap to personalize your App',
	ok : 'Get started!',
	title : 'Welcome!'
}).show();*/
//Functions:


function addUser(name,image) {
   var userProfile = {
  name:name,
  image:image
};
Ti.App.Properties.setString("userProfile", JSON.stringify(userProfile));
   
}

function showAdvice() {
	var ins = [];
	api.getInspiration(function(e) {
		if (e.success) {
			ins = e.data;
			var index=Math.floor(Math.random()*ins.length);
			$.advice.text=ins[index].Inspiration;
		} else {
			Ti.API.info('An error has occured');
		}
	});

	$.inspiration.show();

}

function hide() {
	$.advice.text='';
	$.inspiration.hide();

}

function changeLabel(cores) {
	$.buttonsImage.text = cores[0];
	for ( i = 1; i < cores.length; i++) {
		$.buttonsImage.text += "\n" + cores[i];
	}
}

function openView() {
	$.loadImage.visible = true;
}

function cancel() {
	$.loadImage.visible = false;
}

function showDone() {//when the username textfield is clicked button done shows up
	$.nameDone.visible = true;
}

function saveName() {//when button name is clicked the username is saved
	$.nameDone.visible = false;
	$.username.hide();
	$.userLabel.text = $.username.value;
	addUser($.userLabel.text,$.image.image);
}

function showSettings() {
	var myset = Alloy.createController("Settings", {}).getView();
	myset.open();
}

function loadImage() {

	$.loadImage.visible = false;
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				$.image.image = event.media;
			} else {
				alert("got the wrong type back =" + event.mediaType);
			}
		},
		cancel : function() {
			// called when user cancels taking a picture
		},
		error : function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({
				
				title : 'Camera'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
	});
}

function showCoreVal() {
	var args = {
		fillFunction : fillValues,
	};
	var mycore = Alloy.createController("CoreValues", args).getView();
	mycore.open();
}

function showAchiev() {
	var myachiev = Alloy.createController("MyAchievements", {}).getView();
	myachiev.open();
}

