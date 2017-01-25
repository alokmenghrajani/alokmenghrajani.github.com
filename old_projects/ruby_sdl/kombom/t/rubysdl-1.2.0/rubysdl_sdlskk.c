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
#ifdef HAVE_SDLSKK
#include "rubysdl.h"
#include <sdlskk.h>
#include <SDL_ttf.h>

typedef SDL_Surface* (*Renderer)(SDLSKK_Context*,TTF_Font*,SDL_Color);

static void skk_error_handler(SDLSKK_Error err)
{
  switch( err ){
  case SDLSKK_NOERROR:
    return;
  case SDLSKK_MEMERROR:
    rb_fatal("SDLSKK: memory allocation error");
  }
}

static VALUE skk_set_encoding(VALUE mod,VALUE encoding)
{
  SDLSKK_set_encoding( NUM2INT(encoding) );
  return Qnil;
}

static VALUE skk_get_encoding(VALUE mod)
{
  return INT2FIX(SDLSKK_get_encoding());
}


static VALUE skk_Context_new(VALUE class,VALUE dict,VALUE rule_table,
			     VALUE keybind, VALUE use_minibuffer )
{
  SDLSKK_Context* c_context;
  SDLSKK_RomKanaRuleTable* c_table;
  SDLSKK_Dictionary* c_dict;
  SDLSKK_Keybind* c_bind;
  VALUE context;
  
  if( !rb_obj_is_kind_of(dict,cDictionary) )
    rb_raise(rb_eArgError,"type mismatch(expect SDL::SKK::Dictionary)");
  if( !rb_obj_is_kind_of(rule_table,cRomKanaRuleTable) )
    rb_raise(rb_eArgError,"type mismatch(expect SDL::SKK::RomKanaRuleTable)");
  if( !rb_obj_is_kind_of(keybind,cKeybind) )
    rb_raise(rb_eArgError,"type mismatch(expect SDL::SKK::Keybind)");
  
  Data_Get_Struct(dict,SDLSKK_Dictionary,c_dict);
  Data_Get_Struct(rule_table,SDLSKK_RomKanaRuleTable,c_table);
  Data_Get_Struct(keybind,SDLSKK_Keybind,c_bind);
  
  c_context = SDLSKK_Context_new( c_dict, c_table, c_bind, RTEST(use_minibuffer) );
  if( c_context == NULL )
    rb_raise(eSDLError,"Couldn't create Context");

  context = Data_Wrap_Struct(class,0,SDLSKK_Context_delete,c_context);
  rb_iv_set(context,"dict",dict);
  rb_iv_set(context,"rule_table",rule_table);
  
  return context;
}

static VALUE skk_Context_input_event(VALUE obj,VALUE event)
{
  SDLSKK_Context* context;
  SDL_Event *ev;
  
  Data_Get_Struct(obj,SDLSKK_Context,context);
  if( rb_obj_is_kind_of( event,cEvent ) ){
    Data_Get_Struct(event,SDL_Event,ev);
    SDLSKK_Context_input_event( context, ev );
    return Qnil;
  }
  
#ifdef DEF_EVENT2
  if( rb_obj_is_kind_of( event,cEvent2 ) ){
    if( rb_obj_is_kind_of( event,cKeyDownEvent ) ){
      SDL_Event ev2;
      ev2.type = SDL_KEYDOWN;
      ev2.key.keysym.sym = NUM2INT( rb_iv_get(event,"@sym") );
      ev2.key.keysym.unicode = NUM2UINT( rb_iv_get(event,"@unicode") );
      ev2.key.keysym.mod = NUM2INT( rb_iv_get(event,"@mod"));
      SDLSKK_Context_input_event( context, &ev2 );
      return Qnil;
    }else{
      return Qnil;
    }
  }
    
#endif
  rb_raise( rb_eArgError,"type mismatch(expect SDL::Event or SDL::Event2)");

  /* NOT REACHED */
}

