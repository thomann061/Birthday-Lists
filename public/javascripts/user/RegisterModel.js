const registerJSON = {
	DisplayName: '',
	Username: '',
	Password: '',
	ConfirmPassword: '',
	Lists: []
};

ko.validation.init({
	decorateInputElement: true
});

//custom validaton for passwords
ko.validation.rules['mustEqual'] = {
	validator: function (val, otherVal) {
		return val === otherVal;
	}, message: 'The passwords must match.'
};

const RegisterModel = function(jsonObject) {
	const self = this;

	self.DisplayName = ko.observable(jsonObject.DisplayName).extend({ required: true });
	self.Username = ko.observable(jsonObject.Username).extend({
		required: true, minLength: 3,
		pattern: {
			message: 'Only letters, numbers, underscore and hyphen.',
			params: '^[a-zA-Z0-9_-]*$'
		}
	});
	self.Password = ko.observable(jsonObject.Password).extend({ required: true, minLength: 3 });
	self.ConfirmPassword = ko.observable(jsonObject.ConfirmPassword).extend({ required: true, mustEqual: self.Password, minLength: 3 });
	self.UserID = jsonObject.UserID;
	self.Lists = self.lists;

	//register message
	self.Message = ko.observable();

	//error handling
	self.errors = ko.validation.group(self, { deep: true });

	/**
	 * Register User
	 */

	self.registerUser = function(user) {
		if (self.errors().length != 0)
			self.errors.showAllMessages();
		else {
			const json = JSON.stringify(ko.toJS(self));
			$.ajax({
				url: '/user/api/',
				type: 'POST',
				data: json,
				contentType: 'application/json',
				dataType: 'json',
				success: function(jsonObject) {
					self.Message(jsonObject.message);
				},
				error: function (err) {

				}
			});
		}
	};


};
ko.validation.registerExtenders();
