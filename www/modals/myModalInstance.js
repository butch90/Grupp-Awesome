app.controller ('myModalInstance', [ '$scope', '$uibModalInstance', '$rootScope', 'fastighet', function($scope, $uibModalInstance, $rootScope, fastighet){



	$scope.fastighet = fastighet;

	$rootScope.floors = fastighet.floorplans;

	$scope.gallery = fastighet.galleryImg;


	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss();
	};
}]);
