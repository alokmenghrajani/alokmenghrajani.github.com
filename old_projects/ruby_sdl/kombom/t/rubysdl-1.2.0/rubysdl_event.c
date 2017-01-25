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

void eventCheck(int pred,char *msg)
{
  if(!pred) 
    rb_raise(eSDLError,"this event is not %s event",msg) ;
}
    
static VALUE createEventObject(VALUE class)
{
  SDL_Event *event;
  
  return Data_Make_Struct(class,SDL_Event,0,free,event);
}

static VALUE sdl_pollEvent(VALUE obj)
{
  SDL_Event *event;

  Data_Get_Struct(obj,SDL_Event,event);
  return INT2NUM(SDL_PollEvent(event));
}
static VALUE sdl_waitEvent(VALUE obj)
{
  SDL_Event *event;

  Data_Get_Struct(obj,SDL_Event,event);
  if( SDL_WaitEvent(event)==0 )
    rb_raise(eSDLError,"SDL_WaitEvent Failed :%s",SDL_GetError());
  return Qnil;
}

static VALUE sdl_eventType(VALUE obj)
{
  SDL_Event *event;

  Data_Get_Struct(obj,SDL_Event,event);
  return INT2FIX(event->type);
}

/* --KeyboardEvent-- */
static VALUE sdl_eventKeyPressed(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck((event->type == SDL_KEYDOWN)||(event->type == SDL_KEYUP),"key");
  if( event->key.state==SDL_PRESSED )
    return Qtrue;
  else
    return Qfalse;
}
static VALUE sdl_eventKeyMod(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck((event->type == SDL_KEYDOWN)||(event->type == SDL_KEYUP),"key");
  return INT2NUM(event->key.keysym.mod);
}
static VALUE sdl_eventKeySym(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck((event->type == SDL_KEYDOWN)||(event->type == SDL_KEYUP),"key");
  return INT2FIX(event->key.keysym.sym);
}

/* --ActiveEvent-- */
static VALUE sdl_eventActiveGained(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck( event->type == SDL_ACTIVEEVENT , "active" );
  return (event->active.gain)?Qtrue:Qfalse;
}
static VALUE sdl_eventActiveState(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck( event->type == SDL_ACTIVEEVENT , "active" );
  return INT2NUM(event->active.state);
}

/* --MouseMotionEvent-- */
static VALUE sdl_eventMouseX(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  switch (event->type){
  case SDL_MOUSEMOTION:
    return INT2NUM(event->motion.x);
  case SDL_MOUSEBUTTONUP:
  case SDL_MOUSEBUTTONDOWN:
    return INT2NUM(event->button.x);
  default:
    eventCheck(0,"mouse"); /* raise exception */
  }
  return Qnil; /* never reach */
}
static VALUE sdl_eventMouseY(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  switch (event->type){
  case SDL_MOUSEMOTION:
    return INT2NUM(event->motion.y);
  case SDL_MOUSEBUTTONUP:
  case SDL_MOUSEBUTTONDOWN:
    return INT2NUM(event->button.y);
  default:
    eventCheck(0,"mouse"); /* raise exception */
  }
  return Qnil; /* never reach */
}
static VALUE sdl_eventMouseXrel(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck(event->type==SDL_MOUSEMOTION,"mouse motion");
  return INT2NUM(event->motion.xrel);
}
static VALUE sdl_eventMouseYrel(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck(event->type==SDL_MOUSEMOTION,"mouse motion");
  return INT2NUM(event->motion.yrel);
}

/* --SDL_MouseButtonEvent-- */
static VALUE sdl_eventMouseButton(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck( (event->type==SDL_MOUSEBUTTONUP)||
	      (event->type==SDL_MOUSEBUTTONDOWN) , "mouse button" );
  return INT2NUM( event->button.button );
}
static VALUE sdl_eventMousePressed(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  eventCheck( (event->type==SDL_MOUSEBUTTONUP)||
	      ( event->type==SDL_MOUSEBUTTONDOWN)   , "mouse button" );
  return (event->button.state==SDL_PRESSED)?Qtrue:Qfalse;
}

