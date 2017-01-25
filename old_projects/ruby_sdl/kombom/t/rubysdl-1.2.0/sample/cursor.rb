require 'sdl'

SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode(640,480,16,SDL::SWSURFACE)
screen.fillRect 0,0,640,480,[32,240,100]
screen.flip
SDL::WM::setCaption $0,$0

image=SDL::Surface.loadBMP 'cursor.bmp'
SDL::Mouse.setCursor image,image[0,0],image[1,1],image[7,0],543


while true
  
  while event = SDL::Event2.poll
    case event
    when SDL::Event2::KeyDown, SDL::Event2::Quit
      exit
    end
  end
  sleep 0.01
end
