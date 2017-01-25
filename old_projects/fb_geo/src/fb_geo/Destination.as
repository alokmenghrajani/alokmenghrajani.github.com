package fb_geo {
	import mx.controls.Image;
	
	import spark.components.Label;
	
	public class Destination {
		protected var data:Array;
		protected var current:int;
		protected var shown:Boolean;
		
		protected var sprite:Image;
		protected var label:Label;
		
		protected var size:int;
		protected var history:Array;
		
		public function Destination(sprite:Image, label:Label) {
			this.data = new Array();
			data.push({x: 1929, y: 530, name: "Lausanne, Switzerland", score: 10});
			data.push({x: 889, y: 633, name: "New York, USA", score: 5});
			data.push({x: 332, y: 538, name: "San Francisco, USA", score: 5});
			data.push({x: 800, y: 1374, name: "Lima, Peru", score: 10});
			data.push({x: 2012, y: 598, name: "Rome, Italy", score: 5});
			data.push({x: 2838, y: 1002, name: "Mumbai, India", score: 5});
			data.push({x: 1874, y: 508, name: "Paris, France", score: 5});
			data.push({x: 1823, y: 650, name: "Barcelona, Spain", score: 5});
			data.push({x: 1902, y: 569, name: "Nice, France", score: 7});
			data.push({x: 1833, y: 448, name: "London, England", score: 5});
			data.push({x: 2755, y: 202, name: "Tomsk, Russia", score: 15});
			data.push({x: 3346, y: 1375, name: "Jakarta, Indonesia", score: 5});
			
			this.sprite = sprite;
			this.label = label;
			
			this.reset();
		}
		
		public function reset():void {
			this.current = -1;
			this.history = new Array();
			this.next();
		}
		
		public function next():void {
			var i:int;
			while (true) {
				i = Math.random() * this.data.length;
				if (this.history.indexOf(i) == -1) {
					break;
				}
				// TODO: if the new destination is too close, don't take it...
			}

			this.history.push(i);
			this.current = i;
			this.label.text = this.data[this.current].name;
			this.sprite.visible = false;
			this.shown = false;
		}
		
		private function getX():Number {
			return this.data[this.current].x;
		}
		
		private function getY():Number {
			return this.data[this.current].y;
		}
		
		private function getScore():int {
			return this.data[this.current].score;
		}
		
		public function refresh(map:Map, h:Helicopter):int {
			var r:int = 0;
			
			size = (size + 5) % 360;
			
			var d:Number = map.distance(this.getX(), this.getY(), h.getX(), h.getY());
			
			if (d < 25) {
				r = this.getScore();
				this.next();
				d = map.distance(this.getX(), this.getY(), h.getX(), h.getY());
			}

			if (this.shown) {
				this.sprite.visible = (d < 150);
			} else {
				this.sprite.visible = (d < 75);
				this.shown = this.sprite.visible;
			}
			var x:Number = this.getX();
			var y:Number = this.getY();

			x += Math.floor(h.getX() / map.getWidth()) * map.getWidth();
			y += Math.floor(h.getY() / map.getHeight()) * map.getHeight();
			
			x = Math.floor(map.globalToScreenX(x) - this.sprite.width/2);
			y = Math.floor(map.globalToScreenY(y) - this.sprite.height/2);
			
			this.sprite.x = x + this.sprite.width / 2;
			this.sprite.y = y + this.sprite.height / 2;
			
			var zoom:Number = 1.5 + Math.sin(size * Math.PI / 180);
			
			this.sprite.scaleX = zoom;
			this.sprite.scaleY = zoom;
			
			this.sprite.x -= zoom * this.sprite.width / 2;
			this.sprite.y -= zoom * this.sprite.height / 2;
	
			return r;
		}
	}
}