static VALUE sdl_eventInfo(VALUE obj)
{
  SDL_Event *event;
  
  Data_Get_Struct(obj,SDL_Event,event);
  switch(event->type){
  case SDL_ACTIVEEVENT:
    return rb_ary_new3(3,INT2FIX(SDL_ACTIVEEVENT),BOOL(event->active.gain),
		       INT2FIX(event->active.state));
  case SDL_KEYDOWN:
  case SDL_KEYUP:
    return rb_ary_new3( 4, INT2FIX(event->type),
			BOOL(event->key.state==SDL_PRESSED),
			INT2FIX(event->key.keysym.sym),
			UINT2NUM(event->key.keysym.mod)
			);
  case SDL_MOUSEMOTION:
    return rb_ary_new3( 6, INT2FIX(SDL_MOUSEMOTION),
			INT2FIX(event->motion.state),
			INT2FIX(event->motion.x),
			INT2FIX(event->motion.y),
			INT2FIX(event->motion.xrel),
			INT2FIX(event->motion.yrel)
			);
  case SDL_MOUSEBUTTONDOWN:
  case SDL_MOUSEBUTTONUP:
    return rb_ary_new3( 5, INT2FIX(event->type),
			INT2FIX(event->button.button),
			BOOL(event->button.state==SDL_PRESSED),
			INT2FIX(event->button.x),
			INT2FIX(event->button.y)
			);
  case SDL_JOYAXISMOTION:
    return rb_ary_new3( 4, INT2FIX(SDL_JOYAXISMOTION),
			INT2FIX(event->jaxis.which),
			INT2FIX(event->jaxis.axis),
			INT2FIX(event->jaxis.value)
			);
  case SDL_JOYBALLMOTION:
    return rb_ary_new3( 5, INT2FIX(SDL_JOYBALLMOTION),
			INT2FIX(event->jball.which),
			INT2FIX(event->jball.ball),
			INT2FIX(event->jball.xrel),
			INT2FIX(event->jball.yrel)
			);
  case SDL_JOYHATMOTION:
    return rb_ary_new3( 4, INT2FIX(SDL_JOYHATMOTION),
			INT2FIX(event->jhat.which),
			INT2FIX(event->jhat.hat),
			INT2FIX(event->jhat.value)
			);
  case SDL_JOYBUTTONDOWN:
  case SDL_JOYBUTTONUP:
    return rb_ary_new3( 4, INT2FIX(event->type),
			INT2FIX(event->jbutton.which),
			INT2FIX(event->jbutton.button),
			BOOL(event->jbutton.state==SDL_PRESSED)
			);
  case SDL_QUIT:
    return rb_ary_new3( 1, INT2FIX(SDL_QUIT));
  case SDL_SYSWMEVENT:
    return rb_ary_new3( 1, INT2FIX(SDL_SYSWMEVENT));
  case SDL_VIDEORESIZE:
    return rb_ary_new3( 3, INT2FIX(SDL_VIDEORESIZE),
			INT2FIX(event->resize.w),
			INT2FIX(event->resize.h)
			);
  }
  return Qnil;
}

static VALUE sdl_getAppState(VALUE class)
{
  return INT2FIX(SDL_GetAppState());
}

static VALUE sdl_enableUNICODE(VALUE class)
{
  SDL_EnableUNICODE(1);
  return Qnil;
}
static VALUE sdl_disableUNICODE(VALUE class)
{
  SDL_EnableUNICODE(0);
  return Qnil;
}
static VALUE sdl_is_enableUNICODE(VALUE class)
{
  return BOOL(SDL_EnableUNICODE(-1));
}

