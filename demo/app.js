(function(root, $)
{
	"use strict";

	var App = function()
	{
		this.width           = 0;
		this.height          = 0;
		this.populationCount = 0;
		this.game            = null;
		this.squareWidth     = 5;
		this.timer           = null;
		this.updateInterval  = 1E1;
		this.stats           = {
			iterations    : 0,
			renderTime : 0
		};

		this.$canvas               = $("#game-board");
		this.$inputPopulationCount = $("#population-count");
		this.$inputWidth           = $("#width");
		this.$inputHeight          = $("#height");
		this.$settingsForm         = $("form");
		this.$stopButton           = $("#stop-button");

		this.canvas = this.$canvas.get(0).getContext("2d");
		this.canvas.fillStyle = "rgb(0, 0, 0)";

		this.initListeners();

		this.start();
	};

	App.prototype = {
		initListeners : function()
		{
			var self = this;

			this.$settingsForm.on('submit', function(evt)
			{
				evt.preventDefault();
				clearInterval(self.timer);
				self.start();
			});

			this.$stopButton.on('click', function(evt)
			{
				evt.preventDefault();
				clearInterval(self.timer);
			});
		},
		start : function()
		{
			var self = this;

			this.width           = parseInt(this.$inputWidth.val(), 10);
			this.height          = parseInt(this.$inputHeight.val(), 10);
			this.populationCount = parseInt(this.$inputPopulationCount.val(), 10);
			this.game            = new Game(this.width, this.height, this.populationCount);

			this.$canvas
				.attr('width', this.width * this.squareWidth)
				.attr('height', this.height * this.squareWidth);

			this.timer = setInterval(function()
			{
				self.render();
			}, this.updateInterval);
		},
		render : function()
		{
			var start;
			start = (new Date()).getTime();

			this.canvas.clearRect(0, 0, this.width * this.squareWidth, this.height * this.squareWidth);
			this.game.step();

			for(var i = 0; i < this.width; i++)
			{
				for(var j = 0; j < this.height; j++)
				{
					var alive = this.game.isAlive(i, j);
					if (alive)
					{
						this.canvas.fillRect(i * this.squareWidth, j * this.squareWidth, this.squareWidth, this.squareWidth);
					}
				}
			}

			this.stats.renderTime += (new Date()).getTime() - start;
			this.stats.iterations++;
			this.renderStats();
		},
		renderStats : function()
		{
			$("#iterations").html(this.stats.iterations);
			$("#render-time").html(Math.floor(this.stats.renderTime / this.stats.iterations));
		}
	};

	$(document).ready(function()
	{
		var app = new App();
	});
}(this, jQuery));
