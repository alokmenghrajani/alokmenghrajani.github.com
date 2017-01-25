require 'sdl'

SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode(640,480,16,SDL::SWSURFACE)
SDL::WM::setCaption $0, $0

Red=screen.format.mapRGB(255,0,0)
screen.drawAALine(20,20,300,200,Red)
screen.drawAACircle(100,100,50,[87,87,87])
screen.drawAAFilledCircle(300,300,30,Red)
screen.drawAAEllipse(320,240,100,200,[200,255,0])

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
