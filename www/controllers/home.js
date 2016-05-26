app.controller("home", ["$scope", "property", "homedb", "aboutdb", "workers", function($scope, property, homedb, aboutdb, workers) {



    function loadhome(data) {
        $scope.homeDatas = data || homedb.get(function(data) {
            console.log(data);
            }
        );
    }

    loadhome();

    // Dummy data
    property.get({},function(data){if(!data.length){addProperties();}});
    homedb.get({},function(data){if(!data.length){addHome();}});
    aboutdb.get({},function(data){if(!data.length){addAbout()}});
    workers.get({},function(data){if(!data.length){addWorkers()}});

	function addProperties(){

		function randomData() {

			function randomNum(numLow, numHigh, startValue) {
				return ((!numLow) ? ~~(Math.random() * (numHigh + 1) + numLow) : ~~(Math.random() * numHigh) + numLow) + ((!startValue) ? 0:startValue);
			}

			function randomType() {
				var type = ["Apartment", "House"];
				return type[randomNum(0,1)];
			}

			var floors = [
				[],
				["img/floors/plan1.jpg", "img/floors/plan2.jpg", "img/floors/plan3.jpg"],
			    [ "img/floors/plan2.jpg", "img/floors/plan3.jpg"],
				["img/floors/plan5.jpg", "img/floors/plan7.jpg"],
				["img/floors/plan1.jpg"],
				["img/floors/plan5.jpg"],
				["img/floors/plan3.jpg", "img/floors/plan1.jpg", "img/floors/plan2.jpg", "img/floors/plan7.jpg", "img/floors/plan5.jpg"]
				];
			var floorNumber = randomNum(1,6);		

			var gallery = ["img/gallery/img1.jpg", "img/gallery/img2.jpg", "img/gallery/img3.jpg", "img/gallery/img4.jpg", "img/gallery/img5.jpg"];
							
			var adresses = ["Ramels väg", "Ernst", "Tessins väg", "Sergels väg", "Romlins väg", "Regementsgatan", "Nobelvägen", "Polvägen", "Limhamnsvägen"];
			return {
				adress: adresses[randomNum(0, 10)],
				zipcode: randomNum(1, 10000, 10000),
				price: randomNum(1, 2e7, 7e5),
				rooms: randomNum(1,10),
				livingarea: randomNum(1, 100, 30),
				propertyType: randomType(),
				description: "Hej",
				yardarea: randomNum(1, 1000, 50),
				floors: floorNumber,
				path: "img/objects/villa" + randomNum(1,11) + ".jpg",
				floorplans: floors[floorNumber],
				galleryImg: gallery
			};
		}

		var homes = [];
		for (var i = 0; i < 164; i++) {
			homes.push(randomData());

		}

		property.create(homes);
	}

	function addHome(){
		homedb.create({title: "Välkommen till oss", text: "Lorem ipsum dolor sit amet, arcu nonummy vulputate. Vehicula integer, tellus massa vitae laoreet tellus."});
	}

	function addAbout(){
		aboutdb.create([
			{
				title: "Olle Bengtsson",
				description: "Kan lite av allt, Ger aldrig upp",
				path: "img/about/1.jpg"
			},
			{
				title: "Andreas Lövqvist",
				description: "Javascript mästare",
				path: "img/about/1.jpg"
			},
			{
				title: "Alexander Wigström",
				description: "Bootstrap maestro",
				path: "img/about/1.jpg"
			},
			{
				title: "Marcus Wendel",
				description: "Kan lite av allt, Snabblärd",
				path: "img/about/1.jpg"
			}]);
	}

	function addWorkers(){
		workers.create([
			{
			    name: "Kalle Kulla",
			    description: "Trevlig kille med riktig kullmage",
			    worktime: 4,
			    age: 20,
			    path: "img/workers/1.jpg",
			    email: "kalle.kulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  		},
	  		{
			    name: "Lisa Bulla",
			    description: "Trevlig tjej med riktig kullmage",
			    worktime: 10,
			    age: 35,
			    path: "img/workers/2.jpg",
			    email: "lisa.bulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  		},
	  		{
			    name: "Hans Sulla",
			    description: "Trevlig fillur med riktig kullmage",
			    worktime: 8,
			    age: 30,
			    path: "img/workers/3.jpg",
			    email: "hans.sulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  		},
	  		{
			    name: "Pelle Hulla",
			    description: "Trevlig snubbe med riktig kullmage",
			    worktime: 6,
			    age: 25,
			    path: "img/workers/4.jpg",
			    email: "pelle.hulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  	}]);
	}
}]);