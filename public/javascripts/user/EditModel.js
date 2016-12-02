ko.validation.init({
	decorateInputElement: true
});

//custom validaton for passwords
ko.validation.rules['mustEqual'] = {
	validator: function (val, otherVal) {
		return val === otherVal;
	}, message: 'The passwords must match.'
};

const EditModel = function(jsonObject) {
	const self = this;

	self.DisplayName = ko.observable(jsonObject.data.DisplayName).extend({ required: true });
	self.Password = ko.observable().extend({ required: true, minLength: 3 });
	self.ConfirmPassword = ko.observable().extend({ required: true, mustEqual: self.Password, minLength: 3 });
	self._id = jsonObject.data._id;

	self.Message = ko.observable(jsonObject.message);

	//error handling
	self.Errors = ko.validation.group(self, { deep: true });

	/**
	 * Edit User
	 */

	self.editUser = function(user) {
		if (self.Errors().length != 0)
			self.Errors.showAllMessages();
		else {
			const json = JSON.stringify(ko.toJS(self));
			$.ajax({
				url: '/user/api/' + self._id,
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


};
ko.validation.registerExtenders();
