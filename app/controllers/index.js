//Ti.App.Properties.removeProperty("userProfile");
//Ti.App.Properties.removeProperty("coreValues");
//Ti.App.Properties.removeProperty("firstLoaded");
//Ti.App.Properties.removeProperty('inspiration');
//Ti.App.Properties.removeProperty('updateDatesList');
var userProfile = JSON.parse(Ti.App.Properties.getString("userProfile"));

//Test to see if there is already info about User
if (userProfile == null) {
	var pers = Alloy.createController("Personalize", {}).getView();
	pers.open();
} else {
	args = {
		name : userProfile.name,
		image : userProfile.image
	};
	var menu = Alloy.createController("MenuPage", args).getView();
	menu.open();
}

var api = require('api');
var firstLoaded = Ti.App.Properties.getBool('firstLoaded', true);
var updateDates = Ti.App.Properties.getObject('updateDatesList', null);
//checkForUpdates();
//var download = require('download');
var arg = {
	checkForUpdates : checkForUpdates
};
if (firstLoaded) {
	windowToOpen = 'Personalize';
	checkForUpdates();
} else {
	windowToOpen = 'MenuPage';
	checkForUpdates();
}
//function to check if data updated on parse
function checkForUpdates() {
	firstLoaded = Ti.App.Properties.getBool('firstLoaded', true);
	api.getUpdateDate(function(e) {
		Ti.API.info('Cheking For Updates');
		if (e.success) {
			//var allData = {};
			var allData = e.data;
			var classesArray = [];
			Ti.API.info('updateDate: ' + JSON.stringify(updateDates));
			
			if (updateDates == null) {
				Ti.API.info(JSON.stringify(allData));
				Ti.API.info(JSON.stringify(allData.CONNECT.iso));
				Ti.App.Properties.setBool('firstLoaded', false);
				updateDates = {};
				Ti.API.info('wen l error ya toura');
				updateDates.CONNECT = allData.CONNECT.iso;
				
				updateDates.CareerGoals = allData.CareerGoals.iso;
				updateDates.COREVALUES = allData.COREVALUES.iso;
				updateDates.FREEGIFT = allData.FREEGIFT.iso;
				updateDates.GiveBackGoals = allData.GiveBackGoals.iso;
				updateDates.SOCIALSHARE = allData.SOCIALSHARE.iso;
				updateDates.HealthGoals = allData.HealthGoals.iso;
				updateDates.MoneyGoals = allData.MoneyGoals.iso;
				updateDates.SelfCareGoals = allData.SelfCareGoals.iso;
				updateDates.SelfAwarenessGoals = allData.SelfAwarenessGoals.iso;
				
				updateDates.RelationshipGoals = allData.RelationshipGoals.iso;
				
				updateDates.Inspiration = allData.Inspiration.iso;
				Ti.App.Properties.setObject('updateDatesList', updateDates);
				Ti.API.info('updateDate: ' + JSON.stringify(updateDates));
				classesArray = ['CONNECT', 'COREVALUES', 'FREEGIFT', 'GiveBackGoals', 'HealthGoals', 'Inspiration', 'MoneyGoals', 'RelationshipGoals', 'SelfAwarenessGoals', 'SelfCareGoals', 'SOCIALSHARE','CareerGoals'];
				
			} else {
				if (allData.CONNECT.iso != updateDates.CONNECT) {
					classesArray.push("CONNECT");
					updateDates.CONNECT = allData.CONNECT.iso;
				}
				if (allData.FREEGIFT.iso != updateDates.FREEGIFT) {
					classesArray.push("FREEGIFT");
					updateDates.FREEGIFT = allData.FREEGIFT.iso;
				}
				if (allData.COREVALUES.iso != updateDates.COREVALUES) {
					classesArray.push("COREVALUES");
					updateDates.COREVALUES = allData.COREVALUES.iso;
				}
				if (allData.SOCIALSHARE.iso != updateDates.SOCIALSHARE) {
					classesArray.push("SOCIALSHARE");
					updateDates.SOCIALSHARE = allData.SOCIALSHARE.iso;
				}
				if (allData.GiveBackGoals.iso != updateDates.GiveBackGoals) {
					classesArray.push("GiveBackGoals");
					updateDates.GiveBackGoals = allData.GiveBackGoals.iso;
				}
				if (allData.HealthGoals.iso != updateDates.HealthGoals) {
					classesArray.push("HealthGoals");
					updateDates.HealthGoals = allData.HealthGoals.iso;
				}
				if (allData.MoneyGoals.iso != updateDates.MoneyGoals) {
					classesArray.push("MoneyGoals");
					updateDates.MoneyGoals = allData.MoneyGoals.iso;
				}
				if (allData.Inspiration.iso != updateDates.Inspiration) {
					classesArray.push("Inspiration");
					updateDates.Inspiration = allData.Inspiration.iso;
				}
				if (allData.SelfAwarenessGoals.iso != updateDates.SelfAwarenessGoals) {
					classesArray.push("SelfAwarenessGoals");
					updateDates.SelfAwarenessGoals = allData.SelfAwarenessGoals.iso;
				}
				if (allData.SelfCareGoals.iso != updateDates.SelfCareGoals) {
					classesArray.push("SelfCareGoals");
					updateDates.SelfCareGoals = allData.SelfCareGoals.iso;
				}
				if (allData.RelationshipGoals.iso != updateDates.RelationshipGoals) {
					classesArray.push("RelationshipGoals");
					updateDates.RelationshipGoals = allData.RelationshipGoals.iso;
				}
				if (allData.CareerGoals.iso != updateDates.CareerGoals) {
					classesArray.push("CareerGoals");
					updateDates.CareerGoals = allData.CareerGoals.iso;
				}
				Ti.App.Properties.setObject('updateDatesList', updateDates);
				//Ti.API.info('Class Array: ' + JSON.stringify(classesArray));
			}
			if (classesArray.length > 0) {
				getUpdatedData(classesArray);
			} else {
				//Ti.API.info("firstLoaded= " +firstLoaded);
				if (firstLoaded) {
					//Alloy.createController(windowToOpen, arg).getView().open();
				}
			}
		} else {
			Ti.API.info('Unable to get data at this moment');
		} /*else {
		 Alloy.createController('homeWindow').getView().open();
		 }*/
	});
}

