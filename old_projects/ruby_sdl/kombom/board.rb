class Board2
  @board
  @sumh
  @sumv
  @sumd
  @n_move

  def initialize()
    @board = [1, 1, 1, 0,
              0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0]
    @sumh = Array.new(4, 0)
    @sumv = Array.new(4, 0)
    @sumd = Array.new(2, 0)
    @n_move = 0
  end

  def move(drop, capt, player)
    if @n_move==0
      assert(capt==nil)
    elsif @n_move==16
      assert(drop==nil)
    end
    
    if drop!=nil
      put(drop, player)
    end
    if capt!=nil
      put(capt, player)
    end
  end

  def check_win()
    [1,5].each{|p|
      for i in (0..3)
        if @sumh[i]==4*p
          return p
        end
        if @sumv[i]==4*p
          return p
        end
      end
      for i in (0..1)
        if @sumd[i]==4*p
          return p
        end
      end
    }
    return 0
  end
        
  def get(pos)
    return @board[pos[0]+pos[1]*4]
  end
  
  def put(pos, value)
    oldv = get(pos)
    @sumh[pos[1]] = @sumh[pos[1]] - oldv + value
    @sumv[pos[0]] = @sumv[pos[0]] - oldv + value
    if (pos[0]==pos[1])
      @sumd[0] = @sumd[0] - oldv + value
    end
    if (pos[0]==3-pos[1])
      @sumd[1] = @sumd[1] - oldv + value
    end
    @board[pos[0]+pos[1]*4]=value
  end

  # This function will return the possible
  # positions, where player p can capture (that
  # is, where the board value is 6-p).
  # The return value is a list of positions (two elements array)
  # If the board is empty, the function returns an empty array.
  def possible_captures(p)
    r = []
    for i in 0..4
      for j in 0..4
        pos = [i, j]
        if get(pos)==(6-p)
          r << pos
        end
      end
    end

    return r
  end

  def possible_drops()
    r = []
    for i in 0..3
      for j in 0..3
        pos = [i, j]
        if get(pos)==0
          r << pos
        end
      end
    end

    return r
  end
end

class Move
  @drop
  @capture
  
  def initialize(drop, capture)
    @drop = drop
    @capture = capture
  end

  def to_s
    if @drop==nil 
      return "[ - ]["+@capture[0].to_s+","+@capture[1].to_s+"]"
    end
    if @capture==nil
      return "["+@drop[0].to_s+","+@drop[1].to_s+"][ - ]"
    end
    return "["+@drop[0].to_s+","+@drop[1].to_s+"]["+@capture[0].to_s+","+@capture[1].to_s+"]"
  end
end

