exports.definition = {
	config: {
		columns: {
		    "ButtonText": "string",
		    "CalltoAction": "string",
		    "Body1": "string",
		    "Body2": "string",
		    "PDFHyperlink": "string",
		    "Subject": "string",
		    "Title_PDFHyperlink": "string",
		    "senderEmailaddress": "string",
		    "senderName": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "freeGift"
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