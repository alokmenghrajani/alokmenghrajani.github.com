# This sample needs a true type font file `sample.ttf'.
require 'sdl'

SDL.init( SDL::INIT_VIDEO )

screen = SDL::setVideoMode(640,480,16,SDL::SWSURFACE)
SDL::WM::setCaption($0,$0)

SDL::TTF.init

font = SDL::TTF.open('sample.ttf',24)
font.style = SDL::TTF::STYLE_NORMAL

font.drawSolidUTF8(screen,'test SDL_ttf',300,150,255,255,255)

screen.flip

while true
  while event = SDL::Event2.poll
    case event
    when SDL::Event2::KeyDown, SDL::Event2::Quit
      exit
    end
  end
  
end
