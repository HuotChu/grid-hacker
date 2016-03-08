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
        game;

    g.gameState.prototype = {
        init: function () {
            this.boardTop = Math.round( (screenH - (tileH * rows)) * 0.5 );
            this.boardLeft = Math.round( (screenW - (tileW * columns)) * 0.5 );
        },

        initGrid: function () {
            this.grid = new square.Grid(columns, rows);
            this.grid.moveTo(this.boardLeft, this.boardTop);
        },

        preload: function () {
            this.load.spritesheet(tiles.id, tiles.resource, tileW, tileH, tiles.frames);
        },

        create: function () {
            this.initGrid();
        },

        update: function () {

        }
    };

    game = new Phaser.Game(screenW, screenH, Phaser.CANVAS, 'gridGame');
    game.state.add(g.gameStates.game, g.gameState);

    return game;
}());

square.g.game.state.start(square.g.gameStates.game);
