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

#include <SDL.h>
#include <ruby.h>
#include <stdio.h>
#ifndef UINT2NUM
#define UINT2NUM(v) INT2NUM(v)
#endif

#ifdef DEF_GLOBAL
#define GLOBAL
#else
#define GLOBAL extern
#endif

#ifdef StringValuePtr
#define GETCSTR(v) StringValuePtr(v)
#else
#define GETCSTR(v) STR2CSTR(v)
#endif

GLOBAL VALUE mSDL;
GLOBAL VALUE eSDLError;
GLOBAL VALUE cVideoInfo;
GLOBAL VALUE cSurface;
GLOBAL VALUE cScreen;
GLOBAL VALUE cEvent;
GLOBAL VALUE mKey;
GLOBAL VALUE mMixer;
GLOBAL VALUE cWave;
GLOBAL VALUE cMusic;
GLOBAL VALUE mWM;
GLOBAL VALUE mMouse;
GLOBAL VALUE cTTF;
GLOBAL VALUE cJoystick;
GLOBAL VALUE cCD;
GLOBAL VALUE cMPEG;
GLOBAL VALUE cMPEGInfo;
GLOBAL VALUE mSDLSKK;
GLOBAL VALUE cContext;
GLOBAL VALUE cDictionary;
GLOBAL VALUE cRomKanaRuleTable;
GLOBAL VALUE cKeybind;

#ifdef HAVE_SGE
GLOBAL VALUE cCollisionMap;
GLOBAL VALUE cBMFont;
#endif /* ifdef HAVE_SGE */

#ifdef DEF_EVENT2
GLOBAL VALUE cEvent2;
GLOBAL VALUE cActiveEvent;
GLOBAL VALUE cKeyDownEvent;
GLOBAL VALUE cKeyUpEvent;
GLOBAL VALUE cMouseMotionEvent;
GLOBAL VALUE cMouseButtonDownEvent;
GLOBAL VALUE cMouseButtonUpEvent;
GLOBAL VALUE cJoyAxisEvent;
GLOBAL VALUE cJoyBallEvent;
GLOBAL VALUE cJoyHatEvent;
GLOBAL VALUE cJoyButtonUpEvent;
GLOBAL VALUE cJoyButtonDownEvent;
GLOBAL VALUE cQuitEvent;
GLOBAL VALUE cSysWMEvent;
GLOBAL VALUE cVideoResizeEvent;
GLOBAL VALUE cVideoExposeEvent;
#endif

#define SetRect(Rect,X,Y,W,H) \
do{ \
  Rect.x=NUM2INT(X); \
  Rect.y=NUM2INT(Y); \
  Rect.w=NUM2INT(W); \
  Rect.h=NUM2INT(H); \
}while(0) \

#define BOOL(x) (x)?Qtrue:Qfalse

#ifndef SDL_VERSION_ATLEAST
#define SDL_COMPILEDVERSION SDL_VERSIONNUM(SDL_MAJOR_VERSION, SDL_MINOR_VERSION, SDL_PATCHLEVEL)
     
#define SDL_VERSION_ATLEAST(X, Y, Z) (SDL_COMPILEDVERSION >= SDL_VERSIONNUM(X, Y, Z))
     
#endif

Uint32 VALUE2COLOR(VALUE color,SDL_PixelFormat *format);
void rubysdl_putPixel(SDL_Surface *surface, Sint16 x, Sint16 y, Uint32 color);
Uint32 rubysdl_getPixel(SDL_Surface *surface, Sint16 x, Sint16 y);
void sdl_freeSurface(SDL_Surface* surface);
int rubysdl_is_quit(void);
SDL_RWops* rubysdl_RWops_from_ruby_obj(VALUE obj);
