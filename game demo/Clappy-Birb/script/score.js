export class Score {
  constructor() {
    this.value = 0;
  }

  addPoint() {
    this.value++;
  }

  draw(ctx, canvasWidth) {
    ctx.font = '36px Quicksand';
    ctx.fillStyle = 'white';       
    ctx.textAlign = 'right';       
    ctx.fillText('Score: ' + this.value, canvasWidth - 20, 40);
  }
}