var args = arguments[0] || {};

//Main:
var api = require('api');
var myFun = require('myFunctions');
Ti.API.info('hello menu page');
fillValues();
var username = $.userLabel.text;
var userimage = $.image.image;
var insCol = Alloy.Collections.inspiration_model;
insCol.fetch();
insCol.setSortField('ins_order', 'ASC');
insCol.sort();
var ins = insCol.toJSON();
//Functions

function fillValues() {
	var profile = Ti.App.Properties.getObject("userProfile");
	Ti.API.info(JSON.stringify(profile));
	var cores = JSON.parse(Ti.App.Properties.getString("coreValues")).cores;

	Ti.API.info(JSON.stringify(cores));
	$.userLabel.text = profile.name;
	$.image.image = profile.image.nativePath;
	$.buttonsImage.text = cores[0];
	for ( i = 1; i < cores.length; i++) {
		$.buttonsImage.text += "\n" + cores[i];
	}
	Ti.API.info('Done filling');
}

function openMoney(event) {
	var id=event.source.id;
	var goals=myFun.getMyModel(id);
	
	if (goals.length == 0) {
		var myMoney = Alloy.createController("moneyGoals", {type:id}).getView();
		myMoney.open();
	} else {
		var myGoals = Alloy.createController("myGoals", {menuPage:true,type:id}).getView();
		myGoals.open();
	}
}

function addUser(name, image) {
	var userProfile = {
		name : name,
		image : image
	};
	Ti.App.Properties.setObject("userProfile", userProfile);

}

function showAdvice() {
	var index = Ti.App.Properties.getInt('inspiration', 0);
	$.advice.text = ins[index].inspiration;
	if (index < ins.length)
		index = index + 1;
	else
		index = 0;
	Ti.App.Properties.setInt('inspiration', index);
	$.inspiration.show();

}

function hide() {
	$.advice.text = '';
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

function onUsernameClick() {
	$.username.show();
	$.username.value = username;
	$.userLabel.visible = false;
}

function saveName() {//when button name is clicked the username is saved
	$.username.hide();
	$.userLabel.show();
	username = $.username.value;
	$.userLabel.text = $.username.value;
	addUser(username, userimage);
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
				userimage = $.image.image;
				addUser(username, userimage);
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

