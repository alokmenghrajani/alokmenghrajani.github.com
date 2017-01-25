package fb_geo {
	import flash.display.Sprite;
	
	import mx.controls.Image;
	import mx.core.UIComponent;

	public class Helicopter {
		// Position and velocity in map coordinates
		protected var x:Number;
		protected var y:Number;
		
		// Angle is in degree (0-360)
		protected var angle:Number;
		
		// Speed in map coordinates per 10 milliseconds
		protected var speed:Number;
		
		protected var sprite:UIComponent;
		protected var shadow:UIComponent;
		
		protected var rot_x:int;
		protected var rot_y:int;
		
		protected var starting_positions:Array;
		
		public function Helicopter(width:Number, height:Number, sprite:UIComponent, shadow:UIComponent) {
			this.sprite = sprite;
			this.shadow = shadow;
						
			this.rot_x = 50;
			this.rot_y = 40;
		}
		
		public function reset():void {
			this.speed = 0;			

			this.angle = Math.floor(Math.random() * 360);
			this.shadow.rotationZ = Math.floor(this.angle);
			this.sprite.rotationZ = Math.floor(this.angle);

			this.starting_positions = new Array();
			this.starting_positions.push({x: 3636, y: 1628});
			this.starting_positions.push({x: 2988, y:  766});
			this.starting_positions.push({x: 2079, y:  333});
			this.starting_positions.push({x: 1947, y:  474});
			this.starting_positions.push({x:  547, y:  635});
			this.starting_positions.push({x: 1017, y: 1407});
			
			var r:int = Math.floor(Math.random() * this.starting_positions.length);
			this.x = this.starting_positions[r].x;
			this.y = this.starting_positions[r].y;
			
			trace("CALLED");
		}
		
		// DEPRECATED
		public function goto(x:Number, y:Number):void {
			this.x = x;
			this.y = y;
		}
		
		public function getX():Number {
			return this.x;
		}
		
		public function getY():Number {
			return this.y;
		}
		
		public function move():void {
			var dx:Number = Math.sin(this.angle * Math.PI / 180) * this.speed;
			var dy:Number = -Math.cos(this.angle * Math.PI / 180) * this.speed;
			this.x += dx;
			this.y += dy;
		}
		
		public function toggleSpeed():void {
			this.speed = (this.speed == 0) ? 3 : 0;
		}
		
		public function rotate(angle:Number):void {
			this.angle += angle;
			this.shadow.rotationZ = Math.floor(this.angle);
			this.sprite.rotationZ = Math.floor(this.angle);
		}
		
		public function refresh(map:Map):void {
			// Fix center of rotation issue
			var x:Number = this.rot_x * this.sprite.width / 100;
			var y:Number = this.rot_y * this.sprite.height / 100
			var a:Number = Math.atan2(x, y) * 180 / Math.PI;
			var d:Number = Math.sqrt(x * x + y * y);
			var dx:Number = Math.sin((a - this.angle) * Math.PI / 180) * d;
			var dy:Number = Math.cos((a - this.angle) * Math.PI / 180) * d;

			this.sprite.x = map.globalToScreenX(this.x) - Math.floor(dx);
			this.sprite.y = map.globalToScreenY(this.y) - Math.floor(dy);

			// Fix center of rotation issue
			x = this.rot_x * this.shadow.width / 100;
			y = this.rot_y * this.shadow.height / 100
			a = Math.atan2(x, y) * 180 / Math.PI;
			d = Math.sqrt(x * x + y * y);
			dx = Math.sin((a - this.angle) * Math.PI / 180) * d;
			dy = Math.cos((a - this.angle) * Math.PI / 180) * d;
			
			this.shadow.x = map.globalToScreenX(this.x) - Math.floor(dx) + 20;
			this.shadow.y = map.globalToScreenY(this.y) - Math.floor(dy) + 30;
			
			HelicopterSprite(this.sprite).incrementRotarAngle(6);
			HelicopterSprite(this.shadow).incrementRotarAngle(6);
			this.sprite.invalidateDisplayList();
			this.shadow.invalidateDisplayList();
		}
	}
}