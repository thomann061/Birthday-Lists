function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

const initialCreateData = [
	{
		ListName: '',
		ListItems: [],
		ID: guid()
	}
];

const ViewModel = function(lists) {
	const self = this;

	self.lists = ko.observableArray(ko.utils.arrayMap(lists, (list) => {
		return { ListName: ko.observable(list.ListName).extend({ required: true }),
		ListItems: ko.observableArray(list.ListItems), ID: list.ID };
	}));

	self.errors = ko.validation.group(self, { deep: true });

	self.removeList = function(list) {
		return $.ajax({
			url: '/list/api/' + list.ID,
			type: 'DELETE',
			success: function() {
				self.lists.remove(list);
			},
			error: function () {

			}
		});
	};

	self.addItem = function(list) {
		list.ListItems.push({
			Item: ko.observable().extend({ required: true })
		});
	};

	self.removeItem = function(listItem) {
		$.each(self.lists(), function() { this.ListItems.remove(listItem); });
	};

	self.editList = function(list) {
		window.location.href = '/list/edit/' + list.ID;
		$.ajax({
			url: '/list/edit/' + list.ID,
			type: 'GET',
			success: function() {

			},
			error: function () {

			}
		});
	};

	self.put = function(list) {
		if (self.errors().length != 0)
			self.errors.showAllMessages();
		else {
			const json = JSON.stringify(ko.toJS(self.lists));
			const newString = json.substring(1, json.length-1);
			const jsonObject = JSON.parse(newString);
			$.ajax({
				url: '/list/api/' + jsonObject.ID,
				type: 'PUT',
				data: newString,
				contentType: 'application/json',
				dataType: 'json',
				success: function() {

				},
				error: function () {

				}
			});
		}
	};

	self.post = function(list) {
		if (self.errors().length != 0)
			self.errors.showAllMessages();
		else {
			const json = JSON.stringify(ko.toJS(self.lists));
			const newString = json.substring(1, json.length-1);
			$.ajax({
				url: '/list/api/',
				type: 'POST',
				data: newString,
				contentType: 'application/json',
				dataType: 'json',
				success: function() {
					self.editList(list);
				},
				error: function () {

				}
			});
		}
	};
};