#!/usr/bin/ruby


require 'sdl'
require 'board.rb'
require 'ai.rb'

# Game constants
$screen_w = 600
$screen_h = 600

# Main
SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode($screen_w, $screen_h, 32, SDL::SWSURFACE)

red=screen.format.mapRGB(0xff,0,0)
blue=screen.format.mapRGB(0, 0, 0xff)
white = screen.format.mapRGB(0xff, 0xff, 0xff)

# draw empty board
board = Board.new(screen)
board.draw

board2 = Board2.new()
ai = AI.new(5)
puts ai.possible_moves(board2, 1)

exit


event=SDL::Event.new



# Main game loop
omx=nil
omy=nil
raiseevent = 0
while true
  if  event.poll != 0 then
    if event.type==SDL::Event::QUIT then
      break
    end
    if event.type==SDL::Event::KEYDOWN then
      exit if event.keySym==SDL::Key::ESCAPE
    end
  end

  mx=(SDL::Mouse.state[0] / ($screen_w/4)).floor
  my=(SDL::Mouse.state[1] / ($screen_h/4)).floor
  
  if (SDL::Mouse.state[2])
    omx = mx
    omy = my
    raiseevent = 1
  elsif raiseevent == 1
    if (omx == mx) && (omy == my)
      board.move(mx, my)
    end
    raiseevent = 0
  end
end
