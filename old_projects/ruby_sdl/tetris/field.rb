'require piece.rb'

class Field
  @current_piece
  @screen
  @field
  @colors

  def initialize(screen)
    @screen = screen

    @colors = [screen.format.mapRGB(0, 0, 0xaa), screen.format.mapRGB(0, 0x80, 0), screen.format.mapRGB(0, 0xaa, 0xaa),
               screen.format.mapRGB(0xff, 0xff, 0), screen.format.mapRGB(0x8b, 0x36, 0x26), screen.format.mapRGB(0xcc, 0x32, 0x99),
               screen.format.mapRGB(0xda, 0xa5, 0x20),
               screen.format.mapRGB(0, 0, 0xff), screen.format.mapRGB(0, 0xee, 0x76), screen.format.mapRGB(0, 0xff, 0xff),
               screen.format.mapRGB(0xaa, 0xaa, 0), screen.format.mapRGB(0xff, 0x63, 0x47), screen.format.mapRGB(0xee, 0x82, 0xee),
               screen.format.mapRGB(0xff, 0xff, 0)]

    # The memory representation of the game field has 2 extra lines on top (from where pieces start to appear)
    # and an extra ground line
    @field = Array.new(($field_width+2)*($field_height+3), 0)
    for i in 0..($field_height+3-1)
      # left border
      @field[i*($field_width+2)] = -1
      # right border
      @field[i*($field_width+2)+$field_width+1] = -1
    end
    for i in 0..($field_width+2-1)
      # bottom
      @field[($field_height+3-1)*($field_width+2)+i] = -1
    end

    @current_piece = Piece.new(self)
  end

  def colors
    @colors
  end

  def screen
    @screen
  end

  def current_piece
    @current_piece
  end

  def drawBlock(x, y, color)
    @screen.fillRect(x*$block_size+1, (y-2)*$block_size+1, $block_size-2, $block_size-2, color)
  end

  def checkPos(p)
    for i in (0..3)
      for j in (0..3)
        if p.blocks[i*4+j]!=0
          if @field[(p.pos_y+i)*($field_width+2)+(p.pos_x+j)]!=0
            return false
          end
        end
      end
    end
    return true
  end

  # This is like moveDown, except we
  # lock the piece if we can't go down...
  def moveTimer
    @current_piece.timeout = @current_piece.timeout-1
    if @current_piece.timeout != 0
      return
    end
 
    @current_piece.timeout = $effective_timeout

    if !@current_piece.moveDown
      # update field
      for i in (0..3)
        for j in (0..3)
          if @current_piece.blocks[i*4+j]!=0
            @field[(@current_piece.pos_y+i)*($field_width+2)+(@current_piece.pos_x+j)]=@current_piece.blocks[i*4+j]
          end
        end
      end

      current_piece.fix

      # let's check if we have cleared any rows
      rows = []
      for i in (0..3)
	# check this row
        ok = true
	for z in 1..$field_width
          if @field[(@current_piece.pos_y+i)*($field_width+2)+z]==0
            ok = false
            break
          end
        end
        if ok
	  if (@current_piece.pos_y+i)<($field_height+2)  # ignore the floow
	    # TODO: async row deletion
            rows = rows + [@current_piece.pos_y+i]
          end
        end
      end

      for i in (0..1)
        rows.each {|r|
          for z in 1..$field_width
	    drawBlock(z, r, @screen.format.mapRGB(0, 0xaa, 0xaa))
          end
        }
        @screen.flip
        # sleep a little
        SDL.delay(1)
        rows.each {|r|
          for z in 1..$field_width
	    drawBlock(z, r, @screen.format.mapRGB(0xaa, 0x77, 0x99))
          end
        }
        @screen.flip
        SDL.delay(1)
      end

      # Now let's collapse the field
      rows.each {|r|
        r.downto(1){|l|
          for z in 1..$field_width
            @field[l*($field_width+2)+z]=@field[(l-1)*($field_width+2)+z]
          end
	}
        for z in 1..$field_width
          @field[z]=0
        end
      }

      if rows.size>0
        $score = $score + rows.size*2-1

        # And update the screen
        @screen.fillRect($block_size, $block_size, $field_width * $block_size, $field_height * $block_size, 0)
        for i in 2..($field_height+1)
          for j in 1..$field_width
            t = @field[i*($field_width+2)+j]
            if t!=0
              drawBlock(j, i, @colors[t-1])
            end
          end
        end
        @screen.flip
      end

      @current_piece.create_piece

      if !checkPos(@current_piece)
        gameover
      end
    end
  end

  def gameover
    ($field_height+1).downto(0) {|l|
      for z in 1..$field_width
        drawBlock(z, l, @screen.format.mapRGB(0, 0x77, 0x99))
      end
      @screen.flip
      SDL.delay(1)
    }
    sleep 1
    puts "Your score: " + $score.to_s
    exit
  end


  # For debugging purpose...
  def printField
    for i in 0..$field_height+3-1
      for j in 0..$field_width+2-1
        t=@field[i*($field_width+2)+j]
        if t==-1
          print "*"
        else
          print t
        end
      end
      puts
    end
  end
        
end
