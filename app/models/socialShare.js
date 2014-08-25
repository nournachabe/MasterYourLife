exports.definition = {
	config: {
		columns: {
		    "ImageShareURL": "string",
		    "LinkShare_40Characters": "string",
		    "TextShare_100Characters": "string",
		    "TextShareGoalComplete_100Characters": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "socialShare"
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