static VALUE skk_Context_get_str(VALUE obj)
{
  SDLSKK_Context* context;
  char cstr[10000];
  
  Data_Get_Struct(obj,SDLSKK_Context,context);

  SDLSKK_Context_get_str(context,cstr,sizeof(cstr));

  return rb_str_new2(cstr);
}

static VALUE render_str(VALUE obj,VALUE font,VALUE r,VALUE g,VALUE b,
			Renderer func)
{
  SDLSKK_Context* context;
  SDL_Surface* surface;
  TTF_Font* ttf_font;
  SDL_Color color;

  if( !rb_obj_is_kind_of(font,cTTF) )
    rb_raise( rb_eArgError,"type mismatch(expect SDL::TTF)");
  
  color.r = NUM2UINT(r);
  color.g = NUM2UINT(g);
  color.b = NUM2UINT(b);
  
  Data_Get_Struct(obj,SDLSKK_Context,context);
  Data_Get_Struct(font,TTF_Font,ttf_font);
  
  surface = func(context,ttf_font,color);

  if( surface == NULL )
    return Qnil;

  return Data_Wrap_Struct(cSurface,0,sdl_freeSurface,surface);  
}

static VALUE skk_Context_render_str(VALUE obj,VALUE font,VALUE r,VALUE g,
				    VALUE b)
{
  return render_str(obj,font,r,g,b,SDLSKK_Context_render_display_str);
}

static VALUE skk_Context_render_minibuffer_str(VALUE obj,VALUE font,VALUE r,
						VALUE g,VALUE b)
{
  return render_str(obj,font,r,g,b,SDLSKK_Context_render_minibuffer_str);
}

static VALUE skk_Context_get_basic_mode(VALUE obj)
{
  SDLSKK_Context* context;
  
  Data_Get_Struct(obj,SDLSKK_Context,context);
  return BOOL(SDLSKK_Context_get_basic_mode(context));
}

static VALUE skk_Context_clear(VALUE obj)
{
  SDLSKK_Context* context;
  
  Data_Get_Struct(obj,SDLSKK_Context,context);
  SDLSKK_Context_clear(context);
  return Qnil;
}

static VALUE skk_Context_clear_text(VALUE obj)
{
  SDLSKK_Context* context;
  
  Data_Get_Struct(obj,SDLSKK_Context,context);
  SDLSKK_Context_clear_text(context);
  return Qnil;
}

static VALUE skk_Dictionary_new(VALUE class)
{
  SDLSKK_Dictionary* dict;

  dict = SDLSKK_Dict_new();
  if( dict == NULL )
    rb_raise(eSDLError,"Couldn't create SDL::SKK::Dictionary" );
  
  return Data_Wrap_Struct(class,0,SDLSKK_Dict_delete,dict);
}

static VALUE skk_Dict_load(VALUE obj,VALUE filename,VALUE users)
{
  SDLSKK_Dictionary* dict;

  Data_Get_Struct(obj,SDLSKK_Dictionary,dict);
  
  if( !SDLSKK_Dict_load(dict,GETCSTR(filename),RTEST(users)) )
    rb_raise(eSDLError,"Couldn't load %s",GETCSTR(filename));

  return Qnil;
}

static VALUE skk_Dict_save(VALUE obj, VALUE filename)
{
  SDLSKK_Dictionary* dict;

  Data_Get_Struct(obj,SDLSKK_Dictionary,dict);

  if( !SDLSKK_Dict_save_user_dict(dict,GETCSTR(filename)) )
    rb_raise(eSDLError,"Couldn't save %s",GETCSTR(filename));
  
  return Qnil;
}

static VALUE skk_RomKanaRuleTable_new(VALUE class,VALUE table_file)
{
  SDLSKK_RomKanaRuleTable* rule_table;

  rule_table = SDLSKK_RomKanaRuleTable_new( GETCSTR(table_file) );

  if( rule_table == NULL )
    rb_raise(eSDLError,"Couldn't load %s",GETCSTR(table_file));
  
  return Data_Wrap_Struct(class,0,SDLSKK_RomKanaRuleTable_delete,rule_table);
}