//get the new data for the updated classes
function getUpdatedData(classes) {
	Ti.API.info('Updates available, Getting updated data');
	var params = {};
	params.classesList = classes;
	Ti.API.info('params: ' + JSON.stringify(params));
	api.getAllData(params, function(e) {
		if (e.success) {
			data = e.data;
			saveData(data, classes);
			Ti.API.info('All Data classArray: ' + JSON.stringify(e.data));
		} else {
			Ti.API.info('Unable to get data');
		}
	});
}

//save the data to models
function saveData(allData, classList) {
	if (classList.indexOf('CONNECT') >= 0) {
		Ti.API.info('Updating CONNECT');
		Ti.API.info('CONNECT: ' + JSON.stringify(allData.CONNECT[0]));
		if (!firstLoaded) {
			var sql = "DELETE FROM connect";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		var connectData = Alloy.createModel('connect', {
			BioFirstParag : allData.CONNECT[0].BioFirstParagraph_NoCharacterLimit,
			BioSecondParag : allData.CONNECT[0].BioSecondParagraph_NoCharacterLimit,
			ContactEmail : allData.CONNECT[0].ContactEmail,
			EmailSubject : allData.CONNECT[0].DefaultEmailSubject,
			EmailText : allData.CONNECT[0].DefaultEmailText,
			FirstByLine : allData.CONNECT[0].FirstByline_25Characters,
			FirstLastName : allData.CONNECT[0].FirstandLastName,
			SecondByLine : allData.CONNECT[0].SecondByline_25Characters,
			ThirdByLine : allData.CONNECT[0].ThirdByline_25Characters,
			objectId : allData.CONNECT[0].objectId,
			updateDate : allData.CONNECT[0].updatedAt
		});
		connectData.save();
	}
	if (classList.indexOf('COREVALUES') >= 0) {
		Ti.API.info('Updating corevalues');
		//allData.COREVALUES.sort(sortData);
		if (!firstLoaded) {
			var sql = "DELETE FROM corevalues_model";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		
		for (var i = 0; i < allData.COREVALUES.length; i++) {
			
			var corevaluesData = Alloy.createModel('corevalues_model', {
				value : allData.COREVALUES[i].Value
			});
			corevaluesData.save();
		}

	}
	if (classList.indexOf('GiveBackGoals') >= 0) {
		Ti.API.info('Updating giveback goals');
		if (!firstLoaded) {
			var sql = "DELETE FROM giveBackGoals";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.GiveBackGoals.length; i++) {
			var giveBackGoalsData = Alloy.createModel('giveBackGoals', {
				goal : allData.GiveBackGoals[i].Goal
			});
			giveBackGoalsData.save();
			//Ti.API.info('symptoms Data: ' + JSON.stringify(symptomsData));
		};
	}
	if (classList.indexOf('FREEGIFT') >= 0) {
		Ti.API.info('Updating FREEGIFT');
		if (!firstLoaded) {
			var sql = "DELETE FROM freeGift";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		var giftData = Alloy.createModel('freeGift', {
			ButtonText : allData.FREEGIFT[0].ButtonText_25CharacterLimit,
			CalltoAction : allData.FREEGIFT[0].CalltoAction_75CharacterLimit,
			Body1 : allData.FREEGIFT[0].GiftEmail_Body1,
			Body2 : allData.FREEGIFT[0].GiftEmail_Body2,
			PDFHyperlink : allData.FREEGIFT[0].DefaultEmailText,
			Subject : allData.FREEGIFT[0].GiftEmail_Subject,
			Title_PDFHyperlink : allData.FREEGIFT[0].GiftEmail_Title_PDFHyperlink,
			senderEmailaddress : allData.FREEGIFT[0].Gift_senderEmailaddress,
			senderName : allData.FREEGIFT[0].Gift_senderName,
		});
		giftData.save();
	}
	if (classList.indexOf('SOCIALSHARE') >= 0) {
		Ti.API.info('Updating SOCIALSHARE');
		if (!firstLoaded) {
			var sql = "DELETE FROM socialShare";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		var socialData = Alloy.createModel('socialShare', {
			ImageShareURL : allData.SOCIALSHARE[0].ImageShareURL,
			LinkShare_40Characters : allData.SOCIALSHARE[0].LinkShare_40Characters,
			TextShare_100Characters : allData.SOCIALSHARE[0].TextShare_100Characters,
			TextShareGoalComplete_100Characters : allData.SOCIALSHARE[0].TextShare_100Characters
		});
		socialData.save();
		//downloadImages(allData.SOCIALSHARE[0].ImageShareURL);
	}
	if (classList.indexOf('CareerGoals') >= 0) {
		Ti.API.info('Updating careerGoals');
		if (!firstLoaded) {
			var sql = "DELETE FROM careerGoals";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.CareerGoals.length; i++) {
			var careerGoalsData = Alloy.createModel('careerGoals', {
				goal : allData.CareerGoals[i].Goal
			});
			careerGoalsData.save();
			//Ti.API.info('Activity Data: ' + JSON.stringify(ActivityData));
		}
	}
	if (classList.indexOf('MoneyGoals') >= 0) {
		Ti.API.info('Updating moneyGoals');
		//allData.MoneyGoals.sort(sortData);
		if (!firstLoaded) {
			var sql = "DELETE FROM moneyGoals";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.MoneyGoals.length; i++) {
			var moneyGoalsData = Alloy.createModel('moneyGoals', {
				goal : allData.MoneyGoals[i].Goal
			});
			moneyGoalsData.save();
			//Ti.API.info('Activity Data: ' + JSON.stringify(ActivityData));
		}
	}
	if (classList.indexOf('HealthGoals') >= 0) {
		Ti.API.info('Updating healthGoals');
		if (!firstLoaded) {
			var sql = "DELETE FROM healthGoals";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.HealthGoals.length; i++) {
			var healthGoalsData = Alloy.createModel('healthGoals', {
				goal : allData.HealthGoals[i].Goal
			});
			healthGoalsData.save();
			//Ti.API.info('Activity Data: ' + JSON.stringify(ActivityData));
		}
	}
	if (classList.indexOf('RelationshipGoals') >= 0) {
		Ti.API.info('Updating relationshipGoals');
		if (!firstLoaded) {
			var sql = "DELETE FROM relationshipGoals";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.RelationshipGoals.length; i++) {
			var relationshipGoalsData = Alloy.createModel('relationshipGoals', {
				goal : allData.RelationshipGoals[i].Goal
			});
			relationshipGoalsData.save();
			//Ti.API.info('Activity Data: ' + JSON.stringify(ActivityData));
		}
	}
	if (classList.indexOf('SelfAwarenessGoals') >= 0) {
		Ti.API.info('Updating selfAwareness');
		if (!firstLoaded) {
			var sql = "DELETE FROM selfAwareness";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.SelfAwarenessGoals.length; i++) {
			var selfAwarenessGoalsData = Alloy.createModel('selfAwareness', {
				goal : allData.SelfAwarenessGoals[i].Goal
			});
			selfAwarenessGoalsData.save();
			//Ti.API.info('Activity Data: ' + JSON.stringify(ActivityData));
		}
	}
	if (classList.indexOf('SelfCareGoals') >= 0) {
		Ti.API.info('Updating selfCareGoals');
		if (!firstLoaded) {
			var sql = "DELETE FROM selfCareGoals";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.SelfCareGoals.length; i++) {
			var selfCareGoalsData = Alloy.createModel('selfCareGoals', {
				goal : allData.SelfCareGoals[i].Goal
			});
			selfCareGoalsData.save();
			//Ti.API.info('Activity Data: ' + JSON.stringify(ActivityData));
		}
	}
	if (classList.indexOf('Inspiration') >= 0) {
		Ti.API.info('Updating inspiration');
		if (!firstLoaded) {
			var sql = "DELETE FROM inspiration_model";
			var db = Ti.Database.open('_alloy_');
			db.execute(sql);
			db.close();
		}
		for (var i = 0; i < allData.Inspiration.length; i++) {
			var inspirationData = Alloy.createModel('inspiration_model', {
				inspiration : allData.Inspiration[i].Inspiration,
				ins_order: allData.Inspiration[i].Order,
			});
			inspirationData.save();
			//Ti.API.info('Activity Data: ' + JSON.stringify(ActivityData));
		}
		var insCol=Alloy.Collections.inspiration_model;
		insCol.fetch();
		insCol.sort();
	}
	if (firstLoaded) {
		//Alloy.createController(windowToOpen, arg).getView().open();
		Ti.App.Properties.setString('installDate', new Date());
	}
	//Alloy.createController('homeWindow', {}).getView().open();
}

function sortData(d1, d2) {
	var value1 = d1.Order;
	var value2 = d2.Order;
	return value1 - value2;
}

function downloadImages(url) {
 Ti.API.info("Downloading missing image");
 var temp = url.split('/');
 var filename = temp[temp.length - 1];
 Ti.API.info('fileName:' + filename);
 var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
 var path = file.nativePath;
 Ti.API.info('path index: '+ path);
 if (file.exists()) {
 Ti.API.info("File " + filename + ' exists');
 } else {
 download.download(url, function(e) {
 if (e.success) {
 Ti.API.info('Complete');
 file.write(e.data);

 } else if (e.error) {
 Ti.API.info('Error downloading image please try again later');
 Ti.API.info(JSON.stringify(e.message));
 }
 });
 }

 }

