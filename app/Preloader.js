var gridHacker = {};

gridHacker.Preloader = function (game) {
    this.ready = false;
};

gridHacker.Preloader.prototype = {
    preload: function () {
        this.load.spritesheet('tiles', 'app/tiles/grid-tiles.png', 32, 32);
    },

    create: function () {
        this.state.start('Grid');
    }
};
