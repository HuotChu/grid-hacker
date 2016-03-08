square.Grid = function (cols, rows, map) {
    var grid = [],
        group = square.g.game.add.group(),
        i = 0,
        j = 0,
        row, tile;

    for (i; i < rows; ++i) {
        row = [];

        for (j = 0; j < cols; ++j) {
            tile = new square.Tile(j, i, map[i][j], group);
            row.push(tile);
        }

        grid.push(row);
    }

    grid.__proto__.moveTo = function (x, y) {
        group.x = x;
        group.y = y;
    };
    
    return grid;
};
