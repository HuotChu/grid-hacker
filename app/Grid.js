gridHacker.Grid = function (game) {};

gridHacker.Grid.prototype = {
    playerGroup: undefined,
    
    makeGrid: function (rows, columns, level) {
        var map;

        //  Creates a blank tilemap
        map = this.add.tilemap();
        this.currentLayer = map.create(level, columns, rows, 32, 32);
        
        return map;
    },
    
    tile: function (row, column, group) {
        var sprite = this.add.sprite(column * 32, row * 32, 'tiles', 28, group);
        
        sprite.gridKey = {
            row: row,
            column: column
        };

        return sprite;
    },
    
    bindGrid: function (game) {
        this.playerGroup = game.add.group();
        this.makeGrid = this.makeGrid.bind(game);
        this.tile = this.tile.bind(game);
    },

    create: function () {
        gridHacker.Grid = gridHacker.Grid.prototype;
        this.state.start('Game');
    }
};
