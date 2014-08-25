var args = arguments[0] || {};

//Main
$.win.open();
getAchievements();
if(args.cong==true)
{
	var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['facebook','twitter'],
			message : 'GLOAT VIA:',
			title : 'Congratulations!'
		});
		dialog.addEventListener('click', function(e) {

			if (e.index === e.source.facebook){
      		Ti.API.info('The facebook button was clicked');
    	}
		});
		dialog.show();
}

//Functions

function getAchievements() {
	var myAchCol = Alloy.Collections.myAchievements;
	myAchCol.fetch();
	var myAch = myAchCol.toJSON();

	if (myAch.length == 0) {
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['OK'],
			message : 'No achievments yet',
			title : 'Alert'
		});
		dialog.addEventListener('click', function(e) {

			Ti.API.info('ok was pressed');
			$.win.close();

		});
		dialog.show();
	} else
		showAchiev(myAch);
}


function home() {
	$.win.close();
}

function showAchiev(achiev) {
	var tableData = [];
	for ( j = 0; j < achiev.length; j++) {
		var row = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			backgroundSelectedColor : 'white',
			rowIndex : j, // custom property, useful for determining the row during events
			height : 80,
			width : Ti.UI.FILL,
			borderColor : '#3BB9FF',
			borderWidth : 4,

		});

		var achievImage = Ti.UI.createImageView({

			backgroundColor : 'white',
			image : '/checkmark-icon.jpg',
			width : 40,
			height : 40,
			borderRadius : 20,
			borderColor : '#3BB9FF',
			borderWidth : 2,
			left : 15,
			top : 10

		});
		row.add(achievImage);

		var title = Ti.UI.createLabel({
			top : 10,
			text : achiev[j].goal + " - " + achiev[j].core,
			color : "gray",
			left : 70,
			font : {
				fontSize : 17
			}
		});
		row.add(title);

		var dateLabel = Ti.UI.createLabel({
			top : 55,
			text : achiev[j].date,
			color : "gray",
			left : 70,
			font : {
				fontSize : 12
			}
		});
		row.add(dateLabel);

		tableData.push(row);
	}

	$.achievTable.setData(tableData);
}

function deleteMyAchievements() {
	var sql = "DELETE FROM myAchievements";
	var db = Ti.Database.open('_alloy_');
	db.execute(sql);
	db.close();
}
