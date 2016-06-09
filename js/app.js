/*********************************************************************************
 * My Treehouse Projects #12,
 *
 * FSJS #5, Build a Movie Search App with the OMDb API
 *
 *********************************************************************************/

 !function($, window, document) {
"use strict";

	/** Search ******************************************************************/
	
	
	var search = document.getElementById("search");
	var submit = document.getElementById("submit");
	var movies = document.getElementById("movies");

	// CREATE ARRAYS TO STORE NEEDED XHR RESPONSE DATA
	var title = [];
	var year = [];	
	var poster = [];

	// XHR HELPER FUNCTION - PARAM URL INCLUDING SEARCH VALUE
	function getData(yearl) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", yearl);
			xhr.onreadystatechange = handleResponse;
			xhr.onerror = function(err) {reject(err);};
			xhr.send();
			
			function handleResponse() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var dadata = JSON.parse(xhr.responseText);
						resolve(dadata);
					} else {
						reject(this.statusText);
					}
				}
			};
		});
	};
	
	// .THEN HELPER FUNCTION TO HANDLE RETURNED XHR DATA
	var printIt = function(dadata) {
		// IF NO RESPONSE, CREATE AND APPEND RELAVANT MESSGE
		if (dadata.Response === "False") {
				var liNode = document.createElement("li");
				liNode.setAttribute("class", "no-movies");
				
				var iNode = document.createElement("i");
				iNode.setAttribute("class", "material-icons icon-help");
				var textNodeI = document.createTextNode("help_outline");
				var textNodeII = document.createTextNode("No movies found that match: " + search.value);
				iNode.appendChild(textNodeI);
				liNode.appendChild(iNode);
				liNode.appendChild(textNodeII);
				movies.appendChild(liNode);

		} else {
			// IF RESPONSE, PRINT DATA TO WINDOW
			// LOOP THROUGH DATA
			for (var key1 in dadata.Search) {
				for (var key2 in dadata.Search[key1]) {
					
					// STORE TITLE(S) IN TITLE ARRAY
					if (key2 === "Title") {
						title.push(dadata.Search[key1][key2]);
						
					// STORE YEAR(S) IN YEAR ARRAY
					} else if (key2 === "Year") {
						year.push(dadata.Search[key1][key2]);
						
					// STORE POSTER(S) IN POSTER ARRAY
					} else if (key2 === "Poster") {
						poster.push(dadata.Search[key1][key2]);
					}
				}
			}
			
			// LOOP THROUGH TITLE ARRAY, THEN CREATE, ADD ATTRIBUTES, AND APPEND ALL NECESSARY NODES
			for (var i = 0; i < title.length; i++) {

				var liNode = document.createElement("li");
				
				var divNode = document.createElement("div");
				divNode.setAttribute("class", "poster-wrap");
				liNode.appendChild(divNode);
				
				// MOVIE POSTER
				if (poster[i] === "N/A" || poster[i] === "" || poster[i] === undefined) {
					var iNode = document.createElement("i");
					iNode.setAttribute("class", "material-icons poster-placeholder");
					var textNodeI = document.createTextNode("crop_original");
					iNode.appendChild(textNodeI);
					divNode.appendChild(iNode);
				} else {
					var imgNode = document.createElement("img");
					imgNode.setAttribute("class", "movie-poster");
					imgNode.setAttribute("src", poster[i]);
					divNode.appendChild(imgNode);
				}
				
				// MOVIE TITLE
				var spanNodeTitle = document.createElement("span");
				spanNodeTitle.setAttribute("class", "movie-title");
				var textNodeTitle = document.createTextNode(title[i]);
				spanNodeTitle.appendChild(textNodeTitle);
				liNode.appendChild(spanNodeTitle);
				
				// MOVIE YEAR
				var spanNodeYear = document.createElement("span");
				spanNodeYear.setAttribute("class", "movie-year");
				var textNodeYear = document.createTextNode(year[i]);
				spanNodeYear.appendChild(textNodeYear);
				liNode.appendChild(spanNodeYear);

				movies.appendChild(liNode);
			}
		}
		
		// RESET SEARCH FIELD 
		search.value = "";
	};
	
	// .CATCH FOR ERRORS
	var catchIt = function(err) {
		alert(err);
	};	
	
	
	// SUBMIT BUTTON - PARAMETER = EVENT
	submit.addEventListener("click", function (e) {
		e.preventDefault();
		
		// CAPTURE AND FORMAT TEXT IN SEARCH FIELD
		var serVal = search.value;
		var newCerchVal = serVal.toLowerCase();
		var formattedCerch = newCerchVal.split(" ").join("+");
		
		// MAKE AJAX CALL 
		var reqURL =  "http://www.omdbapi.com/?s=" + formattedCerch + "&y=&r=json";
		return getData(reqURL).then(printIt).catch(catchIt);
	});
	
	// SERACH FIELD - ON FOCUS
	search.addEventListener("focus", function () {
		
		// EMPTY ARRAYS
		title = [];
		year = [];	
		poster = [];
		
		// REMOVE PREVIOUS SEARCHES DOM ELEMENTS FORM #MOVIES
		while (movies.firstChild) {
			movies.removeChild(movies.firstChild);
		}
	});
 }(jQuery, window, document);
	