Player = function (game, key) {
    Phaser.Sprite.call(this, game, 100, 100, key);
    game.add.existing(this);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    // Set velocity to 0
    this.body.velocity.set(0);

    // Check for input to move
    if (this.game.cursors.left.isDown) {
        this.body.velocity.x = -this.game.speed;
    }
    else if (this.game.cursors.right.isDown) {
        this.body.velocity.x = this.game.speed;
    }

    if (this.game.cursors.up.isDown) {
        this.body.velocity.y = -this.game.speed;
    }
    else if (this.game.cursors.down.isDown) {
        this.body.velocity.y = this.game.speed;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        // this.weapons[this.currentWeapon].fire(this.player);
    }
};