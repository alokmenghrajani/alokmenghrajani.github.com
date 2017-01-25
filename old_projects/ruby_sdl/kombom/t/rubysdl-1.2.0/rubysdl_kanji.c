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

#include "SDL_kanji.h"
#include "rubysdl.h"

static VALUE cKanji;

static VALUE kanji_open(VALUE obj,VALUE filename,VALUE size)
{
  Kanji_Font* font;

  font = Kanji_OpenFont(GETCSTR(filename),NUM2INT(size));
  if( font == NULL )
    rb_raise(eSDLError,"Couldn't open bdf font: %s",GETCSTR(filename));
  return Data_Wrap_Struct(cKanji,0,Kanji_CloseFont,font);
}

static VALUE kanji_setCodingSystem(VALUE obj,VALUE sys)
{
  Kanji_Font* font;

  Data_Get_Struct(obj,Kanji_Font,font);
  
  Kanji_SetCodingSystem(font,NUM2INT(sys));
  return Qnil;
}
                        
static VALUE kanji_addFont(VALUE obj, VALUE filename)
{
  Kanji_Font* font;

  Data_Get_Struct(obj,Kanji_Font,font);
  if( Kanji_AddFont(font,GETCSTR(filename)) == -1)
    rb_raise(eSDLError,"Couldn't use font: %s",GETCSTR(filename));
  return Qnil;
}

static VALUE kanji_textwidth(VALUE obj,VALUE text)
{
  Kanji_Font* font;

  Data_Get_Struct(obj,Kanji_Font,font);
  return INT2FIX(Kanji_FontWidth(font,GETCSTR(text)));
}

static VALUE kanji_width(VALUE obj)
{
  Kanji_Font* font;

  Data_Get_Struct(obj,Kanji_Font,font);
  return INT2FIX(Kanji_FontWidth(font,NULL));
}

static VALUE kanji_height(VALUE obj)
{
  Kanji_Font* font;
   
  Data_Get_Struct(obj,Kanji_Font,font);
  return INT2FIX(Kanji_FontHeight(font));
}

static VALUE kanji_putText(VALUE obj,VALUE surface,VALUE text,VALUE x,VALUE y,
                           VALUE r, VALUE g, VALUE b)
{
  Kanji_Font* font;
  SDL_Surface* target;
  SDL_Color color;
  
  if(!rb_obj_is_kind_of(surface,cSurface))
    rb_raise( rb_eArgError,"type mismatch(expect Surface)" );
  
  Data_Get_Struct(obj,Kanji_Font,font);
  Data_Get_Struct(surface,SDL_Surface,target);

  color.r = NUM2INT(r);color.g = NUM2INT(g); color.b = NUM2INT(b);
  Kanji_PutText(font,NUM2INT(x),NUM2INT(y),target,GETCSTR(text),
                color);
  return Qnil;
}

static VALUE kanji_putTextTate(VALUE obj,VALUE surface,VALUE text,VALUE x,VALUE y,
                               VALUE r, VALUE g, VALUE b)
{
  Kanji_Font* font;
  SDL_Surface* target;
  SDL_Color color;
  
  if(!rb_obj_is_kind_of(surface,cSurface))
    rb_raise( rb_eArgError,"type mismatch(expect Surface)" );
  
  Data_Get_Struct(obj,Kanji_Font,font);
  Data_Get_Struct(surface,SDL_Surface,target);

  color.r = NUM2INT(r);color.g = NUM2INT(g); color.b = NUM2INT(b);
  
  Kanji_PutTextTate(font,NUM2INT(x),NUM2INT(y),target,GETCSTR(text),
                    color);
  return Qnil;
}

void init_kanji(void)
{
  cKanji = rb_define_class_under(mSDL,"Kanji",rb_cObject);

  rb_define_singleton_method(cKanji,"open",kanji_open,2);
  rb_define_method(cKanji,"add",kanji_addFont,1);
  rb_define_method(cKanji,"setCodingSystem",kanji_setCodingSystem,1);
  rb_define_method(cKanji,"textwidth",kanji_textwidth,1);
  rb_define_method(cKanji,"width",kanji_width,0);
  rb_define_method(cKanji,"height",kanji_height,0);
  rb_define_method(cKanji,"put",kanji_putText,7);
  rb_define_method(cKanji,"putTate",kanji_putTextTate,7);
  
  rb_define_const(cKanji,"SJIS",INT2NUM(KANJI_SJIS));
  rb_define_const(cKanji,"EUC",INT2NUM(KANJI_EUC));
  rb_define_const(cKanji,"JIS",INT2NUM(KANJI_JIS));
}
