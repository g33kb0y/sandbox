angular.module('fifaApp')

	.controller('MainCtrl', ['UserService', function(UserService) {
		var vm=this;
		vm.userService = UserService;
		UserService.session();
	}])

	.controller('TeamsListCtrl', ['FifaService', function(FifaService) {
		var vm=this;
		vm.teams = [];
		FifaService.getTeams().then(function(resp) {
			vm.teams = resp.data;
		});
	}])

	.controller('LoginCtrl', ['UserService', '$location', function(UserService, $location) {
		var vm=this;
		vm.user = {username: '', password: ''};
		vm.login = function() {
			UserService.login(self.user)
				.then(function(success) {
					$location.path('/team');
				},function(error) {
					vm.errorMessage = error.data.msg;
				})
		};
	}])

	.controller('TeamDetailsCtrl', ['$location', '$routeParam', 'FifaServicer', function($location, $routeParam, FifaService) {
		var vm = this;
		vm.team = {};
		FifaService.getTeamDetails($routeParams.code)
			.then(function(resp) {
				vm.team = resp.data;
			}, function(error) {
				$location.path('/login');
			});
	}]);