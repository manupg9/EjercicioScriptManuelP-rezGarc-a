let filas = 5;
let columnas = 6;
let lucesIniciales = 10;

let intentos = 0;
let timer = null;
let tiempo = 0;

document.getElementById("btnIniciar").addEventListener("click", iniciar);

function iniciar() {
    // Reiniciar valores
    intentos = 0;
    tiempo = 0;
    document.getElementById("intentos").textContent = 0;
    document.getElementById("tiempo").textContent = 0;
    document.getElementById("mensaje").textContent = "";

    seleccionarDificultad();
    crearTablero();
    iniciarTimer();
}

function seleccionarDificultad() {
    let dif = document.querySelector("input[name='dif']:checked").value;

    if (dif === "facil") {
        filas = 5; columnas = 6; lucesIniciales = 10;
    } else if (dif === "medio") {
        filas = 6; columnas = 6; lucesIniciales = 6;
    } else if (dif === "dificil") {
        filas = 10; columnas = 10; lucesIniciales = 20;
    } else {
        filas = parseInt(document.getElementById("pFilas").value);
        columnas = parseInt(document.getElementById("pColumnas").value);
        lucesIniciales = parseInt(document.getElementById("pLuces").value);

        if (isNaN(filas) || isNaN(columnas) || isNaN(lucesIniciales) ||
            filas <= 0 || columnas <= 0 ||
            lucesIniciales >= filas * columnas) {

            alert("Valores personalizados inválidos");
            return;
        }
    }
}

function crearTablero() {
    const tablero = document.getElementById("tablero");
    tablero.innerHTML = ""; 
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;

    let matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = 0; 
        }
    }

    let encendidas = 0;
    while (encendidas < lucesIniciales) {
        let x = Math.floor(Math.random() * filas);
        let y = Math.floor(Math.random() * columnas);
        if (matriz[x][y] === 0) {
            matriz[x][y] = 1;
            encendidas++;
        }
    }

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let btn = document.createElement("button");
            btn.classList.add("casilla");
            btn.dataset.x = i;
            btn.dataset.y = j;

            if (matriz[i][j] === 1) btn.classList.add("encendida");
            else btn.classList.add("apagada");

            btn.addEventListener("click", () => clickCasilla(i, j));

            tablero.appendChild(btn);
        }
    }
}

function clickCasilla(i, j) {
    intentos++;
    document.getElementById("intentos").textContent = intentos;

    cambiar(i, j);
    cambiar(i - 1, j);
    cambiar(i + 1, j);
    cambiar(i, j - 1);
    cambiar(i, j + 1);

    comprobarVictoria();
}

function cambiar(i, j) {
    let lista = document.querySelectorAll(".casilla");
    let index = i * columnas + j;

    if (lista[index]) {
        lista[index].classList.toggle("encendida");
        lista[index].classList.toggle("apagada");
    }
}

function comprobarVictoria() {
    let todas = document.querySelectorAll(".casilla");
    let ok = Array.from(todas).every(c => c.classList.contains("encendida"));

    if (ok) {
        clearInterval(timer);
        document.getElementById("mensaje").textContent = "¡Has ganado!";
    }
}

function iniciarTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        tiempo++;
        document.getElementById("tiempo").textContent = tiempo;
    }, 1000);
}
