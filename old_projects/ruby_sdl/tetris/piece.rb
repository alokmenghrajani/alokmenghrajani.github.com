class Piece
  @@pieces = [ [0, 0, 0, 0,
  	        1, 1, 1, 1,
	        0, 0, 0, 0,
	        0, 0, 0, 0],

	       [0, 0, 0, 0,
                0, 2, 2, 0,
                0, 2, 2, 0,
                0, 0, 0, 0],

               [0, 0, 0, 0,
                0, 3, 3, 3,
                0, 0, 3, 0,
                0, 0, 0, 0],

               [0, 0, 0, 0,
                0, 4, 4, 4,
                0, 4, 0, 0,
                0, 0, 0, 0],

               [0, 0, 0, 0,
                5, 5, 5, 0,
                0, 0, 5, 0,
                0, 0, 0, 0],

               [0, 0, 0, 0,
                6, 6, 0, 0,
                0, 6, 6, 0,
                0, 0, 0, 0],

               [0, 0, 0, 0,
                0, 0, 7, 7,
                0, 7, 7, 0,
                0, 0, 0, 0]]
	
  @pos_x
  @pos_y
  @color
  @blocks
  @timeout
  @piece
  @field

  def initialize(field)
    @timeout = $effective_timeout
    @field = field

    create_piece
  end

  def create_piece
    @pos_x = $field_width/2-1
    @pos_y = 0
    @piece = rand(7)

    @color = @field.colors[7+@piece]

    @blocks = Array.new(16, 0)
    for i in (0..3)
      for j in (0..3)
         @blocks[i*4+j]=@@pieces[@piece][i*4+j]
      end
    end

    draw(@color)
    @field.screen.flip
  end

  def blocks
    @blocks
  end

  def pos_x
    @pos_x
  end

  def pos_y
    @pos_y
  end

  def timeout
    @timeout
  end

  def timeout=(t)
    @timeout=t
  end

  def draw(color)
    for i in (0..3)
      for j in (0..3)
        if @blocks[i*4+j]!=0
          @field.drawBlock(@pos_x+j, @pos_y+i, color)
        end
      end
    end
  end

  def fix
    @color = @field.colors[@piece]
    draw(@color)
    @field.screen.flip
  end

  def rotateCCW
    t = Array.new(16, 0)
    for i in (0..3)
      for j in (0..3)
        t[i*4+j] = @blocks[3-i+j*4]
      end
    end
    @blocks = t
  end

  def rotateCW
    t = Array.new(16, 0)
    for i in (0..3)
      for j in (0..3)
        t[3-i+j*4] = @blocks[i*4+j]
      end
    end
    @blocks = t
  end

  def moveDown
    draw(0)
    @pos_y = @pos_y+1
    if @field.checkPos(self)
      draw(@color)
      @field.screen.flip
      return true
    else
      @pos_y = @pos_y-1
      draw(@color)
      return false
    end
  end

  def moveLeft
    draw(0)
    @pos_x = @pos_x-1
    if @field.checkPos(self)
      draw(@color)
      @field.screen.flip
      @timeout = @timeout + ($effective_timeout-@timeout)/2
      return true
    else
      @pos_x=@pos_x+1
      draw(@color)
      return false
    end
  end

  def moveRight
    draw(0)
    @pos_x = @pos_x+1
    if @field.checkPos(self)
      draw(@color)
      @field.screen.flip
      @timeout = @timeout + ($effective_timeout-@timeout)/2
      return true
    else
      @pos_x=@pos_x-1
      draw(@color)
      return false
    end
  end

  def moveCW
    draw(0)
    rotateCW
    if @field.checkPos(self)
      draw(@color)
      @field.screen.flip
      @timeout = @timeout + ($effective_timeout-@timeout)/2
      return true
    else
      rotateCCW
      draw(@color)
      return false
    end
  end

  def moveCCW
    draw(0)
    rotateCCW
    if @field.checkPos(self)
      draw(@color)
      @field.screen.flip
      @timeout = @timeout + ($effective_timeout-@timeout)/2
      return true
    else
      rotateCW
      draw(@color)
      return false
    end
  end

end 
