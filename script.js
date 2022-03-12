let px = 50; // Posizione x & y
let py = 50;
let vx = 0.0; // Velocità x & y
let vy = 0.0;
let updateRate = 1 / 60; // Frequenza di aggiornamento del sensore

async function getAccel() {
  DeviceMotionEvent.requestPermission().then((response) => {
    if (response == "granted") {
      // Aggiungi un listener per ottenere l'orientamento dello smartphone
      // negli assi alfa-beta-gamma (in gradi)
      window.addEventListener("deviceorientation", (event) => {
// Espone ogni angolo di orientamento in modo più leggibile
        rotation_degrees = event.alpha;
        frontToBack_degrees = event.beta;
        leftToRight_degrees = event.gamma;

        // Aggiorna la velocità in base all'inclinazione del telefono
        // Poiché i telefoni sono più stretti che lunghi, raddoppia l'aumento della velocità x - per un tablet occorre uno switch di casi
        vx = vx + leftToRight_degrees * updateRate * 2;
        vy = vy + frontToBack_degrees * updateRate;

        // Aggiorna la posizione e agganciala ai limiti
        px = px + vx * 0.5;
        if (px > 98 || px < 0) {
          px = Math.max(0, Math.min(98, px)); // Clip posiz x entro 0-98
          vx = 0;
        }

        py = py + vy * 0.5;
        if (py > 98 || py < 0) {
          py = Math.max(0, Math.min(98, py)); // Clip posiz y entro 0-98
          vy = 0;
        }

        dot = document.getElementsByClassName("indicatorDot")[0];
        dot.setAttribute("style", "left:" + px + "%;" + "top:" + py + "%;");
      });
    }
  });
}

/*evento al click*/
let btn = document.querySelector("#accelPermsButton");

btn.addEventListener("click", getAccel());