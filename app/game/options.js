define(['angular'], function() {
    var options = {

        fps: 20,
        interval: (1000 / 20),
        angularInit: false,
        init: false,
        pause: true,
        firstTime: true,
        menu: 'navbar',
        before: new Date().getTime(),
        now: new Date().getTime(),
        started: new Date().getTime(),
        softReset: false,
        version: 0.001,
        countReset: 0,

        display: function() {
            game.setFPS(game.options.fps);
            $("#fpsSlider").on("input change", function() {
                game.setFPS(this.value);
                $("#choosedFPS").html(game.options.fps);
            });
            $("#fpsSlider").val(game.options.fps);
            $("#choosedFPS").html(game.options.fps);

        },

        varInit: function() {},

        domInit: function() {
            this.display();
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["options"] = this;
            log("Options init.");
        }
    };

    return options.init();
});
