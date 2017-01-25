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

#ifdef DEF_EVENT2

#include "rubysdl.h"

typedef VALUE (*createEventObjFunc)(SDL_Event *);
static createEventObjFunc createEventObj[SDL_NUMEVENTS];

static VALUE createNoEvent(SDL_Event *event)
{
  return Qnil;
}

static VALUE createActiveEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cActiveEvent);
  rb_iv_set(obj,"@gain",BOOL(event->active.gain));
  rb_iv_set(obj,"@state",INT2FIX(event->active.state));
  return obj;
}

static VALUE createKeyEvent(VALUE obj,SDL_Event *event)
{
  rb_iv_set(obj,"@press",BOOL(event->key.state==SDL_PRESSED));
  rb_iv_set(obj,"@sym",INT2FIX(event->key.keysym.sym));
  rb_iv_set(obj,"@mod",UINT2NUM(event->key.keysym.mod));
  rb_iv_set(obj,"@unicode",UINT2NUM(event->key.keysym.unicode));
  return obj;
}

static VALUE createKeyDownEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cKeyDownEvent);
  return createKeyEvent(obj,event);
}

static VALUE createKeyUpEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cKeyUpEvent);
  return createKeyEvent(obj,event);
}

static VALUE createMouseMotionEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cMouseMotionEvent);
  rb_iv_set(obj,"@state",INT2FIX(event->motion.state));
  rb_iv_set(obj,"@x",INT2FIX(event->motion.x));
  rb_iv_set(obj,"@y",INT2FIX(event->motion.y));
  rb_iv_set(obj,"@xrel",INT2FIX(event->motion.xrel));
  rb_iv_set(obj,"@yrel",INT2FIX(event->motion.yrel));
  return obj;
}

static VALUE createMouseButtonEvent(VALUE obj,SDL_Event *event)
{
  rb_iv_set(obj,"@button",INT2FIX(event->button.button));
  rb_iv_set(obj,"@press",BOOL(event->button.state==SDL_PRESSED));
  rb_iv_set(obj,"@x",INT2FIX(event->button.x));
  rb_iv_set(obj,"@y",INT2FIX(event->button.y));
  return obj;
}

static VALUE createMouseButtonDownEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cMouseButtonDownEvent);
  return createMouseButtonEvent(obj,event);
}

static VALUE createMouseButtonUpEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cMouseButtonUpEvent);
  return createMouseButtonEvent(obj,event);
}

static VALUE createJoyAxisEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cJoyAxisEvent);
  rb_iv_set(obj,"@which",INT2FIX(event->jaxis.which));
  rb_iv_set(obj,"@axis",INT2FIX(event->jaxis.axis));
  rb_iv_set(obj,"@value",INT2FIX(event->jaxis.value));
  return obj;
}

static VALUE createJoyBallEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cJoyBallEvent);
  rb_iv_set(obj,"@which",INT2FIX(event->jball.which));
  rb_iv_set(obj,"@ball",INT2FIX(event->jball.ball));
  rb_iv_set(obj,"@xrel",INT2FIX(event->jball.xrel));
  rb_iv_set(obj,"@yrel",INT2FIX(event->jball.yrel));
  return obj;
}

static VALUE createJoyHatEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cJoyHatEvent);
  rb_iv_set(obj,"@which",INT2FIX(event->jhat.which));
  rb_iv_set(obj,"@hat",INT2FIX(event->jhat.hat));
  rb_iv_set(obj,"@value",INT2FIX(event->jhat.value));
  return obj;
}

static VALUE createJoyButtonEvent(VALUE obj,SDL_Event *event)
{
  rb_iv_set(obj,"@which",INT2FIX(event->jbutton.which));
  rb_iv_set(obj,"@button",INT2FIX(event->jbutton.button));
  rb_iv_set(obj,"@press",BOOL(event->jbutton.state==SDL_PRESSED));
  return obj;
}
static VALUE createJoyButtonUpEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cJoyButtonUpEvent);
  return createJoyButtonEvent(obj,event);
}

static VALUE createJoyButtonDownEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cJoyButtonDownEvent);
  return createJoyButtonEvent(obj,event);
}

static VALUE createQuitEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cQuitEvent);
  return obj;
}

static VALUE createSysWMEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cSysWMEvent);
  return obj;
}

static VALUE createVideoResizeEvent(SDL_Event *event)
{
  VALUE obj=rb_obj_alloc(cVideoResizeEvent);
  rb_iv_set(obj,"@w",INT2FIX(event->resize.w));
  rb_iv_set(obj,"@h",INT2FIX(event->resize.h));
  return obj;
}

static VALUE createVideoExposeEvent(SDL_Event *event)
{
  return rb_obj_alloc(cVideoExposeEvent);
}

