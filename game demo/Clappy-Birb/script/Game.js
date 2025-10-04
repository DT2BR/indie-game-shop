import { Player } from "./Player.js";
import {InputHandler} from "./input.js";


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
        }
        update(){
            this.player.update();
        }

        draw(context){
            ctx.clearRect(0, 0, canvas.width, canvas.height);    
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
