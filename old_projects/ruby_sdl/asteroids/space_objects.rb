class VectorObject
  @screen
  @space
  @bounding_box
  @collision
  @segments

  @pos_x
  @pos_y
  @pos_a
  @speed_x
  @speed_y
  @speed_a
  @trust

  def initialize(screen, space)
    @screen = screen
    @space = space

    @pos_x = $screen_w/2
    @pos_y = $screen_h/2
    @pos_a = 0
    @speed_x = 0
    @speed_y = 0
    @speed_a = 0
    @trust = 0

    @segments = []
    @space << self

    @collision=0
    @bounding_box = [0, 0, 0, 0]
  end

  def draw
    @segments.each{|s|
      p0 = rotate([s[0], s[1]], @pos_a)
      p1 = rotate([s[2], s[3]], @pos_a)

      x0 = @pos_x + p0[0]
      y0 = @pos_y + p0[1]
      x1 = @pos_x + p1[0]
      y1 = @pos_y + p1[1]
      drawLine(x0.floor, y0.floor, x1.floor, y1.floor, s[4])
    }

    # draw bounding boxes
    if $DEBUG_BOUNDINGBOX
      if @collision
        c = @screen.format.mapRGB(0xff, 0, 0)
      else
        c = @screen.format.mapRGB(0xff, 0xff, 0xff)
      end
      x0 = (@pos_x+@bounding_box[0]).floor
      y0 = (@pos_y+@bounding_box[1]).floor
      x1 = (@pos_x+@bounding_box[2]).floor
      y1 = (@pos_y+@bounding_box[3]).floor
      drawLine(x0, y0, x1, y0, c)
      drawLine(x1, y0, x1, y1, c)
      drawLine(x1, y1, x0, y1, c)
      drawLine(x0, y1, x0, y0, c)
      @screen.putPixel(@pos_x, @pos_y, c)
    end
  end

  def setSpeedA(x)
    @speed_a = x * $pi / 180
  end

  def setTrust(x)
    @trust=x
  end

  def update(t)
    trust_x = Math.cos(@pos_a) * @trust
    trust_y = Math.sin(@pos_a) * @trust
    @speed_x = @speed_x + trust_x * t
    @speed_y = @speed_y + trust_y * t
    @pos_x = @pos_x + @speed_x * t - trust_x * t / 2
    @pos_y = @pos_y + @speed_y * t - trust_y * t / 2

    @pos_a = @pos_a + @speed_a * t

    @pos_x = @pos_x % $screen_w
    @pos_y = @pos_y % $screen_h
    @pos_a = @pos_a % $twopi

  end

  def clear_collision
    @collision = false
  end

  def check_collisions(type)
    # Check collision
    @space.each{|o|
      if o!=self
        if box_intersect(translate(@bounding_box, pos), translate(o.bounding_box, o.pos))
          if (type==1)
            # check exact collisions. Doesn't work well for small objects moving at fast speed :(
            # (e.g. bullets)
            o.segments.each{|s1|
              @segments.each{|s2|
                p0 = rotate([s1[0], s1[1]], o.pos_a)
                p1 = rotate([s1[2], s1[3]], o.pos_a)
                
                p0[0] += o.pos_x
                p0[1] += o.pos_y
                p1[0] += o.pos_x
                p1[1] += o.pos_y
                
                q0 = rotate([s2[0], s2[1]], @pos_a)
                q1 = rotate([s2[2], s2[3]], @pos_a)
                
                q0[0] += @pos_x
                q0[1] += @pos_y
                q1[0] += @pos_x
                q1[1] += @pos_y
                
                
                if line_intersect(p0, p1, q0, q1)
                  if $DEBUG_DISPLAYINTERSECTION
                    red=@screen.format.mapRGB(0xff, 0, 0)
                    drawLine(p0[0].floor, p0[1].floor, p1[0].floor, p1[1].floor, red)
                    drawLine(q0[0].floor, q0[1].floor, q1[0].floor, q1[1].floor, red)
                    @screen.flip
                  end
                  
                  @collision=true
                  o.collision=true
                  event_collision(o)
                  o.event_collision(self)
                  if !$DEBUG_DISPLAYINTERSECTION
                    break
                  end
                end
              }
              if o.collision && !$DEBUG_DISPLAYINTERSECTION
                break
              end
            }
          else
            @collision=true
            o.collision=true
            event_collision(o)
            o.event_collision(self)
          end
        end
      end
    }
  end    

  def event_collision(o)
    # needs to be implemented by subclasses...
  end

