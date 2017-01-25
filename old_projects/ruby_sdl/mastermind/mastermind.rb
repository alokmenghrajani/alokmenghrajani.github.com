#!/usr/bin/ruby

require 'mywindow.rb'
require 'pp'

# Game constants
$screen_w = 600
$screen_h = 600

# Main
win = MyWindow.new(0, 0, $screen_w, $screen_h, nil)
puts "First window: " + win.to_s

button = MyButton.new(10, 10, 50, 50, win)

win.draw

# Main game loop
event=SDL::Event.new

def handler(w, e)
  w.setColor(0, 0, 0xff)
end

SDL::WM::setCaption "He","hi"

sim_e = false
while true
  win.draw

  if  event.poll != 0 then
    if event.type==SDL::Event::QUIT then
      break
    end
    if event.type==SDL::Event::KEYDOWN then
      exit if event.keySym==SDL::Key::ESCAPE
    end
  end

  if SDL::Mouse.state[2] && !sim_e
    w = win.mouseDown(SDL::Mouse.state[0], SDL::Mouse.state[1])
    puts w.to_s
    if w
      sim_e = true
    end
  end

  if !SDL::Mouse.state[2]
    sim_e = false
  end
end
