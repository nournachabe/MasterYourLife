exports.definition = {
	config: {
		columns: {
		    "goal": "text",
		    "times": "text",
		    "every_goal": "text",
		    "when_goal": "text",
		    "where_goal": "text",
		    "core": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "myGiveBackGoals"
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