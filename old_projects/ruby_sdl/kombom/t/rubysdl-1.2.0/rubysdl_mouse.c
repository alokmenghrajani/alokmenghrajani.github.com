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

static SDL_Cursor *cursor=NULL;

static void defineConstForMouse()
{
  rb_define_const(mMouse,"BUTTON_LEFT",INT2NUM(SDL_BUTTON_LEFT));
  rb_define_const(mMouse,"BUTTON_MIDDLE",INT2NUM(SDL_BUTTON_MIDDLE));
  rb_define_const(mMouse,"BUTTON_RIGHT",INT2NUM(SDL_BUTTON_RIGHT));
  rb_define_const(mMouse,"BUTTON_LMASK",UINT2NUM(SDL_BUTTON_LMASK));
  rb_define_const(mMouse,"BUTTON_MMASK",UINT2NUM(SDL_BUTTON_MMASK));
  rb_define_const(mMouse,"BUTTON_RMASK",UINT2NUM(SDL_BUTTON_RMASK));
}

static VALUE sdl_getMouseState(VALUE mod)
{
  int x,y;
  Uint8 result;
  result=SDL_GetMouseState(&x,&y);
  return rb_ary_new3(5,INT2FIX(x),INT2FIX(y),BOOL(result&SDL_BUTTON_LMASK),
		     BOOL(result&SDL_BUTTON_MMASK),
		     BOOL(result&SDL_BUTTON_RMASK));
}
static VALUE sdl_warpMouse(VALUE mod,VALUE x,VALUE y)
{
  SDL_WarpMouse( NUM2UINT(x),NUM2UINT(y) );
  return Qnil;
}

static VALUE sdl_setCursor_imp(VALUE mod,VALUE data,VALUE mask,VALUE w,
			       VALUE h,VALUE hot_x,VALUE hot_y)
{
  SDL_Cursor *newCursor;
  newCursor=SDL_CreateCursor(GETCSTR(data),GETCSTR(mask),NUM2INT(w),
			     NUM2INT(h),NUM2INT(hot_x),NUM2INT(hot_y));
  if( newCursor==NULL )
    rb_raise(eSDLError,"cursor creation failed :%s",SDL_GetError());
  SDL_SetCursor(newCursor);
  
  /* free old cursor */
  if( cursor!=NULL )
    SDL_FreeCursor(cursor);
  cursor=newCursor;
  
  return Qnil;
}
  
static VALUE sdl_showCursor(VALUE mod)
{
  SDL_ShowCursor(1);
  return Qnil;
}
static VALUE sdl_hideCursor(VALUE mod)
{
  SDL_ShowCursor(0);
  return Qnil;
}
static VALUE sdl_showedCursor(VALUE mod)
{
  if(SDL_ShowCursor(SDL_QUERY) == SDL_ENABLE)
    return Qtrue;
  else
    return Qfalse;
}

void init_mouse()
{
  mMouse=rb_define_module_under(mSDL,"Mouse");
  
  rb_define_module_function(mMouse,"state",sdl_getMouseState,0);
  rb_define_module_function(mMouse,"warp",sdl_warpMouse,2);
  rb_define_module_function(mMouse,"setCursor_imp",sdl_setCursor_imp,6);
  rb_define_module_function(mMouse,"show",sdl_showCursor,0);
  rb_define_module_function(mMouse,"hide",sdl_hideCursor,0);
  rb_define_module_function(mMouse,"show?",sdl_showedCursor,0);
  defineConstForMouse();
}
