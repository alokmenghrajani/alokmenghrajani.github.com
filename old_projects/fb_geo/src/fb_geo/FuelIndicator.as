package fb_geo {
	import flash.display.Sprite;
	
	import mx.core.UIComponent;

	public class FuelIndicator {
		protected var level:Number;
		protected var box:UIComponent;
		protected var sprite:Sprite;
		
		public function FuelIndicator(sprite:UIComponent) {
			this.box = sprite;
			this.sprite = new Sprite();
			this.box.addChild(this.sprite);
			
			this.reset();
		}
		
		public function reset():void {
			this.level = 100;
		}
		
		public function refresh():void {
			this.level -= 0.02;
			this.level = Math.max(0, this.level);
			
			this.sprite.graphics.clear();
			this.sprite.graphics.lineStyle(1, 0x000000);
			if (this.level > 20) {
				this.sprite.graphics.beginFill(0xffa0a0);
			} else {
				this.sprite.graphics.beginFill(0xff0000);				
			}
			this.sprite.graphics.drawRect(0, 0, this.box.width * this.level / 100, this.box.height);
			this.sprite.graphics.endFill();
			this.sprite.graphics.beginFill(0xffffff);
			this.sprite.graphics.drawRect(this.box.width * this.level / 100, 0, this.box.width * (100 - this.level) / 100, this.box.height);
			this.sprite.graphics.endFill();			
			this.sprite.graphics.drawRect(0, 0, this.box.width, this.box.height);
		}
		
		public function getLevel():Number {
			return this.level;
		}
	}
}