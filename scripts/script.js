let credits = 200;
let wins = 0;
const symbols = 7;

const reelElements = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];

const spinBtn = document.getElementById("spin-btn");
const jackpotElement = document.getElementById("jackpot");

// Inicializar los carretes con imágenes
function initializeReels() {
  reelElements.forEach((reel) => {
    reel.innerHTML = ""; // Limpiar contenido previo
    for (let i = 1; i <= symbols; i++) {
      const img = document.createElement("img");
      img.src = `images/${i}.png`;
      img.alt = `Símbolo ${i}`;
      img.style.display = "block"; // Asegurar que sea bloque
      reel.appendChild(img);
    }
  });
}


// Girar los carretes
async function spin() {

  if (credits < 10) {
    alert("¡No tienes suficientes créditos!");
    return;
  }

  credits -= 10;
  updateUI();
  spinBtn.disabled = true;
  jackpotElement.style.display = "none";

  // Generar resultados aleatorios
  const results = Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * symbols) + 1
  );

  // Animación de giro
  await Promise.all(
    reelElements.map(
      (reel, index) =>
        new Promise((resolve) => {
          
          const targetPosition = (results[index] - 1) * -100;

          // Dentro de la Promise.all
          reel.style.transition = "transform 0.2s";
          reel.style.transform = `translateY(${targetPosition}px)`;

          // Resetear posición después de la animación
          setTimeout(() => {

            
            reel.style.transition = "none";
            // const resetPosition = targetPosition + 700; // Ajuste para posición final
            reel.style.transform = `translateY(${targetPosition}px)`;
            resolve();
          }, 500); //tiempo en milisegundos
        })
    )
  );

  // Verificar ganador
  if (results[0] === results[1] && results[1] === results[2]) {
    credits += 250;
    wins++;
    jackpotElement.style.display = "block";
    document.querySelector(".game-container").classList.add("win-animation");
    setTimeout(() => {
      document
        .querySelector(".game-container")
        .classList.remove("win-animation");
    }, 1000);
  }

  updateUI();
  spinBtn.disabled = false;
}

function updateUI() {
  document.getElementById("credits").textContent = credits;
  document.getElementById("wins").textContent = wins;
}

// Sonidos (descomenta y añade tus archivos de sonido)
/*const audioSpin = new Audio('spin-sound.mp3');
        const audioWin = new Audio('win-sound.mp3');*/

initializeReels();

// Ajustar inicialización
setTimeout(() => {
  reelElements.forEach((reel) => {
    reel.style.transform = "translateY(0px)"; /* Iniciar en posición correcta */
  });
}, 100);
