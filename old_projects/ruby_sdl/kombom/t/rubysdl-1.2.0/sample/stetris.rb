# This sample need ruby 1.8 or 1.6 with shim
# Thanks to Simon Strandgaard
require 'sdl'
if RUBY_VERSION < "1.7" then
  require 'features/ruby18'
end

class Object
  def deep_clone
    Marshal::load(Marshal.dump(self))
  end
end

class Array
  def random
    at(Kernel.rand(size))
  end
end

class Pattern
  def initialize(x, y, *data)
    @x = x
    @y = y
    @data = data
  end
  attr_reader :data, :x, :y
  alias width x
  def rotate
    @data = @data.reverse.transpose
    @x, @y = @y, @x
  end
  PAT1 = Pattern.new(4, 1, [1, 1, 1, 1])
  PAT2 = Pattern.new(3, 2, [1, 1, 1], [0, 1, 0])
  PAT3 = Pattern.new(3, 2, [1, 1, 1], [1, 0, 0])
  PAT4 = Pattern.new(3, 2, [1, 1, 1], [0, 0, 1])
  PAT5 = Pattern.new(2, 2, [1, 1], [1, 1])
  PAT6 = Pattern.new(3, 2, [1, 1, 0], [0, 1, 1])
  PAT7 = Pattern.new(3, 2, [0, 1, 1], [1, 1, 0])
  def Pattern::patterns
    [PAT1, PAT2, PAT3, PAT4, PAT5, PAT6, PAT7]
  end
end

class Level
  def initialize(width=10, height=15)
    @height = height
    @width = width
    @data = Array.new(height) { Array.new(width, 0) }
    backup_background
  end
  attr_reader :width, :height
  def test
    @data[0][0] = 1
    @data[0][@width-1] = 1
    @data[@height-1][0] = 1
    @data[@height-1][@width-1] = 1
  end
  def bg_is_collision(offset_x, offset_y, pattern)
    return true if pattern.x + offset_x > @width
    return true if pattern.y + offset_y > @height
    y = offset_y
    pattern.data.each do |row|
      x = offset_x
      row.each do |cell|
	if (cell != 0) and (@bg[y][x] != 0)
	  return true
	end
	x += 1
      end
      y += 1
    end
    return false
  end
  def restore_background
    @data = @bg
  end
  def backup_background
    @bg = @data.deep_clone
  end
  def or_pattern(offset_x, offset_y, pattern)
    backup_background
    y = offset_y
    pattern.data.each do |row|
      x = offset_x
      row.each do |cell|
	@data[y][x] = cell if cell != 0
	x += 1
      end
      y += 1
    end
  end
  def find_filled_rows 
    res = []
    @data.each_index do |y|
      ok = true
      @data[y].each do |cell|
	if cell == 0
	  ok = false 
	  break
	end
      end
      res << y if ok
    end
    res
  end
  def remove_rows(*rows)
    rows.uniq!
    rows.each do |y|
      @bg[y] = nil
    end
    @bg.compact!
    extra = Array.new(rows.size) { Array.new(@width, 0) }
    @bg = extra + @bg
    raise "integrity error" if @bg.size != @height
  end
end

class Level
  def load_render_data
    @image = SDL::Surface.loadBMP("icon.bmp")
    @image.setColorKey( SDL::SRCCOLORKEY ,0)
    @image = @image.displayFormat
    @step_x = 32  # todo: image width
    @step_y = 32  # todo: image height
    # todo: raise exception is level does not fit to screen!
    @offset_x = 100
    @offset_y = 20
    
    @fill_removal_dir = false
  end
  def render
    y = @offset_y
    @data.each do |row|
      render_line(y, row)
      y += @step_y
    end
  end
  def render_line(y, cells)
    x = @offset_x
    cells.each do |cell|
      i = (cell == 0) ? 63 : 255
      @image.setAlpha(SDL::SRCALPHA,i)
      $screen.put(@image,x,y)
      x += @step_x
    end
  end
  FILL = (20 * 256*256) + (0 * 256) + 10
  def render_removal(rows)
    $screen.fillRect(0,0,640,512,0)
    render
    rows.reverse_each do |row|
      y = (row * @step_y) + @offset_y
      
      if @fill_removal_dir
	i = 0
	x = @offset_x
	while i < @width
	  $screen.fillRect(x,y,@step_x,@step_y,FILL)
	  $screen.flip
	  i += 1
	  x += @step_x
	end
	@fill_removal_dir = false
      else
	i = 0
	x = @offset_x + ((@width-1)*@step_x)
	while i < @width
	  $screen.fillRect(x,y,@step_x,@step_y,FILL)
	  $screen.flip
	  i += 1
	  x -= @step_x
	end
	@fill_removal_dir = true
      end
    end
  end
end

SDL.init( SDL::INIT_VIDEO )
$screen = SDL::setVideoMode(640,512,24,SDL::SWSURFACE)
level = Level.new
level.test
level.load_render_data
pat = Pattern::PAT3.clone
pat_x = 5
pat_y = 0
time_step = 0.5
time = Time.now
launch_new_pattern = true
loop do
  if launch_new_pattern
    launch_new_pattern = false
    time_step = 0.5
    time = Time.now
    pat = Pattern::patterns.random.clone
    pat_x = 5
    pat_y = 0
    level.backup_background
    if level.bg_is_collision(pat_x, pat_y, pat)
      puts "Sorry you are game over"
      sleep 3
      raise "game over"
    end
    level.or_pattern(pat_x, pat_y, pat)
  end
  
  # timer events
  while Time.now > time + time_step
    pat_y += 1
    if level.bg_is_collision(pat_x, pat_y, pat)
      launch_new_pattern = true
      rows = level.find_filled_rows
      if rows.size > 0
	puts "rows filled"
	p rows
	level.render_removal(rows)
	
	level.backup_background
	level.remove_rows(*rows)
	level.restore_background
      end
    else
      level.restore_background
      level.or_pattern(pat_x, pat_y, pat)
    end
    time += time_step
  end
  
  old_pat_x = pat_x
  old_pat_y = pat_y
  rotate = false
  
  # handle keystrokes
  while event = SDL::Event2.poll
    case event
    when SDL::Event2::Quit then exit
    when SDL::Event2::KeyDown
      case event.sym
      when SDL::Key::ESCAPE then exit 
      when SDL::Key::UP     then rotate = true
      when SDL::Key::DOWN   then time_step = 0.1
      when SDL::Key::LEFT
	pat_x -= 1 if pat_x > 0
      when SDL::Key::RIGHT
	pat_x += 1 if pat_x < (level.width - pat.width)
      end
    end
  end
  SDL::Key.scan
  
  # move pattern & do collition tests
  if (pat_x <=> old_pat_x) or (pat_y <=> old_pat_y) or (rotate == true)
    
    old_pat = pat.clone
    pat.rotate if rotate
    
    # if collision then restore last working-state
    if level.bg_is_collision(pat_x, pat_y, pat)
      pat_x = old_pat_x
      pat_y = old_pat_y
      pat = old_pat
    else
      # collision avoided.. therefore don't launch new pattern
      launch_new_pattern = false
      level.restore_background
      level.or_pattern(pat_x, pat_y, pat)
    end
  end
  
  # repaint screen
  $screen.fillRect(0,0,640,512,0)
  level.render
  GC.start # release memory.. otherwise it would grow steady
  $screen.flip
end
