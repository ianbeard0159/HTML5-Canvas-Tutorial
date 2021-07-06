
function rednerCanvas(ctx, fill, rect){
    ctx.fillStyle = fill;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
}

function drawLine(ctx, startX, startY, endX, endY){
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// The face is done with a radial gradient
function drawFace(ctx, radius){
    var grad;
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, "rgb(36, 37, 39)");
    grad.addColorStop(0.5, "gray");
    grad.addColorStop(1, "rgb(36, 37, 39)");

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
}

function drawCircle(ctx, p){
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, p.startAng, p.endAng);
    ctx.fillStyle = p.fill;
    ctx.fill();
}

function drawNumbers(ctx, radius){
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";

    var ang;
    for(var i = 1; i < 13; i++){
        // Rotate to correct angle
        ang = i * Math.PI / 6;
        ctx.rotate(ang);
        // Move outward to correct position
        ctx.translate(0, -radius*0.85);
        // Rotate number to be right side up
        ctx.rotate(-ang);
        // Print number
        ctx.fillText(i.toString(), 0, 0);
        // Return to starting position
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawHand(ctx, ang, len, width, fill){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = fill;
    ctx.moveTo(0,0);
    ctx.rotate(ang);
    ctx.lineTo(0, -len);
    ctx.stroke();
    ctx.rotate(-ang);
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // Hour hand
    hour = hour % 12;
    // Extra info on hour to emulate the hour hand moving between hours on the clock
    var hourAng = (hour * Math.PI/6) + (minute * Math.PI/(6*60)) + (second * Math.PI/(360*60));
    drawHand(ctx, hourAng, radius * 0.5, radius * 0.07, "black");

    // Minute Hand
    var minuteAng = (minute * Math.PI/(30)) + (second * Math.PI/(30*60));
    drawHand(ctx, minuteAng, radius * 0.7, radius * 0.05, "rgb(70, 85, 87)");

    // second
    var secondAng = (second * Math.PI/(30));
    drawHand(ctx, secondAng, radius * 0.8, radius * 0.02, "rgb(100, 24, 24)");
}


document.addEventListener("DOMContentLoaded", function(event) {

    // Canvas Tutorial

    /*
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var rectangle = {
        x: 10,
        y: 10,
        width: 200,
        height: 125
    };

    var fill = context.createLinearGradient(0, 0, 150, 50);
    fill.addColorStop(0, "red");
    fill.addColorStop(1, "white");

    rednerCanvas(context, fill, rectangle);
    drawLine(context, 0, 0, 200, 100);
    */

    // Clock Tutorial
    var clockCanvas = document.getElementById("clock");
    console.log("Width: " + clockCanvas.width + " Height:" + clockCanvas.height);
    console.log("Should be 400x400")
    var X = clockCanvas.width / 2;
    var Y = clockCanvas.height / 2;
    var rad = Y * 0.9;
    
    var clockCtx = clockCanvas.getContext("2d");
    clockCtx.translate(X, Y);

    var clockParams = {
        x: 0,
        y: 0,
        radius: rad,
        startAng: 0,
        endAng: 2 * Math.PI,
        fill: "white"
    }

    var faceParams = {
        x: 0,
        y: 0,
        radius: rad * 0.1,
        startAng: 0,
        endAng: 2 * Math.PI,
        fill: "black"
    }

    // Draw the clock
    drawCircle(clockCtx, clockParams);
    drawFace(clockCtx, Y * 0.90);
    drawNumbers(clockCtx, rad);

    var saveState = clockCtx.getImageData(0, 0, clockCanvas.width, clockCanvas.height);

    drawTime(clockCtx, rad); 
    drawCircle(clockCtx, faceParams);

    // Draw the time every second
    setInterval(function() {
        clockCtx.putImageData(saveState, 0, 0);
        drawTime(clockCtx, rad); 
        drawCircle(clockCtx, faceParams);
    }, 1000);


});
