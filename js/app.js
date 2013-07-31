(function(root)
{
	"use strict";
	var Game = function(width, height, alive)
	{
		this.width = width;
		this.height = height;
		this.alive = alive;

		this.setupBoard();
	};

	Game.prototype = {
		setupBoard : function()
		{
			this.board = [];

			// Set all dead
			for(var i = 0; i < (this.height * this.width); i++)
			{
				this.board[i] = 0;
			}

			// Add alive
			for(var i = 0; i < this.alive; i++)
			{
				var pos = Math.floor(Math.random() * (this.width * this.height + 1));
				if (this.board[pos] === 1)
				{
					i--;
					continue;
				}
				this.board[pos] = 1;
			}
		},
		getNumNeighbors : function(x, y)
		{

			if (x === 0 && (y === 0 || y === (this.height - 1)) ||              // Left
				x === (this.width - 1) && (y === 0 || y === (this.height - 1))) // Right
			{
				return 3;
			}

			if ((y === 0 || y === (this.height - 1)) && (x !== 0 || x !== (this.width - 1)) || // Top
					(x === this.width - 1 || x === 0) && (y !== 0 || y !== (this.height - 1)))		// Bottom
			{
				return 5;
			}

			return 8;
		},
		getCell : function(x, y)
		{
			return this.board[x%this.width + this.height*y];
		},
		getNeighbors : function(x, y)
		{
			var neighbors = [];

			for (var i = -1; i < 2; i++)
			{
				for (var j = -1; j < 2; j++)
				{
					if ((i === 0 && j === 0) || (x + j >= this.width || y + i >= this.height) || (x + j < 0 || y + i < 0))
					{
						continue;
					}
					neighbors.push(this.getCell(x + j, y + i));
				}
			}
			return neighbors;
		},
		getNumberAlive : function(x, y)
		{
			return this.getNeighbors(x, y).filter(function(cell) { return cell === 1; }).length;
		},
		getNumberDead : function(x, y)
		{
			return this.getNeighbors(x, y).filter(function(cell) { return cell === 0; }).length;
		},
		isAlive : function(x, y)
		{
			return this.getCell(x, y) === 1;
		},
		isDead : function(x, y)
		{
			return this.getCell(x, y) === 0;
		},
		getNextIteration : function(x, y)
		{
			// Alive -> Dead  for < 2  alive nb
			if (this.isAlive(x, y) && this.getNumberAlive(x, y) < 2)
			{
				return 0;
			}
			//Alive -> Alive for 2, 3 alive nb
			if (this.isAlive(x, y) && (this.getNumberAlive(x, y) === 2 || this.getNumberAlive(x, y) === 3))
			{
				return 1;
			}
			// Alive -> Dead  for > 3  alive nb
			if (this.isAlive(x, y) && this.getNumberAlive(x, y) > 3)
			{
				return 0;
			}
			// Dead  -> Alive for = 3  alive nb
			if (this.isDead(x, y) && this.getNumberAlive(x, y) === 3)
			{
				return 1;
			}
			return this.getCell(x, y);
		},
		step : function()
		{
			var nextBoard;
			var self = this;
			nextBoard = [];

			this.board.forEach(function(cell, pos)
			{
				var x;
				var y;
				x = pos%self.width;
				y = (pos - x)/self.height;
				nextBoard.push(self.getNextIteration(x, y));
			});

			this.board = nextBoard;
		}
	};

	root.Game = root.Game || Game;
})(this);
