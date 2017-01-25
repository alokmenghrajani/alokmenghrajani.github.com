package fb_geo {
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.geom.Matrix;
	
	import mx.controls.Image;

	public class Map {
		// Size of screen
		protected var screen_x:int;
		protected var screen_y:int;
		
		// Scroll is in screen coordinates
		protected var scroll_x:Number;
		protected var scroll_y:Number;
		protected var scale:Number;
		protected var margin:int;
		
		protected var bitmap:BitmapData;
		protected var sprite:Sprite;
		
		public function Map(scale:Number, screen_x:int, screen_y:int, bitmap:BitmapData) {
			this.screen_x = screen_x;
			this.screen_y = screen_y;
			this.scroll_x = 0;
			this.scroll_y = 0;
			this.scale = scale;
			
			this.margin = 200;
			
			this.bitmap = bitmap;
			this.sprite = new Sprite();
		}
		
		/**
		 * Move map so that the Helicopter remains visiable.
		 */
		public function scroll(h:Helicopter):void {
			var x:int = this.globalToScreenX(h.getX());
			var y:int = this.globalToScreenY(h.getY());
					
			var d:Number;
			// scroll left
			if (x < margin) {
				d = margin - x;
				this.scrollX(-d);
			}
			
			// scroll right
			if (x > (this.screen_x - margin)) {
				d = x - (this.screen_x - margin);
				this.scrollX(d);
			}
			
			// scroll top
			if (y < margin) {
				d = margin - y;
				this.scrollY(-d);
			}
			
			// scroll bottom
			if (y > (this.screen_y - margin)) {
				d = y - (this.screen_y - margin);
				this.scrollY(d)
			}	
		}
		
		/**
		 * Move map so that Helicopter is centered.
		 */
		public function center(h:Helicopter):void {
			this.scroll_x = 0;
			this.scroll_y = 0;
			var x:int = this.globalToScreenX(h.getX());
			var y:int = this.globalToScreenY(h.getY());
			this.scroll_x = x - Math.floor(this.screen_x / 2);
			this.scroll_y = y - Math.floor(this.screen_y / 2);
		}
		
		private function scrollX(x:Number):void {
			this.scroll_x += x;
		}
		
		// For debug purpose
		public function getScrollX():Number {
			return this.scroll_x;
		}
		
		private function scrollY(y:Number):void {
			this.scroll_y += y;
		}
		
		// For debug purpose
		public function getScrollY():Number {
			return this.scroll_y;
		}
		
		public function globalToScreenX(x:Number):int {
			return Math.floor(x * this.scale - this.scroll_x);
		}
		
		public function globalToScreenY(y:Number):int {
			return Math.floor(y * this.scale - this.scroll_y);
		}
		
		public function getSprite():Sprite {
			return this.sprite;
		}
		
		public function getHeight():Number {
			return this.bitmap.height;
		}
		
		public function getWidth():Number {
			return this.bitmap.width;
		}
		
		public function getScreenWidth():int {
			return this.screen_x;
		}
		
		public function getScreenHeight():int {
			return this.screen_y;
		}
		
		private function normalizeX(x:Number):Number {
			var r:Number = x % this.bitmap.width;
			if (r < 0) {
				r+= this.bitmap.width;
			}
			return r;
		}
		
		private function normalizeY(y:Number):Number {
			var r:Number = y % this.bitmap.height;
			if (r < 0) {
				r+= this.bitmap.height;
			}
			return r;
		}		
		
		public function distance(x1:Number, y1:Number, x2:Number, y2:Number):Number {
			var s_x1:int = this.globalToScreenX(this.normalizeX(x1));
			var s_y1:int = this.globalToScreenY(this.normalizeY(y1));
			var s_x2:int = this.globalToScreenX(this.normalizeX(x2));
			var s_y2:int = this.globalToScreenY(this.normalizeY(y2));
			
			var d:Number = Math.sqrt((s_x2 - s_x1) * (s_x2 - s_x1) + (s_y2 - s_y1) * (s_y2 - s_y1));
			return d / this.scale;
		}
		
		public function refresh():void {
			var m:Matrix = new Matrix();
			m.scale(this.scale, this.scale);
			m.translate(-this.scroll_x, -this.scroll_y);
			
			this.sprite.graphics.clear();
			this.sprite.graphics.beginBitmapFill(this.bitmap, m);
			this.sprite.graphics.drawRect(0, 0, this.screen_x, this.screen_y);
			this.sprite.graphics.endFill();
		}
	}
}