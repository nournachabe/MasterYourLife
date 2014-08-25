var args = arguments[0] || {};

var tableData = [];
var myFun = require('myFunctions');
$.win.title = myFun.getTitle(args.type);
var height = ['14%', '19%', '28%', '68%'];
var l;

getGoals();
if (!args.menuPage)
	alert('Goal Saved');
	
function home() {
	$.win.close();
}

function addGoal() {
	if(l<1)
	{
	var moneyGoals = Alloy.createController("moneyGoals", {
		type : args.type
	}).getView().open();
	$.win.close();
	}
	else 
	alert("Upgrade");

}
var goals;
function getGoals() {
	var type = args.type;
	goals = myFun.getMyModel(type);
	l=goals.length;
	var length;
	if (goals.length >= 4) {
		$.addLabel.top = 58;
		length = 4;
	} else {
		$.addLabel.top = 64;
		length = goals.length;
	}
	$.addView.top = 120 * length;
	$.add.height = height[length - 1];
	showGoals(goals);
}

function goalDone(event) {
	var index = event.row.rowIndex;
	var date = new Date();
	var goalDone={
		goal: goals[index].goal,
		core: goals[index].core,
		date: date
	};
	Ti.API.info(JSON.stringify(event.row));
	Ti.API.info('goaldone: ' + JSON.stringify(goalDone));
	var myGoal = Alloy.createModel('myAchievements', goalDone);
	myGoal.save();
	var collection = myFun.getCollection(args.type);
	Ti.API.info(collection+" "+goalDone.goal);
	var sql = "DELETE FROM " + collection + " WHERE goal='" + goals[index].goal+"'";
	var db = Ti.Database.open('_alloy_');
	db.execute(sql);
	db.close();
	$.win.close();
	Alloy.createController("MyAchievements",{cong:true}).getView().open();
}

function showGoals(myGoals) {

	for ( j = 0; j < myGoals.length; j++) {
		makeRow(myGoals[j], j);
	}

	$.myGoalsTable.setData(tableData);

}

function makeRow(mygoals, i) {

	var row = Ti.UI.createTableViewRow({
		className : 'forumEvent', // used to improve table performance
		backgroundSelectedColor : 'white',
		rowIndex : i, // custom property, useful for determining the row during events
		height : 120,
		width : Ti.UI.FILL,
		top : 0
	});
	var value = false;

	var titleLabel = Ti.UI.createLabel({
		text : mygoals.goal + ' - ' + $.win.title,
		top : '10',
		height : 30,
		color : 'black',
		left : 60
	});
	row.add(titleLabel);

	var dateText;
	if(mygoals.every_goal=='Only once')
	dateText="Only once";
	else 
	dateText=mygoals.times + ' every ' + mygoals.every_goal;
	var dateLabel = Ti.UI.createLabel({
		text : dateText,
		top : '40',
		height : 30,
		width : '50%', // necessary for textAlign to be effective
		color : 'gray',
		left : 60
	});
	row.add(dateLabel);

	var Done = Ti.UI.createButton({
		title : 'Done',
		top : 70,
		height : 40,
		font : {
			fontSize : 15
		},
		width : '30%', // necessary for textAlign to be effective
		color : 'black',
		left : '35%',
		backgroundColor : '#3BB9FF',
		color : 'white',
		borderRadius : 10
	});
	row.add(Done);

	var coreImage = Ti.UI.createImageView({
		top : '20',
		backgroundColor : '#3BB9FF',
		borderRadius : 20,
		height : 40,
		width : 40, // necessary for textAlign to be effective
		color : 'black',
		left : 10,
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT
	});
	row.add(coreImage);

	var coreLabel = Ti.UI.createLabel({
		top : '70',
		color : 'gray',
		left : 10,
		text : mygoals.core
		//textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT
	});
	row.add(coreLabel);

	tableData.push(row);
}

