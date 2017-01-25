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

static int rubyio_read(SDL_RWops* context, void* ptr, int size, int maxnum)
{
  volatile VALUE io = (VALUE)context->hidden.unknown.data1;
  volatile VALUE str;
  str = rb_funcall(io, rb_intern("read"), 1, INT2NUM(size*maxnum));
  StringValue(str);
  
  memcpy(ptr, RSTRING(str)->ptr, RSTRING(str)->len);
  return RSTRING(str)->len/size;
}

static int rubyio_write(SDL_RWops* context, const void* ptr, int size, int num)
{
  rb_raise(rb_eTypeError, "not implemented yet RWops write");
}

static int rubyio_pseudo_seek(SDL_RWops* context, int offset, int whence)
{
  volatile VALUE io = (VALUE)context->hidden.unknown.data1;
  volatile VALUE str; 
  if(offset < 0)
    rb_raise(eSDLError, "cannot seek backward");
  
  
  switch(whence){
  case SEEK_SET:
    rb_funcall(io, rb_intern("rewind"), 0);
    rb_funcall(io, rb_intern("read"), 1, INT2NUM(offset));
    break;
  case SEEK_CUR:
    str = rb_funcall(io, rb_intern("read"), 1, INT2NUM(offset));
    break;
  case SEEK_END:
    rb_raise(eSDLError, "cannot seek SEEK_END");
  default:
    SDL_SetError("Unknown value for 'whence'");
    return(-1);
  }
  return NUM2INT(rb_funcall(io, rb_intern("tell"), 0));
}

static int rubyio_close(SDL_RWops* context)
{
  if(context)
    SDL_FreeRW(context);
  return 0;
}

/* WARNING: +obj+ is not marked when GC starts,
   so you should use `volatile' when this function is used
   and you should not take out this RWops pointer to ruby's world.
 */
SDL_RWops* rubysdl_RWops_from_ruby_obj(VALUE obj)
{
  SDL_RWops* rwops;

  rwops = SDL_AllocRW();
  if( rwops == NULL )
    rb_raise(eSDLError, "Out of memory:%s", SDL_GetError());

  rwops->seek = rubyio_pseudo_seek;
  rwops->read = rubyio_read;
  rwops->write = rubyio_write;
  rwops->close = rubyio_close;
  rwops->hidden.unknown.data1 = (void*)obj;

  return rwops;
}

