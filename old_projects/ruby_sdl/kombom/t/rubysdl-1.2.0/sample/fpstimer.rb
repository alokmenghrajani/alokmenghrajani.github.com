require 'sdl'

class FPSTimerSample
  FPS_COUNT = 10

  attr_accessor :fps
  attr_reader :real_fps, :total_skip
  attr_reader :count_sleep
  # +fps+ is the number of frames per second that you want to keep,
  # +accurary+ is the accurary of sleep/SDL.delay in milisecond
  def initialize(fps = 60, accurary = 10, skip_limit = 15)
    @fps = fps
    @accurary = accurary / 1000.0
    @skip_limit = skip_limit
  end

  # reset timer, you should call just before starting loop
  def reset
    @old = get_ticks
    @skip = 0
    @real_fps = @fps
    @frame_count = 0
    @fps_old = @old
    @count_sleep = 0
    @total_skip = 0
  end

  # execute given block and wait
  def wait_frame
    now = get_ticks
    nxt = @old + (1.0/@fps)
    if nxt > now || @skip > @skip_limit
      yield
      @skip = 0
      wait(nxt)
      @old = nxt
    else
      @skip += 1
      @total_skip += 1
      @old = get_ticks
    end

    calc_real_fps
  end

  private
  def wait(nxt)
    while nxt > get_ticks + @accurary
      sleep(@accurary - 0.005)
      @count_sleep += 1
    end

    while nxt > get_ticks
      # busy loop, do nothing
    end
  end

  def get_ticks
    SDL.getTicks / 1000.0
  end

  def calc_real_fps
    @frame_count += 1
    if @frame_count >= FPS_COUNT
      @frame_count = 0
      now = get_ticks
      @real_fps = FPS_COUNT / (now - @fps_old)
      @fps_old = now
    end
  end
end

class FPSTimerLight
  N = 12
  DT = 2
  FPS_COUNT = 10
  
  attr_reader :fps
  attr_reader :real_fps
  # +fps+ is the number of frames per second that you want to keep,
  # +accurary+ is the accurary of sleep/SDL.delay in milisecond
  def initialize(fps = 60, accurary = 10, skip_limit = 15)
    @fps = fps
    @accurary = accurary * N
    @skip_limit = 15
    @one_frame = 1000*N / fps
    @delay = accurary - 2
  end
  
  # reset timer, you should call just before starting loop
  def reset
    @old = get_ticks
    @skip = 0
    
    # for calculate real fps
    @frame_count = 0
    @fps_old = @old
    @real_fps = @fps
  end

  def wait_frame
    now = get_ticks
    nxt = @old + @one_frame
    if nxt > now || @skip > @skip_limit
      yield
      @skip = 0
      wait(nxt)
      @old = nxt
    else
      @skip += 1
      @total_skip += 1
      @old = get_ticks
    end

    calc_real_fps
  end

  private
  def get_ticks
    SDL.getTicks * N
  end
  
  def wait(nxt)
    while nxt > get_ticks + @accurary
      SDL.delay(@delay) 
    end

    while nxt > get_ticks
      # busy loop, do nothing
    end
  end

  def calc_real_fps
    @frame_count += 1
    if @frame_count >= FPS_COUNT
      @frame_count = 0
      now = get_ticks
      @real_fps = (N*1000*FPS_COUNT)/(now - @fps_old)
      @fps_old = now
    end
  end
end
  
if __FILE__ == $0
  timer = FPSTimerSample.new
  log = []
  
  timer.reset
  300.times do
    sleep 0.005 if rand(5) == 0
    timer.wait_frame do
      log << timer.real_fps.to_s
    end
  end
  
  puts log
  printf "skip:%d\n", timer.total_skip
  printf "sleep:%d\n", timer.count_sleep

  puts
  
  timer = FPSTimerLight.new
  log = []
  
  timer.reset
  old = SDL.getTicks
  300.times do
    sleep 0.005 if rand(5) == 0
    timer.wait_frame do
      log << timer.real_fps
    end
  end

  puts log
end
