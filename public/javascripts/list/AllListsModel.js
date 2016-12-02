const AllListsModel = function(jsonObject) {
	const self = this;

	self.Lists = ko.observableArray(ko.utils.arrayMap(jsonObject.data, (list) => {
		return {
			ListName: ko.observable(list.ListName).extend({ required: true }),
			_id: list._id
		};
	}));

	self.Message = ko.observable(jsonObject.message);

	//error handling
	self.Errors = ko.validation.group(self, { deep: true });

	/**
	 * List Functions
	 */

	self.removeList = function(list) {
		return $.ajax({
			url: '/list/api/' + list._id,
			type: 'DELETE',
			success: function() {
				self.Lists.remove(list);
			},
			error: function () {

			}
		});
	};

	self.editList = function(list) {
		window.location.href = '/list/edit/' + list._id;
		$.ajax({
			url: '/list/edit/' + list._id,
			type: 'GET',
			success: function() {

			},
			error: function () {

			}
		});
	};
};