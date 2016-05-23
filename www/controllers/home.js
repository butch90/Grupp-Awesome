app.controller("home", ["$scope", "property", "homedb", "aboutdb", "workers", function($scope, property, homedb, aboutdb, workers) {



    function loadhome(data) {
        $scope.homeDatas = data || homedb.get(function(data) {
            console.log(data);
            }
        );
    }

    loadhome();

    // Dummy data
    property.get({},function(data){if(data.length === 0){addProperties(data);}});
    homedb.get({},function(data){if(data.length === 0){addHome(data);}});
    aboutdb.get({},function(data){if(data.length === 0){addAbout(data)}});
    workers.get({},function(data){if(data.length === 0){addWorkers(data)}});

	function addProperties(data){
		console.log("No properties found");

		function randomData() {

			function randomNum(numLow, numHigh, startValue) {
				if(!startValue) {
					startValue = 0;
				}

				if(numLow === 0) {
					var randomNum = Math.floor((Math.random() * (numHigh + 1) + numLow)) + startValue;
					return randomNum;
				}
				else {
				var randomNum = Math.floor((Math.random() * numHigh) + numLow) + startValue;
				return randomNum;
				}
			}
			function randomType() {
				var type = ["Apartment", "House"];
				return type[randomNum(0,1)];
			}
			var adresses = ["Ramels väg", "Ernst", "Tessins väg", "Sergels väg", "Romlins väg", "Regementsgatan", "Nobelvägen", "Polvägen", "Limhamnsvägen"];
			var data = {
				adress: adresses[randomNum(0, 10)],
				zipcode: randomNum(1, 10000, 10000),
				price: randomNum(1, 20000000, 700000),
				rooms: randomNum(1,10),
				livingarea: randomNum(1, 100, 30),
				propertyType: randomType(),
				description: "Hej",
				yardarea: randomNum(1, 1000, 50),
				floors: randomNum(1, 10),
				path: "img/objects/villa" + randomNum(1,11) + ".jpg"
			}
			return data;
		}

		var homes = [];
		for (var i = 0; i < 124; i++) {
			homes.push(randomData());

		}

		property.create(homes);
	}

	function addHome(data){
		homedb.create({title: "Välkommen till oss", text: "Lorem ipsum dolor sit amet, arcu nonummy vulputate. Vehicula integer, tellus massa vitae laoreet tellus."});
	}

	function addAbout(data){
		aboutdb.create(
			{
				title: "Olle Bengtsson",
				description: "Kan lite av allt, Ger aldrig upp",
				path: "img/about/1.jpg"
			});
		aboutdb.create(
			{
				title: "Andreas Lövqvist",
				description: "Javascript mästare",
				path: "img/about/1.jpg"
			});
		aboutdb.create(
			{
				title: "Alexander Wigström",
				description: "Bootstrap maestro",
				path: "img/about/1.jpg"
			});
		aboutdb.create(
			{
				title: "Marcus Wendel",
				description: "Kan lite av allt, Snabblärd",
				path: "img/about/1.jpg"
			});
	}

	function addWorkers(data){
		workers.create(
			{
			    name: "Kalle Kulla",
			    description: "Trevlig kille med riktig kullmage",
			    worktime: 4,
			    age: 20,
			    path: "img/workers/1.jpg",
			    email: "kalle.kulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  		});
	  	workers.create({
			    name: "Lisa Bulla",
			    description: "Trevlig tjej med riktig kullmage",
			    worktime: 10,
			    age: 35,
			    path: "img/workers/2.jpg",
			    email: "lisa.bulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  		});
	  	workers.create({
			    name: "Hans Sulla",
			    description: "Trevlig fillur med riktig kullmage",
			    worktime: 8,
			    age: 30,
			    path: "img/workers/3.jpg",
			    email: "hans.sulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  		});
	  	workers.create({
			    name: "Pelle Hulla",
			    description: "Trevlig snubbe med riktig kullmage",
			    worktime: 6,
			    age: 25,
			    path: "img/workers/4.jpg",
			    email: "pelle.hulla@dyhrrumson.se",
			    phone: "071-234 56 78"
	  	});
	}
}]);