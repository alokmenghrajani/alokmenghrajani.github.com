#
# Usage:
#    ruby joy2.rb [n]
#      n: if given, use n'th joystick
#           if not given, show all connected joystick
# 
require 'sdl'

White = [255,255,255]

def print_joystick_info
  for i in 0..SDL::Joystick.num-1
    print i,":",SDL::Joystick.indexName(0),"\n"
  end
end

def display_button_state ( screen, joy )
  for i in 0..joy.numButtons-1
    if joy.button(i) then
      screen.fillRect( i*30+30, 50, 10, 10, [0,0,128] )
    else
      screen.fillRect( i*30+30, 50, 10, 10, White )
    end
  end
end

def display_hat_state ( screen, joy )
  # display the state of only first hat  
  if joy.numHats > 0 then
    x = y = 0
    x = 1 if  ( joy.hat(0) & SDL::Joystick::HAT_RIGHT ) != 0
    x = -1 if ( joy.hat(0) & SDL::Joystick::HAT_LEFT ) != 0
    y = 1 if ( joy.hat(0) & SDL::Joystick::HAT_DOWN ) != 0
    y = -1 if ( joy.hat(0) & SDL::Joystick::HAT_UP ) != 0
    screen.fillRect( 450 + x*40, 200 + y*40, 10, 10, White )
  end
end

def display_axis_state ( screen, joy )
  for i in 0..joy.numAxes-1
    screen.fillRect( i*30+130, joy.axis(i)*100/32768+200, 20, 20, White )
  end
end

SDL.init( SDL::INIT_VIDEO|SDL::INIT_JOYSTICK )
screen = SDL::setVideoMode(640, 480, 16, SDL::SWSURFACE)

if SDL::Joystick.num == 0 then
  print "No joystick available\n"
  exit
end

if ARGV.size == 0 then
  print_joystick_info
  exit
end

joynum = ARGV[0].to_i

if SDL::Joystick.num < joynum then
  print "Joystick No.#{joynum} is not available\n"
  exit
end

joy=SDL::Joystick.open(joynum)

while true

  while event = SDL::Event2.poll
    case event
    when SDL::Event2::KeyDown, SDL::Event2::Quit
      exit
    end
  end
  SDL::Joystick.updateAll
  screen.fillRect(0,0,640,480,0)
  display_button_state screen, joy
  display_hat_state screen, joy
  display_axis_state screen, joy
  screen.updateRect(0, 0, 0, 0)
end
