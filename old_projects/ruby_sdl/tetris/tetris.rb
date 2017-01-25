#!/usr/bin/ruby

# Let's code a little tetris game
#
#
# #### ##  ###  ##     # #     ##
#      ##   #    ##  ### ###  ##
#

require 'sdl'
require 'field.rb'
require 'piece.rb'
require 'myrand.rb'

# Game constants
$block_size = 40
$field_width = 10
$field_height = 20
$timeout = 25
$effective_timeout = $timeout
$score = 0

# test
#myrand = MyRand.new(7)
#myrand.debug
#exit

# Main
SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode(($field_width+2)*$block_size, $field_height*$block_size,16,SDL::SWSURFACE)

red=screen.format.mapRGB(0xff,0,0)
blue=screen.format.mapRGB(0, 0, 0xff)
blue2=screen.format.mapRGB(0, 0, 0x99)

# Fill screen black
screen.fillRect(0, 0, ($field_width+2) * $block_size, $field_height * $block_size, 0)

# Draw border
for i in (0..($field_height-1))
  screen.fillRect(0, i*$block_size, $block_size, $block_size, red);
  screen.fillRect(($field_width+1)*$block_size, i*$block_size, $block_size, $block_size, red);	
end
screen.flip

##current_piece = Piece.new(screen)


event=SDL::Event.new

field = Field.new(screen)

SDL::Key.enable_key_repeat(100, 100)

# Main game loop
while true
  if  event.poll != 0 then
    if event.type==SDL::Event::QUIT then
      break
    end
    if event.type==SDL::Event::KEYDOWN then
      exit if event.keySym==SDL::Key::ESCAPE
    end

    if event.type==SDL::Event::KEYDOWN then
      if event.keySym==SDL::Key::A
        field.current_piece.moveCCW
      end

      if event.keySym==SDL::Key::D
	field.current_piece.moveCW
      end

      if event.keySym==SDL::Key::LEFT
        field.current_piece.moveLeft
      end

      if event.keySym==SDL::Key::RIGHT
	field.current_piece.moveRight
      end

    end
  end

  SDL::Key::scan
  if SDL::Key::press?SDL::Key::DOWN
    $effective_timeout = $timeout / 4
  else
    $effective_timeout = $timeout
  end


  SDL.delay(1)

  field.moveTimer
end