#  protected

  # Some basic vector calculations
  def translate(box, v)
    b = [box[0]+v[0], box[1]+v[1], box[2]+v[0], box[3]+v[1]]
    return b
  end

  # Boxes must be grid aligned !
  def box_intersect(b0, b1)
    p0 = [b0[0], b0[1]]
    p1 = [b0[0], b0[3]]
    p2 = [b0[2], b0[1]]
    p3 = [b0[2], b0[3]]

    return point_in_box(p0, b1) || point_in_box(p1, b1) || point_in_box(p2, b1) || point_in_box(p3, b1)
  end
  
  def point_in_box(p, b)
    if $DEBUG_DISPLAYINTERSECTION
      print "Checking: [" + p.map{|v| v.floor}.join(",") + "], [" + b.map{|v| v.floor}.join(", ") + "]"
    end
    # There are three possible cases
    # - the box is fully contained in the screen (=> we must check if the point is in the box b)
    # - the box wraps on one of the screen borders (=> we must calculate the boxes b1 and b2, and check if the point
    #                                                  is in the box b1 or b2)
    # - the box wraps on one of the screen corners (=> we must calculate the boxes b1, b2, b3 and b4. And check if the
    #                                                  point is in the box b1, b2, b3 or b4)
    
    wrap = {"left"=>false, "top"=>false, "bottom"=>false, "right"=>false} # this hash indicates where the box wraps.

    if b[0]<0
      wrap["left"]=true
    end
    if b[2]>=$screen_w
      wrap["right"]=true
    end
    if b[1]<0
      wrap["top"]=true
    end
    if b[3]>=$screen_h
      wrap["bottom"]=true
    end
    
    boxes=[b]
    
    # Handle case of left or right wrap
    if wrap["left"]
      b1 = [b[0]+$screen_w, b[1], $screen_w-1, b[3]]
      b2 = [0, b[1], b[2], b[3]]
      boxes = [b1, b2]
    elsif wrap["right"]
      b1 = [0, b[1], b[2]-$screen_w, b[3]]
      b2 = [b[0], b[1], $screen_w-1, b[3]]
      boxes = [b1, b2]
    end
    
    # Handle case of top or bottom wrap
    nboxes=[]
    boxes.each{|t|
      if wrap["top"]
        b1 = [t[0], t[1]+$screen_h, t[2], $screen_h-1]
        b2 = [t[0], 0, t[2], t[3]]
        nboxes << b1
        nboxes << b2
      elsif wrap["bottom"]
        b1 = [t[0], 0, t[2], t[3]-$screen_h]
        b2 = [t[0], t[1], t[2], $screen_h-1]
        nboxes << b1
        nboxes << b2
      else
        nboxes << t
      end
    }
    
    # Now check if point is in one of the nboxes
    p = [p[0]%$screen_w, p[1]%$screen_h]
    nboxes.each{|t|
      r = (p[0]>=t[0]) && (p[0]<=t[2]) && (p[1]>=t[1]) && (p[1]<=t[3])
      if r
        if $DEBUG_DISPLAYINTERSECTION
          puts "true"
        end
        return true
      end
    }
    if $DEBUG_DISPLAYINTERSECTION
      puts "false"
    end
    return false
  end

  def rotate(p, angle)
    x=p[0]
    y=p[1]

    return [x*Math.cos(angle) + y*Math.sin(angle), x*Math.sin(angle) - y*Math.cos(angle)]
  end

  # This function draws a line, wrapping it if needed
  # $screen_w and $screen_h are global variables
  # uses Bresenham algorithm
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
        @screen.putPixel(y%$screen_w, x%$screen_h, color)
      else
        @screen.putPixel(x%$screen_w, y%$screen_h, color)
      end
      err = err + derr
      if err >= 0.5
        y += stepy
        err -= 1.0
      end
    }
  end

  # Calculate intersection of (p0-p1) with (p2-p3)
  def line_intersect(p0, p1, p2, p3)
    d1 = p1[0] - p0[0]
    if d1 != 0
      m1 = (p1[1] - p0[1]) / d1.to_f
    else
      m1 = (2**10).to_f
    end

    d2 = p3[0] - p2[0]
    if d2 != 0
      m2 = (p3[1] - p2[1]) / d2.to_f
    else
      m2 = (2**10).to_f
    end
    
    if m1 == m2
      return nil #parallel lines
    end

    c0 = p0[0] - p2[0]
    c1 = p0[1] - p2[1]
    
    dx1 = (c1 - (m2 * c0)) / (m2 - m1)
    x = dx1+p0[0]
    y = m1 * dx1 + p0[1]
    
    dx2 = (y - p2[1]) / m2

    if (dx1.abs < d1.abs) && (dx1*d1>0) && (dx2.abs < d2.abs) && (dx2*d2>0)
      return [x.floor, y.floor]
    else
      return nil #segments don't intersect
    end
  end

  def pos
    return [@pos_x, @pos_y]
  end

  def pos_x=(v)
    @pos_x=v
  end

  def pos_y=(v)
    @pos_y=v
  end

  def pos_a=(v)
    @pos_a=v
  end

  def pos_x
    @pos_x
  end

  def pos_y
    @pos_y
  end

  def pos_a
    @pos_a
  end

  def speed_x=(v)
    @speed_x=v
  end

  def speed_y=(v)
    @speed_y=v
  end

  def speed_a=(v)
    @speed_a=v
  end

  def bounding_box
    @bounding_box
  end

  def collision=(v)
    @collision=v
  end

  def collision
    @collision
  end

  def segments
    @segments
  end

  def add_segment(x0, y0, x1, y1, color)
    @segments << [x0, y0, x1, y1, color]
    # calculate bounding box:
    # find min_x, min_y, max_x, max_y
    max = 0
    @segments.each{|s|
      max = [max, Math.sqrt(s[0]*s[0]+s[1]*s[1]), Math.sqrt(s[2]*s[2]+s[3]*s[3])].max
    }
    @bounding_box = [-max, -max, max, max]
  end
