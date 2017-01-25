# This sample needs a MPEG file `sample.mpg'.
require 'sdl'

SDL.init( SDL::INIT_VIDEO|SDL::INIT_AUDIO )
SDL::Mixer.open

screen = SDL.setVideoMode( 320, 240, 16, SDL::SWSURFACE )

mpeg = SDL::MPEG.load( 'sample.mpg' )

info = mpeg.info

p(info)

mpeg.enableAudio true
mpeg.enableVideo true

mpeg.setDisplay(screen)
mpeg.setDisplayRegion( 0, 0, screen.w, screen.h )
mpeg.play

loop do

  case event = SDL::Event2.poll
  when SDL::Event2::Quit
    mpeg.stop
    exit
  when SDL::Event2::KeyDown
    case event.sym
    when SDL::Key::S
      mpeg.stop
    when SDL::Key::P
      mpeg.play
    when SDL::Key::R
      mpeg.rewind
    when SDL::Key::ESCAPE
      exit      
    end
  end

  if mpeg.status != SDL::MPEG::PLAYING then
    mpeg.stop
    exit
  end
      
  sleep 0.1
  
end
