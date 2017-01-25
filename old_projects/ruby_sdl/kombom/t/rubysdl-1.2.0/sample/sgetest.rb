require 'sdl'

SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode(640,480,16,SDL::SWSURFACE)
SDL::WM::setCaption $0, $0

# draw red pixel at (200,200)
screen[200,200]= screen.format.mapRGB(255,0,0)
# draw green pixel at (250,200)
screen[250,200]= screen.format.mapRGB(0,255,0)
# draw blue pixel at (200,200)
screen[300,200]= screen.format.mapRGB(0,0,255)

Red=screen.format.mapRGB(255,0,0)
screen.drawLine(20,20,300,200,Red)
screen.drawRect(49,59,80,80,Red)
screen.drawCircle(100,100,50,[87,87,87])
screen.drawFilledCircle(300,300,30,Red)

screen.flip

while true
  while event = SDL::Event2.poll
    case event
    when SDL::Event2::KeyDown, SDL::Event2::Quit
      exit
    end
  end

  sleep 0.2
end
