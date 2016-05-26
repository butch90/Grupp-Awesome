app.directive('buyFilter', [function(){

  return {
    templateUrl: '/directives/buyFilter.html',
    controller: ['$scope', '$filter', '$route', '$location', "property", function($scope, $filter, $route, $location, property) {

      // Pagination function
      // Uses different elements in buy.html in our $scope
      function setupPagination(data) {

        // Total amount of items
        $scope.totalItems = data.length;

        // Function for changing page and dividing data into different pages
        $scope.pageChanged = function () {
          var startAt = ($scope.filterOption.currentPage-1) * $scope.filterOption.itemsPerPage;
          $scope.values = data.slice().splice(startAt, $scope.filterOption.itemsPerPage);
        };

        $scope.pageChanged();
      }

      // This is where data is stored when an option is selected
      // Data is changed with ng-model in .html
      // We use this data in the query and URL
      $scope.filterOption = {
        priceMin: 1,
        priceMax: 1e8 ,
        areaMin: 1,
        areaMax: 1e4,

        // Property type House/Apartment
        // /.*/ takes all values
        propertyType: /.*/,

        // Sorting options
        sortOptionCode: null,
        sortOptionType: null,

        // Property id
        id: null,

        // Pagination options
        itemsPerPage: 5,
        currentPage: 1
      };

      // Function to only get needed values into $scope.filterOption
      $scope.typeCheck = function(propName){
        var data = $scope[propName];

        // If data is for sort
        if(data.sortOptionType){
          $scope.filterOption.sortOptionCode = data.sortOptionCode;
          $scope.filterOption.sortOptionType = data.sortOptionType;
          $scope.sort();
        }

        // If data is for property type
        else{
          $scope.filterOption.propertyType = data.propertyType;
          $scope.filter();
        }
      }

      // Select options for angular
      // This is just stored data instead of keeping it in the .html
      // It's looped into a <select> with ng-options in .html
      // 1e5 === 100000
      $scope.filterOptions = {
        priceMin: [0,1e6,2e6+5e5,5e6,7e6+5e5,1e7],
        priceMax: [2e6+5e5,5e6,7e6+5e5,1e7,1e7+5e6,5e7],
        areaMin: [0,25,50,75,100,125,150],
        areaMax: [25,50,75,100,125,150,200,300],
        itemsPerPage: [5,10,25,50],

        type: [
          { propertyType: "House", name: "Villa" },
          { propertyType: "Apartment", name: "Lägenhet"}
        ],

        sortOption: [
          { sortOptionCode: 0, sortOptionType: "price", name: "Pris: Lägsta först" },
          { sortOptionCode: -1, sortOptionType: "price", name: "Pris: Högsta först" },
          { sortOptionCode: 0, sortOptionType: "livingarea", name: "Boarea: Minsta först" },
          { sortOptionCode: -1, sortOptionType: "livingarea", name: "Boarea: Största först" }
        ]
      };

      // Filter
      $scope.filter = function(){

        var data = $scope.filterOption;

        // Here we create our query as an object
        var query = {

            // $and contains all values that are being compared
            // $lte = less than or equal to - $gte = greater than or equal to
            $and: [{
              propertyType: data.propertyType,
              price: { $lte : data.priceMax, $gte : data.priceMin },
              livingarea: { $lte : data.areaMax, $gte : data.areaMin } // , add more filter here
            }]
          };

        // This is our get request to our database from Mongresto
        property.get(
          query,
          function(data){

            console.log(data);

            // Stored values for sorting on frontend
            $scope.initValues = data;


            // Checks if our id in URL is an existing id
            if($route.current.params.id){

              // The function findProp loops through our database to find matching id
                // If true then open correct modal for that property
                // Else removes the falsy id from URL
              ($scope.initValues.find(findProp) ? $scope.openModal($scope.initValues.find(findProp)) : $route.current.params.id = null);
            }

            function findProp(prop){
              return prop._id === $route.current.params.id;
            }

            // Send data to make pagination or to sort before if any option for sort is defined
            // This is also done if a modal is opened
            ($scope.filterOption.sortOptionCode !== null) ? $scope.sort(data) : setupPagination(data);
        });
      }

      // Our sort funtion
      // Uses angular $filter with orderBy to sort data on frontend
      $scope.sort = function(){
        setupPagination($filter('orderBy')($scope.initValues, $scope.filterOption.sortOptionType, $scope.filterOption.sortOptionCode));
      }

      // Opens a modal for property
      $scope.initModal = function(prop){

        // Get id from modal to input in URL
        $scope.filterOption.id = prop._id;

        // Open modal
        $scope.openModal(prop);
      }

      // Checks if a URL exist
      if($route.current.params.priceMax){
        $scope.filterOption = $route.current.params;

        // Loops through to remove strings on integers
        for (var key in $scope.filterOption) {
          if ($scope.filterOption.hasOwnProperty(key)) {

            // String should not be removed on propertyType, sortOptionType and id
            if(key != 'propertyType' && key != "sortOptionType" && key != "id") {
              $scope.filterOption[key] = $scope.filterOption[key]/1;
            }
          }
        }

        // If our RegExp is a string, make it a non string
        if($scope.filterOption.propertyType == "/.*/") {
          $scope.filterOption.propertyType = new RegExp(".*");
        }
      }

      // Init all data
      $scope.filter();

      // A $watch to find changes in $scope.filterOptions and update out URL
      // Page will not reload because of reloadOnSearch is set to false in app.js
      $scope.$watch("filterOption", function(){
        $location.search($scope.filterOption);
      }, true)

    }]
  };
}]);