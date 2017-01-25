#!/usr/local/bin/ruby -Ke
#
# This sample needs following two bdf files
#   8x16.bdf     : alphabets
#   jiskan16.bdf : chinese characters and kana
# 
require 'sdl'

SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode(640,480,16,SDL::SWSURFACE)

font = SDL::Kanji.open("8x16.bdf",16)
font.add("jiskan16.bdf")
font.setCodingSystem(SDL::Kanji::EUC)

y = 0
x = 0

while true
  while event = SDL::Event2.poll
    case event
    when SDL::Event2::KeyDown, SDL::Event2::Quit
      exit
    end
  end
  screen.fillRect(0,0,640,480,0)

  y = (y + 1) % 480
  x = (x + 1) % 640
  
  font.put(screen,"SDL Kanjiのテスト中",40,y,128,128,0)
  font.putTate(screen,"縦書きもできます。",x,60,128,128,0)
               
  screen.updateRect(0,0,0,0)
  sleep 0.005
end
