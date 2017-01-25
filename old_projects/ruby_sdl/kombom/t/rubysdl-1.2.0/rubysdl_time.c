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

static VALUE sdl_getTicks(VALUE mod)
{
  return UINT2NUM(SDL_GetTicks());
}
static VALUE sdl_delay(VALUE mod,VALUE ms)
{
  SDL_Delay(NUM2UINT(ms));
  return Qnil;
}

void init_time()
{
  rb_define_module_function(mSDL,"getTicks",sdl_getTicks,0);
  rb_define_module_function(mSDL,"delay",sdl_delay,1);
}
