
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
		// Sprites and animations
		this.load.image('player', '../character.png');
		this.load.image('smallEnemy', '../small_enemy_2.png');
		this.load.image('playerShot', '../player_shot.png');
		this.load.image('background', '../background.png');
		this.load.image('enemyShot', '../enemy_shot.png');
		this.load.image('healthBar', '../health.png');

		// Audio effects
		this.load.audio('playerShootSound', ['../Laser_Shoot49.mp3']);
		// this.load.audio('playerShootSound', ['../Cool sound.mp3']);
		this.load.audio('mainTheme', ['../Venus.mp3']);
	},

	create: function () {
		//	Once the load has finished we disable the crop because we're going
		// to sit in the update loop for a short while as the music decodes
		// this.preloadBar.cropEnabled = false;
	},

	update: function () {
		// Decode MP3 files
		if (this.cache.isSoundDecoded('playerShootSound') && this.cache.isSoundDecoded('mainTheme') && this.ready == false) {
			this.ready = true;
			this.state.start('MainMenu');
		}
	}

};