static VALUE sdl_event2_poll(VALUE class)
{
  SDL_Event event;
  if( SDL_PollEvent(&event)==1)
    return createEventObj[event.type](&event);
  else
    return Qnil;
}
static VALUE sdl_event2_wait(VALUE class)
{
  SDL_Event event;
  if( SDL_WaitEvent(&event)==1)
    return createEventObj[event.type](&event);
  else
    rb_raise(eSDLError,"Event handling error");
}
static VALUE sdl_event2_new(VALUE class)
{
  return rb_obj_alloc(class);
}

static VALUE sdl_event2_push(VALUE class,VALUE event)
{
  SDL_Event e;
  VALUE eventClass=CLASS_OF(event);
  if(eventClass==cActiveEvent){
    e.type=SDL_ACTIVEEVENT;
    e.active.gain=rb_iv_get(event,"@gain");
    e.active.state=NUM2INT(rb_iv_get(event,"@state"));
  }else if(eventClass==cKeyDownEvent){
    e.type=SDL_KEYDOWN;
    e.key.state=(rb_iv_get(event,"@press"))?SDL_PRESSED:SDL_RELEASED;
    e.key.keysym.sym=NUM2INT(rb_iv_get(event,"@sym"));
    e.key.keysym.mod=NUM2UINT(rb_iv_get(event,"@mod"));
    e.key.keysym.unicode = NUM2UINT( rb_iv_get(event,"@unicode") );
  }else if(eventClass==cKeyUpEvent){
    e.type=SDL_KEYUP;
    e.key.state=(rb_iv_get(event,"@press"))?SDL_PRESSED:SDL_RELEASED;
    e.key.keysym.sym=NUM2INT(rb_iv_get(event,"@sym"));
    e.key.keysym.mod=NUM2UINT(rb_iv_get(event,"@mod"));
    e.key.keysym.unicode = NUM2UINT( rb_iv_get(event,"@unicode") );
  }else if(eventClass==cMouseMotionEvent){
    e.type=SDL_MOUSEMOTION;
    e.motion.state=NUM2INT(rb_iv_get(event,"@state"));
    e.motion.x=NUM2INT(rb_iv_get(event,"@x"));
    e.motion.y=NUM2INT(rb_iv_get(event,"@y"));
    e.motion.xrel=NUM2INT(rb_iv_get(event,"@xrel"));
    e.motion.yrel=NUM2INT(rb_iv_get(event,"@yrel"));
  }else if(eventClass==cMouseButtonDownEvent){
    e.type=SDL_MOUSEBUTTONDOWN;
    e.button.button=NUM2INT(rb_iv_get(event,"@button"));
    e.button.state=(rb_iv_get(event,"@press"))?SDL_PRESSED:SDL_RELEASED;
    e.button.x=NUM2INT(rb_iv_get(event,"@x"));
    e.button.y=NUM2INT(rb_iv_get(event,"@y"));
  }else if(eventClass==cMouseButtonUpEvent){
    e.type=SDL_MOUSEBUTTONUP;
    e.button.button=NUM2INT(rb_iv_get(event,"@button"));
    e.button.state=(rb_iv_get(event,"@press"))?SDL_PRESSED:SDL_RELEASED;
    e.button.x=NUM2INT(rb_iv_get(event,"@x"));
    e.button.y=NUM2INT(rb_iv_get(event,"@y"));\
  }else if(eventClass==cJoyAxisEvent){
    e.type=SDL_JOYAXISMOTION;
    e.jaxis.which=NUM2INT(rb_iv_get(event,"@which"));
    e.jaxis.axis=NUM2INT(rb_iv_get(event,"@axis"));
    e.jaxis.value=NUM2INT(rb_iv_get(event,"@value"));
  }else if(eventClass==cJoyBallEvent){
    e.type=SDL_JOYBALLMOTION;
    e.jball.which=NUM2INT(rb_iv_get(event,"@which"));
    e.jball.ball=NUM2INT(rb_iv_get(event,"@ball"));
    e.jball.xrel=NUM2INT(rb_iv_get(event,"@xrel"));
    e.jball.yrel=NUM2INT(rb_iv_get(event,"@yrel"));
  }else if(eventClass==cJoyHatEvent){
    e.type=SDL_JOYHATMOTION;
    e.jhat.which=NUM2INT(rb_iv_get(event,"@which"));
    e.jhat.hat=NUM2INT(rb_iv_get(event,"@hat"));
    e.jhat.value=NUM2INT(rb_iv_get(event,"@value"));
  }else if(eventClass==cJoyButtonUpEvent){
    e.type=SDL_JOYBUTTONUP;
    e.jbutton.which=NUM2INT(rb_iv_get(event,"@which"));
    e.jbutton.button=NUM2INT(rb_iv_get(event,"@button"));
    e.jbutton.state=(rb_iv_get(event,"@press"))?SDL_PRESSED:SDL_RELEASED;
  }else if(eventClass==cJoyButtonDownEvent){
    e.type=SDL_JOYBUTTONDOWN;
    e.jbutton.which=NUM2INT(rb_iv_get(event,"@which"));
    e.jbutton.button=NUM2INT(rb_iv_get(event,"@button"));
    e.jbutton.state=(rb_iv_get(event,"@press"))?SDL_PRESSED:SDL_RELEASED;
  }else if(eventClass==cQuitEvent){
    e.type=SDL_QUIT;
  }else if(eventClass==cSysWMEvent){
    e.type=SDL_SYSWMEVENT;
  }else if(eventClass==cVideoResizeEvent){
    e.type=SDL_VIDEORESIZE;
    e.resize.w=NUM2INT(rb_iv_get(event,"@w"));
    e.resize.h=NUM2INT(rb_iv_get(event,"@h"));
  }else if(eventClass==cVideoExposeEvent){
    e.type=SDL_VIDEOEXPOSE;
  }else {
    rb_raise(eSDLError,"This object couldn't be pushed");
  }
  if(SDL_PushEvent(&e)==-1)
    rb_raise(eSDLError,"the event couldn't be pushed");
  return Qnil;
}
static VALUE sdl_event2_getAppState(VALUE class)
{
  return INT2FIX(SDL_GetAppState());
}

