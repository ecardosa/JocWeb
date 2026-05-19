const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameOver = false;
let victoria = false;
let vidas = 3;
let puntuacion = 0;
let metaDistancia = 5000;
let distanciaRecorrida = 0;


let comboMultiplicador = 1.0;
let velocidadBase = 5;
let velocidadActual = velocidadBase;
let frameCount = 0;
let framesSpawn = 120; 

const jugador = {
    carril: 0,
    ancho: 50,
    alto: 100,
    y: 600, 
    color: 'cyan'
};

let obstaculos = [];
const tiposObstaculos = [
    { tipo: 'Cono', color: 'orange', puntos: 10, ancho: 40, alto: 40 },
    { tipo: 'Valla', color: 'yellow', puntos: 20, ancho: 60, alto: 30 },
    { tipo: 'Coche', color: 'red', puntos: 50, ancho: 50, alto: 100 }
];

window.addEventListener('keydown', (e) => {
    if (gameOver || victoria) return;

    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        moverJugador(-1);
    } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        moverJugador(1);
    }
});

function moverJugador(direccion) {
    jugador.carril += direccion;
    
    if (jugador.carril < -1 || jugador.carril > 1) {
        gameOver = true;
        alert("¡Te saliste de la carretera! Fin de la partida.");
    }
}


function spawnObstaculo() {
    let carrilAleatorio = Math.floor(Math.random() * 3) - 1; // -1, 0, o 1
    let tipoAleatorio = tiposObstaculos[Math.floor(Math.random() * tiposObstaculos.length)];
    
    obstaculos.push({
        carril: carrilAleatorio,
        y: -100,
        ...tipoAleatorio,
        esquivado: false
    });
}

function actualizarLogica() {
    if (gameOver || victoria) return;

    distanciaRecorrida += velocidadActual;


    if (distanciaRecorrida >= metaDistancia && vidas > 0) {
        victoria = true;
        alert("¡Has llegado al destino! ¡Victoria!");
        return;
    }

  
    comboMultiplicador += 0.001;
    velocidadActual = velocidadBase * comboMultiplicador;

   
    frameCount++;
    if (frameCount >= framesSpawn) {
        spawnObstaculo();
        frameCount = 0;
        if (framesSpawn > 40) framesSpawn -= 2;
    }


    for (let i = obstaculos.length - 1; i >= 0; i--) {
        let obs = obstaculos[i];
        obs.y += velocidadActual; 

   
        if (obs.carril === jugador.carril && obs.y + obs.alto > jugador.y && obs.y < jugador.y + jugador.alto) {
          
            vidas--;
            comboMultiplicador = 1.0; 
            velocidadActual = velocidadBase; 
            obstaculos.splice(i, 1);

            if (vidas <= 0) {
                gameOver = true;
                alert("Te has quedado sin vidas. Game Over.");
            }
        } 
        else if (obs.y > jugador.y + jugador.alto && !obs.esquivado) {
            obs.esquivado = true;
            puntuacion += obs.puntos * comboMultiplicador;
        }

        if (obs.y > canvas.height) {
            obstaculos.splice(i, 1);
        }
    }

    document.getElementById('vidas-ui').innerText = vidas;
    document.getElementById('puntos-ui').innerText = Math.floor(puntuacion);
    document.getElementById('combo-ui').innerText = comboMultiplicador.toFixed(1);
}

function dibujarCarretera() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#fff';
    for (let i = 0; i < canvas.height; i += 60) {
        ctx.fillRect(150, i + (distanciaRecorrida % 60), 5, 30);
        ctx.fillRect(300, i + (distanciaRecorrida % 60), 5, 30);
    }
}

function dibujarJugador() {
    let x = 225 + (jugador.carril * 150) - (jugador.ancho / 2);
    ctx.fillStyle = jugador.color;
    ctx.fillRect(x, jugador.y, jugador.ancho, jugador.alto);
}

function dibujarObstaculos() {
    obstaculos.forEach(obs => {
        let x = 225 + (obs.carril * 150) - (obs.ancho / 2);
        ctx.fillStyle = obs.color;
        ctx.fillRect(x, obs.y, obs.ancho, obs.alto);
    });
}

function draw() {
    dibujarCarretera();
    dibujarObstaculos();
    dibujarJugador();
}

function gameLoop() {
    actualizarLogica();
    draw();
    if (!gameOver && !victoria) {
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar juego
gameLoop();