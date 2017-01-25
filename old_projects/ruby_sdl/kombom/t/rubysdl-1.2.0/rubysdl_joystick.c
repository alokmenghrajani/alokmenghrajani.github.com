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


static VALUE sdl_getJoyPolling(VALUE class)
{
  return BOOL(SDL_JoystickEventState(SDL_QUERY)==SDL_ENABLE);
}
static VALUE sdl_setJoyPolling(VALUE class,VALUE poll)
{
  if(poll)
    SDL_JoystickEventState(SDL_ENABLE);
  else
    SDL_JoystickEventState(SDL_IGNORE);
  return poll;
}

static VALUE sdl_joystick_num(VALUE class)
{
  return INT2FIX(SDL_NumJoysticks());
}
static VALUE sdl_joystick_name(VALUE class,VALUE index)
{
  return rb_str_new2( SDL_JoystickName(NUM2INT(index)) );
}
static VALUE sdl_joystick_open(VALUE class,VALUE index)
{
  SDL_Joystick *joystick;
  joystick=SDL_JoystickOpen(NUM2INT(index));
  if(joystick==NULL)
    rb_raise(eSDLError,"Couldn't open joystick No.%d :%s",NUM2INT(index),
	     SDL_GetError());
  return Data_Wrap_Struct(class,0,0,joystick);
}
static VALUE sdl_joystick_opened(VALUE class,VALUE index)
{
  return (SDL_JoystickOpened(NUM2INT(index)))?Qtrue:Qfalse;
}
static VALUE sdl_joystick_update(VALUE class)
{
  SDL_JoystickUpdate();
  return Qnil;
}
static VALUE sdl_joystick_index(VALUE obj)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return INT2FIX(SDL_JoystickIndex(joystick));
}
static VALUE sdl_joystick_numAxes(VALUE obj)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return INT2FIX(SDL_JoystickNumAxes(joystick));
}
static VALUE sdl_joystick_numBalls(VALUE obj)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return INT2FIX(SDL_JoystickNumBalls(joystick));
}
static VALUE sdl_joystick_numHats(VALUE obj)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return INT2FIX(SDL_JoystickNumHats(joystick));
}
static VALUE sdl_joystick_numButtons(VALUE obj)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return INT2FIX(SDL_JoystickNumButtons(joystick));
}

static VALUE sdl_joystick_getAxis(VALUE obj,VALUE axis)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return INT2NUM(SDL_JoystickGetAxis(joystick,NUM2INT(axis)));
}
static VALUE sdl_joystick_getHat(VALUE obj,VALUE hat)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return UINT2NUM(SDL_JoystickGetHat(joystick,NUM2INT(hat)));
}
static VALUE sdl_joystick_getButton(VALUE obj,VALUE button)
{
  SDL_Joystick *joystick;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  return (SDL_JoystickGetButton(joystick,NUM2INT(button)))?Qtrue:Qfalse;
}
static VALUE sdl_joystick_getBall(VALUE obj,VALUE ball)
{
  SDL_Joystick *joystick;
  int dx,dy;
  Data_Get_Struct(obj,SDL_Joystick,joystick);
  if( SDL_JoystickGetBall(joystick,NUM2INT(ball),&dx,&dy)== -1 )
    rb_raise(eSDLError,"SDL_JoystickGetBall failed :%s",SDL_GetError());
  return rb_ary_new3(2,INT2FIX(dx),INT2FIX(dy));
}

static void defineConstForJoystick()
{
  rb_define_const(cJoystick,"HAT_CENTERED",UINT2NUM(SDL_HAT_CENTERED));
  rb_define_const(cJoystick,"HAT_UP",UINT2NUM(SDL_HAT_UP));
  rb_define_const(cJoystick,"HAT_RIGHT",UINT2NUM(SDL_HAT_RIGHT));
  rb_define_const(cJoystick,"HAT_DOWN",UINT2NUM(SDL_HAT_DOWN));
  rb_define_const(cJoystick,"HAT_LEFT",UINT2NUM(SDL_HAT_LEFT));
  rb_define_const(cJoystick,"HAT_RIGHTUP",UINT2NUM(SDL_HAT_RIGHTUP));
  rb_define_const(cJoystick,"HAT_RIGHTDOWN",UINT2NUM(SDL_HAT_RIGHTDOWN));
  rb_define_const(cJoystick,"HAT_LEFTUP",UINT2NUM(SDL_HAT_LEFTUP));
  rb_define_const(cJoystick,"HAT_LEFTDOWN",UINT2NUM(SDL_HAT_LEFTDOWN));
}
void init_joystick()
{
  cJoystick = rb_define_class_under(mSDL,"Joystick",rb_cObject);
  rb_define_singleton_method(cJoystick,"poll",sdl_getJoyPolling,0);
  rb_define_singleton_method(cJoystick,"poll=",sdl_setJoyPolling,1);
  rb_define_singleton_method(cJoystick,"num",sdl_joystick_num,0);
  rb_define_singleton_method(cJoystick,"indexName",sdl_joystick_name,1);
  rb_define_singleton_method(cJoystick,"open",sdl_joystick_open,1);
  rb_define_singleton_method(cJoystick,"open?",sdl_joystick_opened,1);
  rb_define_singleton_method(cJoystick,"updateAll",sdl_joystick_update,0);
  
  rb_define_method(cJoystick,"index",sdl_joystick_index,0);
  rb_define_method(cJoystick,"numAxes",sdl_joystick_numAxes,0);
  rb_define_method(cJoystick,"numBalls",sdl_joystick_numBalls,0);
  rb_define_method(cJoystick,"numHats",sdl_joystick_numHats,0);
  rb_define_method(cJoystick,"numButtons",sdl_joystick_numButtons,0);
  
  rb_define_method(cJoystick,"axis",sdl_joystick_getAxis,1);
  rb_define_method(cJoystick,"hat",sdl_joystick_getHat,1);
  rb_define_method(cJoystick,"button",sdl_joystick_getButton,1);
  rb_define_method(cJoystick,"ball",sdl_joystick_getBall,1);

  defineConstForJoystick();
}
