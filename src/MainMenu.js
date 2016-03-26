
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

	},

	update: function () {

		//	Do some nice funky main menu effect here
		this.state.start('Game');
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
