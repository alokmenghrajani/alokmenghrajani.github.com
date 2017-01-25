
def setup_bmp(filename)
  graph=SDL::Surface.loadBMP(filename)
  graph.setColorKey SDL::SRCCOLORKEY, graph[0,0]
  graph=graph.displayFormat
end

def make_gem?(dt)
  rand( 3000/dt ) == 0
end

def make_enemyA?(dt)
  rand( 5000/dt ) == 0
end

def make_enemyB?(dt)
  rand( 7000/dt ) == 0
end

def x_out?(x,w)
  x+w+10<LWALL_X || x-10>RWALL_X
end

def send_loc?(x,w)
  return true if LWALL_X+SEND_FIELD_WIDTH>x+w
  return true if RWALL_X-SEND_FIELD_WIDTH<x
  false
end

def collision?(a,b)
  
  if a.x < b.x then
    tmp=a;a=b;b=tmp
  end
  return false if b.x+b.w-4 < a.x
  
  if a.y < b.y then
    tmp=a;a=b;b=tmp
  end
  return false if b.y+b.h-4 < a.y
  
  true
  
end

class System
  ALLOWED_MISS=3
  MAX_GEM=20
  
  def initialize
    @score=0
    @life=3
    @counter=0
    @miss=0
    @gems=[]
    @system_str=''
  end

  attr_reader :score, :life, :system_str, :counter, :miss

  def num_gem
    @gems.size
  end
  
  def miss_gem
    @miss+=1
    if @miss > ALLOWED_MISS then
      @miss=0
      @counter=0
      @system_str='counter 0!'
    end
  end

  def get_gem(point)
    @gems << point
    @counter+=1
    if @gems.size > MAX_GEM then
      @gems.clear
      @miss=0
      @counter=0
      @system_str='gem too many!'
    end
  end

  def collision_enemy
    @life -= 1
    @miss=0
    @system_str='damage!'
  end

  def continue_game?
    @life > 0
  end
  
  def send_gem
    return if @gems.size==0
    sum=0
    @system_str='('
    @gems.each do |i|
      sum+=i
      @system_str.concat "#{i}+"
    end
    @system_str.chop!
    s = sum*(@gems.size)*@counter
    @system_str.concat ")*#{@gems.size}*#{@counter}=#{s}"
    @score += s
    @gems.clear
  end
  
end
