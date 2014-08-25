exports.definition = {
	config: {
		columns: {
		    "value": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "corevalues_model"
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