var args = arguments[0] || {};
var settings = [{
	text : 'About Lisa',
	image : '/Tulips.jpg'
}, {
	text : 'Free Gifts',
	image : '/Tulips.jpg'
}, {
	text : 'Share on FB',
	image : '/Tulips.jpg'
}, {
	text : 'Share on twitter',
	image : '/Tulips.jpg'
}, {
	text : 'Appreciate this?',
	image : '/Tulips.jpg'
}];

function home() {
	$.win.close();
}

function showSettings() {
	var tableData = [];
	for ( j = 0; j < settings.length; j++) {
		var row = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			backgroundSelectedColor : 'white',
			rowIndex : j, // custom property, useful for determining the row during events
			height : 60,
			width : Ti.UI.FILL,
			borderColor : '#3BB9FF',
			borderWidth : 4,

		});

		var settingImage = Ti.UI.createImageView({

			backgroundColor : 'white',
			image : settings[j].image,
			width : 40,
			height : 40,
			borderRadius : 20,
			borderColor : '#3BB9FF',
			borderWidth : 2,
			left : 25,
			top : 10

		});
		row.add(settingImage);

		var settingLabel = Ti.UI.createLabel({
			top : 13,
			text : settings[j].text,
			color : "gray",
			left : 80,
			font : {
				fontSize : 20
			}
		});
		row.add(settingLabel);

		tableData.push(row);
	}

	$.settingsTable.setData(tableData);
}

showSettings(settings);
$.win.open;