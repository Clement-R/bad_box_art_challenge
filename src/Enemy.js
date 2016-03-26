Enemy = function (game, key, x, y, weapon) {
    Phaser.Sprite.call(this, game, x, y, key);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.speed = 100;
    this.currentWeapon = weapon;

    game.add.existing(this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.startMovement = function() {
    tween = this.game.add.tween(this);
    // to(properties, duration,
    //    ease, autoStart, delay, repeat, yoyo)

    tween.to({y: this.game.world.height - this.height}, 1500,
             Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

    this.body.velocity.x = -this.speed;
};

Enemy.prototype.update = function() {
    this.fire();
};

Enemy.prototype.fire = function() {
    var x = this.x + 3;
    var y = this.y + 26;
    this.currentWeapon.fire(x, y);
};

Enemy.prototype.kill = function() {
    // Kill animation
};
