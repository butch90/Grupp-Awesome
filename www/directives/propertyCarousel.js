
app.directive('propertyCarousel', [function() {

  return {
    templateUrl: '/directives/propertyCarousel.html',
    controller: ['$scope', function($scope) {
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;
        console.log($scope.gallery);
        $scope.addSlide = function() {
          slides.push({
            image: '/img/gallery/img' + currIndex,
            text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
            id: currIndex++
          });
        };

        for (var i = 0; i < 4; i++) {
          $scope.addSlide();
        }

        function assignNewIndexesToSlides(indexes) {
          for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
          }
        }

    }]
  };
}]);