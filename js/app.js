var $ = Dom7;
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
	theme = document.location.search.split('theme=')[1].split('&')[0];
}
var app = new Framework7({
	id : 'io.framework7.testapp',
	root : '#app',
	theme : theme,
	data : function() {
		return {
			user : {
				firstName : 'John',
				lastName : 'Doe',
			},
		};
	},
	methods : {
		helloWorld : function() {
			app.dialog.alert('Hello World!');
		},
	},
	routes : routes,
	popup : {
		closeOnEscape : true,
	},
	sheet : {
		closeOnEscape : true,
	},
	popover : {
		closeOnEscape : true,
	},
	actions : {
		closeOnEscape : true,
	},
	vi : {
		placementId : 'pltd4o7ibb9rc653x14',
	},
});
var libraryView = app.views.create(".view-main", {
	domCache: true,
	stackPages: true
	});