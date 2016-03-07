gridHacker.Game = function (game) {};

gridHacker.Game.prototype = {
    marker: {},
    
    layer: {},
    
    timer: 0,
    
    create: function() {
        var grid = gridHacker.Grid;
        
        this.grid = grid;
        grid.bindGrid(this);
        grid.makeGrid(25, 50, 'level-1');
        this.model.grid = grid;
        this.model.setDataStructure(25, 50);
        this.stage.backgroundColor = '#555555';
        this.layer = this.currentLayer;
        this.layer.resizeWorld();
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0xFFFFFF, 1);
        this.marker.drawRect(0, 0, 32, 32);
        this.input.onDown.add(this.tileClick, this);
    },
    
    tileClick: function () {
        var marker = this.marker,
            layer = this.layer,
            model = this.model,
            state, tileObject, tile, c, r;
        
        c = layer.getTileX(marker.x);
        r = layer.getTileY(marker.y);
        tileObject = model.data[r][c];
        tile = tileObject.tile;
        state = tileObject.state === 0 ? 1 : 0;
        model.gridUpdate(tile, {state: state, changed: true});
        model.refresh();
    },
    
    update: function() {
        var marker = this.marker,
            input = this.input,
            layer = this.layer,
            model = this.model;
        
        marker.x = layer.getTileX(input.activePointer.worldX) * 32;
        marker.y = layer.getTileY(input.activePointer.worldY) * 32;
        ++this.timer;
        
        if (!input.mousePointer.isDown) {
            if (this.timer % 10 === 0) {
                // process rules every 0.5 second
                this.clickActive = false;
                
                if (model.state === 1) {
                    model.evolve();
                }
            }
            
            if (this.timer > 3600) {
                this.timer = 0;
            }
        }
    },
    
    clickActive: false,
    
    grid: undefined,
    
    model: {
        //selected: undefined,
        stage: 1,
        state: 0,  // 0 = new, 1 = playing, 2 = won, 3 = lost
        data: [],
        nextTick: [],
        dirty: false,
        rowCount: 0,
        colCount: 0,
        setDataStructure: function (rows, columns) {
            var i = 0,
                j = 0,
                tile,
                grid = this.grid;

            this.data = [];
            this.nextTick = [];
            this.rowCount = rows;
            this.colCount = columns;
            
            for (i; i < rows; ++i) {
                this.data.push([]);
                this.nextTick.push([]);
                for (j = 0; j < columns; ++j) {
                    tile = this.grid.tile(i, j, grid.playerGroup);
                    tile.renderable = false;
                    this.data[i].push({
                        tile: tile,
                        state: 0
                    });
                    this.nextTick[i].push({
                        tile: tile,
                        state: 0
                    });
                }
            }
        },
        gridUpdate: function (tile, status) {
            var r = tile.gridKey.row,
                c = tile.gridKey.column;
            
            this.nextTick[r][c].state = status.state;
            this.dirty = true;
        },
        refresh: function () {
            var newData = this.nextTick,
                data = this.data,
                i = 0,
                j = 0,
                len = newData.length,
                jLen = this.colCount,
                nDrow, oDrow, source;
            
            for (i; i < len; ++i) {
                nDrow = newData[i];
                oDrow = data[i];
                for (j = 0; j < jLen; ++j) {
                    source = nDrow[j];
                    source.tile.renderable = !!source.state;
                    oDrow[j].state = source.state;
                }
            }
            
            this.dirty = false;
        },
        evolve: function () {
            var data = this.data,
                i = 0,
                j = 0,
                len = data.length,
                jLen = this.colCount,
                row, tileObj, tile, status;
            
            for (i; i < len; ++i) {
                row = data[i];
                for (j = 0; j < jLen; ++j) {
                    tileObj = row[j];
                    tile = tileObj.tile;
                    status = this.neighborTest(tile);
                    if (status.changed) {
                        this.gridUpdate(tile, status);
                    }
                }
            }
            
            if (this.dirty) {
                this.refresh();
            }
        },
        neighborTest: function (tile) {
            var r = tile.gridKey.row,
                c = tile.gridKey.column,
                state = this.data[r][c].state,
                livingNeighbors = this.getLiveNeighborCount(r, c),
                status = {
                    changed: false
                };
            
            if (state === 1) {
                // tile is alive
                if (livingNeighbors < 2 || livingNeighbors > 3) {
                    // tile dies
                    state = 0;
                    status.changed = true;
                }
            } else {
                // tile is dead
                if (livingNeighbors === 3) {
                    // bring to life
                    state = 1;
                    status.changed = true;
                }
            }
            
            status.state = state;
            
            return status;
        },
        getLiveNeighborCount: function (row, col) {
            var data = this.data,
                rowCount = this.rowCount - 1,
                colCount = this.colCount - 1,
                northR = row - 1 >= 0 ? row - 1 : rowCount,
                southR = row + 1 <= rowCount ? row + 1 : 0,
                eastC = col + 1 <= colCount ? col + 1 : 0,
                westC = col - 1 >= 0 ? col - 1 : colCount;
            
            return data[northR][westC].state + data[northR][col].state + data[northR][eastC].state +
                    data[row][eastC].state + data[southR][eastC].state + data[southR][col].state +
                    data[southR][westC].state + data[row][westC].state;
        }
    }
};
