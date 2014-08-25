exports.definition = {
	config: {
		columns: {
		    "BioFirstParag": "string",
		    "BioSecondParag": "string",
		    "ContactEmail": "string",
		    "EmailSubject": "string",
		    "EmailText": "string",
		    "FirstByLine": "string",
		    "SecondByLine": "string",
		    "ThirdByLine": "string",
		    "FirstLastName": "string",
		    "objectId": "string",
		    "updateDate": "date"
		},
		adapter: {
			type: "sql",
			collection_name: "connect"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};