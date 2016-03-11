square.Grid = function (cols, rows, map) {
    var grid = [],
        group = square.g.game.add.group(),
        i = 0,
        j = 0,
        row, tile;
    
    this.grid = grid;
    this.group = group;

    for (i; i < rows; ++i) {
        row = [];

        for (j = 0; j < cols; ++j) {
            tile = new square.Tile(j, i, map ? map[i][j] : 'DEFAULT', group);
            row.push(tile);
        }

        grid.push(row);
    }
    
    return this;
};

square.Grid.prototype = {
    moveTo: function (x, y) {
        this.group.x = x;
        this.group.y = y;
    }
};
