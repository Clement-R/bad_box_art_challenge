BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    this.speed = 300;
    this.weapons = [];
    this.player = null;
    this.enemies = null;
;};

BasicGame.Game.prototype = {
    create: function () {
        // Show background
        this.background = this.add.tileSprite(0, 0, 800, 400, 'background');

        // Launch main theme
        this.music = this.add.audio('mainTheme', 0.65, true);
        this.music.play();

        // Set background color and rendering method
        this.stage.backgroundColor = "#3498db"
        this.game.renderer.renderSession.roundPixels = true;

        // Set sounds
        this.playerShootSound = this.game.add.audio('playerShootSound');
        this.playerShootSound.volume = 0.5;

        // Start physic system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  Create cursor keys to move and spacebar to shoot
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        // Create player and add physic body and collision with world bounds
        this.player = new Player(this, 'player');
        this.physics.arcade.enable(this.player);
        this.player.setPhysic();

        // Create health bar UI
        this.healthBar = [];
        this.createHealthUI();

        // Create player's weapons
        // [0] : Single Bullet
        this.weapons.push(new Weapon.SingleBullet(this));

        // Assign the basic weapon to the player
        this.player.addWeapon(this.weapons[0]);

        // Create enemies
        this.enemies = this.add.group();
        this.time.events.repeat(Phaser.Timer.SECOND / 2, 5, this.spawnEnemy, this);
    },

    createHealthUI: function() {
        var remainingHealth = this.player.health;

        for (var i = 0; i < remainingHealth; i++) {
            this.healthBar[i] = this.add.sprite(10 + (10 * i), 10, "healthBar");
        }
    },

    updateHealthUI: function() {
        var remainingHealth = this.player.health;

        for (var i = 0; i < this.healthBar.length; i++) {
            this.healthBar[i].visible = false;
        }

        for (var i = 0; i < remainingHealth; i++) {
            this.healthBar[i].visible = true;
        }
    },

    spawnEnemy: function() {
        // Create an enemy and make it start to move
        var enemy = new Enemy(this, 'smallEnemy', 800, 0,
                              5,
                              new Weapon.EnemySingleBullet(this));
        this.physics.arcade.enable(enemy);
        enemy.startMovement();
        this.enemies.add(enemy)
    },

    update: function () {
        this.background.tilePosition.x -= 2;
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Go back to the main menu
        this.state.start('MainMenu');
    }

};
