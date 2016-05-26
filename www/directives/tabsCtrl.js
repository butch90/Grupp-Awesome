app.directive('tabsCtrl', [function (){
  return {
    templateUrl: '/directives/tabsCtrl.html',
    controller: ['$scope', '$window', function($scope, $window) {
  $scope.tabs = [
    { title: 'Info', content:'Dynamic content 1', active: true },
    { title:'Planlösning', content:'Dynamic content 2', disabled: true },
    { title:'Galleri', content:'Dynamic content 2', disabled: true }
  ];
  // $scope.model = {
  //   name: 'Tabs'
  // };


  $scope.status = {
    isopen: false
  };

  $scope.url = $scope.floors;
  $scope.image = $scope.floors[0];
  angular.element('#btn0').button('toggle');
  $scope.click = function(floor) {

    $scope.image = $scope.url[floor];
    console.log('clicked');
  }

  // $scope.toggled = function(open) {
  //   $log.log('Dropdown is now: ', open);
  // };



    }]
  };
}]);