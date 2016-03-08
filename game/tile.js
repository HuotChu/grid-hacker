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
        props = g.defaults,
        CONSTANTS = square.CONSTANTS,
        currentFrame = this.currentFrame = CONSTANTS.tileStates[type],
        currentProps = this.currentProps = CONSTANTS.tileProperties[type],
        x = col * props.tileWidth,
        y = row * props.tileHeight;

    this.sprite = g.game.add.sprite(x, y, square.g.sprites.tiles.id, currentFrame, group);
    this.column = col;
    this.row = row;
    this.x = x;
    this.y = y;
    
    return this;
};