end

class Asteroid < VectorObject
  @size
  @level

  def initialize(screen, space, size, level=1)
    super(screen, space)

    @size = size
    @level = level

    c=@screen.format.mapRGB(rand*128, rand*128, rand*128+128)
    points = Array.new(10)
    l = points.length
    oldr = rand * size
    for i in 0..(l-1)
      d = $twopi / l
      while true
        r = oldr + rand * 2 * size/2 - size/2
        if (r>(size/10)) && (r<size)
          break
        end
      end
      points[i] = [rand * d + d*i, r]
      oldr = r
    end

    ox = Math.sin(points[l-1][0]) * points[l-1][1]
    oy = Math.cos(points[l-1][0]) * points[l-1][1]
    for i in 0..(l-1)
      x = Math.sin(points[i][0]) * points[i][1]
      y = Math.cos(points[i][0]) * points[i][1]
      add_segment(ox, oy, x, y, c)
      ox = x
      oy = y
    end

    # asteroids must appear away from center...
    w = $screen_w/4
    r = rand * ($screen_w-2*w)
    @pos_x = r <= w ? r : r+($screen_w-2*w)
    h = $screen_h/4
    r = rand * ($screen_h-2*h)
    @pos_y = r <= h ? r : r+($screen_w-2*h)


    if !$DEBUG_STOPASTEROIDS
      @speed_a = (rand * 5 - 2.5) * $pi / 180
      @speed_x = rand * 3 - 1.5
      @speed_y = rand * 3 - 1.5
    else
      @pos_a = rand*$twopi
    end
  end

  def event_collision(o)
    if (o.kind_of?(Bullet))
      if @level!=0
        (0..2).each {
          a=Asteroid.new(@screen, @space, @size/2, (@level-1))
          a.pos_x = @pos_x
          a.pos_y = @pos_y
        }
      end
      @space.delete(self)
      wave = SDL::Mixer::Wave.load("asteroid_explode.wav")

      if SDL::Mixer.play?(2)
        SDL::Mixer.halt(2)
      end
      SDL::Mixer.playChannel(2, wave, 0)

    end
  end

end

class Bullet < VectorObject
  @size
  @life

  def initialize(screen, space, life)
    super(screen, space)
    @life = life
    @size = 5

    c=@screen.format.mapRGB(0xff, 0, 0)

    add_segment(@size, 0, @size/2, -@size/5*2, c)
    add_segment(@size/2, -@size/5*2, 0, 0, c)
    add_segment(0, 0, @size/2, @size/5*2, c)
    add_segment(@size/2, @size/5*2, @size, 0, c)
  end

  def update(t)
    super(t)

    @life -= t
    if @life<0
      @space.delete(self)
    end
  end

  def event_collision(o)
    # When bullet hits an asteroid, we should
    # remove it, so that the child asteroids don't die right away
    if o.kind_of?(Asteroid)
      @space.delete(self)
    end
  end
end

