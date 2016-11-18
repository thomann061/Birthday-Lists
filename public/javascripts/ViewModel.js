function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

const initialCreateData = [
	{
		ListName: "New Birthday List #",
		ListItems: [ { Item: "Cool Toy" } , { Item: "Sweet Toy" } ],
		ID: guid()
	}
];

const initialData = [
	{
		ListName: "Birthday List #1",
		ListItems: [ { Item: "Scooby Doo Toy" } , { Item: "Godzilla Toy" } ],
		ID: guid()
	},
	{
		ListName: "Birthday List #2",
		ListItems: [ { Item: "Scooby Doo Toy" } , { Item: "Godzilla Toy" } ],
		ID: guid()
	},
	{
		ListName: "Birthday List #3",
		ListItems: [ { Item: "Scooby Doo Toy" } , { Item: "Godzilla Toy" } ],
		ID: guid()
	}
];

const ViewModel = function(lists) {
	const self = this;

	self.lists = ko.observableArray(ko.utils.arrayMap(lists, function(list) {
        return { ListName: list.ListName, ListItems: ko.observableArray(list.ListItems), ID: list.ID };
    }));

	self.addList = function() {
		self.lists.push({
			ListName: "",
			ListItems: ko.observableArray(),
			ID: guid()
		});
	};

	self.removeList = function(list) {
		$.ajax({
			url: "/list/api/" + list.ID,
			type: "DELETE",
			success: function() {
				self.lists.remove(list);
			},
			error: function () {

			}
		});
	};

	self.addItem = function(list) {
		list.ListItems.push({
			Item: ""
		});
	};

	self.removeItem = function(listItem) {
		$.each(self.lists(), function() { this.ListItems.remove(listItem); });
	};

	self.editList = function(list) {
		window.location.href = "list/edit/" + list.ID;
		$.ajax({
			url: "/list/edit/" + list.ID,
			type: "GET",
			success: function() {

			},
			error: function () {

			}
		});
	};

	self.put = function(list) {
		const json = JSON.stringify(ko.toJS(self.lists));
		const newString = json.substring(1, json.length-1);
		const jsonObject = JSON.parse(newString);
		$.ajax({
			url: "/list/api/" + jsonObject.ID,
			type: "PUT",
			data: newString,
			contentType: "application/json",
			dataType: "json",
			success: function() {

			},
			error: function () {

			}
		});
	};

	self.post = function() {
		const json = JSON.stringify(ko.toJS(self.lists));
		const newString = json.substring(1, json.length-1);
		$.ajax({
			url: "/list/api/",
			type: "POST",
			data: newString,
			contentType: "application/json",
			dataType: "json",
			success: function() {

			},
			error: function () {

			}
		});
	};
};