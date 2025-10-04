export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = 100;
        this.image = document.getElementById("Player");
    }

    update(){
            this.y++;
    }

    draw(context){

        context.drawImage(this.image, this.x, this.y);
    
    }


}