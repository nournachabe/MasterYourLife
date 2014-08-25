

exports.getModel=function(type){
	var goalsCol;
	var goals;
	switch(type) {
		case 'money': {
			goalsCol = Alloy.Collections.moneyGoals;
			goalsCol.fetch();
			goals = goalsCol.toJSON();
			break;
		}
		case 'career': {
			goalsCol = Alloy.Collections.careerGoals;
			goalsCol.fetch();
			goals = goalsCol.toJSON();
			Ti.API.info(JSON.stringify(goals));
			break;
		}
		case 'health': {
			goalsCol = Alloy.Collections.healthGoals;
			goalsCol.fetch();
			goals = goalsCol.toJSON();
			break;
		}
		case 'relationship': {
			goalsCol = Alloy.Collections.relationshipGoals;
			goalsCol.fetch();
			goals = goalsCol.toJSON();
			break;
		}
		case 'selfCare': {
			goalsCol = Alloy.Collections.selfCareGoals;
			goalsCol.fetch();
			goals = goalsCol.toJSON();
			break;
		}
		case 'selfAwareness': {
			goalsCol = Alloy.Collections.selfAwareness;
			goalsCol.fetch();
			goals = goalsCol.toJSON();
			break;
		}
		case 'giveBack': {
			goalsCol = Alloy.Collections.giveBackGoals;
			goalsCol.fetch();
			goals = goalsCol.toJSON();
			break;
		}
	}
	Ti.API.info('abla chi:'+JSON.stringify(goals));
	return goals;
};

exports.getCollection=function(type){
	var collection;
switch(type){
		case 'money': collection='myMoneyGoals';
		break;
		case 'health': collection='myHealthGoals';
		break;
		case 'relationship': collection='myRelationshipGoals';
		break;
		case 'career': collection='myCareerGoals';
		break;
		case 'selfCare': collection='mySelfCareGoals';
		break;
		case 'selfAwareness': collection='mySelfAwarenessGoals';
		break;
		case 'giveBack': collection='myGiveBackGoals';
		break;
		
	}
	return collection;
};

exports.getMyModel=function(id)
{
var goalsCol;
	var goals;
	switch(id){
		case 'money':{goalsCol = Alloy.Collections.myMoneyGoals;goalsCol.fetch();goals = goalsCol.toJSON();break;}
		case 'career':{goalsCol = Alloy.Collections.myCareerGoals;goalsCol.fetch();goals = goalsCol.toJSON();break;}
		case 'health':{goalsCol = Alloy.Collections.myHealthGoals;goalsCol.fetch();goals = goalsCol.toJSON();break;}
		case 'relationship':{goalsCol = Alloy.Collections.myRelationshipGoals;goalsCol.fetch();goals = goalsCol.toJSON();break;}
		case 'selfCare':{goalsCol = Alloy.Collections.mySelfCareGoals;goalsCol.fetch();goals = goalsCol.toJSON();break;}
		case 'selfAwareness':{goalsCol = Alloy.Collections.mySelfAwarenessGoals;goalsCol.fetch();goals = goalsCol.toJSON();break;}
		case 'giveBack':{goalsCol = Alloy.Collections.myGiveBackGoals;goalsCol.fetch();goals = goalsCol.toJSON();break;}
	}
	return goals;
};

exports.getTitle=function(type)
{
	var title;
switch(type){
		case 'money': title='Money';
		break;
		case 'health': title='Health';
		break;
		case 'relationship': title='Relationship';
		break;
		case 'career': title='Career';
		break;
		case 'selfCare': title='Self Care';
		break;
		case 'selfAwareness': title='Self Awareness';
		break;
		case 'giveBack': title='Give Back';
		break;
		
	}
	return title;
};
