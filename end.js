const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const possibleScore = localStorage.getItem('possibleScore');


const celebrate = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 15, spread: 560, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      const particleCount = 100 * (timeLeft / duration);

      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

console.log(mostRecentScore);

if (mostRecentScore < possibleScore / 2) {
  finalScore.innerText = '¡Sigue practicando!';
} else {
  finalScore.innerText = `${mostRecentScore} de ${possibleScore}`;
  celebrate();
}
