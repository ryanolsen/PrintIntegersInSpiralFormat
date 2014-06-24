$(function(){

	// Setup events
	function attachEvents() {
		$('#ex-3-btn').click(function(e){
			runEx3($('#ex-3-input').val());
		});

		$('#ex-3-input').keypress(function(e) {
			if(e.which == 13) {
				runEx3($(e.currentTarget).val());
			}
		})
	}

	function runEx3(val) {

		var reg = /^\d+$/;
		
		if(val && reg.test(val) &&  val > 0) {
			exercise3(val);
		} else {
			alert("Please enter an integers > 0.")
		}
	}

	function exercise3(inputCount) {
		// Assume 0 starts in the center of a grid that has even edges.
		// numSteps increaments every other direction changes. 1 step == 2 direction changes
		// Max numSteps == gridSize
		var arr = [];
		var inputCount = inputCount || 8;
		var gridSize = getGridSize(inputCount);
		var x, y;
		var directions = [
			{x: 1, y: 0},
			{x: 0, y: 1}, 
			{x: -1, y: 0},
			{x: 0, y: -1}	
		];
		
		var dir = directions[0]; // initial direction. To the right
		var dirCount = 0; // track the number of times the direction changes
		var dirArryLen = directions.length; // used for mod arithmetic

		// setup multi dimensional array for our grid
		for(var i =0; i < gridSize; i++) {
			arr[i] = [];
		}
		
		// x,y starting point for '0'
		x = Math.floor(gridSize / 2);
		y = Math.floor(gridSize / 2);


		var currentIndex = 0;
		// The number of steps needed to wrap around the edge of the grid
		// increments every 2 direction changes. So, start the steps at 1,
		// populate a row, change directions, populate the next row, change directions again,
		// then increment the number of steps and repeat until complete 
		for(var numSteps = 1; numSteps <= gridSize; numSteps++) {
			fillAndChangeDir(numSteps);
			fillAndChangeDir(numSteps);
		}

		function fillAndChangeDir(numSteps) {

			// stop at inputCount otherwise we will completely fill the grid 
			for(var j=0; j < numSteps && currentIndex <= inputCount; j++) {
				arr[y][x] = currentIndex++;
				x += dir.x;
				y += dir.y;
			}

			dir = directions[++dirCount % dirArryLen]; // change direction
		}

		renderTable(arr);
		
	}

	function renderTable(arr) {
		var ex3Container = $('.ex-output-3 table tbody');
		ex3Container.empty();

		for(var i=0; i < arr.length; i++) {
			var tr = $('<tr>');
			ex3Container.append(tr);
			for(var j=0; j < arr[i].length; j++) {
				tr.append($('<td>').append(arr[i][j]));
			}
		}
	}

	function getGridSize(count) {
		var c = Math.ceil(Math.sqrt(count + 1)); // add 1 to account for perfect sqrt (9, 49)
		
		if(c % 2 == 0) return c +1; // Centering the '0' integer requires an odd grid size
		else return c;
	}

	// Get things started
	attachEvents();
});