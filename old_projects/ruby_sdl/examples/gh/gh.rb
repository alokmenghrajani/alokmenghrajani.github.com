#!/usr/bin/ruby

require 'sdl'

SDL.init( SDL::INIT_VIDEO )
screen = SDL::setVideoMode(640,480,16,SDL::SWSURFACE)
SDL::WM.setCaption 'gh for ruby','gh for ruby'
SDL::TTF.init
font=SDL::TTF.open('font.ttf',20)
font.style=SDL::TTF::STYLE_NORMAL

require 'system.rb'
require 'state.rb'
require 'const.rb'
require 'player.rb'
require 'gem.rb'
require 'enemy.rb'

Key = Struct.new("Key",:left,:right,:jump,:send)

items = []
enemies = []
system=System.new

player=Player.new(system)
event=SDL::Event.new
key=Key.new

White=screen.format.mapRGB(0xff,0xff,0xff)
Red=screen.format.mapRGB(0xff,0,0)
White_Array= [0xff,0xff,0xff]

before=now=SDL::getTicks-1

while system.continue_game?
  if  event.poll != 0 then
    if event.type==SDL::Event::QUIT then
      break
    end
    if event.type==SDL::Event::KEYDOWN then
      exit if event.keySym==SDL::Key::ESCAPE
    end
  end
  SDL::Key::scan
  key.left = SDL::Key::press?(SDL::Key::LEFT)
  key.right = SDL::Key::press?(SDL::Key::RIGHT)
  key.jump = SDL::Key::press?(SDL::Key::UP)
  key.send = SDL::Key::press?(SDL::Key::DOWN)
  
  before=now
  now=SDL::getTicks
  dt=now-before
  
  items << Gem2.new if make_gem?(dt)
  enemies << EnemyA.new if make_enemyA?(dt)
  enemies << EnemyB.new if make_enemyB?(dt)
  
  player.act(key,dt)
  if key.send && send_loc?(player.x,player.w) then
    system.send_gem
  end
  items.each {|i| i.act(dt)}
  enemies.each{|i| i.act(dt)}
  enemies.each{|i| player.collision_enemy if collision?(player,i) }
  
  items.delete_if do |i|
    if i.erase? then
      if i.instance_of?(Gem2)
	system.miss_gem
      end
      true
    elsif collision?(player,i)
      system.get_gem(1)
      true
    else
      false
    end
  end

  enemies.delete_if{|i| i.erase? }
  
  screen.fillRect(0,0,640,480,0)
  #draw field
  screen.fillRect(LWALL_X,CEIL_Y,RWALL_X-LWALL_X,FLOOR_Y-CEIL_Y,White)
  screen.fillRect( LWALL_X, FLOOR_Y, LWALL_X+SEND_FIELD_WIDTH, FLOOR_Y, Red)
  screen.fillRect( RWALL_X-SEND_FIELD_WIDTH, FLOOR_Y, RWALL_X, FLOOR_Y, Red)
  
  player.draw(screen)
  items.each{|i| i.draw(screen)}
  enemies.each{|i| i.draw(screen)}
  font.drawSolidUTF8(screen,"score:#{system.score}",150,10,*White_Array)
  font.drawSolidUTF8(screen,"life:#{system.life}",50,10,*White_Array)
  font.drawSolidUTF8(screen,"gem:#{system.num_gem}",350,10,*White_Array)
  font.drawSolidUTF8(screen,"rate:#{system.counter}",450,10,*White_Array)
  font.drawSolidUTF8(screen,"miss:#{system.miss}",550,10,*White_Array)
  font.drawSolidUTF8(screen,system.system_str,50,40,*White_Array)
  ObjectSpace.garbage_collect
  screen.flip
end

print "score:#{system.score}\n"
