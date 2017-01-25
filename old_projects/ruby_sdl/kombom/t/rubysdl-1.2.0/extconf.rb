require 'mkmf'

if /mswin32/ =~ CONFIG["arch"]
  have_library("SDL")
else
  sdl_config = with_config('sdl-config', 'sdl-config')
  
  $CFLAGS += ' ' + `#{sdl_config} --cflags`.chomp
  $LOCAL_LIBS += ' ' + `#{sdl_config} --libs`.chomp
  
  if /-Dmain=SDL_main/ =~ $CFLAGS then
    def try_func(func, libs, headers = nil, &b)
      headers = cpp_include(headers)
      try_link(<<"SRC", libs, &b) or try_link(<<"SRC", libs, &b)
#{headers}
/*top*/
int main(int argc,char** argv) { return 0; }
int t() { #{func}(); return 0; }
SRC
#{COMMON_HEADERS}
#{headers}
/*top*/
int main(int argc,char** argv) { return 0; }
int t() { void ((*volatile p)()); p = (void ((*)()))#{func}; return 0; }
SRC
    end
  end
end

if enable_config("static-libs",false) then
  have_library("stdc++")
  have_library("z")
  have_library("png")
  have_library("tiff")
  have_library("jpeg")
  have_library("freetype")
  have_library("iconv")
  have_library("ogg")
  have_library("vorbis")
  have_library("vorbisfile")
  have_library("vorbisenc")
  have_library("winmm")
  have_library("SDL")
end

if enable_config("event2",true) then
  $CFLAGS+= " -D DEF_EVENT2"
end

if have_library("smpeg","SMPEG_new") then
  $CFLAGS+= " -D HAVE_SMPEG "
end
if have_library("SDL_mixer","Mix_OpenAudio") then
  $CFLAGS+= " -D HAVE_SDL_MIXER "
end
if have_library("SGE","sge_Line") then
  $CFLAGS+= " -D HAVE_SGE "
end
if have_library("SDL_image","IMG_Load") then
  $CFLAGS+= " -D HAVE_SDL_IMAGE "
end
if have_library("SDL_ttf","TTF_Init") then
  $CFLAGS+= " -D HAVE_SDL_TTF "
end

have_func("TTF_OpenFontIndex")
have_func("TTF_FontFaces")
have_func("TTF_FontFaceIsFixedWidth")
have_func("TTF_FontFaceFamilyName")
have_func("TTF_FontFaceStyleName")

if have_library("SDLSKK","SDLSKK_Context_new") then
  $CFLAGS+= " -D HAVE_SDLSKK "
end
if enable_config("opengl",true) then
  dir_config('x11','/usr/X11R6')
  
  $CFLAGS+= " -D DEF_OPENGL "
  if arg_config("--linkoglmodule",false) then
    $CFLAGS+= " -D INIT_OGLMODULE_FROM_SDL "
  end

  if /linux/ =~ CONFIG["arch"] then
    have_library("GL","glVertex3d")
  elsif /mingw32/ =~ CONFIG["arch"] then
    have_library("opengl32","glVertex3d")
    have_library("glu32","gluGetString")
  end
end
create_makefile("sdl")

