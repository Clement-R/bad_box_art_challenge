var EnemyManager = function (game, enemyType) {
	// new Group(game, parent, name, addToStage, enableBody, physicsBodyType)
    Phaser.Group.call(this, game, game.world, enemyType,
    				  false, true, Phaser.Physics.ARCADE);
};

EnemyManager.prototype = Object.create(Phaser.Group.prototype);
EnemyManager.prototype.constructor = EnemyManager;