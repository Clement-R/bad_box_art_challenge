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
    this.enemyWeapons = [];
;};

BasicGame.Game.prototype = {
    create: function () {
        // Set background color and rendering method
        this.stage.backgroundColor = "#3498db"
        this.game.renderer.renderSession.roundPixels = true;

        // Set sounds
        this.playerShootSound = this.game.add.audio('playerShootSound');
        this.playerShootSound.volume = 0.2;

        // Start physic system
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  Create cursor keys to move and spacebar to shoot
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        // Create player and add physic body and collision with world bounds
        this.player = new Player(this, 'player');
        this.physics.arcade.enable(this.player);
        this.player.setPhysic();

        // Create player's weapons
        // [0] : Single Bullet
        this.weapons.push(new Weapon.SingleBullet(this));

        // Create enemies weapons
        // [0] : Single Bullet
        this.enemyWeapons.push(new Weapon.EnemySingleBullet(this));

        // Assign the basic weapon to the player
        this.player.addWeapon(this.weapons[0]);

        // Create enemies
        /*
        this.enemyPool = this.add.group();
        this.enemyPool.enableBody = true;
        this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyPool.createMultiple(1, 'smallEnemy');
        this.enemyPool.setAll('anchor.x', 0.5);
        this.enemyPool.setAll('anchor.y', 0.5);
        this.enemyPool.setAll('checkWorldBounds', true);
        this.enemyPool.setAll('outOfBoundsKill', true);
        this.nextEnemyAt = 0;
        this.enemyDelay = 1000;

        this.enemy = this.enemyPool.getFirstExists(false);
        this.enemy.reset(800, 20);
        this.enemy.body.velocity.x = -75;

        tween = this.add.tween(this.enemy);
        // to(properties, duration, ease, autoStart, delay, repeat, yoyo)
        tween.to({y: 360}, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        */
        this.enemy = new Enemy(this, 'smallEnemy', 800, 0, this.enemyWeapons[0]);
        this.physics.arcade.enable(this.enemy);
        this.enemy.startMovement();
    },

    update: function () {
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Go back to the main menu
        this.state.start('MainMenu');
    }

};
