export class Pipe {
  constructor(game, x) {
    this.game = game;
    this.width = 80;
    this.gap = 200; // khoảng cách giữa 2 ống
    this.speed = 3; // tốc độ di chuyển sang trái
    this.x = x;

    // Tạo vị trí ngẫu nhiên cho ống trên
    this.topHeight = Math.random() * (this.game.height - this.gap - 100) + 50;
  }

  update() {
    this.x -= this.speed;

    // Nếu ống đi ra khỏi màn hình → reset lại bên phải
    if (this.x + this.width < 0) {
      this.x = this.game.width;
      this.topHeight = Math.random() * (this.game.height - this.gap - 100) + 50;
    }
  }

  draw(context) {
    context.fillStyle = "green";

    // Ống trên
    context.fillRect(this.x, 0, this.width, this.topHeight);

    // Ống dưới
    const bottomY = this.topHeight + this.gap;
    const bottomHeight = this.game.height - bottomY;
    context.fillRect(this.x, bottomY, this.width, bottomHeight);
  }
}
