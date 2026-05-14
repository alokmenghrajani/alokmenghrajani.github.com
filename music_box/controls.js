// Lightweight virtual joystick: returns a value in [-1,1]^2 while held.
// Works with mouse + touch + pen.
export class Joystick {
  constructor(el) {
    this.el = el;
    this.knob = el.querySelector('.joystick-knob');
    this.bg = el.querySelector('.joystick-bg');
    this.value = { x: 0, y: 0 };
    this.active = false;
    this.pointerId = null;
    this.radius = 0;

    this._onDown = this._onDown.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);

    el.addEventListener('pointerdown', this._onDown);
    window.addEventListener('pointermove', this._onMove);
    window.addEventListener('pointerup', this._onUp);
    window.addEventListener('pointercancel', this._onUp);
  }

  _measure() {
    const rect = this.el.getBoundingClientRect();
    this.centerX = rect.left + rect.width / 2;
    this.centerY = rect.top + rect.height / 2;
    this.radius = rect.width / 2;
  }

  _onDown(e) {
    if (this.active) return;
    this.active = true;
    this.pointerId = e.pointerId;
    this._measure();
    this.el.setPointerCapture?.(e.pointerId);
    this._onMove(e);
  }

  _onMove(e) {
    if (!this.active || e.pointerId !== this.pointerId) return;
    const dx = e.clientX - this.centerX;
    const dy = e.clientY - this.centerY;
    const r = this.radius;
    const len = Math.hypot(dx, dy);
    const clamp = len > r ? r / len : 1;
    const nx = dx * clamp;
    const ny = dy * clamp;
    this.knob.style.transform = `translate(${nx}px, ${ny}px)`;
    this.value.x = nx / r;
    this.value.y = ny / r; // y positive = down in screen
  }

  _onUp(e) {
    if (!this.active || e.pointerId !== this.pointerId) return;
    this.active = false;
    this.pointerId = null;
    this.knob.style.transform = 'translate(0,0)';
    this.value.x = 0;
    this.value.y = 0;
  }
}