class Ship < VectorObject
  @size

  def initialize(screen, space, size)
    super(screen, space)
    @size = size

    c=@screen.format.mapRGB(0, 0xff, 0xff)
    add_segment(@size/2, 0, -@size/2, @size/4, c)
    add_segment(-@size/2, @size/4, -@size/2, -@size/4, c)
    add_segment(@size/2, 0, -@size/2, -@size/4, c)
  end

  def shoot
    if $game_state!=-1
      b = Bullet.new(@screen, @space, 60)
      b.pos_x = @pos_x+Math.cos(@pos_a)*@size/2
      b.pos_y = @pos_y+Math.sin(@pos_a)*@size/2
      b.pos_a = @pos_a
      b.speed_x = @speed_x + 5 * Math.cos(@pos_a)
      b.speed_y = @speed_y + 5 * Math.sin(@pos_a)

      wave = SDL::Mixer::Wave.load("fire.wav")

      if SDL::Mixer.play?(1)
        SDL::Mixer.halt(1)
      end
      SDL::Mixer.playChannel(1, wave, 0)

    end
  end

  def setTrust(v)
    if $game_state!=-1
      super(v)
      if v>0
        wave = SDL::Mixer::Wave.load("trust.wav")
        
        if !SDL::Mixer.play?(4)
          SDL::Mixer.playChannel(4, wave, 0)
        end
      else
        if SDL::Mixer.play?(4)
          SDL::Mixer.halt(4)
        end
      end
    end
  end


  def stop
    @speed_x = 0
    @speed_y = 0
    @speed_a = 0
    @trust = 0
  end

  def crash
    # When you die, your trust goes to 0 (so that the sound stops...)
    setTrust(0)

    $game_state=-1
    (0..2).each {|i|
      o = Debris.new(@screen, @space, 70, [0, 0xff, 0xff])
      o.pos_x = @pos_x
      o.pos_y = @pos_y
      a = (60+120*i)*$pi/180 + @pos_a
      s = rand * 1.5
      o.speed_x = Math.cos(a) * s
      o.speed_y = Math.sin(a) * s
    }
    @space.delete(self)

    # let's play sound...
    wave = SDL::Mixer::Wave.load("ship_explode.wav")

    if SDL::Mixer.play?(0)
      SDL::Mixer.halt(0)
    end
    SDL::Mixer.playChannel(0, wave, 0)

  end

  def event_collision(o)
    if o.kind_of?(Asteroid)
      crash
    end
  end

  def end_screen
    if $game_state==1
      # TODO: make this resolution independant

      text=[[40, 40, 40*1.4, 45], [80, 40, 40*1.4, -45], [60, 110, 100, 90],                #Y
            [140, 60, 70, -60], [140, 120, 70, 60], [175, 120, 70, -60], [175, 60, 70, 60], #O
            [250, 60, 60, 90], [266, 120, 70, 60], [302, 120, 70, -60], [318, 60, 60, 90],  #U
            [400, 60, 60, 90], [416, 120, 70, 60], [452, 120, 70, -60], [468, 60, 60, 90],
                               [486, 120, 70, 60], [522, 120, 70, -60], [538, 60, 60, 90],  #W
            [590, 90, 120, 90],                                                             #I
            [640, 90, 120, 90], [675, 90, 130, 60], [710, 90, 120, 90]
      ]
      text.each{|s|
        d = Debris.new(@screen, @space, s[2], [0, 255, 0], 200, 2)
        d.pos_x = s[0]
        d.pos_y = s[1]
        d.pos_a = s[3]*$pi/180
        d.speed_x = 0
        d.speed_y = 0
        d.speed_a = 0
      }

      wave = SDL::Mixer::Wave.load("win.wav")

      if SDL::Mixer.play?(3)
        SDL::Mixer.halt(3)
      end
      SDL::Mixer.playChannel(3, wave, 0)

    end
  end

end

class Debris < VectorObject
  @life
  @start_life
  @fx
  @color
  
  def initialize(screen, space, size, color=[0xff, 0xff, 0xff], life=150, fx=1)
    super(screen, space)

    @start_life = life
    @life = life
    @fx=fx
    @color = color
    
    c=@screen.format.mapRGB(color[0], color[1], color[2])
    add_segment(-size/2, 0, size/2, 0, c)

    @speed_a = (rand * 5 - 2.5) * $pi / 180
    @speed_x = rand * 3 - 1.5
    @speed_y = rand * 3 - 1.5
  end

  def update(t)
    super(t)

    @life -= t
    if @life<0
      @space.delete(self)
    end

    if @fx==1
      # fade the color
      c = @screen.format.mapRGB(@color[0]*@life/@start_life, @color[1]*@life/@start_life, @color[2]*@life/@start_life)
      @segments.each{|s|
        s[4] = c
      }
    elsif @fx==2
      # explode after a while
      if @life<=2
        @life=@start_life
        @fx=1
        @speed_a=(rand * 5 - 2.5) * $pi / 180
        @speed_x = rand * 1 - 0.5
        @speed_y = rand * 1 - 0.5
      end
    end
  end
end  
