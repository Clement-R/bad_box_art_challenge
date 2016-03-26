Enemy = function (game, key) {
    Phaser.Sprite.call(this, game, 100, 100, key);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    this.currentWeapon = null;

    game.add.existing(this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    // Set velocity to 0
    // this.body.velocity.set(0);
};

Enemy.prototype.setPhysic = function(first_argument) {
	this.body.collideWorldBounds = true;
};

Enemy.prototype.move = function() {
    // this.body.velocity.x = -this.game.speed;
};

Enemy.prototype.fire = function() {
    var x = this.x + 57;
    var y = this.y + 41;
    this.currentWeapon.fire(x, y);
};

Enemy.prototype.kill = function() {
    // Kill animation
};
