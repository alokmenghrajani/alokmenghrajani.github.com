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
#include "rubysdl.h"

static VALUE sdl_wm_getCaption(VALUE mod)
{
  char *title,*icon;
  SDL_WM_GetCaption( &title,&icon );
  return rb_ary_new3( 2,rb_str_new2(title),rb_str_new2(icon) );
}
static VALUE sdl_wm_setCaption(VALUE mod,VALUE title,VALUE icon)
{
  SDL_WM_SetCaption( GETCSTR(title),GETCSTR(icon) );
  return Qnil;
}
static VALUE sdl_wm_setIcon(VALUE mod,VALUE icon)
{
  SDL_Surface *surface;
  if( ! rb_obj_is_kind_of(icon,cSurface) )
    rb_raise(rb_eArgError,"type mismatch (expected Surface)");
  Data_Get_Struct(icon,SDL_Surface,surface);
  SDL_WM_SetIcon(surface,NULL);
  return Qnil;
}
static VALUE sdl_wm_iconifyWindow(VALUE mod)
{
  if( ! SDL_WM_IconifyWindow() )
    rb_raise( eSDLError,"iconify failed: %s",SDL_GetError() );
  return Qnil;
}

static void defineConstForWM()
{
  rb_define_const(mWM,"GRAB_QUERY",INT2NUM(SDL_GRAB_QUERY));
  rb_define_const(mWM,"GRAB_OFF",INT2NUM(SDL_GRAB_OFF));
  rb_define_const(mWM,"GRAB_ON",INT2NUM(SDL_GRAB_ON));
}

static VALUE sdl_wm_grabInput(VALUE mod, VALUE flag)
{
   return INT2FIX(SDL_WM_GrabInput(flag));
}

void init_wm()
{
  mWM=rb_define_module_under(mSDL,"WM");
  rb_define_module_function(mWM,"caption",sdl_wm_getCaption,0);
  rb_define_module_function(mWM,"setCaption",sdl_wm_setCaption,2);
  rb_define_module_function(mWM,"icon=",sdl_wm_setIcon,1);
  rb_define_module_function(mWM,"iconify",sdl_wm_iconifyWindow,0);
  rb_define_module_function(mWM,"grabInput",sdl_wm_grabInput,1);

  defineConstForWM();
}
