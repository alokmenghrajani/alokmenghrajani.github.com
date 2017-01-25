/*
  Ruby/SDL   Ruby extension library for SDL

  Copyright (C) 2001-2006 Ohbayashi Ippei
  
  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public
  License along with this library; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
  */

#define DEF_GLOBAL
#include "rubysdl.h"
#include <signal.h>
#include <stdio.h>

/* declaration of initialize functions */
void init_video();
#ifdef HAVE_SGE
void init_sge_video();
#else
void init_pixel();
#endif
#ifdef DEF_OPENGL
void init_opengl();
#ifdef INIT_OGLMODULE_FROM_SDL
void Init_opengl();
#endif
#endif
#ifdef HAVE_SDL_IMAGE
void init_sdl_image();
#endif
void init_event();
#ifdef DEF_EVENT2
void init_event2();
#endif
void init_keyEvent();
void init_mouse();
void init_joystick();
void init_cdrom();
void init_time();
void init_wm();
void init_kanji(void);
#ifdef HAVE_SDL_TTF
void init_ttf();
void quit_ttf();
#endif
#ifdef HAVE_SDL_MIXER
void  init_mixer();
void quit_mixer();
#endif
#ifdef HAVE_SMPEG
void init_smpeg();
#endif

#ifdef HAVE_SDLSKK
void init_sdlskk();
#endif

static void sdl_quit();
static VALUE sdl_init(VALUE obj,VALUE flags)
{
  Uint32 flag;
  
  rb_secure(4);
  flag= NUM2UINT(flags);
  if( SDL_Init(flag) < 0 )
    rb_raise(eSDLError,"Couldn't initialize SDL: %s",SDL_GetError());
  return Qnil;
}

static VALUE sdl_initSubSystem(VALUE obj,VALUE flags)
{
  if( SDL_InitSubSystem(NUM2UINT(flags)) < 0 )
    rb_raise(eSDLError,"Couldn't initialize SDL subsystem: %s",SDL_GetError());
  return Qnil;
}

static VALUE sdl_wasInit(VALUE mod,VALUE flags)
{
  return UINT2NUM( SDL_WasInit(NUM2UINT(flags)) );
}

static VALUE sdl_putenv(VALUE mod,VALUE var)
{
  if( putenv(GETCSTR(var)) < 0 ){
    rb_raise(eSDLError,"Can't put environ variable: %s", GETCSTR(var));
  }
  return Qnil;
}

static VALUE sdl_getenv(VALUE mod,VALUE name)
{
  char* result = getenv(GETCSTR(name));
  if( result == NULL ){
    rb_raise(eSDLError,"Can't get environ variable: %s", GETCSTR(name));
  }
  return rb_str_new2(result);
}

static int is_quit=0;
int rubysdl_is_quit(void)
{
  return is_quit;
}
static void sdl_quit()
{
#ifdef HAVE_SDL_MIXER
  quit_mixer();
#endif
#ifdef HAVE_SDL_TTF
  quit_ttf();
#endif
  is_quit = 1;
  SDL_Quit();
  return ;
}

static VALUE sdl_rb_quit(VALUE obj)
{
  sdl_quit();
  return Qnil;
}

static void defineConst()
{
  rb_define_const(mSDL,"INIT_TIMER",UINT2NUM(SDL_INIT_TIMER));
  rb_define_const(mSDL,"INIT_AUDIO",UINT2NUM(SDL_INIT_AUDIO));
  rb_define_const(mSDL,"INIT_VIDEO",UINT2NUM(SDL_INIT_VIDEO));
  rb_define_const(mSDL,"INIT_CDROM",UINT2NUM(SDL_INIT_CDROM));
  rb_define_const(mSDL,"INIT_JOYSTICK",UINT2NUM(SDL_INIT_JOYSTICK));
  rb_define_const(mSDL,"INIT_NOPARACHUTE",UINT2NUM(SDL_INIT_NOPARACHUTE));
  rb_define_const(mSDL,"INIT_EVENTTHREAD",UINT2NUM(SDL_INIT_EVENTTHREAD));
  rb_define_const(mSDL,"INIT_EVERYTHING",UINT2NUM(SDL_INIT_EVERYTHING));
}


void Init_sdl()
{
  mSDL = rb_define_module("SDL");
  eSDLError = rb_define_class_under(mSDL,"Error",rb_eStandardError);
  rb_define_module_function(mSDL,"init",sdl_init,1);
  rb_define_module_function(mSDL,"initedSystem",sdl_wasInit,1);
  rb_define_module_function(mSDL,"initSubSystem",sdl_initSubSystem,1);
  rb_define_module_function(mSDL,"quit",sdl_rb_quit,0);
  rb_define_module_function(mSDL,"putenv",sdl_putenv,1);
  rb_define_module_function(mSDL,"getenv",sdl_getenv,1);
  
  defineConst();


  init_video();
#ifdef HAVE_SGE
  init_sge_video();
#else
  init_pixel();
#endif
#ifdef DEF_OPENGL
  init_opengl();
#ifdef INIT_OGLMODULE_FROM_SDL
  Init_opengl();
#endif
#endif
#ifdef HAVE_SDL_IMAGE
  init_sdl_image();
#endif
  init_event();
#ifdef DEF_EVENT2
  init_event2();
#endif
  init_keyEvent();
  init_mouse();
  init_joystick();
  init_cdrom();
  init_time();
  init_wm();
  init_kanji();
#ifdef HAVE_SDL_TTF
  init_ttf();
#endif
#ifdef HAVE_SDL_MIXER
  init_mixer();
#endif
#ifdef HAVE_SMPEG
  init_smpeg();
#endif
#ifdef HAVE_SDLSKK
  init_sdlskk();
#endif
  rb_set_end_proc(sdl_quit,0); 
}


