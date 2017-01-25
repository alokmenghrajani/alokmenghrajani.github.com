# This sample needs a wave file `sample.wav', please prepare.
require 'sdl'

SDL::init(SDL::INIT_AUDIO|SDL::INIT_VIDEO)
SDL.setVideoMode(640,480,16,SDL::SWSURFACE)

SDL::Mixer.open
wave=SDL::Mixer::Wave.load("sample.wav")

SDL::Mixer.playChannel(0,wave,0)

while SDL::Mixer::play?(0)
  sleep 1
end


