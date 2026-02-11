// --- LÓGICA DE VALENTINE 2 (Botones e Interacción) ---
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const question = document.getElementById("question");
const gif = document.getElementById("gif");
const details = document.getElementById("details");
const player = document.getElementById("player");

noBtn.addEventListener("mouseover", () => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxY = window.innerHeight - noBtnRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});
yesBtn.addEventListener("click", () => {
    question.innerHTML = "Tú y yo por siempre, mi  amor precioso. 💖 "; 

    // Insertamos el mensaje adicional de Valentine1 
    const mensajeExtra = document.createElement("p");
    mensajeExtra.innerHTML = "Por más días juntos, disfrutando el uno del otro,<br>el otro del uno, en el mismo sentido, en sentido contrario<br>y viceversa...";
    mensajeExtra.style.fontSize = "1em";
    mensajeExtra.style.color = "#6b4f3f";
    question.appendChild(mensajeExtra);
    



    gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif"; 
    document.getElementById("btn-group").style.display = "none";
    details.style.display = "block"; // Muestra contador y música
    player.play(); // Inicia la canción de Valentine1
});

// --- LÓGICA DE VALENTINE 1 (Contador desde 01/01/2025) ---
const inicio = new Date("2023-01-28T00:00:00");
function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - inicio;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)); 
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24); 
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60); 
    const segundos = Math.floor((diferencia / 1000) % 60); 
    document.getElementById("contador").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}
setInterval(actualizarContador, 1000);

// --- LÓGICA DE VALENTINE 3 (Animación de Corazones) ---
var canvas, stage, container, captureContainers, captureIndex;
function init() {
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas); 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container = new createjs.Container();
    stage.addChild(container);
    captureContainers = [];
    captureIndex = 0;
    for (var i = 0; i < 100; i++) {
        var heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30)); 
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12); 
        heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12); 
        heart.y = -100;
        container.addChild(heart);
    }
    createjs.Ticker.timingMode = createjs.Ticker.RAF; 
    createjs.Ticker.on("tick", tick);
}
function tick(event) {
    var w = canvas.width;
    var h = canvas.height;
    var l = container.numChildren;
    for (var i = 0; i < l; i++) {
        var heart = container.getChildAt(i); 
        if (heart.y < -50) {
            heart._x = Math.random() * w;
            heart.y = h * (1 + Math.random()) + 50;
            heart.perX = (1 + Math.random() * 2) * h;
            heart.offX = Math.random() * h;
            heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
            heart.velY = -Math.random() * 2 - 1; 
            heart.scale = Math.random() * 2 + 1;
            heart._rotation = Math.random() * 40 - 20;
            heart.alpha = Math.random() * 0.75 + 0.05;
        }
        var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
        heart.y += heart.velY * heart.scaleX / 2;
        heart.x = heart._x + Math.cos(int) * heart.ampX;
        heart.rotation = heart._rotation + Math.sin(int) * 30;
    }
    stage.update(event); 
}