static void defineConstForEvent()
{
  rb_define_const(cEvent,"NOEVENT",INT2NUM(SDL_NOEVENT));
  rb_define_const(cEvent,"ACTIVEEVENT",INT2NUM(SDL_ACTIVEEVENT));
  rb_define_const(cEvent,"KEYDOWN",INT2NUM(SDL_KEYDOWN));
  rb_define_const(cEvent,"KEYUP",INT2NUM(SDL_KEYUP));
  rb_define_const(cEvent,"MOUSEMOTION",INT2NUM(SDL_MOUSEMOTION));
  rb_define_const(cEvent,"MOUSEBUTTONDOWN",INT2NUM(SDL_MOUSEBUTTONDOWN));
  rb_define_const(cEvent,"MOUSEBUTTONUP",INT2NUM(SDL_MOUSEBUTTONUP));
  rb_define_const(cEvent,"JOYAXISMOTION",INT2NUM(SDL_JOYAXISMOTION));
  rb_define_const(cEvent,"JOYBALLMOTION",INT2NUM(SDL_JOYBALLMOTION));
  rb_define_const(cEvent,"JOYHATMOTION",INT2NUM(SDL_JOYHATMOTION));
  rb_define_const(cEvent,"JOYBUTTONDOWN",INT2NUM(SDL_JOYBUTTONDOWN));
  rb_define_const(cEvent,"JOYBUTTONUP",INT2NUM(SDL_JOYBUTTONUP));
  rb_define_const(cEvent,"QUIT",INT2NUM(SDL_QUIT));
  rb_define_const(cEvent,"SYSWMEVENT",INT2NUM(SDL_SYSWMEVENT));
  rb_define_const(cEvent,"EVENT_RESERVEDA",INT2NUM(SDL_EVENT_RESERVEDA));
  rb_define_const(cEvent,"EVENT_RESERVEDB",INT2NUM(SDL_EVENT_RESERVEDB));
  rb_define_const(cEvent,"VIDEORESIZE",INT2NUM(SDL_VIDEORESIZE));
#if SDL_VERSION_ATLEAST(1,2,0)
  rb_define_const(cEvent,"VIDEOEXPOSE",INT2NUM(SDL_VIDEOEXPOSE));
#else
  rb_define_const(cEvent,"EVENT_RESERVED1",INT2NUM(SDL_EVENT_RESERVED1));
#endif
  rb_define_const(cEvent,"EVENT_RESERVED2",INT2NUM(SDL_EVENT_RESERVED2));
  rb_define_const(cEvent,"EVENT_RESERVED3",INT2NUM(SDL_EVENT_RESERVED3));
  rb_define_const(cEvent,"EVENT_RESERVED4",INT2NUM(SDL_EVENT_RESERVED4));
  rb_define_const(cEvent,"EVENT_RESERVED5",INT2NUM(SDL_EVENT_RESERVED5));
  rb_define_const(cEvent,"EVENT_RESERVED6",INT2NUM(SDL_EVENT_RESERVED6));
  rb_define_const(cEvent,"EVENT_RESERVED7",INT2NUM(SDL_EVENT_RESERVED7));
  /* Events SDL_USEREVENT through SDL_MAXEVENTS-1 are for your use */
  rb_define_const(cEvent,"USEREVENT",INT2NUM(SDL_USEREVENT));
  /* This last event is only for bounding internal arrays
     It is the number of bits in the event mask datatype -- Uint32
     */
  rb_define_const(cEvent,"NUMEVENTS",INT2NUM(SDL_NUMEVENTS));

  /* The available application states */
  rb_define_const(cEvent,"APPMOUSEFOCUS",UINT2NUM(SDL_APPMOUSEFOCUS));
  rb_define_const(cEvent,"APPINPUTFOCUS",UINT2NUM(SDL_APPINPUTFOCUS));
  rb_define_const(cEvent,"APPACTIVE",UINT2NUM(SDL_APPACTIVE));

}


void init_event()
{
  cEvent = rb_define_class_under(mSDL,"Event",rb_cObject);
  rb_define_singleton_method(cEvent,"new",createEventObject,0);
  
  rb_define_singleton_method(cEvent,"appState",sdl_getAppState,0);
  rb_define_singleton_method(cEvent,"enableUNICODE",sdl_enableUNICODE,0);
  rb_define_singleton_method(cEvent,"disableUNICODE",sdl_disableUNICODE,0);
  rb_define_singleton_method(cEvent,"enableUNICODE?",sdl_is_enableUNICODE,0);
  
  rb_define_method(cEvent,"poll",sdl_pollEvent,0);
  rb_define_method(cEvent,"wait",sdl_waitEvent,0);
  
  rb_define_method(cEvent,"type",sdl_eventType,0);
  
  rb_define_method(cEvent,"keyPress?",sdl_eventKeyPressed,0);
  rb_define_method(cEvent,"keySym",sdl_eventKeySym,0);
  rb_define_method(cEvent,"keyMod",sdl_eventKeyMod,0);

  rb_define_method(cEvent,"gain?",sdl_eventActiveGained,0);
  rb_define_method(cEvent,"appState",sdl_eventActiveState,0);

  rb_define_method(cEvent,"mouseX",sdl_eventMouseX,0);
  rb_define_method(cEvent,"mouseY",sdl_eventMouseY,0);
  rb_define_method(cEvent,"mouseXrel",sdl_eventMouseXrel,0);
  rb_define_method(cEvent,"mouseYrel",sdl_eventMouseYrel,0);

  rb_define_method(cEvent,"mouseButton",sdl_eventMouseButton,0);
  rb_define_method(cEvent,"mousePress?",sdl_eventMousePressed,0);

  rb_define_method(cEvent,"info",sdl_eventInfo,0);
  defineConstForEvent();
  
}
