require 'sdl'

SDL.init( SDL::INIT_CDROM )

print SDL::CD.numDrive,"\n"
print SDL::CD.indexName(0),"\n"
cd=SDL::CD.open(0)
cd.status
print cd.numTracks," ",cd.status, "\n"

begin
  cd.playTracks 1,0,1,0
  sleep 100
ensure
  cd.stop
end

