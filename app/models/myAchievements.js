exports.definition = {
	config: {
		columns: {
		    "goal": "text",
		    "core": "text",
		    "date": "datetime"
		},
		adapter: {
			type: "sql",
			collection_name: "myAchievements"
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