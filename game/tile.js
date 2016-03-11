square.Tile = function (col, row, type, group) {
    var g = square.g,
        tiles = g.sprites.tiles,
        CONSTANTS = square.CONSTANTS,
        currentFrame = CONSTANTS.tileStates[type],
        x = col * tiles.tileWidth,
        y = row * tiles.tileHeight,
        sprite = this.sprite = g.game.add.sprite(x, y, tiles.id, currentFrame, group);

    this.tileState = type;
    
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
            var player_weak = 'PLAYER_WEAK',
                dfault = 'DEFAULT',
                tileState = this.tileState;
            
            switch (tileState.toLowerCase()) {
                case 'player_weak':
                    this.tileState = dfault;
                    this.sprite.animations.frame = CONSTANTS.tileStates[dfault];
                    this.tileProperties = CONSTANTS.tileProperties[dfault];
                    break;
                case 'default':
                    this.tileState = player_weak;
                    this.sprite.animations.frame = CONSTANTS.tileStates[player_weak];
                    this.tileProperties = CONSTANTS.tileProperties[player_weak];
            }

        }, this);
    }
    this.tileProperties = CONSTANTS.tileProperties[type];
    this.column = col;
    this.row = row;
    this.x = x;
    this.y = y;
    
    return this;
};
