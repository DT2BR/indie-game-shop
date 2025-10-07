import { Player } from "./Player.js";
import {InputHandler} from "./input.js";
import { Pipe } from "./Pipe.js"; 

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
            this.pipes = [
                new Pipe(this, this.width + 500),
                new Pipe(this, this.width + 1000),
                new Pipe(this, this.width + 1500),
];
        }
        update(){
            this.player.update();
            this.pipes.forEach(pipe => pipe.update());

        }

        draw(context){
            ctx.clearRect(0, 0, canvas.width, canvas.height);    
            this.pipes.forEach(pipe => pipe.draw(context));
            this.player.draw(context);
                
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
