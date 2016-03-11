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
                //case 'player_medium':
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

square.Tile.prototype = {
    pendingUpdate: false,
    
    update: function () {
        var pending = this.pendingUpdate;
        
        if (pending) {
            this.tileState = pending.tileState;
            this.sprite.animations.frame = pending.frame;
            this.tileProperties = pending.tileProperties;
            this.pendingUpdate = false;
        } else {
            this.tileProperties.AGE += 1;
        }
    },
    
    prepareUpdate: function () {
        var tileState = this.tileState,
            populationState = this.populationTest(),
            battleState = this.battleTest(),
            CONSTANTS = square.CONSTANTS;
        
        if (tileState !== populationState && !this.pendingUpdate) {
            // queue the update
            this.pendingUpdate = {
                tileState: populationState,
                frame: CONSTANTS.tileStates[populationState],
                tileProperties: CONSTANTS.tileProperties[populationState]
            };
        }
        
        if (populationState !== 'DEFAULT' && battleState !== tileState) {
            this.pendingUpdate = {
                tileState: battleState,
                frame: CONSTANTS.tileStates[battleState],
                tileProperties: CONSTANTS.tileProperties[battleState]
            };
        }
    },
    
    populationTest: function () {
        var i = 0,
            neighbors = this.neighbors,
            spawnCheck = [],
            willSpawn = [],
            spawners = 0,
            returnState = this.tileState,
            CONSTANTS = square.CONSTANTS,
            highRank = 0,
            tileProps = this.tileProperties,
            currentTeam = tileProps.TEAM,
            neighbor, spawn, team, teamCount;

        if (currentTeam > 0) {
            // will this state survive?
            teamCount = this.getTeamCount(currentTeam);
            if (tileProps.LIVE.indexOf(teamCount) === -1) {
                // cell state dies, return to default
                returnState = 'DEFAULT';
            }
        } else {
            for (i; i < 8; ++i) {
                neighbor = neighbors[i];
                // can only spawn if this is a default tile
                if (returnState === 'DEFAULT') {
                    spawn = neighbor.tileProperties.SPAWN;
                    team = neighbor.tileProperties.TEAM;
                    if (spawnCheck.indexOf(team) === -1) {
                        teamCount = this.getTeamCount(team);
                        if (teamCount === spawn) {
                            willSpawn.push(neighbor.tileState);
                        }
                        spawnCheck.push(team);
                    }
                }
            }

            if (willSpawn.length) {
                spawners = willSpawn.length;
                if (spawners === 1) {
                    returnState = willSpawn[0];
                } else {
                    // multiple spawners competing
                    spawners = [];
                    willSpawn.forEach(function (type) {
                        var rank = CONSTANTS.tileProperties[type];

                        if (spawners.indexOf(type) === -1) {
                            if (rank = highRank) {
                                spawners.push(type);
                            } else if (rank > highRank) {
                                highRank = rank;
                                spawners = [type];
                            }
                        }
                    });
                    // if left with only one type of spawner, change state to spawner's state
                    if (spawners.length === 1) {
                        returnState = spawners[0];
                    }
                    // Otherwise, there are one or more ties, so no spawning occurs
                }
            }
        }
        
        return returnState;
    },
    
    battleTest: function () {
        var neighbors = this.neighbors,
            props = this.tileProperties,
            returnState = this.tileState,
            CONSTANTS = square.CONSTANTS,
            infections = [],
            neighbor, nProps, nState, lossLen, victor,
            i = 0;

        if (returnState !== 'DEFAULT') {
            for (i; i < 8; ++i) {
                neighbor = neighbors[i];
                nProps = neighbor.tileProperties;
                nState = neighbor.tileState;
                if (nProps.TEAM !== props.TEAM && nProps.TEAM !== 0 && infections.indexOf(nState) === -1) {
                    // opponent located... time for battle
                    // test for infection
                    if (nProps.INFECT >= props.TOUGH) {
                        // infection requires greater INFECT than TOUGH
                        // or if equal, this neighbor must outrank the current tile
                        if (nProps.INFECT > props.TOUGH || nProps.RANK > props.RANK) {
                            // assimilated you are
                            infections.push(nState);
                        }
                    } else if (nProps.POWER >= props.TOUGH && infections.length === 0) {
                        // killed in battle :(
                        infections.push('DEFAULT');
                    }
                }
            }

            // flip through the book of losses and see which state wins
            lossLen = infections.length;

            if (lossLen) {
                returnState = infections[0];

                if (lossLen > 1) {
                    // infections take precedence over kills, but who wins the tile?
                    for (i = 1; i < lossLen; ++i) {
                        victor = infections[i];
                        nProps = CONSTANTS.tileProperties[victor];
                        props = CONSTANTS.tileProperties[returnState];

                        if (nProps.INFECT >= props.INFECT) {
                            if (nProps.INFECT > props.INFECT || nProps.RANK > props.RANK) {
                                returnState = victor;
                            }
                        }
                    }
                }
            }
        }
        
        return returnState;
    },
    
    getTeamCount: function (team) {
        var neighbors = this.neighbors,
            count = 0, i = 0;

        for (i; i < 8; ++i) {
            if (neighbors[i].tileProperties.TEAM === team) {
                ++count;
            }
        }
        
        return count;
    }
};
