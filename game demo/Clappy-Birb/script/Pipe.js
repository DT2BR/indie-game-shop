export class Pipe {
  constructor(game, x) {
    this.game = game;
    this.width = 80;
    this.gap = 200; 
    this.speed = 3;
    this.x = x;
    this.passed = false;
    
    this.topHeight = Math.random() * (this.game.height - this.gap - 100) + 50;
  }

  update() {
    this.x -= this.speed;

    // reset khi ống ra khỏi màn hình 
    if (this.x + this.width < 0) {
      this.x = this.game.width;
      this.topHeight = Math.random() * (this.game.height - this.gap - 100) + 50;
      this.passed = false;
    }
  }

  getHitboxes() {
    const top = { x: this.x, y: 0, width: this.width, height: this.topHeight };
    const bottomY = this.topHeight + this.gap;
    const bottom = {
      x: this.x,
      y: bottomY,
      width: this.width,
      height: this.game.height - bottomY,
    };
    return [top, bottom];
  }



  draw(context) {
    context.fillStyle = "green";

    //  trên
    context.fillRect(this.x, 0, this.width, this.topHeight);

    //  dưới
    const bottomY = this.topHeight + this.gap;
    const bottomHeight = this.game.height - bottomY;
    context.fillRect(this.x, bottomY, this.width, bottomHeight);
  }
}
