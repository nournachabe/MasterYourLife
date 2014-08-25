var args = arguments[0] || {};
var achiev = [{
	title : 'Gor for a run',
	type:'Vitality',
	date: 'April 29, 2014'
}, {
	title : 'Meditate',
	type:'Ease',
	date: 'April 29, 2014'
}, {
	title : 'Meditate',
	type:'Ease',
	date: 'April 28, 2014'
}, {
	title : 'Put money in savings',
	type:'Abundance',
	date: 'April 27, 2014'
}, {
	title : 'Do Yoga',
	type:'Ease',
	date: 'April 27, 2014'
}];

function home() {
	$.win.close();
}

function showAchiev() {
	var tableData = [];
	for ( j = 0; j < achiev.length; j++) {
		var row = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			backgroundSelectedColor : 'white',
			rowIndex : j, // custom property, useful for determining the row during events
			height : 60,
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
			text : achiev[j].title+" - "+achiev[j].type,
			color : "gray",
			left : 70,
			font : {
				fontSize : 17
			}
		});
		row.add(title);

		var dateLabel = Ti.UI.createLabel({
			top : 35,
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

showAchiev(achiev);
$.win.open;