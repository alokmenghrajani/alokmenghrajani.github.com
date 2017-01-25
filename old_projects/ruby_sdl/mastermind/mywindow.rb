require 'sdl'

class MyWindow
  @children
  @parent

  @x
  @y
  @width
  @height
  @screen
  @dirty
  @handler

  def initialize(x, y, width, height, parent)
    @children = []
    @parent = parent
    @x = x
    @y = y
    @width = width
    @height = height
    @dirty = true
    @handler = nil

    if @parent!=nil
      @parent.children = @parent.children + [self]
      @screen = @parent.screen
    else
      SDL.init( SDL::INIT_VIDEO )
      @screen = SDL::setVideoMode(@width, @height, 32, SDL::SWSURFACE)
    end
  end

  def children
    @children
  end

  def children=(v)
    @children=v
  end
  
  def screen
    @screen
  end

  def dirty
    @dirty
  end

  def draw
    if @dirty
      puts "Draw"
      @dirty = false
      @children.each {|w|
        w.draw
      }
      if @parent==nil
        @screen.flip
      end
    end
  end

  def mouseDown(x, y)
    @children.each {|w|
      if w.mouseDown(x, y)  #TODO: fix x y coordinate for child ref
        return w
      end
    }
    if (x>=@x) && (x<=(@x+@width)) && (y>=@y) && (y<=(@y+@height))
      return self
    end
    return nil
  end

  def setDirty
    @dirty=true
    if @parent
      @parent.setDirty
    end
  end

  def setHandler(f)
    @handler = f
  end

end

class MyButton < MyWindow
  @color

  def initialize(x, y, width, height, parent)
    super(x, y, width, height, parent)

    @color = @screen.format.mapRGB(0xff, 0, 0)
  end

  def draw
    super
    @screen.fillRect(@x, @y, @width, @height, @color)
  end

  def mouseDown(x, y)
    w = super(x, y)
    if (w==self) && @handler
      #understand how to call handler...
      
    end
    return w
  end
end
