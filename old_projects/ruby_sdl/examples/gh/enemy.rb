
EA_1 = setup_bmp 'ea_1.bmp'

class EnemyA
  
  H=W=32
  DX=10
  INIT_DY_MIN=5
  INIT_DY_MAX=15
  
  def initialize
    @x=rand(RWALL_X-LWALL_X-W)+LWALL_X
    @y=CEIL_Y
    @dy= INIT_DY_MIN+rand( INIT_DY_MAX-INIT_DY_MIN+1)
    @dx= DX* ( (rand(2)==0)?1:-1 )
    
    @state=JT::State.new(:dropping) do |i|
      
      i.add_event(:dropping,:act) do |d,dt|
	@y += @dy*dt/100
	@dy += G*dt/100
	if @y > FLOOR_Y - H then
	  @y = FLOOR_Y - H
	  @stop_time=0
	  d.move_state :rolling
	end
      end

      i.add_event(:rolling,:act) do |d,dt|
	@x += dt*@dx/100
      end

    end

  end
  
  attr_reader :x, :y
  def w ;W;end;
  def h ;H;end;
  
  def act(dt)
    @state.act(dt)
  end

  def erase?
    x_out?(@x,W)
  end

  def draw(screen)
    screen.put(EA_1,@x,@y)
  end
  
end

class EnemyB
  W=H=32
  DX_MAX=19
  DX_MIN=5
  
  def initialize
    if (rand(2)==0) then
      direction = :left
    else
      direction = :right
    end

    case direction
    when :right
      @dx= DX_MIN+rand(DX_MAX-DX_MIN+1)
      @x=LWALL_X-W
    when :left
      @dx= -(DX_MIN+rand(DX_MAX-DX_MIN+1))
      @x=RWALL_X
    end
    @dy=0
    @y=FLOOR_Y-W-20-rand(300)
  end

  attr_reader :x, :y
  def w ;W;end;
  def h ;H;end;

  def act(dt)
    @x += @dx*dt/100
    @dy += G*dt/100
    @y += @dy*dt/100
    if @y >FLOOR_Y-H then
      @y=FLOOR_Y-H
      @dy = -@dy
    end
  end

  def erase?
    x_out?(@x,W)
  end

  def draw(screen)
    screen.put(EA_1,@x,@y)
  end

end
