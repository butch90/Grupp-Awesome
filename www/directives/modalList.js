app.directive("modalList", [function (){

	return {
		controller: ["$scope", "$location", "$uibModal", function($scope, $location, $uibModal){

			$scope.openModal = function(fastighet){

				var modalInstance = $uibModal.open({
			    	animation: true,
			   	 	templateUrl: '/modals/myModalInstance.html',
			    	controller: 'myModalInstance',
			    	size: 'lg',
			    	resolve: {
			      	fastighet: fastighet
			      }
			      
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	//done (ok)
			      	$scope.selected = selectedItem;
			      	$scope.filterOption.id = null;
			      	$location.search($scope.filterOption);
			    }, function () {
			    	//fail (cancel)
			      	console.log('Modal dismissed at: ' + new Date());
			      	$scope.filterOption.id = null;
			      	$location.search($scope.filterOption);
			    });
			}
		}]
	};
}]);