class Board
  @screen
  @board
  $pi = 3.141592654
  $twopi = 2*$pi

  @current_move_drop
  @current_move_capt
  @current_player
  @sumh
  @sumv
  @sumd
  @colors

  def initialize(screen)
    @screen = screen
    @board = [0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0]
    @sumh = Array.new(4, 0)
    @sumv = Array.new(4, 0)
    @sumd = Array.new(2, 0)

    @current_move_drop=true
    @current_move_capt=false
    @current_player = 1
    puts "Next player " + @current_player.to_s
  end

  def draw
    white = @screen.format.mapRGB(0xff, 0xff, 0xff)
    black = @screen.format.mapRGB(0, 0, 0)

    @screen.fillRect(0, 0, $screen_w, $screen_h, white)
    w = ($screen_w / 4).floor
    h = ($screen_h / 4).floor

    for i in (1..3)
      @screen.fillRect(i*w, 0, 1, $screen_h, black)
      @screen.fillRect(0, i*h, $screen_w, 1, black)
    end

    for i in (0..3)
      for j in (0..3)
        if get(i, j) != 0
          drawPlayer(i, j, get(i, j), color(get(i, j)))
        end
      end
    end

    @screen.flip
  end

  def color(player)
    if player==5
      return @screen.format.mapRGB(0, 0, 0xff)
    elsif player==1
      return @screen.format.mapRGB(0xff, 0, 0x00)
    end
    return 0
  end

  def flash(p)
    for j in (0..5)
      if j%2==0
        c = @screen.format.mapRGB(0xff, 0xff, 0xff)
      else
        c = color(p)
      end

      for i in (0..3)
        if @sumh[i]==4*p
          for t in (0..3)
            drawPlayer(t, i, p, c)
          end
        end
        if @sumv[i]==4*p
          for t in (0..3)
            drawPlayer(i, t, p, c)
          end
        end
      end
      if @sumd[0]==4*p
        for t in (0..3)
          drawPlayer(t, t, p, c)
        end
      end
      if @sumd[1]==4*p
        for t in (0..3)
          drawPlayer(t, 3-t, p, c)
        end
      end
      @screen.flip
      SDL.delay(300)
    end
  end


  def move(x, y)
    if @current_player == 0
      return
    end
    if @current_move_drop && get(x, y)==0
      put(x, y, @current_player)
      draw
      @current_move_drop = false
    end
    if @current_move_capt && get(x, y)==(6-@current_player)
      put(x, y, @current_player)
      draw
      @current_move_capt = false
    end
    if check_win!=0
      puts "Player " + check_win.to_s + " wins !"
      flash(check_win)
      @current_player = 0
    else
      if (!@current_move_drop) && (!@current_move_capt)
        @current_player = 6-@current_player
        @current_move_drop = true
        @current_move_capt = true
        puts "Next player " + @current_player.to_s
      end
    end

  end

  def check_win()
    [1,5].each{|p|
      for i in (0..3)
        if @sumh[i]==4*p
          return p
        end
        if @sumv[i]==4*p
          return p
        end
      end
      for i in (0..1)
        if @sumd[i]==4*p
          return p
        end
      end
    }
    return 0
  end
        
  def get(x,y)
    return @board[x+y*4]
  end
  
  def put(x, y, value)
    oldv = get(x, y)
    @sumh[y] = @sumh[y] - oldv + value
    @sumv[x] = @sumv[x] - oldv + value
    if (x==y)
      @sumd[0] = @sumd[0] - oldv + value
    end
    if (x==3-y)
      @sumd[1] = @sumd[1] - oldv + value
    end
    @board[x+y*4]=value
  end

  def drawPlayer(x, y, p, color)
    if p==1
      drawPlayer1(x, y, color)
    elsif p==5
      drawPlayer5(x, y, color)
    end
  end

  def drawPlayer1(x, y, color)
    w = $screen_w/4
    h = $screen_h/4
    x1 = x*w+w/3
    x2 = x*w+w-w/3
    y1 = y*h+h/3
    y2 = y*h+h-h/3
    drawLine(x1, y1, x2, y2, color)
    drawLine(x2, y1, x1, y2, color)
  end

  def drawPlayer5(x, y, color)
    w = $screen_w/4
    h = $screen_h/4
    x1 = x*w + w/2
    y1 = y*h + h/2
    oi=nil
    oj=nil
    a=0
    while a<$twopi
      i = Math.sin(a)*w/6
      j = Math.cos(a)*h/6
      @screen.putPixel(x1+i, y1+j, color)
      a=a+0.01
    end
  end

  def drawLine(x0, y0, x1, y1, color)
    dx = x1 - x0
    dy = y1 - y0
    steep = (dy.abs > dx.abs)
    if steep
      x0,y0=y0,x0
      x1,y1=y1,x1
    end
    if x0 > x1
      x0,x1=x1,x0
      y0,y1=y1,y0
    end
    dx = x1 - x0
    dy = (y1 - y0).abs
    err = 0.0
    derr = dy / dx.to_f
    y = y0
    if y0 < y1
      stepy = 1
    else
      stepy = -1
    end
    
    (x0..x1).each{|x|
      if steep
        @screen.putPixel(y, x, color)
      else
        @screen.putPixel(x, y, color)
      end
      err = err + derr
      if err >= 0.5
        y += stepy
        err -= 1.0
      end
    }
  end
end
