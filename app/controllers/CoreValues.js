//Variables:

var args = arguments[0] || {};
var coreDataset = [];
var api = require('api');
var i = 0;

//Main:

$.win.open();
getCores();

//Functions:

function home() {
	$.win.close();
}

function done() {
	var selectedCores = [];
	var nb;
	for ( nb = 0; nb < $.coreTable.sections[0].rowCount; nb++) {
		if ($.coreTable.sections[0].rows[nb].children[0].value == true) {
			selectedCores.push($.coreTable.sections[0].rows[nb].children[0].title);
		}
	}
	Ti.API.info(JSON.stringify(selectedCores));
	var coreValues = {
		cores : selectedCores
	};
	Ti.App.Properties.removeProperty("coreValues");
	Ti.App.Properties.setString("coreValues", JSON.stringify(coreValues));
	if (args.persWin != null) {
		args.persWin.close();
		var mymenu = Alloy.createController("MenuPage", {}).getView();
		mymenu.open();
	} else {
		args.fillFunction();
	}
	
	

	$.win.close();
}

function getCores() {
	/*var cores=[];
	 api.getCoreValues(function(e) {
	 if (e.success) {
	 cores = e.data;
	 showCores(cores);
	 } else {
	 Ti.API.info('An error has occured');
	 }
	 });*/
	var mycoreValues = Alloy.Collections.corevalues_model;
	mycoreValues.fetch();
	var cores = mycoreValues.toJSON();
	showCores(cores);
}

function showCores(cores) {
	//dsdas
	if (args.persWin == null) {
		var mycores = JSON.parse(Ti.App.Properties.getString("coreValues")).cores;
		i=mycores.length;
	}
	var tableData = [];
	for ( j = 0; j < cores.length; j++) {
		var row = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			backgroundSelectedColor : 'white',
			rowIndex : i, // custom property, useful for determining the row during events
			height : 40,
			width : Ti.UI.FILL,
		});
		var value = false;
		if (args.persWin == null) {
			for ( k = 0; k < mycores.length; k++) {
				if (mycores[k] == cores[j].value) {
					value = true;
					break;
				}
			}
		}
		var coreSwitch = Ti.UI.createSwitch({
			style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
			title : cores[j].value,
			value : value,
			top : '20',
			width : '50%', // necessary for textAlign to be effective
			color : 'black',
			left : '5'
		});
		row.add(coreSwitch);
		tableData.push(row);
	}
	$.coreTable.setData(tableData);
}

function coreSelect(event) {
	if (event.row.children[0].value)
		if (i < 4) {
			i = i + 1;
		} else {
			event.row.children[0].value = 'false';
			var dialog = Ti.UI.createAlertDialog({
				message : 'Please choose no more than FOUR core values',
				ok : 'OK',
				title : 'WHOOPS!'
			}).show();

		}
	else
		i = i - 1;

}
