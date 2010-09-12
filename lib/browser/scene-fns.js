// assumed variables from bundling: ctx

function drawSphereToCanvas(sphere) {
    var x, y;
    var screenPlaneDistance = 1;
    var factor = screenPlaneDistance/sphere.z;
    x = sphere.x * factor;
    y = sphere.y * factor;
    r = sphere.r * factor;

    x += 150;
    y += 100;

    ctx.arc(x,y,r,0,360,false);
    ctx.stroke();
}
