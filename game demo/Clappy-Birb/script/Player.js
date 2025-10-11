export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = 10;
        this.y = 100;
        this.image = document.getElementById("Player");
        this.velocityY = 0;
        this.gravity = 0.01;
        this.jumpstrength = -1;
    }

    update(){
            this.velocityY += this.gravity;
            this.y += this.velocityY;
            
            //để bird không rơi khỏi màn hình 
            if (this.y + this.height > this.game.height) {
      this.y = this.game.height - this.height;
      this.velocityY = 0;
    }

    // Giới hạn bay lên
    if (this.y < 0) this.y = 0;

    }
    
    Flap(){
        this.velocityY = this.jumpstrength;
    }

    draw(context){

        context.drawImage(this.image, this.x, this.y);
    
    }


}