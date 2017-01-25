# This sample needs a mod file `sample.it'.
#
require 'sdl'
SDL::init(SDL::INIT_AUDIO)

SDL::Mixer.open(22050)
SDL::Mixer::playMusic?
music = SDL::Mixer::Music.load("sample.it")

SDL::Mixer.playMusic(music,0)

while SDL::Mixer::playMusic?
  sleep 1
end
