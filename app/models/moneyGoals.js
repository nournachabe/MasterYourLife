exports.definition = {
	config: {
		columns: {
		    "goal": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "moneyGoals"
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