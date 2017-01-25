package fb_geo {
	import flash.display.Sprite;
	import flash.events.Event;
	
	import mx.core.UIComponent;
	
	public class HelicopterSprite extends UIComponent {
		protected var sprite:Sprite;
		protected var rotar_angle:Number;
		protected var body_color:int;
		protected var rotar_color:int;
		
		public function HelicopterSprite() {
			super();
			
			this.rotar_angle = 0;
			this.body_color = 0x00ffa0;
			this.rotar_color = 0xa0a0a0;
			
			this.sprite = new Sprite();
			this.addChild(this.sprite);
			
			this.addEventListener(Event.RENDER, this.renderHandler);
		}
		
		public function incrementRotarAngle(angle:Number):void {
			this.rotar_angle += angle;
		}
		
		public function setBodyColor(color:int):void {
			this.body_color = color;
		}
		
		public function setRotarColor(color:int):void {
			this.rotar_color = color;
		}
		
		public function renderHandler(event:Event):void {
			// Draw helicopter
			this.sprite.graphics.clear();
			this.sprite.graphics.beginFill(this.body_color);
			this.sprite.graphics.lineStyle(2, 0x000000);
			this.sprite.graphics.drawEllipse(this.width * 0.40, this.height * 0.20, this.width * 0.20, this.height * 0.50);
			this.sprite.graphics.moveTo(this.width * 0.50, this.height * 0.70);
			this.sprite.graphics.lineTo(this.width * 0.50, this.height * 0.95);				
			this.sprite.graphics.lineTo(this.width * 0.40, this.height);
			this.sprite.graphics.lineTo(this.width * 0.60, this.height);
			this.sprite.graphics.lineTo(this.width * 0.50, this.height * 0.95);
			this.sprite.graphics.endFill();
			
			// Draw rotors
			var i:int;
			this.sprite.graphics.lineStyle(1, 0x000000);
			this.sprite.graphics.beginFill(this.rotar_color);
			for (i=0; i<4; i++) {
				var a:Number = this.rotar_angle + 360/4 * i;
				
				var x1:Number = Math.cos((a + 7) * Math.PI / 180) * this.height * 0.30;
				var y1:Number = Math.sin((a + 7) * Math.PI / 180) * this.height * 0.30;
				
				var x2:Number = Math.cos(a * Math.PI / 180) * this.height * 0.40;
				var y2:Number = Math.sin(a * Math.PI / 180) * this.height * 0.40;
				
				var x3:Number = Math.cos((a - 7) * Math.PI / 180) * this.height * 0.30;
				var y3:Number = Math.sin((a - 7) * Math.PI / 180) * this.height * 0.30;
				
				this.sprite.graphics.moveTo(this.width * 0.50, this.height * 0.40);
				this.sprite.graphics.lineTo(this.width * 0.50 + x1, this.height * 0.40 + y1);
				this.sprite.graphics.lineTo(this.width * 0.50 + x2, this.height * 0.40 + y2);
				this.sprite.graphics.lineTo(this.width * 0.50 + x3, this.height * 0.40 + y3);
				this.sprite.graphics.lineTo(this.width * 0.50, this.height * 0.40);				
			}
			this.sprite.graphics.endFill();
		}
	}
}