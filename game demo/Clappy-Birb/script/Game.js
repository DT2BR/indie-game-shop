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
            this.handleGameOver();

          }
        }
      }

      // bird chạm đất
      if (this.player.y + this.player.height >= this.height) {
        this.gameOver = true;
        this.handleGameOver();
      }

      for (const pipe of this.pipes){
        if (!pipe.passed && pipe.x + pipe.width < this.player.x) {
        this.score.addPoint();
        pipe.passed = true;
}
    }      
    }


// cho back-end    ///////////////////////////////////////////
    



async handleGameOver() {
  if (!this.gameOver) return; // nếu chưa thực sự game over thì bỏ qua

  try {
    //  lấy top 5 điểm hiện tại
    const res = await fetch("http://localhost:3000/api/leaderboard");
    const leaderboard = await res.json();

    //  xác định điểm thấp nhất trong top 5
    const lowestTopScore =
      leaderboard.length < 5
        ? 0
        : leaderboard[leaderboard.length - 1].score;

    //  nếu điểm của người chơi >= điểm thấp nhất trong top 10 → cho phép nhập tên
    if (this.score.value > lowestTopScore) {
      const name =
        prompt("congrats, you're on top 5!\nEnter your name(5 characters): ") ||
        "AAA";

      //  gửi dữ liệu lên server để lưu điểm
      const saveRes = await fetch("http://localhost:3000/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_name: name.slice(0, 5),
          score: this.score.value,
        }),
      });

      if (!saveRes.ok) throw new Error("Lỗi khi lưu điểm!");

      console.log("save successfully.");

      //  nếu có hàm loadLeaderboard() thì gọi để cập nhật bảng xếp hạng
      if (typeof loadLeaderboard === "function") {
        loadLeaderboard();
      }
    } else {
      console.log("nice try.");
    }
  } catch (err) {
    console.error("error:", err);
  }
}



async isTop10(score) {
  try {
    const res = await fetch("http://localhost:3000/api/leaderboard");
    const data = await res.json();

    if (data.length < 5) {
      // nếu chưa có đủ 5 người => luôn được vào bảng
      return true;
    }

    // lấy điểm thấp nhất trong top 5
    const lowestTopScore = data[data.length - 1].score;

    // nếu điểm hiện tại >= điểm thấp nhất trong top 5 => đủ điều kiện
    return score >= lowestTopScore;
  } catch (err) {
    console.error("error while checking top 5", err);
    return false;
  }
}



/////////////////////////////////////////////////////


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
        if (this.gameOver) {
  
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, this.width, this.height);

  
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "48px sans-serif";
        ctx.fillText("GAME OVER", this.width / 2, this.height / 2 - 40);

  
        ctx.font = "32px sans-serif";
        ctx.fillText(`Score: ${this.score.value   }`, this.width / 2, this.height / 2 + 20);

  
        ctx.font = "24px sans-serif";
        ctx.fillText("Press SPACE to restart", this.width / 2, this.height / 2 + 70);
}



        }

        restart() {
        this.player = new Player(this);
        this.input = new InputHandler(this.player);
        this.pipes = [
                new Pipe(this, this.width + 500),
                new Pipe(this, this.width + 1000),
                new Pipe(this, this.width + 1500),
                
                
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
