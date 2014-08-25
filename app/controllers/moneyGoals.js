var args = arguments[0] || {};

var myFun=require('myFunctions');
$.win.title = myFun.getTitle(args.type);
getGoals();

function home() {
	$.win.close();
}

function getGoals() {
	var type = args.type;
	var goals=myFun.getModel(type);
	Ti.API.info('goals :'+JSON.stringify(goals));
	var goalsCol;
	showGoals(goals);
}

function goalSelect(event) {

	var index = event.row.rowIndex;
	if (index != 0) {
		var myargs = {
			selectedGoal : event.row.children[0].text,
			win1 : $.win,
			type: args.type
		};
		var myGoal = Alloy.createController("goalOptions", myargs).getView();
		myGoal.open();
	} else {

	}
}

function showGoals(goals) {
	//dsdas
	var tableData = [];

	for ( j = 0; j <= goals.length; j++) {
		if (j == 0)
			makeRow('+Write my own', tableData, j);
		else
			makeRow(goals[j - 1].goal, tableData, j);

	}

	$.moneyTable.setData(tableData);
}

function makeRow(text, tableData, i) {
	var row = Ti.UI.createTableViewRow({
		className : 'forumEvent', // used to improve table performance
		backgroundSelectedColor : 'white',
		rowIndex : i, // custom property, useful for determining the row during events
		height : 50,
		width : Ti.UI.FILL,
	});
	var value = false;

	var goalLabel = Ti.UI.createLabel({
		text : text,
		top : '10',
		width : '50%', // necessary for textAlign to be effective
		color : 'black',
		left : '5'
	});
	row.add(goalLabel);
	var arrow = Ti.UI.createLabel({
		text : '>>',
		top : '10',
		width : '50%', // necessary for textAlign to be effective
		color : 'black',
		right : '5',
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT
	});
	row.add(arrow);
	tableData.push(row);
}
