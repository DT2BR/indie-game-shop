import { Player } from "./Player.js";

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
        }
        update(){
            this.player.update();
        }

        draw(context){
                this.player.draw(context);
            
        }
    }


    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update();
        requestAnimationFrame(animate);

    }

    animate();
});
