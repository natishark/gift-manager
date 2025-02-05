class RgbColor {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  sub(other) {
    return new RgbColor(
      this.r - other.r,
      this.g - other.g,
      this.b - other.b
    );
  }

  add(other) {
    return new RgbColor(
      this.r + other.r,
      this.g + other.g,
      this.b + other.b
    );
  }

  divScalar(scalar) {
    return new RgbColor(
      this.r / scalar,
      this.g / scalar,
      this.b / scalar
    );
  }

  mulScalar(scalar) {
    return new RgbColor(
      this.r * scalar,
      this.g * scalar,
      this.b * scalar
    );
  }

  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

export { RgbColor };
