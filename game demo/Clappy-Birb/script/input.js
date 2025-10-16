export class InputHandler {
  constructor(player) {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault(); 
        player.Flap(); 
      }
    });
  }
}


  
  

  

