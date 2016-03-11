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
            tile.grid = grid;
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
    },
    
    cache: function (arr) {
        // deep copy of grid
        var a = [], i = 0, len = arr.length,
            row, tile, j, jLen;
        
        for (i; i < len; ++i) {
            a.push([]);
            row = arr[i];
            jLen = row.length;
            for (j = 0; j < jLen; ++j) {
                tile = row[j];
                a[i].push(Object.create(tile, {}));
            }
        }
        
        return a;
    },

    mapNeighborhood: function () {
        // let all the tiles know who their neighbors are
        var grid = this.grid,
            i = 0, len = grid.length,
            j, jLen, row, tile,
            n, e, s, w;
        
        for (i; i < len; ++i) {
            row = grid[i];
            jLen = row.length;
            n = i - 1;
            n = n >= 0 ? n : len - 1;
            s = i + 1;
            s = s < len ? s : 0;
            for (j = 0; j < jLen; ++j) {
                w = j - 1;
                w = w >= 0 ? w : jLen - 1;
                e = j + 1;
                e = e < jLen ? e : 0;
                tile = row[j];
                tile.neighbors = [
                    grid[n][w],  // 0 - NW
                    grid[n][j],  // 1 - N
                    grid[n][e],  // 2 - NE
                    grid[i][e],  // 3 - E
                    grid[s][e],  // 4 - SE
                    grid[s][j],  // 5 - S
                    grid[s][w],  // 6 - SW
                    grid[i][w]   // 7 - W
                ]
            }
        }
    },
    
    update: function () {
        // make all the tiles queue their next tick updates
        var grid = this.grid,
            i = 0, len = grid.length,
            j, jLen, gridRow, cacheRow, tile;
        
        for (i; i < len; ++i) {
            gridRow = grid[i];
            jLen = gridRow.length;
            for (j = 0; j < jLen; ++j) {
                tile = gridRow[j];
                // queue the update (if there is one)
                tile.prepareUpdate();
            }
        }
        
        // updates are queued to prevent cells from changing before they can be evaluated in their current state
        // apply the updates
        for (i = 0; i < len; ++i) {
            gridRow = grid[i];
            jLen = gridRow.length;
            for (j = 0; j < jLen; ++j) {
                tile = gridRow[j];
                // apply the update (if there is one)
                tile.update();
            }
        }
    }
};
