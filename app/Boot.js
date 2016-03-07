var gridHacker = {},
    verge = window.verge;

gridHacker.Boot = function (game) {};

gridHacker.Boot.prototype = {
    preload: function () {
        // img?
    },

    create: function () {
        var scale = this.scale;

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        scale.pageAlignHorizontally = true;
        scale.forceLandscape = true;
        scale.maxWidth = verge.viewportW();
        scale.maxHeight = verge.viewportH();
        scale.updateLayout(true);
        
        window.addEventListener('resize', function () {
            scale.maxWidth = verge.viewportW();
            scale.maxHeight = verge.viewportH();
            scale.refresh();
        }, false);
        
        this.state.start('Preloader');
    }
};
