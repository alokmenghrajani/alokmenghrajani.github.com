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
#ifdef DEF_OPENGL
#include "rubysdl.h"
static VALUE sdl_getGLAttr(VALUE class,VALUE attr)
{
  int val;
  if(SDL_GL_GetAttribute(NUM2INT(attr),&val)==-1)
    rb_raise(eSDLError,"GL get attribute failed: %s",SDL_GetError());
  return INT2NUM(val);
}
static VALUE sdl_setGLAttr(VALUE class,VALUE attr,VALUE val)
{
  if(SDL_GL_SetAttribute(NUM2INT(attr),NUM2INT(val))==-1)
    rb_raise(eSDLError,"GL set attribute failed: %s",SDL_GetError());
  return Qnil;
}
static VALUE sdl_GLSwapBuffers(VALUE class)
{
  SDL_GL_SwapBuffers();
  return Qnil;
}
static void defineConstForOpenGL()
{
  rb_define_const(mSDL,"GL_RED_SIZE",INT2NUM(SDL_GL_RED_SIZE));
  rb_define_const(mSDL,"GL_GREEN_SIZE",INT2NUM(SDL_GL_GREEN_SIZE));
  rb_define_const(mSDL,"GL_BLUE_SIZE",INT2NUM(SDL_GL_BLUE_SIZE));
  rb_define_const(mSDL,"GL_ALPHA_SIZE",INT2NUM(SDL_GL_ALPHA_SIZE));
  rb_define_const(mSDL,"GL_BUFFER_SIZE",INT2NUM(SDL_GL_BUFFER_SIZE));
  rb_define_const(mSDL,"GL_DOUBLEBUFFER",INT2NUM(SDL_GL_DOUBLEBUFFER));
  rb_define_const(mSDL,"GL_DEPTH_SIZE",INT2NUM(SDL_GL_DEPTH_SIZE));
  rb_define_const(mSDL,"GL_STENCIL_SIZE",INT2NUM(SDL_GL_STENCIL_SIZE));
  rb_define_const(mSDL,"GL_ACCUM_RED_SIZE",INT2NUM(SDL_GL_ACCUM_RED_SIZE));
  rb_define_const(mSDL,"GL_ACCUM_GREEN_SIZE",INT2NUM(SDL_GL_ACCUM_GREEN_SIZE));
  rb_define_const(mSDL,"GL_ACCUM_BLUE_SIZE",INT2NUM(SDL_GL_ACCUM_BLUE_SIZE));
  rb_define_const(mSDL,"GL_ACCUM_ALPHA_SIZE",INT2NUM(SDL_GL_ACCUM_ALPHA_SIZE));
}
		  
void init_opengl()
{
  rb_define_module_function(mSDL,"getGLAttr",sdl_getGLAttr,1);
  rb_define_module_function(mSDL,"setGLAttr",sdl_setGLAttr,2);
  rb_define_module_function(mSDL,"GLSwapBuffers",sdl_GLSwapBuffers,0);
  defineConstForOpenGL();
}
#endif /* DEF_OPENGL */
