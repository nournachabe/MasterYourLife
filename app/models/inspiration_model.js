exports.definition = {
	config : {
		columns : {
			"inspiration" : "text",
			"ins_order" : "int"
		},
		adapter : {
			type : "sql",
			collection_name : "inspiration_model"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			initialize : function() {
				//*** Default sort field.  Replace with your own default.
				this.sortField = "ins_order";
				//*** Default sort direction
				this.sortDirection = "ASC";
			},

			//*** Use setSortField to specify field and direction before calling sort method
			setSortField : function(field, direction) {
				this.sortField = field;
				this.sortDirection = direction;
			},

			comparator : function(collection) {
				return collection.get(this.sortField);
			},
			sortBy : function(iterator, context) {
				var obj = this.models;
				var direction = this.sortDirection;

				return _.pluck(_.map(obj, function(value, index, list) {
					return {
						value : value,
						index : index,
						criteria : iterator.call(context, value, index, list)
					};
				}).sort(function(left, right) {
					// swap a and b for reverse sort
					var a = direction === "ASC" ? left.criteria : right.criteria;
					var b = direction === "ASC" ? right.criteria : left.criteria;

					if (a !== b) {
						if (a > b || a ===void 0)
							return 1;
						if (a < b || b ===void 0)
							return -1;
					}
					return left.index < right.index ? -1 : 1;
				}), 'value');
			}
		});

		return Collection;
	}
}; 