QUnit.start();

/** Grid **/
module("Grid");
/* Height */
test("Height", function()
{
	var game = new Game(0, 0);
	test(game.board.length === 0);
});
/* Width 0 */
