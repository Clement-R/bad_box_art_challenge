var Weapon = {};

Weapon.SingleBullet = function (game) {
	// new Group(game, parent, name, addToStage, enableBody, physicsBodyType)
    Phaser.Group.call(this, game, game.world, 'Single Bullet',
    				  false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++) {
        this.add(new Bullet(game, 'playerShot'), true);
    }

    return this;
};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;


Weapon.SingleBullet.prototype.fire = function (x, y) {
    if (this.game.time.time < this.nextFire) { return; }

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.game.playerShootSound.play();
    this.nextFire = this.game.time.time + this.fireRate;
};
