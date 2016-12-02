const createJSON = [
	{
		ListName: '',
		ListItems: []
	}
];

const CreateModel = function(jsonObject) {
	const self = this;

	self.ListName = ko.observable(jsonObject.ListName).extend({ required: true });
	self.ListItems = ko.observableArray(jsonObject.ListItems);

	self.Message = ko.observable(jsonObject.message);

	//error handling
	self.Errors = ko.validation.group(self, { deep: true });

	/**
	 * List Functions
	 */

	self.saveList = function(list) {
		if (self.Errors().length != 0)
			self.Errors.showAllMessages();
		else {
			const json = JSON.stringify(ko.toJS(self));
			$.ajax({
				url: '/list/api/',
				type: 'POST',
				data: json,
				contentType: 'application/json',
				dataType: 'json',
				success: function(jsonObject) {
					self.Message(jsonObject.message);
				},
				error: function () {

				}
			});
		}
	};

	self.editList = function(list) {
		if (self.Errors().length != 0)
			self.Errors.showAllMessages();
		else {
			const json = JSON.stringify(ko.toJS(self));
			$.ajax({
				url: '/list/api/' + jsonObject._id,
				type: 'PUT',
				data: json,
				contentType: 'application/json',
				dataType: 'json',
				success: function(jsonObject) {
					self.Message(jsonObject.message);
				},
				error: function () {

				}
			});
		}
	};

	/**
	 * List Item Functions
	 */

	self.addItem = function() {
		self.ListItems.push({
			Item: ko.observable().extend({ required: true })
		});
	};

	self.removeItem = function(listItem) {
		self.ListItems.remove(listItem);
	};
};