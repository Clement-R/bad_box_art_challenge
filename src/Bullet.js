 var Bullet = function (game, key, launcher) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

    this.launcher = launcher;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
	// Collision between this.game.player & this
	if(this.launcher == "player") {
		// overlap(object1, object2,
		//	       overlapCallback, processCallback, callbackContext)
		this.game.physics.arcade.overlap(this,
										 this.game.enemies,
										 function(bullet, enemy) {
										 	bullet.kill();
										 	enemy.damage(1);
										 },
										 null,
										 this);
	} else {
		this.game.physics.arcade.overlap(this,
										 this.game.player,
										 function(bullet, player) {
										 	bullet.kill();
										 	player.damage(1);
										 },
										 null,
										 this);
	}
};

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
    // Gravity for wave pattern
    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.angle = angle;
    this.body.gravity.set(gx, gy);
};