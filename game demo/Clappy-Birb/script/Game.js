import { Player } from "./Player.js";
import {InputHandler} from "./input.js";
import { Pipe } from "./Pipe.js"; 
import { Score } from './score.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;



    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this.player);
            this.gameOver = false;
            this.score = new Score();
            this.pipes = [
                new Pipe(this, this.width + 500),
                new Pipe(this, this.width + 1000),
                new Pipe(this, this.width + 1500),
                
                
            ];
            window.addEventListener("keydown", (e) => {
            if (e.code === "Space" && this.gameOver) {
            this.restart();
      }
    });

            
        }
  update(){
            if (this.gameOver) return;
            this.player.update();
            this.pipes.forEach(pipe => pipe.update());
                  // kiểm tra bird chạm pipe
      for (const pipe of this.pipes) {
        for (const box of pipe.getHitboxes()) {
          if (this.checkCollision(this.player, box)) {
            this.gameOver = true;
          }
        }
      }

      // bird chạm đất
      if (this.player.y + this.player.height >= this.height) {
        this.gameOver = true;
      }

      for (const pipe of this.pipes){
        if (!pipe.passed && pipe.x + pipe.width < this.player.x) {
        this.score.addPoint();
        pipe.passed = true;
}
    }      
    }

    checkCollision(a, b) {
      const padding = 10; // thu nhỏ collision
        return (
        a.x + padding < b.x + b.width &&
        a.x + a.width - padding > b.x &&
        a.y + padding < b.y + b.height &&
        a.y + a.height - padding > b.y
      );



        }

    draw(context){
        ctx.clearRect(0, 0, canvas.width, canvas.height);    
        this.pipes.forEach(pipe => pipe.draw(context));
        this.player.draw(context);
        this.score.draw(context, this.width);
        if(this.gameOver){
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillRect(0, 0, this.width, this.height); // làm mờ màn hình

                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.font = "48px sans-serif";
                ctx.fillText("GAME OVER", this.width / 2, this.height / 2);

            }


        }

        restart() {
        this.player = new Player(this);
        this.input = new InputHandler(this.player);
        this.pipes = [
            new Pipe(this, this.width + 200),
            new Pipe(this, this.width + 600),
            ];
            this.gameOver = false;
            this.score = new Score();

            }
      
            

    }


    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate(){
        
        game.draw(ctx);
        game.update();
        requestAnimationFrame(animate);

    }

    animate();
});
