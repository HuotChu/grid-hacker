square.CONSTANTS = {};

square.g = {
    defaults: {
        screenWidth: verge.viewportW(),
        screenHeight: verge.viewportH(),
        tileWidth: 32,
        tileHeight: 32,
        gridWidth: 10,
        gridHeight: 10
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
            frames: 130
        }
    },
    
    preload: function () {
        var props = this.defaults,
            sprites = this.sprites;

        this.game.load.spritesheet(sprites.tiles.id, sprites.tiles.resource, props.tileWidth, props.tileHeight, sprites.tiles.frames);
    }
    
};

square.g.game = (function () {
    var g = square.g,
        props = g.defaults,
        game;

    g.gameState.prototype = {
        init: function () {
            this.boardTop = (props.screenHeight - (props.tileHeight * props.gridHeight)) * 0.5;
            this.boardLeft = (props.screenWidth - (props.tileWidth * props.gridWidth)) * 0.5;
        },

        initGrid: function () {
            this.grid = new square.Grid(props.gridWidth, props.gridHeight);
            this.grid.moveTo(this.boardLeft, this.boardTop);
        },

        preload: function () {
            var sprites = g.sprites;

            this.load.spritesheet(sprites.tiles.id, sprites.tiles.resource, props.tileWidth, props.tileHeight, sprites.tiles.frames);
        },

        create: function () {
            this.initGrid();
        },

        update: function () {

        }
    };

    game = new Phaser.Game(props.screenWidth, props.screenHeight, Phaser.CANVAS, 'gridGame');
    game.state.add(g.gameStates.game, g.gameState);

    return game;
}());

//game.state.add(states.game, gameState);
square.g.game.state.start(square.g.gameStates.game);
