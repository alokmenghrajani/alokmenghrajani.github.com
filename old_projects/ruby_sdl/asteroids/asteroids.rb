#!/usr/bin/ruby

# Let's code a little tetris game
#
#
# #### ##  ###  ##     # #     ##
#      ##   #    ##  ### ###  ##
#

require 'sdl'
require 'space_objects'

# Debugging stuff
def assert
  raise "Assertion failed !" unless yield if $DEBUG
end
$DEBUG=true

$DEBUG_BOUNDINGBOX=false
$DEBUG_STOPASTEROIDS=false
$DEBUG_DISPLAYINTERSECTION=false
$DEBUG_RANDSEED=nil

$pi = 3.141592654
$twopi = 2*$pi

$game_state=0  #0=running, 1=player wins, -1=player looses

# Game constants
$screen_w = 800
$screen_h = 600


# Main
SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode($screen_w, $screen_h, 32, SDL::SWSURFACE)

if $DEBUG_RANDSEED
  srand($DEBUG_RANDSEED)
end

# Create world
space = []
(0..4).each {
  Asteroid.new(screen, space, 50)
}
ship = Ship.new(screen, space, 60)

#puts ship.line_intersect([50, 100], [150, 100], [158, 142], [209, 177])
#puts ship.line_intersect([158, 142], [209, 177], [50, 100], [150, 100])
#exit


SDL::Mixer.open
SDL::Mixer.allocateChannels(5)

# Main game loop
SDL::Key.enable_key_repeat(100, 100)

event=SDL::Event.new

ot = SDL::getTicks
while true

  if  event.poll != 0 then
    if event.type==SDL::Event::QUIT then
      break
    end
    if event.type==SDL::Event::KEYDOWN then
      exit if event.keySym==SDL::Key::ESCAPE
    end

    if event.type==SDL::Event::KEYDOWN then
      if SDL::Key::press?SDL::Key::SPACE
        ship.shoot
      end

      if SDL::Key::press?SDL::Key::S
        ship.stop
      end

      if SDL::Key::press?SDL::Key::C
        ship.crash
      end

      if SDL::Key::press?SDL::Key::W
        space.each{|o|
          if o.kind_of?(Asteroid)
            space.delete(o)
          end
        }
      end
    end
  end

  SDL::Key::scan
  if SDL::Key::press?SDL::Key::LEFT
    ship.setSpeedA(-5)
  elsif SDL::Key::press?SDL::Key::RIGHT
    ship.setSpeedA(5)
  else
    ship.setSpeedA(0)
  end
  
  if SDL::Key::press?SDL::Key::UP
    ship.setTrust(0.1)
  else
    ship.setTrust(0)
  end


  screen.fillRect(0, 0, $screen_w, $screen_h, 0)
  space.each{|o| o.draw}
  screen.flip

  t = SDL::getTicks
  space.each{|o| o.update((t-ot.to_f)/10)}
  ot = t

  space.each{|o| o.clear_collision}
  space.each{|o| 
    if o.kind_of?(Ship)
      o.check_collisions(1)
    elsif o.kind_of?(Bullet)
      o.check_collisions(0)
    end
  }

  if $game_state!=0
    done=true
    space.each{|o|
      if o.kind_of?(Debris)
        done=false
      end
    }
    if done
      puts $game_state==1 ? "You win (score:"+SDL::getTicks.to_s+")" : "Game Over !!!"
      exit
    end
  elsif $game_state==0
    done=true
    space.each{|o|
      if o.kind_of?(Asteroid)
        done=false
      end
    }
    if done
      $game_state=1
      ship.end_screen
    end
  end
end

