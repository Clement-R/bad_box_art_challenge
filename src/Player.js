Player = function (game, key) {
    Phaser.Sprite.call(this, game, 100, 100, key);

    this.weapons = [];
    this.currentWeapon = null;
    this.health = 20;

    // Add key to change weapon
    var changeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    changeKey.onDown.add(this.changeWeapon, this, 1);

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
    	var x = this.x + 57;
    	var y = this.y + 41;
        this.currentWeapon.fire(x, y);
    }
};

Player.prototype.setPhysic = function(first_argument) {
	this.body.collideWorldBounds = true;
};

Player.prototype.addWeapon = function(weapon) {
	// Add weapon to player's weapons list
	this.weapons.push(weapon);

	// If the player doesn't already have a weapon, we set this one by default
	if(this.currentWeapon == null) {
		this.currentWeapon = this.weapons[0];
	}
};

Player.prototype.changeWeapon = function(direction) {
	console.log('Change weapon');
	var currentWeaponIndex = this.weapons.indexOf(this.currentWeapon);

	// if direction is 1 we take next weapon
	if(direction == 1) {
		if((currentWeaponIndex + 1) < this.weapons.length) {
			this.currentWeapon = this.weapons[currentWeaponIndex + 1];
		} else {
			this.currentWeapon = this.weapons[0];
		}
	}

	// if direction is -1 we take previous weapon
	if(direction == -1) {
		if((currentWeaponIndex - 1) >= 0) {
			this.currentWeapon = this.weapons[currentWeaponIndex - 1];
		} else {
			this.currentWeapon = this.weapons[this.weapons.length - 1];
		}
	}
};