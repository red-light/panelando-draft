angular.module('panelando')

.controller('NewRecipeController', [
'$scope', 
'$http',
'$log', 
'$upload',
'$receitas', 
function($scope, $http, $log, $upload, $receitas) {

 	$scope.saveRecipe = function() {

		var extension = $scope.recipe.image[0].name.split('.')[1];
 		var fileName = Date.now() + '.' + extension;

 		var steps = [];
 		var ingredients = [];

		angular.forEach($scope.recipe.steps, function(step) {
			steps.push(step.name);
		});

		angular.forEach($scope.recipe.ingredients, function(ingredient) {
			ingredients.push(ingredient.name);
		});

		steps = JSON.stringify(steps);
		ingredients = JSON.stringify(ingredients);

		$http({
		  url: "api/save.php", 
		  method: "POST",
		  data: $.param({
		  	'name': $scope.recipe.name,
		  	'image': fileName,
				'preparation_time': $scope.recipe.preparationTime,
				'number_of_portions': $scope.recipe.numberOfPortions,
				'difficulty': $scope.recipe.difficulty.selected.value,
				'ingredients': ingredients,
				'steps': steps,
		  }),
		  headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(data, status) {
			$log.info(data);
		});

		$scope.upload = $upload.upload({
			url: 'api/saveImage.php',
			method: 'POST',
			data: { 
				'image': $scope.recipe.image, 
				'file_name': fileName
			},
			headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
			file: $scope.recipe.image[0]
		}).progress(function(evt) {
			$log.info('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
		}).success(function(data, status, headers, config) {
			$log.info(data);
		});

 	};

	$scope.recipe = {
		name: '',
		image: [],
		preparationTime: '',
		numberOfPortions: '',
		difficulty: {
			selected: {},
			options: [
				{name: 'Fácil', value: 1},
				{name: 'Médio', value: 2},
				{name: 'Difícil', value: 3}
			]
		},
		ingredients: [],
		steps: []
	};

	$scope.onFileSelect = function($files) {
		for (var i = 0; i < $files.length; i++) {
			$scope.recipe.image.push($files[i]);
		}
	};

	$scope.newStep       = { name: '', editing: false }
	$scope.newIngredient = { name: '', editing: false }

	$scope.addIngredient = function(event) {
		if($scope.newIngredient.name === '' || event.keyCode !== 13) return;

		$scope.recipe.ingredients.push($scope.newIngredient);
		$scope.newIngredient = { name: '', editing: false };
	};

	$scope.editIngredient = function(index) {
		$scope.recipe.ingredients[index].editing = true;
	};

	$scope.saveIngredient = function(event, index, inputByKeyboard) {
		if(inputByKeyboard) {
			if(event.keyCode === 13) {
				$scope.recipe.ingredients[index].editing = false;
			}
			return;
		}

		$scope.recipe.ingredients[index].editing = false;
	};

	$scope.addStep = function(event) {
		if($scope.newStep.name === '' || event.keyCode !== 13) return;

		$scope.recipe.steps.push($scope.newStep);
		$scope.newStep = { name: '', editing: false };
	};

	$scope.editStep = function(index) {
		$scope.recipe.steps[index].editing = true;
	};

	$scope.saveStep = function(event, index, inputByKeyboard) {
		if(inputByKeyboard) {
			if(event.keyCode === 13) {
				$scope.recipe.steps[index].editing = false;
			}
			return;
		}

		$scope.recipe.steps[index].editing = false;
	};


}]);