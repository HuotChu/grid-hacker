square.CONSTANTS = {};

square.CONSTANTS.tileStates = {
    DEFAULT: 41,
    DEAD: 22,
    PLAYER_WEAK: 42,
    PLAYER_MEDIUM: 46,
    PLAYER_STRONG: 45,
    AV_WEAK: 56,
    AV_MEDIUM: 60,
    AV_STRONG: 59
};

square.CONSTANTS.tileProperties = {
    DEFAULT: {      // DEFAULT is almost DEAD, but not quite, because it can change state
        LIVE: [],   // number of same-team neighbors required to live
                    // DEFAULT state does not require neighbors to live
        SPAWN: 9,  // number of same-team neighbors required to change the state
        POWER: 0,   // attack power
        TOUGH: 0,   // hit points
        INFECT: 0,  // ability to change neighbor tile states
        TEAM: 0,    // alignment: 0 = neutral, 1 = player, 2 = computer
        RANK: 0,    // rank gives priority and decides a tie condition
        AGE: 0      // how many generations this tile has kept the same state
                    // some tiles will upgrade their state at a certain age
    },
    DEAD: {         // DEAD is dead. It can never change state again.
        LIVE: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        SPAWN: 9,
        POWER: 0,
        TOUGH: 0,
        INFECT: 0,
        TEAM: 0,
        RANK: 0,
        AGE: 0
    },
    WEAK: {
        LIVE: [2, 3],
        SPAWN: 3,
        POWER: 1,
        TOUGH: 1,
        INFECT: 0,
        TEAM: 0,
        RANK: 1,
        AGE: 0
    },
    MEDIUM: {
        LIVE: [2, 3, 4],
        SPAWN: 4,
        POWER: 2,
        TOUGH: 2,
        INFECT: 0,
        TEAM: 0,
        RANK: 2,
        AGE: 60
    },
    STRONG: {
        LIVE: [1, 2, 3, 4, 5],
        SPAWN: 5,
        POWER: 3,
        TOUGH: 3,
        INFECT: 0,
        TEAM: 0,
        RANK: 3,
        AGE: 180
    },
    PLAYER_WEAK: {
        LIVE: [2, 3],
        SPAWN: 3,
        POWER: 1,
        TOUGH: 1,
        INFECT: 0,
        TEAM: 1,
        RANK: 1,
        AGE: 0
    },
    PLAYER_MEDIUM: {
        LIVE: [2, 3, 4],
        SPAWN: 4,
        POWER: 2,
        TOUGH: 2,
        INFECT: 1,
        TEAM: 1,
        RANK: 2,
        AGE: 60
    },
    PLAYER_STRONG: {
        LIVE: [1, 2, 3, 4, 5],
        SPAWN: 5,
        POWER: 3,
        TOUGH: 3,
        INFECT: 2,
        TEAM: 1,
        RANK: 3,
        AGE: 180
    },
    AV_WEAK: {
        LIVE: [2, 3],
        SPAWN: 3,
        POWER: 1,
        TOUGH: 1,
        INFECT: 0,
        TEAM: 2,
        RANK: 1,
        AGE: 0
    },
    AV_MEDIUM: {
        LIVE: [2, 3, 4],
        SPAWN: 4,
        POWER: 2,
        TOUGH: 2,
        INFECT: 1,
        TEAM: 2,
        RANK: 2,
        AGE: 60
    },
    AV_STRONG: {
        LIVE: [1, 2, 3, 4, 5],
        SPAWN: 5,
        POWER: 3,
        TOUGH: 3,
        INFECT: 2,
        TEAM: 2,
        RANK: 3,
        AGE: 180
    }
};
