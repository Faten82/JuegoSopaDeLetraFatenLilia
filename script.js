//empiezo con array de palabras
//escogi palabras relacionadas con programacion
const todasLasPalabras = [
    "JAVASCRIPT", "VARIABLE", "FUNCION", "ARRAY", "OBJETO", "LOOP", "CODIGO", "CLASE", 
    "HTML", "CSS", "API", "DEBUG", "BROWSER", "SERVER", "CLIENTE", "ALGORITMO", "FRAMEWORK", 
    "REPOSITORIO", "GIT", "JAVA", "PYTHON", "NODE", "REACT", "ANGULAR", "SQL", "DATABASE", 
    "LOOPING", "SCRIPT", "FUNCTION", "CLASS", "METHOD", "PARAMETER", "RETURN", "EXCEPTION", 
    "CONSOLE", "QUERY", "AJAX", "ASYNCHRONOUS", "PROMISE", "EVENT", "DEBUGGER", "VARIABLES", 
    "OBJECTS", "PROTOTYPE", "MODULE", "PACKAGE", "COMPILER", "INTERPRETER", "CONSTRUCTOR"
];
const gridSize = 14;
let grid = [];
let palabras = [];
let seleccion = [];

//Función para seleccionar un subconjunto aleatorio de palabras
function seleccionarPalabras() {
    const numPalabras = 10; // Número de palabras a colocar en la sopa de letras
    palabras = [];
    const palabrasDisponibles = todasLasPalabras.slice(); // Copia el array usando slice()
    for (let i = 0; i < numPalabras; i++) {
        const index = Math.floor(Math.random() * palabrasDisponibles.length);
        palabras.push(palabrasDisponibles.splice(index, 1)[0]);
    }
}
// Inicializar la cuadrícula con letras aleatorias
function inicializarCuadricula() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
}

// Función para verificar si una posición está libre para colocar una palabra
function espacioLibre(fila, col, palabra, direccion) {
    if (direccion === 0) { // Horizontal
        if (col + palabra.length > gridSize) return false;
        for (let i = 0; i < palabra.length; i++) {
            if (grid[fila][col + i] !== '' && grid[fila][col + i] !== palabra[i]) {
                return false;
            }
        }
    } else if (direccion === 1) { // Vertical
        if (fila + palabra.length > gridSize) return false;
        for (let i = 0; i < palabra.length; i++) {
            if (grid[fila + i][col] !== '' && grid[fila + i][col] !== palabra[i]) {
                return false;
            }
        }
    } else if (direccion === 2) { // Diagonal Descendente
        if (fila + palabra.length > gridSize || col + palabra.length > gridSize) return false;
        for (let i = 0; i < palabra.length; i++) {
            if (grid[fila + i][col + i] !== '' && grid[fila + i][col + i] !== palabra[i]) {
                return false;
            }
        }
    } else if (direccion === 3) { // Diagonal Ascendente
        if (fila - palabra.length + 1 < 0 || col + palabra.length > gridSize) return false;
        for (let i = 0; i < palabra.length; i++) {
            if (grid[fila - i][col + i] !== '' && grid[fila - i][col + i] !== palabra[i]) {
                return false;
            }
        }
    }
    return true;
}
// Función para colocar una palabra en la cuadrícula
function colocarPalabraEnCuadricula(palabra) {
    let colocado = false;
    while (!colocado) {
        const orientacion = Math.floor(Math.random() * 4); // 0 = Horizontal, 1 = Vertical, 2 = Diagonal Descendente, 3 = Diagonal Ascendente
        const fila = Math.floor(Math.random() * gridSize);
        const columna = Math.floor(Math.random() * gridSize);

        if (espacioLibre(fila, columna, palabra, orientacion)) {
            if (orientacion === 0) { // Horizontal
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila][columna + i] = palabra[i];
                }
            } else if (orientacion === 1) { // Vertical
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila + i][columna] = palabra[i];
                }
            } else if (orientacion === 2) { // Diagonal Descendente
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila + i][columna + i] = palabra[i];
                }
            } else if (orientacion === 3) { // Diagonal Ascendente
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila - i][columna + i] = palabra[i];
                }
            }
            colocado = true;
        }
    }
}
// Función para colocar todas las palabras en la cuadrícula
function colocarPalabras() {
    palabras.forEach(palabra => {
        colocarPalabraEnCuadricula(palabra);
    });
}
// Initialize empty grid
for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = '';
    }
}
// Manejar la selección de una celda
function seleccionarCelda(fila, col) {
    const celda = document.getElementById(`cell-${fila}-${col}`);
    celda.classList.toggle('seleccionada');

    // Añadir o remover la celda seleccionada
    const index = seleccion.findIndex(pos => pos[0] === fila && pos[1] === col);
    if (index > -1) {
        seleccion.splice(index, 1);
    } else {
        seleccion.push([fila, col]);
    }

    // Verificar si la selección forma una palabra válida
    verificarPalabra();
}
function verificarPalabra() {
    const palabraSeleccionada = seleccion.map(pos => grid[pos[0]][pos[1]]).join('');

    if (palabras.includes(palabraSeleccionada)) {
        seleccion.forEach(([fila, col]) => {
            const celda = document.getElementById(`cell-${fila}-${col}`);
            celda.classList.add('correcta');
        });
        seleccion = [];
    // Añadir evento al botón "Rendirse"
document.getElementById('botonRendirse').addEventListener('click', () => {
    mostrarPalabrasOcultas();
});
        // Eliminar la palabra encontrada de la lista
        const index = palabras.indexOf(palabraSeleccionada);
        if (index > -1) {
            palabras.splice(index, 1);
        }

        // Comprobar si todas las palabras han sido encontradas
        if (palabras.length === 0) {
            document.getElementById('mensajeVictoria').style.display = 'block';
        }
    }
}
