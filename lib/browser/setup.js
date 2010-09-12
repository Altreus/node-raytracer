// jQuery will (should) have been loaded on the browser.
var canvas, ctx;

$(function() {
    canvas = $('#draw-area').get(0);
    ctx = canvas.getContext('2d');

    $('#sphere').click(function() {
        setControlsFor('sphere', function(sphereData) {
            DNode({}).connect(function (remote) {
                // TODO: this empty object will contain sphere values.
                remote.addSphereToScene(sphereData, drawSphereToCanvas);
            });
        });
    });
});
