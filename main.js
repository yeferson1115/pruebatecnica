// Creación del módulo
var app = angular.module('angularRoutingApp', ['ngRoute']);

app.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
  }]);

// Configuración de las rutas
app.config(function ($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl	: 'pages/home/home.html',
			controller 	: 'mainController',
			
		})
		.when('/usuarios', {
			templateUrl : 'pages/users.html',
			controller 	: 'usersController'
		})
		.when('/albunes', {
			templateUrl : 'pages/albums.html',
			controller 	: 'albumsController'
		})
		.when('/posts', {
			templateUrl : 'pages/post.html',
			controller 	: 'postController'
		})
		.otherwise({
			redirectTo: '/'
		});
		
});


app.controller('mainController', function($scope) {
	
});

app.controller('usersController', function($scope,$http) {
	$http.get('https://jsonplaceholder.typicode.com/users').then(function (r) {
		console.log(r);
           $scope.users = r.data;
    });	
});
app.controller('postController', function($scope,$http) {
	$scope.master = {};

    $scope.update = function(post) {
		var data={
			title: post.title,
			body: post.body,
			userId: 1,
		  }

	$http.post('https://jsonplaceholder.typicode.com/posts',data, {
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    }).then(function (r) {
		console.log(r);
		Swal.fire({
			icon: 'info',
			title: 'Muy bien!',
			text: 'Post guardado corectamente',
		  })
          
    });	
      
      $scope.master = angular.copy(post);
    };

   
});

app.controller('albumsController', function($scope,$http) {	
	$http.get('https://jsonplaceholder.typicode.com/albums').then(function (r) {		
		
		var resultado=[];
		r.data.forEach( function(valor, indice, array) {
			$http.get('https://jsonplaceholder.typicode.com/albums/'+valor.id+'/photos').then(function (response) {				
				//console.log(valor);
			
				var temp=addToObject(r.data[indice], 'photo', response.data[0].thumbnailUrl);
				resultado.push(temp);				
				//console.log(response.data[0].thumbnailUrl);
			});
			
			
		});
		$scope.albums = resultado
});




	



	//Funcion para agregar un elemento a un objeto
	var addToObject = function (obj, key, value, index) {

		var temp = {};
		var i = 0;
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (i === index && key && value) {
					temp[key] = value;
				}
				temp[prop] = obj[prop];
				i++;	
			}
		}
		if (!index && key && value) {
			temp[key] = value;
		}	
		return temp;	
	};
	

});