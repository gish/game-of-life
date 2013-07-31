QUnit.start();

/** Grid **/
module("Grid");
/* Height */
test("Size 0x0", function()
{
	var game = new Game(0, 0);
	equal(game.board.length, 0);
});
/* Height 1 */
test("Size 1x1", function()
{
	var width = 1;
	var height = 1;
	var game = new Game(width, height);
	equal(game.board.length / width, height);
	equal(game.board.length / height, width)
});
/* Height 28 */
test("Size 5x28", function()
{
	var width = 5;
	var height = 28;
	equal(new Game(width, height).board.length / width, height);
});
/* All dead from start */
test("4x4 all dead", function()
{
	var board = new Game(2, 2).board;
	equal(board.join(""), [0, 0, 0, 0].join(""));
});
/* Init 4x4 w 1 alive */
test("2x2 1 alive", function()
{
	var game = new Game(2, 2, 1);
	equal(game.alive, 1);
});
/* 4x4 2 alive */
test("4x4 2 alive", function()
{
	equal(new Game(4, 4, 2).alive, 2);
});

/* Board 4x4 has rep of 2 alive */
test("4x4 2 alive on board", function()
{
	var width = 4;
	var height = 4;
	var occurrence = 0;
	var game = new Game(width, height, 2);

	for(var i = 0; i < width*height; i++)
	{
		occurrence += game.board[i];
	}
	ok(occurrence, 2);

});
/* Random placement of alive */
test("4x4 2 alive random placed on board", function()
{
	var gameA = new Game(4, 4, 2);
	var gameB = new Game(4, 4, 2);

	notEqual(gameA.board.join(""), gameB.board.join(""));
});

module("Neighbors");
/** Neighbours **/
/* Num neighbors for cornered */
test("3 neighbors for cornered", function()
{
	var width = 4;
	var height = 3;
	var game = new Game(width, height);

	equal(game.getNumNeighbors(0, 0), 3, "Top left");
	equal(game.getNumNeighbors(width - 1, 0), 3, "Top right");
	equal(game.getNumNeighbors(0, height - 1), 3, "Bottom left");
	equal(game.getNumNeighbors(width - 1, height - 1), 3, "Bottom right");

});
/* Num neighbors for cell at side, not cornered */
test("5 neighbors for cell at side, not cornered", function()
{
	var width = 3;
	var height = 3;
	var game = new Game(width, height);

	equal(game.getNumNeighbors(1, 0), 5, "Top");
	equal(game.getNumNeighbors(width - 1, 1), 5, "Right");
	equal(game.getNumNeighbors(1, height-1), 5, "Bottom");
	equal(game.getNumNeighbors(0, 1), 5, "Left");
});

test("8 neighbors for cell in center", function()
{
	var game = new Game(3, 3);
	equal(game.getNumNeighbors(1, 1), 8);
});

test("Get cell at pos", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 0, 1,
				  0, 1, 0];

	equal(game.getCell(0, 0), 0, "(0,0)");
	equal(game.getCell(2, 0), 1, "(2,0)");
	equal(game.getCell(0, 1), 1, "(0,1)");
});

test("Get list of neighbors", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 0, 1,
				  0, 1, 0];

	deepEqual(game.getNeighbors(1, 1), [0,0,1,1,1,0,1,0], "(1,1)");
	deepEqual(game.getNeighbors(2, 2), [0, 1, 1], "(2,2)");
	deepEqual(game.getNeighbors(0, 0), [0, 1, 0], "(0,0)");
	deepEqual(game.getNeighbors(0, 1), [0, 0, 0, 0, 1], "(0,1)");
	deepEqual(game.getNeighbors(1, 0), [0, 1, 1, 0, 1], "(1,0)");
});

test("Get number alive", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 0, 1,
				  0, 1, 0];

	equal(game.getNumberAlive(0, 0), 1, "(0,0)");
	equal(game.getNumberAlive(1, 1), 4, "(1,1)");
});

/* Num dead */
test("Get number dead", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 0, 1,
				  0, 1, 0];

	equal(game.getNumberDead(1, 0), 2, "(1,0)");
	equal(game.getNumberDead(2, 1), 3, "(2,1)");
});

test("Check if alive", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 0, 1,
				  0, 1, 0];
	ok(game.isAlive(0, 1), "(0,1)");
	ok(!game.isAlive(0, 0), "(0,0)");
});

test("Check if dead", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 0, 1,
				  0, 1, 0];
	ok(game.isDead(1, 1), "(1,1)");
	ok(!game.isDead(1, 2), "(1,2)");
});

/** Next iteration **/
module("Next iteration");
/* Alive -> Dead  for < 2  alive nb */
test("Alive -> Dead for < 2 alive nb", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 0, 1,
				  0, 1, 0];

	equal(game.getNextIteration(0, 1), 0, "(0,1)");
});
/* Alive -> Alive for 2, 3 alive nb */
test("Alive -> Alive for 2, 3 alive nb", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 0, 1,
				  1, 1, 1,
				  0, 1, 0];

	equal(game.getNextIteration(2, 0), 1, "(2,0)");
});
/* Alive -> Dead  for > 3  alive nb */
test("Alive -> Dead for > 3 alive nb", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 1, 1,
				  1, 1, 1,
				  0, 1, 0];

	equal(game.getNextIteration(1, 1), 0, "(1,1)");
	equal(game.getNextIteration(2, 1), 0, "(2,1)");
});
/* Dead  -> Alive for = 3  alive nb */
test("Dead -> Alive for = 3 alive nb", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 1, 1,
				  1, 1, 1,
				  0, 1, 0];

	equal(game.getNextIteration(2, 2), 1, "(2,2)");
	equal(game.getNextIteration(0, 0), 1, "(0,0)");
});

/* Dead  -> Dead  for < 3  alive nb */
test("Dead -> Dead for < 3 alive nb", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 1, 1,
				  0, 1, 0,
				  0, 1, 0];

	equal(game.getNextIteration(2, 2), 0, "(2, 2)");
	equal(game.getNextIteration(0, 0), 0, "(0, 0)");
});
/* Dead  -> Dead  for > 3  alive nb */
test("Dead -> Dead for < 3 alive nb", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	game.board = [0, 1, 1,
				  0, 1, 0,
				  0, 1, 0];

	equal(game.getNextIteration(2, 1), 0, "(2, 1)");
});

/** Iteration **/
/* Take one step for block */
test("One step in iteration", function()
{
	var width  = 4;
	var height = 4;
	var game = new Game(width, height);
	var nextBoard;

	game.board = [0, 0, 0, 0,
				  0, 1, 1, 0,
				  0, 1, 1, 0,
				  0, 0, 0, 0];
	nextBoard  = [0, 0, 0, 0,
				  0, 1, 1, 0,
				  0, 1, 1, 0,
				  0, 0, 0, 0];
	game.step();
	deepEqual(game.board, nextBoard);
});
/* Take one step for oscillator */
test("One step in iteration for oscillator", function()
{
	var width  = 3;
	var height = 3;
	var game = new Game(width, height);
	var nextBoard;

	game.board = [0, 1, 0,
				  0, 1, 0,
				  0, 1, 0,];
	nextBoard  = [0, 0, 0,
				  1, 1, 1,
				  0, 0, 0,];
	game.step();
	deepEqual(game.board, nextBoard);
});
