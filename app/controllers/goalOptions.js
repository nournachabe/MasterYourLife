var args = arguments[0] || {};
$.win.title = args.selectedGoal;
var times = [0, 0, 0, 0, 0, 0];
var everys = [0, 0, 0, 0, 0];
var every,time;
var goalOpt = {
	goal : args.selectedGoal,
	times : 1,
	every : 'day',
	when : 'monday',
	where : 'beach',
	core : 'abundance'
};
var myFun = require('myFunctions');

function getModel(){
var model;
switch(args.type){
		case 'money': model='myMoneyGoals';
		break;
		case 'health': model='myHealthGoals';
		break;
		case 'relationship': model='myRelationshipGoals';
		break;
		case 'career': model='myCareerGoals';
		break;
		case 'selfCare': model='mySelfCareGoals';
		break;
		case 'selfAwareness': model='mySelfAwarenessGoals';
		break;
		case 'giveBack': model='myGiveBackGoals';
		break;
		
	}
	return model;

}

function saveGoal() {
	var type=args.type;
	
	var model=getModel();
	var myGoal = Alloy.createModel(model, {
		goal : goalOpt.goal,
		times : goalOpt.times,
		every_goal : goalOpt.every,
		when_goal : goalOpt.when,
		where_goal : goalOpt.where,
		core : goalOpt.core
	});
	myGoal.save();
	var myGoalsWin = Alloy.createController("myGoals", args).getView();
	myGoalsWin.open();
	$.win.close();
	args.win1.close();
}

function deleteMyGoals() {
	var model=getModel();
	var sql = "DELETE FROM "+model;
	var db = Ti.Database.open('_alloy_');
	db.execute(sql);
	db.close();
}

function back() {
	$.win.close();
}

function clicked(event) {
	Ti.API.info('source: ' + JSON.stringify(event.source));
	Ti.API.info('source id: ' + JSON.stringify(event.source.id));
	var id = event.source.id;
	// if how many times was selected
	if (event.source.top == 40) {
		switch(id) {
			//How often?
			case 'image1':
				goalOpt.times = 'Once';
				time=0;
				break;
			case 'image2':
				goalOpt.times = 'Twice';
				time=1;
				break;
			case 'image3':
				goalOpt.times = 'Three times';
				time=2;
				break;
			case 'image4':
				goalOpt.times = 'Four times';
				time=3;
				break;
			case 'image5':
				goalOpt.times = 'Five times';
				time=4;
				break;
			case 'image6':
				goalOpt.times = 'Six times';
				time=5;
				break;
		}
		for ( i = 0; i <= 5; i++) {
			if (i == time)
				times[i] = 2;
			else
				times[i] = 0;
		}
		$.image1.borderWidth = times[0];
		$.image2.borderWidth = times[1];
		$.image3.borderWidth = times[2];
		$.image4.borderWidth = times[3];
		$.image5.borderWidth = times[4];
		$.image6.borderWidth = times[5];
	}
	// if every if selected
	if (event.source.top == 120) {

		switch(id) {
			//Every?
			case 'day':
				goalOpt.every = 'day';
				every = 0;
				break;
			case 'week':
				goalOpt.every = 'week';
				every = 1;
				break;
			case 'month':
				goalOpt.every = 'month';
				every = 2;
				break;
			case 'year':
				goalOpt.every = 'Year';
				every = 3;
				break;
			case 'once':
				goalOpt.every = 'Only once';
				every = 4;
				break;
		}
		for ( i = 0; i <= 4; i++) {
			if (i == every)
				everys[i] = 2;
			else
				everys[i] = 0;
		}
		$.day.borderWidth = everys[0];
		$.week.borderWidth = everys[1];
		$.month.borderWidth = everys[2];
		$.year.borderWidth = everys[3];
		$.once.borderWidth = everys[4];
	}
}

