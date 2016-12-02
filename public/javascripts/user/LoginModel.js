const loginJSON = {
	Username: '',
	Password: ''
};

const LoginModel = function(jsonObject) {
	const self = this;

	self.Username = ko.observable(jsonObject.Username).extend({ required: true });
	self.Password = ko.observable(jsonObject.Password).extend({ required: true });

	self.Message = ko.observable();

	//error handling for username and password
	self.Errors = ko.validation.group([ self.Username, self.Password ]);

	self.Login = function(user) {
		if (self.Errors().length != 0)
			self.Errors.showAllMessages();
		else {
			const json = JSON.stringify(ko.toJS(self));
			$.ajax({
				url: '/user/api/login',
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
};