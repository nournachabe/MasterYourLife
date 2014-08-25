exports.definition = {
	config: {
		columns: {
		    "goal": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "selfAwareness"
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