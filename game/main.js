square.CONSTANTS = {};

square.g = {
    config: {
        screenWidth: verge.viewportW(),
        screenHeight: verge.viewportH(),
        columns: 10,
        rows: 10
    },

    gameStates: {
        game: 'main'
    },

    gameState: function (game) {
        this['boardTop'] = 0;
        this['boardLeft'] = 0;
        this['board'] = undefined;
    },
    
    game: undefined,

    sprites:  {
        tiles: {
            resource: 'assets/images/grid-tiles.png',
            id: 'tiles',
            tileWidth: 32,
            tileHeight: 32,
            frames: 140
        }
    },
    
    preload: function () {
        var tiles = this.sprites.tiles;

        this.game.load.spritesheet(tiles.id, tiles.resource, tiles.tileWidth, tiles.tileHeight, tiles.frames);
    }
    
};

square.g.game = (function () {
    var g = square.g,
        config = g.config,
        rows = config.rows,
        columns = config.columns,
        screenH = config.screenHeight,
        screenW = config.screenWidth,
        tiles = g.sprites.tiles,
        tileH = tiles.tileHeight,
        tileW = tiles.tileWidth,
        game = new Phaser.Game(screenW, screenH, Phaser.CANVAS, 'gridGame');

    g.gameState.prototype = {
        initGrid: function (level) {
            square.request('./game/levels/' + level + '.json').then(function (xhr) {
                var data = JSON.parse(xhr.responseText),
                    colCount = data.columns,
                    rowCount = data.rows;

                this.grid = new square.Grid(colCount, rowCount, data.map);
                this.boardTop = Math.round( (screenH - (tileH * rowCount)) * 0.5 );
                this.boardLeft = Math.round( (screenW - (tileW * colCount)) * 0.5 );
                this.grid.moveTo(this.boardLeft, this.boardTop);
            }.bind(this));
        },

        preload: function () {
            this.load.spritesheet(tiles.id, tiles.resource, tileW, tileH, tiles.frames);
        },

        create: function () {
            this.initGrid('01');
        },

        update: function () {

        }
    };
    
    game.state.add(g.gameStates.game, g.gameState);

    return game;
}());

square.g.game.state.start(square.g.gameStates.game);