static VALUE skk_Keybind_new(VALUE class)
{
  return Data_Wrap_Struct(class,0,SDLSKK_Keybind_delete,SDLSKK_Keybind_new());
}

static VALUE skk_Keybind_set_key(VALUE obj,VALUE key_str,VALUE cmd_str)
{
  SDLSKK_Keybind* keybind;
  
  Data_Get_Struct(obj,SDLSKK_Keybind,keybind);
  SDLSKK_Keybind_set_key(keybind,GETCSTR(key_str),GETCSTR(cmd_str));
  return Qnil;
}

static VALUE skk_Keybind_set_default_key(VALUE obj)
{
  SDLSKK_Keybind* keybind;
  
  Data_Get_Struct(obj,SDLSKK_Keybind,keybind);
  SDLSKK_Keybind_set_default_key(keybind);
  return Qnil;
}

static VALUE skk_Keybind_unset_key(VALUE obj,VALUE key_str)
{
  SDLSKK_Keybind* keybind;
  
  Data_Get_Struct(obj,SDLSKK_Keybind,keybind);
  SDLSKK_Keybind_unset_key(keybind,GETCSTR(key_str));
  return Qnil;
}

static void defineConstForSDLSKK(void)
{
  rb_define_const(mSDLSKK,"EUCJP",INT2NUM(SDLSKK_EUCJP));
  rb_define_const(mSDLSKK,"UTF8",INT2NUM(SDLSKK_UTF8));
  rb_define_const(mSDLSKK,"SJIS",INT2NUM(SDLSKK_SJIS));
}

void init_sdlskk(void)
{
  mSDLSKK = rb_define_module_under(mSDL,"SKK");
  cContext = rb_define_class_under(mSDLSKK,"Context",rb_cObject);
  cDictionary = rb_define_class_under(mSDLSKK,"Dictionary",rb_cObject);
  cRomKanaRuleTable = rb_define_class_under(mSDLSKK,"RomKanaRuleTable",
					    rb_cObject);
  cKeybind = rb_define_class_under(mSDLSKK,"Keybind",rb_cObject);
  
  rb_define_module_function(mSDLSKK,"encoding=",skk_set_encoding,1);
  rb_define_module_function(mSDLSKK,"encoding",skk_get_encoding,0);
  
  rb_define_singleton_method(cContext,"new",skk_Context_new,4);
  rb_define_method(cContext,"input",skk_Context_input_event,1);
  rb_define_method(cContext,"str",skk_Context_get_str,0);
  rb_define_method(cContext,"render_str",skk_Context_render_str,4);
  rb_define_method(cContext,"render_minibuffer_str",skk_Context_render_minibuffer_str,4);
  rb_define_method(cContext,"get_basic_mode",skk_Context_get_basic_mode,0);
  rb_define_method(cContext,"clear",skk_Context_clear,0);
  rb_define_method(cContext,"clear_text",skk_Context_clear_text,0);
  
  rb_define_singleton_method(cDictionary,"new",skk_Dictionary_new,0);
  rb_define_method(cDictionary,"load",skk_Dict_load,2);
  rb_define_method(cDictionary,"save",skk_Dict_save,1);
  
  rb_define_singleton_method(cRomKanaRuleTable,"new",
			     skk_RomKanaRuleTable_new,1);

  rb_define_singleton_method(cKeybind,"new",skk_Keybind_new,0);
  rb_define_method(cKeybind,"set_key",skk_Keybind_set_key,2);
  rb_define_method(cKeybind,"set_default_key",skk_Keybind_set_default_key,0);
  rb_define_method(cKeybind,"unset_key",skk_Keybind_unset_key,1);
  
  SDLSKK_set_error_func(skk_error_handler);
  
  defineConstForSDLSKK();
}
#endif /* HAVE_SDLSKK */
