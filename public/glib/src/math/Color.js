export default class Color {

  static get white () { return new Color(1.0, 1.0, 1.0); }
  static get red () { return new Color(1.0, 0.0, 0.0); }
  static get green () { return new Color(0.0, 1.0, 0.0); }
  static get blue () { return new Color(0.0, 0.0, 1.0); }
  static get black () { return new Color(0.0, 0.0, 0.0); }

  static fromArray (a) { return new Color(...a); }
  static fromHex (h) { return new Color(...[ h.slice(2, 4), h.slice(4, 6), h.slice(6, 8), ].map(he => parseInt(he, 16) / 255)); }

  constructor (r, g, b) {
    this.r = r || 0.0;
    this.g = g || 0.0;
    this.b = b || 0.0;
  }

  get copy () { return new Color(this.r, this.g, this.b); }
  get toArray () { return [ this.r, this.g, this.b, ]; }
  get toHex () {
    return `0x${[ (this.r * 255).toString(16), (this.g * 255).toString(16), (this.b * 255).toString(16), ]
      .map(cl => cl.length < 2 ? `'0'${cl}` : cl)
      .join('')}`;
  }

}
