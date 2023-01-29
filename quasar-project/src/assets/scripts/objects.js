export class Object {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getX() {
    return this.x;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  getY() {
    return this.y;
  }
}

export class Sprite extends Object {
  constructor(x, y, width, height, image) {
    super(x, y, width, height);
    this.image = image;
  }

  render(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
