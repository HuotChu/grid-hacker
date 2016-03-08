square.CONSTANTS.tileStates = {
    DEFAULT: 41,
    DEAD: 22,
    PLAYER_WEAK: 42,
    PLAYER_MEDIUM: 46,
    PLAYER_STRONG: 45,
    AV_WEAK: 56,
    AV_MEDIUM: 60,
    AV_STRONG: 59
};

square.CONSTANTS.tileProperties = {
    DEFAULT: {
        LIVE: [],
        SPAWN: [],
        POWER: 0,
        TOUGH: 0
    },
    DEAD: {
        LIVE: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        SPAWN: [],
        POWER: 0,
        TOUGH: 0
    },
    WEAK: {
        LIVE: [2, 3],
        SPAWN: [3],
        POWER: 1,
        TOUGH: 1
    },
    MEDIUM: {
        LIVE: [2, 3, 4],
        SPAWN: [4],
        POWER: 2,
        TOUGH: 2
    },
    STRONG: {
        LIVE: [1, 2, 3, 4, 5],
        SPAWN: [5],
        POWER: 3,
        TOUGH: 3
    },
    PLAYER_WEAK: this.WEAK,
    PLAYER_MEDIUM: this.MEDIUM,
    PLAYER_STRONG: this.STRONG,
    AV_WEAK: this.WEAK,
    AV_MEDIUM: this.MEDIUM,
    AV_STRONG: this.STRONG
};

square.Tile = function (col, row, type, group) {
    var g = square.g,
        tiles = g.sprites.tiles,
        CONSTANTS = square.CONSTANTS,
        currentFrame = this.currentFrame = CONSTANTS.tileStates[type],
        x = col * tiles.tileWidth,
        y = row * tiles.tileHeight,
        sprite = this.sprite = g.game.add.sprite(x, y, tiles.id, currentFrame, group);
    
    if (type == 'DEFAULT') {
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        sprite.events.onInputOut.add(function () {
            var tween = g.game.add.tween(sprite);
            
            tween.to({x: this.x, y: this.y}, 100, Phaser.Easing.Exponential.easeOut);
            tween.start();
        }, this);
        sprite.events.onInputOver.add(function () {
            var tween = g.game.add.tween(sprite);
            
            tween.to({x: this.x-3, y: this.y-3}, 100, Phaser.Easing.Exponential.easeOut);
            tween.start();
        }, this);
        sprite.events.onInputDown.add(function () {
            
        }, this);
    }
    this.currentProps = CONSTANTS.tileProperties[type];
    this.column = col;
    this.row = row;
    this.x = x;
    this.y = y;
    
    return this;
};
