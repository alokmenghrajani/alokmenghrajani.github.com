
class DropObj
  
  def initialize
    @stop_time = 0
    @state = JT::State.new(:dropping) do |i|
      
      i.add_event(:dropping,:act) do |d,dt|
	@y += @dy*dt/100
	@dy += g*dt/100
	if @y > FLOOR_Y - h then
	  @y = FLOOR_Y - h
	  @stop_time=0
	  d.move_state :stopping
	end
      end

      i.add_event(:stopping,:act) do |d,dt|
	@stop_time += dt
      end

    end

  end

  attr_reader :x, :y
  
  def act(dt)
    @state.act dt
  end

  def erase?
    @stop_time > stop_time
  end

  private

end

class Gem2 < DropObj
  
  def h ;H; end
  def w ;W; end
  H=W=16
  def stop_time ;4000; end
  INIT_DY=10
  def g ;20; end
  G1_BMP = setup_bmp 'g1.bmp'
  
  def initialize
    @x=rand(RWALL_X-LWALL_X-W)+LWALL_X
    @y=CEIL_Y
    @dy=INIT_DY
    super
    init_graph
  end

  def draw(screen)
    screen.put(@graph,@x,@y)
  end

  private

  def init_graph
    @graph = G1_BMP
  end
  
end
  
