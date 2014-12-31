(function () {

var renderer = PIXI.autoDetectRenderer(620, 380);

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x111111, true);

// stage.interactive = true;

// var bg = PIXI.Sprite.fromImage("BGrotate.jpg");
// bg.anchor.x = 0.5;
// bg.anchor.y = 0.5;

// bg.position.x = 620/2;
// bg.position.y = 380/2;

var colorMatrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

// var filter = new PIXI.ColorMatrixFilter();
var blurFilter1 = new PIXI.BlurFilter();
var blurFilter2 = new PIXI.BlurFilter();
var blurFilter3 = new PIXI.BlurFilter();
var rgbSplitterFilter = new PIXI.RGBSplitFilter();
var noiseFilter = new PIXI.NoiseFilter();
var sepiaFilter = new PIXI.SepiaFilter();

noiseFilter.noise = 0.05;
sepiaFilter.sepia = 0.6;

var container = new PIXI.DisplayObjectContainer();
container.position.x = 620/2;
container.position.y = 380/2;

// var bgFront = PIXI.Sprite.fromImage("fish.jpg");
// bgFront.anchor.x = 0.5;
// bgFront.anchor.y = 0.5;

// container.addChild(bgFront);

var image =  PIXI.Sprite.fromImage("moon.jpg");
image.anchor.x = 0.5;
image.anchor.y = 0.5;
image.alpha = 0;
container.addChild(image);

var light2 = PIXI.Sprite.fromImage("LightRotate2.png");
light2.anchor.x = 0.57;
light2.anchor.y = 0.55;
container.addChild(light2);
light2.filters = [blurFilter3, blurFilter2, rgbSplitterFilter];

var light1 = PIXI.Sprite.fromImage("LightRotate1.png");
light1.anchor.x = 0.57;
light1.anchor.y = 0.55;
container.addChild(light1);
light1.filters = [blurFilter3, blurFilter2, rgbSplitterFilter];

stage.addChild(container);

// create a renderer instance

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
actualResizeHandler();

window.addEventListener("resize", resizeThrottler, false);

var resizeTimeout;
function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();

       // The actualResizeHandler will execute at a rate of 15fps
       }, 66);
    }
  }

function actualResizeHandler() {
    renderer.view.style.width = window.innerWidth + "px";
    renderer.view.style.height = window.innerHeight + "px";
}

// add render view to DOM
document.body.appendChild(renderer.view);

// stage.filters = [filter, blurFilter1, rgbSplitterFilter];
stage.filters = [blurFilter1, sepiaFilter, noiseFilter];

// var switchy = false;
// stage.click = stage.tap = function() {
//     switchy = !switchy;
//         if (!switchy) {
//         stage.filters = [filter];
//     }
//     else {
//         stage.filters = null;
//     }
// };

var count = 0;
requestAnimFrame(animate);
function animate() {

    // bg.rotation += 0.01;
    // bgFront.rotation -= 0.01;
    image.alpha += 0.1 * count;

    light1.rotation += 0.0006;
    light2.rotation += 0.0009;
    image.rotation -= 0.0003;

    light1.scale.x = 1.5 + Math.sin(count) * 0.2;
    light1.scale.y = 1.5 + Math.cos(count) * 0.07;

    light2.scale.x = 1.5 + Math.sin(count) * 0.08;
    light2.scale.y = 1.5 + Math.cos(count) * 0.06;

    // light2.anchor.x = Math.sin(count) * 0.05 + 0.5;
    // light2.anchor.y = Math.cos(count) * 0.05 + 0.5;

    var blurAmount = Math.cos(count);
    var blurAmount3 = Math.sin(count);
    blurFilter1.blur = 5 * (blurAmount);
    blurFilter2.blur = 20;
    blurFilter3.blur = 50 * blurAmount3;

    image.scale.x = 1 + Math.sin(count) * 0.04;
    image.scale.y = 1 + Math.cos(count) * 0.04;

    count += 0.005;

    // colorMatrix[1] = Math.sin(count) * 3;
    // colorMatrix[2] = Math.cos(count);
    // filter.matrix = colorMatrix;

    renderer.render(stage);
    requestAnimFrame( animate );
}

var sound = new Howl({
  urls: ['pw.mp3', 'pw.ogg'],
  autoplay: true,
  loop: true
});

})();
