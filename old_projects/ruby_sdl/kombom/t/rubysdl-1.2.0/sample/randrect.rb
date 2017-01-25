# SDL random rect sample
# original code by adas@geocities.co.jp written by C
# auther TAMURA Kenichi <sgs02516@nifty.com>
#
require 'sdl'

src_w = 640
src_h = 480
src_d = 16

dst_w = 0
dst_h = 0

MAX = 1000
RECTSIZE = 400

SDL.init SDL::INIT_VIDEO
screen = SDL::setVideoMode src_w,src_h,src_d, SDL::SWSURFACE|SDL::ANYFORMAT

srand

(1 .. MAX).each do |i|
  color = screen.mapRGB rand(256),rand(256),rand(256)
  dst_w = rand(RECTSIZE) + 1
  dst_h = rand(RECTSIZE) + 1
  screen.fillRect rand(src_w-dst_w), rand(src_h-dst_h), dst_w, dst_h, color
  screen.updateRect 0,0,0,0

  while event = SDL::Event2.poll
    case event
    when SDL::Event2::Quit
      exit
    when SDL::Event2::KeyDown
      exit if event.sym == SDL::Key::ESCAPE
    end
  end

  SDL::Key.scan
end

