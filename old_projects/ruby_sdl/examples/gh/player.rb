require 'system.rb'
require 'state.rb'

class Player

  INIT_DY=-80
  DX=20
  H=32;W=32
  G=20
  DAMAGE_TIME=4000
  GRAPH_P1 = setup_bmp 'p1.bmp'
  GRAPH_P2 = setup_bmp 'p2.bmp'
  
  def initialize(system)
    @system=system
    @x=320;@y=200
    @dy=0

    
    @state=JT::State.new(:jumping) do |i|
      
      i.add_event(:walking,:act) do |d,key,dt|
	move_lr(key,dt)
	if key.jump then
	  @dy= INIT_DY
	  d.move_state :jumping 
	end
      end

      i.add_event(:jumping,:act) do |d,key,dt|
	move_lr(key,dt)
	@y += @dy*dt/100
	@dy += G*dt/100
	if @y > FLOOR_Y - H then
	  @y = FLOOR_Y - H
	  d.move_state :walking
	end
      end

    end

    @damage_state = JT::State.new(:normal) do |i|
      i.add_event(:normal,:act) { }
      i.add_event(:normal,:collision_enemy) do |d|
	@system.collision_enemy
	@damage_time=0
	d.move_state(:damaged)
      end
      i.add_event(:damaged,:act) do |d,dt|
	@damage_time+=dt
	d.move_state(:normal) if @damage_time > DAMAGE_TIME
      end
      i.add_event(:damaged,:collision_enemy) { } 
    end
    
  end

  attr_reader :x, :y
  def w ;W;end;
  def h ;H;end;
  
  def draw(screen)
    if @damage_state.state == :damaged &&  @damage_time/300%2 == 0 then
      screen.put(GRAPH_P2,@x,@y)
    else
      screen.put(GRAPH_P1,@x,@y)
    end
  end

  def act(key,dt)
    @state.act(key,dt)
    @damage_state.act(dt)
  end

  def collision_enemy
    @damage_state.collision_enemy
  end

  private
  
  def move_lr(key,dt)
    @x-=DX*dt/100 if key.left
    @x+=DX*dt/100 if key.right
    @x = LWALL_X if @x< LWALL_X
    @x = RWALL_X-W if @x > RWALL_X-W
  end

end
