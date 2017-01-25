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

/* sge's copyright */
/*
*       
*
*	SDL Graphics Extension
*	Basic drawing functions
*
*	Started 990815
*
*	License: LGPL v2+ (see the file LICENSE)
*	(c)1999-2001 Anders Lindstr
*/

/* pixel access functions,from sge_draw.cpp */
#include "rubysdl.h"
#if SDL_VERSIONNUM(SDL_MAJOR_VERSION, SDL_MINOR_VERSION, SDL_PATCHLEVEL) >= SDL_VERSIONNUM(1, 1, 5)
	#define clip_xmin(pnt) pnt->clip_rect.x
	#define clip_xmax(pnt) pnt->clip_rect.x + pnt->clip_rect.w-1
	#define clip_ymin(pnt) pnt->clip_rect.y
	#define clip_ymax(pnt) pnt->clip_rect.y + pnt->clip_rect.h-1
#else
	#define clip_xmin(pnt) pnt->clip_minx
	#define clip_xmax(pnt) pnt->clip_maxx
	#define clip_ymin(pnt) pnt->clip_miny
	#define clip_ymax(pnt) pnt->clip_maxy
#endif
     
void rubysdl_putPixel(SDL_Surface *surface, Sint16 x, Sint16 y, Uint32 color)
{
  Uint8 *pix;  
  int shift;
  
  if(x>=clip_xmin(surface) && x<=clip_xmax(surface) &&
     y>=clip_ymin(surface) && y<=clip_ymax(surface)){
    switch (surface->format->BytesPerPixel) {
    case 1:  /* Assuming 8-bpp */
      *((Uint8 *)surface->pixels + y*surface->pitch + x) = color;
      break;
    case 2:  /* Probably 15-bpp or 16-bpp */
      *((Uint16 *)surface->pixels + y*surface->pitch/2 + x) = color;
      break;
    case 3:  /* Slow 24-bpp mode, usually not used */
      /* Gack - slow, but endian correct */
      pix = (Uint8 *)surface->pixels + y * surface->pitch + x*3;
      shift = surface->format->Rshift;
      *(pix+shift/8) = color>>shift;
      shift = surface->format->Gshift;
      *(pix+shift/8) = color>>shift;
      shift = surface->format->Bshift;
      *(pix+shift/8) = color>>shift;
      break;
    case 4:  /* Probably 32-bpp */
      *((Uint32 *)surface->pixels + y*surface->pitch/4 + x) = color;
      break;
    }
  }
}

Uint32 rubysdl_getPixel(SDL_Surface *surface, Sint16 x, Sint16 y)
{
  Uint8 *pix;
  int shift;
  Uint32 color=0;

  switch (surface->format->BytesPerPixel) {
  case 1:  /* Assuming 8-bpp */
    return *((Uint8 *)surface->pixels + y*surface->pitch + x);
    break;
  case 2:  /* Probably 15-bpp or 16-bpp */
    return *((Uint16 *)surface->pixels + y*surface->pitch/2 + x);
    break;
  case 3:  /* Slow 24-bpp mode, usually not used */

    /* Does this work? */
    pix = (Uint8 *)surface->pixels + y * surface->pitch + x*3;
    shift = surface->format->Rshift;
    color = *(pix+shift/8)>>shift;
    shift = surface->format->Gshift;
    color|= *(pix+shift/8)>>shift;
    shift = surface->format->Bshift;
    color|= *(pix+shift/8)>>shift;
    return color;
    break;
  case 4:  /* Probably 32-bpp */
    return *((Uint32 *)surface->pixels + y*surface->pitch/4 + x);
    break;
  }
  return 0;
}

#ifndef HAVE_SGE
static VALUE sdl_getPixel(VALUE obj,VALUE x,VALUE y)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM( rubysdl_getPixel(surface,NUM2INT(x),NUM2INT(y)) );
}
static VALUE sdl_putPixel(VALUE obj,VALUE x,VALUE y,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  rubysdl_putPixel(surface,NUM2INT(x),NUM2INT(y),VALUE2COLOR(color,surface->format));
  return Qnil;
}

void init_pixel()
{
  rb_define_method(cSurface,"getPixel",sdl_getPixel,2);
  rb_define_method(cSurface,"putPixel",sdl_putPixel,3);
  rb_define_method(cSurface,"[]",sdl_getPixel,2);
  rb_define_method(cSurface,"[]=",sdl_putPixel,3);
}
#endif /* ifndef HAVE_SGE */