static VALUE sdl_event2_enableUNICODE(VALUE class)
{
  SDL_EnableUNICODE(1);
  return Qnil;
}
static VALUE sdl_event2_disableUNICODE(VALUE class)
{
  SDL_EnableUNICODE(0);
  return Qnil;
}
static VALUE sdl_event2_is_enableUNICODE(VALUE class)
{
  return BOOL(SDL_EnableUNICODE(-1));
}

void init_event2(void)
{
  int i;
  
  cEvent2=rb_define_class_under(mSDL,"Event2",rb_cObject);
  rb_define_singleton_method(cEvent2,"poll",sdl_event2_poll,0);
  rb_define_singleton_method(cEvent2,"wait",sdl_event2_wait,0);
  /*rb_define_attr(cEvent2,"type",1,0);*/
  rb_define_singleton_method(cEvent2,"new",sdl_event2_new,0);
  rb_define_singleton_method(cEvent2,"push",sdl_event2_push,1);
  rb_define_singleton_method(cEvent2,"appState",sdl_event2_getAppState,0);
  rb_define_singleton_method(cEvent2,"enableUNICODE",sdl_event2_enableUNICODE,0);
  rb_define_singleton_method(cEvent2,"disableUNICODE",sdl_event2_disableUNICODE,0);
  rb_define_singleton_method(cEvent2,"enableUNICODE?",sdl_event2_is_enableUNICODE,0);
  cActiveEvent=rb_define_class_under(cEvent2,"Active",cEvent2);
  rb_define_attr(cActiveEvent,"gain",1,1);
  rb_define_attr(cActiveEvent,"state",1,1);
  
  cKeyDownEvent=rb_define_class_under(cEvent2,"KeyDown",cEvent2);
  rb_define_attr(cKeyDownEvent,"press",1,1);
  rb_define_attr(cKeyDownEvent,"sym",1,1);
  rb_define_attr(cKeyDownEvent,"mod",1,1);
  rb_define_attr(cKeyDownEvent,"unicode",1,1);
  
  cKeyUpEvent=rb_define_class_under(cEvent2,"KeyUp",cEvent2);
  rb_define_attr(cKeyUpEvent,"press",1,1);
  rb_define_attr(cKeyUpEvent,"sym",1,1);
  rb_define_attr(cKeyUpEvent,"mod",1,1);
  rb_define_attr(cKeyUpEvent,"unicode",1,1);
  
  cMouseMotionEvent=rb_define_class_under(cEvent2,"MouseMotion",cEvent2);
  rb_define_attr(cMouseMotionEvent,"state",1,1);
  rb_define_attr(cMouseMotionEvent,"x",1,1);
  rb_define_attr(cMouseMotionEvent,"y",1,1);
  rb_define_attr(cMouseMotionEvent,"xrel",1,1);
  rb_define_attr(cMouseMotionEvent,"yrel",1,1);
  
  cMouseButtonDownEvent=rb_define_class_under(cEvent2,"MouseButtonDown",cEvent2);
  rb_define_attr(cMouseButtonDownEvent,"button",1,1);
  rb_define_attr(cMouseButtonDownEvent,"press",1,1);
  rb_define_attr(cMouseButtonDownEvent,"x",1,1);
  rb_define_attr(cMouseButtonDownEvent,"y",1,1);

  cMouseButtonUpEvent=rb_define_class_under(cEvent2,"MouseButtonUp",cEvent2);
  rb_define_attr(cMouseButtonUpEvent,"button",1,1);
  rb_define_attr(cMouseButtonUpEvent,"press",1,1);
  rb_define_attr(cMouseButtonUpEvent,"x",1,1);
  rb_define_attr(cMouseButtonUpEvent,"y",1,1);
  
  cJoyAxisEvent=rb_define_class_under(cEvent2,"JoyAxis",cEvent2);
  rb_define_attr(cJoyAxisEvent,"which",1,1);
  rb_define_attr(cJoyAxisEvent,"axis",1,1);
  rb_define_attr(cJoyAxisEvent,"value",1,1);
  
  cJoyBallEvent=rb_define_class_under(cEvent2,"JoyBall",cEvent2);
  rb_define_attr(cJoyBallEvent,"which",1,1);
  rb_define_attr(cJoyBallEvent,"ball",1,1);
  rb_define_attr(cJoyBallEvent,"xrel",1,1);
  rb_define_attr(cJoyBallEvent,"yrel",1,1);
  
  cJoyHatEvent=rb_define_class_under(cEvent2,"JoyHat",cEvent2);
  rb_define_attr(cJoyHatEvent,"which",1,1);
  rb_define_attr(cJoyHatEvent,"hat",1,1);
  rb_define_attr(cJoyHatEvent,"value",1,1);
  
  cJoyButtonUpEvent=rb_define_class_under(cEvent2,"JoyButtonUp",cEvent2);
  rb_define_attr(cJoyButtonUpEvent,"which",1,1);
  rb_define_attr(cJoyButtonUpEvent,"button",1,1);
  rb_define_attr(cJoyButtonUpEvent,"press",1,1);

  cJoyButtonDownEvent=rb_define_class_under(cEvent2,"JoyButtonDown",cEvent2);
  rb_define_attr(cJoyButtonDownEvent,"which",1,1);
  rb_define_attr(cJoyButtonDownEvent,"button",1,1);
  rb_define_attr(cJoyButtonDownEvent,"press",1,1);
  
  cQuitEvent=rb_define_class_under(cEvent2,"Quit",cEvent2);
  
  cSysWMEvent=rb_define_class_under(cEvent2,"SysWM",cEvent2);
  
  cVideoResizeEvent=rb_define_class_under(cEvent2,"VideoResize",cEvent2);
  rb_define_attr(cVideoResizeEvent,"w",1,1);
  rb_define_attr(cVideoResizeEvent,"h",1,1);

  cVideoExposeEvent=rb_define_class_under(cEvent2,"VideoExpose",cEvent2);
  
  for(i=0;i<SDL_NUMEVENTS;++i)
    createEventObj[i]=createNoEvent;
  createEventObj[SDL_ACTIVEEVENT]=createActiveEvent;
  createEventObj[SDL_KEYDOWN]=createKeyDownEvent;
  createEventObj[SDL_KEYUP]=createKeyUpEvent;
  createEventObj[SDL_MOUSEMOTION]=createMouseMotionEvent;
  createEventObj[SDL_MOUSEBUTTONDOWN]=createMouseButtonDownEvent;
  createEventObj[SDL_MOUSEBUTTONUP]=createMouseButtonUpEvent;
  createEventObj[SDL_JOYAXISMOTION]=createJoyAxisEvent;
  createEventObj[SDL_JOYBALLMOTION]=createJoyBallEvent;
  createEventObj[SDL_JOYHATMOTION]=createJoyHatEvent;
  createEventObj[SDL_JOYBUTTONDOWN]=createJoyButtonDownEvent;
  createEventObj[SDL_JOYBUTTONUP]=createJoyButtonUpEvent;
  createEventObj[SDL_QUIT]=createQuitEvent;
  createEventObj[SDL_SYSWMEVENT]=createSysWMEvent;
  createEventObj[SDL_VIDEORESIZE]=createVideoResizeEvent;
  createEventObj[SDL_VIDEOEXPOSE]=createVideoExposeEvent;
		 
}
  /*
    Active;
    KeyDown;
    KeyUp;
    MouseMotion;
    MouseButtonDown;
    MouseButtonUp;
    JoyAxis;
    JoyBall;
    JoyHat;
    JoyButtonUp;
    JoyButtonDown;
    Quit;
    SysWM;
    VideoResize;
  */
    
#endif /* DEF_EVENT2 */
