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

static Uint8 *keyState;
static SDLMod modState;

void defineConstForKey()
{
  rb_define_const(mKey,"UNKNOWN",INT2NUM(SDLK_UNKNOWN));
  rb_define_const(mKey,"FIRST",INT2NUM(SDLK_FIRST));
  rb_define_const(mKey,"BACKSPACE",INT2NUM(SDLK_BACKSPACE));
  rb_define_const(mKey,"TAB",INT2NUM(SDLK_TAB));
  rb_define_const(mKey,"CLEAR",INT2NUM(SDLK_CLEAR));
  rb_define_const(mKey,"RETURN",INT2NUM(SDLK_RETURN));
  rb_define_const(mKey,"PAUSE",INT2NUM(SDLK_PAUSE));
  rb_define_const(mKey,"ESCAPE",INT2NUM(SDLK_ESCAPE));
  rb_define_const(mKey,"SPACE",INT2NUM(SDLK_SPACE));
  rb_define_const(mKey,"EXCLAIM",INT2NUM(SDLK_EXCLAIM));
  rb_define_const(mKey,"QUOTEDBL",INT2NUM(SDLK_QUOTEDBL));
  rb_define_const(mKey,"HASH",INT2NUM(SDLK_HASH));
  rb_define_const(mKey,"DOLLAR",INT2NUM(SDLK_DOLLAR));
  rb_define_const(mKey,"AMPERSAND",INT2NUM(SDLK_AMPERSAND));
  rb_define_const(mKey,"QUOTE",INT2NUM(SDLK_QUOTE));
  rb_define_const(mKey,"LEFTPAREN",INT2NUM(SDLK_LEFTPAREN));
  rb_define_const(mKey,"RIGHTPAREN",INT2NUM(SDLK_RIGHTPAREN));
  rb_define_const(mKey,"ASTERISK",INT2NUM(SDLK_ASTERISK));
  rb_define_const(mKey,"PLUS",INT2NUM(SDLK_PLUS));
  rb_define_const(mKey,"COMMA",INT2NUM(SDLK_COMMA));
  rb_define_const(mKey,"MINUS",INT2NUM(SDLK_MINUS));
  rb_define_const(mKey,"PERIOD",INT2NUM(SDLK_PERIOD));
  rb_define_const(mKey,"SLASH",INT2NUM(SDLK_SLASH));
  rb_define_const(mKey,"K0",INT2NUM(SDLK_0));
  rb_define_const(mKey,"K1",INT2NUM(SDLK_1));
  rb_define_const(mKey,"K2",INT2NUM(SDLK_2));
  rb_define_const(mKey,"K3",INT2NUM(SDLK_3));
  rb_define_const(mKey,"K4",INT2NUM(SDLK_4));
  rb_define_const(mKey,"K5",INT2NUM(SDLK_5));
  rb_define_const(mKey,"K6",INT2NUM(SDLK_6));
  rb_define_const(mKey,"K7",INT2NUM(SDLK_7));
  rb_define_const(mKey,"K8",INT2NUM(SDLK_8));
  rb_define_const(mKey,"K9",INT2NUM(SDLK_9));
  rb_define_const(mKey,"COLON",INT2NUM(SDLK_COLON));
  rb_define_const(mKey,"SEMICOLON",INT2NUM(SDLK_SEMICOLON));
  rb_define_const(mKey,"LESS",INT2NUM(SDLK_LESS));
  rb_define_const(mKey,"EQUALS",INT2NUM(SDLK_EQUALS));
  rb_define_const(mKey,"GREATER",INT2NUM(SDLK_GREATER));
  rb_define_const(mKey,"QUESTION",INT2NUM(SDLK_QUESTION));
  rb_define_const(mKey,"AT",INT2NUM(SDLK_AT));
  /* 
     Skip uppercase letters
     */
  rb_define_const(mKey,"LEFTBRACKET",INT2NUM(SDLK_LEFTBRACKET));
  rb_define_const(mKey,"BACKSLASH",INT2NUM(SDLK_BACKSLASH));
  rb_define_const(mKey,"RIGHTBRACKET",INT2NUM(SDLK_RIGHTBRACKET));
  rb_define_const(mKey,"CARET",INT2NUM(SDLK_CARET));
  rb_define_const(mKey,"UNDERSCORE",INT2NUM(SDLK_UNDERSCORE));
  rb_define_const(mKey,"BACKQUOTE",INT2NUM(SDLK_BACKQUOTE));
  rb_define_const(mKey,"A",INT2NUM(SDLK_a));
  rb_define_const(mKey,"B",INT2NUM(SDLK_b));
  rb_define_const(mKey,"C",INT2NUM(SDLK_c));
  rb_define_const(mKey,"D",INT2NUM(SDLK_d));
  rb_define_const(mKey,"E",INT2NUM(SDLK_e));
  rb_define_const(mKey,"F",INT2NUM(SDLK_f));
  rb_define_const(mKey,"G",INT2NUM(SDLK_g));
  rb_define_const(mKey,"H",INT2NUM(SDLK_h));
  rb_define_const(mKey,"I",INT2NUM(SDLK_i));
  rb_define_const(mKey,"J",INT2NUM(SDLK_j));
  rb_define_const(mKey,"K",INT2NUM(SDLK_k));
  rb_define_const(mKey,"L",INT2NUM(SDLK_l));
  rb_define_const(mKey,"M",INT2NUM(SDLK_m));
  rb_define_const(mKey,"N",INT2NUM(SDLK_n));
  rb_define_const(mKey,"O",INT2NUM(SDLK_o));
  rb_define_const(mKey,"P",INT2NUM(SDLK_p));
  rb_define_const(mKey,"Q",INT2NUM(SDLK_q));
  rb_define_const(mKey,"R",INT2NUM(SDLK_r));
  rb_define_const(mKey,"S",INT2NUM(SDLK_s));
  rb_define_const(mKey,"T",INT2NUM(SDLK_t));
  rb_define_const(mKey,"U",INT2NUM(SDLK_u));
  rb_define_const(mKey,"V",INT2NUM(SDLK_v));
  rb_define_const(mKey,"W",INT2NUM(SDLK_w));
  rb_define_const(mKey,"X",INT2NUM(SDLK_x));
  rb_define_const(mKey,"Y",INT2NUM(SDLK_y));
  rb_define_const(mKey,"Z",INT2NUM(SDLK_z));
  rb_define_const(mKey,"DELETE",INT2NUM(SDLK_DELETE));
	/* End of ASCII mapped keysyms */

	/* International keyboard syms */
  rb_define_const(mKey,"WORLD_0",INT2NUM(SDLK_WORLD_0));
  rb_define_const(mKey,"WORLD_1",INT2NUM(SDLK_WORLD_1));
  rb_define_const(mKey,"WORLD_2",INT2NUM(SDLK_WORLD_2));
  rb_define_const(mKey,"WORLD_3",INT2NUM(SDLK_WORLD_3));
  rb_define_const(mKey,"WORLD_4",INT2NUM(SDLK_WORLD_4));
  rb_define_const(mKey,"WORLD_5",INT2NUM(SDLK_WORLD_5));
  rb_define_const(mKey,"WORLD_6",INT2NUM(SDLK_WORLD_6));
  rb_define_const(mKey,"WORLD_7",INT2NUM(SDLK_WORLD_7));
  rb_define_const(mKey,"WORLD_8",INT2NUM(SDLK_WORLD_8));
  rb_define_const(mKey,"WORLD_9",INT2NUM(SDLK_WORLD_9));
  rb_define_const(mKey,"WORLD_10",INT2NUM(SDLK_WORLD_10));
  rb_define_const(mKey,"WORLD_11",INT2NUM(SDLK_WORLD_11));
  rb_define_const(mKey,"WORLD_12",INT2NUM(SDLK_WORLD_12));
  rb_define_const(mKey,"WORLD_13",INT2NUM(SDLK_WORLD_13));
  rb_define_const(mKey,"WORLD_14",INT2NUM(SDLK_WORLD_14));
  rb_define_const(mKey,"WORLD_15",INT2NUM(SDLK_WORLD_15));
  rb_define_const(mKey,"WORLD_16",INT2NUM(SDLK_WORLD_16));
  rb_define_const(mKey,"WORLD_17",INT2NUM(SDLK_WORLD_17));
  rb_define_const(mKey,"WORLD_18",INT2NUM(SDLK_WORLD_18));
  rb_define_const(mKey,"WORLD_19",INT2NUM(SDLK_WORLD_19));
  rb_define_const(mKey,"WORLD_20",INT2NUM(SDLK_WORLD_20));
  rb_define_const(mKey,"WORLD_21",INT2NUM(SDLK_WORLD_21));
  rb_define_const(mKey,"WORLD_22",INT2NUM(SDLK_WORLD_22));
  rb_define_const(mKey,"WORLD_23",INT2NUM(SDLK_WORLD_23));
  rb_define_const(mKey,"WORLD_24",INT2NUM(SDLK_WORLD_24));
  rb_define_const(mKey,"WORLD_25",INT2NUM(SDLK_WORLD_25));
  rb_define_const(mKey,"WORLD_26",INT2NUM(SDLK_WORLD_26));
  rb_define_const(mKey,"WORLD_27",INT2NUM(SDLK_WORLD_27));
  rb_define_const(mKey,"WORLD_28",INT2NUM(SDLK_WORLD_28));
  rb_define_const(mKey,"WORLD_29",INT2NUM(SDLK_WORLD_29));
  rb_define_const(mKey,"WORLD_30",INT2NUM(SDLK_WORLD_30));
  rb_define_const(mKey,"WORLD_31",INT2NUM(SDLK_WORLD_31));
  rb_define_const(mKey,"WORLD_32",INT2NUM(SDLK_WORLD_32));
  rb_define_const(mKey,"WORLD_33",INT2NUM(SDLK_WORLD_33));
  rb_define_const(mKey,"WORLD_34",INT2NUM(SDLK_WORLD_34));
  rb_define_const(mKey,"WORLD_35",INT2NUM(SDLK_WORLD_35));
  rb_define_const(mKey,"WORLD_36",INT2NUM(SDLK_WORLD_36));
  rb_define_const(mKey,"WORLD_37",INT2NUM(SDLK_WORLD_37));
  rb_define_const(mKey,"WORLD_38",INT2NUM(SDLK_WORLD_38));
  rb_define_const(mKey,"WORLD_39",INT2NUM(SDLK_WORLD_39));
  rb_define_const(mKey,"WORLD_40",INT2NUM(SDLK_WORLD_40));
  rb_define_const(mKey,"WORLD_41",INT2NUM(SDLK_WORLD_41));
  rb_define_const(mKey,"WORLD_42",INT2NUM(SDLK_WORLD_42));
  rb_define_const(mKey,"WORLD_43",INT2NUM(SDLK_WORLD_43));
  rb_define_const(mKey,"WORLD_44",INT2NUM(SDLK_WORLD_44));
  rb_define_const(mKey,"WORLD_45",INT2NUM(SDLK_WORLD_45));
  rb_define_const(mKey,"WORLD_46",INT2NUM(SDLK_WORLD_46));
  rb_define_const(mKey,"WORLD_47",INT2NUM(SDLK_WORLD_47));
  rb_define_const(mKey,"WORLD_48",INT2NUM(SDLK_WORLD_48));
  rb_define_const(mKey,"WORLD_49",INT2NUM(SDLK_WORLD_49));
  rb_define_const(mKey,"WORLD_50",INT2NUM(SDLK_WORLD_50));
  rb_define_const(mKey,"WORLD_51",INT2NUM(SDLK_WORLD_51));
  rb_define_const(mKey,"WORLD_52",INT2NUM(SDLK_WORLD_52));
  rb_define_const(mKey,"WORLD_53",INT2NUM(SDLK_WORLD_53));
  rb_define_const(mKey,"WORLD_54",INT2NUM(SDLK_WORLD_54));
  rb_define_const(mKey,"WORLD_55",INT2NUM(SDLK_WORLD_55));
  rb_define_const(mKey,"WORLD_56",INT2NUM(SDLK_WORLD_56));
  rb_define_const(mKey,"WORLD_57",INT2NUM(SDLK_WORLD_57));
  rb_define_const(mKey,"WORLD_58",INT2NUM(SDLK_WORLD_58));
  rb_define_const(mKey,"WORLD_59",INT2NUM(SDLK_WORLD_59));
  rb_define_const(mKey,"WORLD_60",INT2NUM(SDLK_WORLD_60));
  rb_define_const(mKey,"WORLD_61",INT2NUM(SDLK_WORLD_61));
  rb_define_const(mKey,"WORLD_62",INT2NUM(SDLK_WORLD_62));
  rb_define_const(mKey,"WORLD_63",INT2NUM(SDLK_WORLD_63));
  rb_define_const(mKey,"WORLD_64",INT2NUM(SDLK_WORLD_64));
  rb_define_const(mKey,"WORLD_65",INT2NUM(SDLK_WORLD_65));
  rb_define_const(mKey,"WORLD_66",INT2NUM(SDLK_WORLD_66));
  rb_define_const(mKey,"WORLD_67",INT2NUM(SDLK_WORLD_67));
  rb_define_const(mKey,"WORLD_68",INT2NUM(SDLK_WORLD_68));
  rb_define_const(mKey,"WORLD_69",INT2NUM(SDLK_WORLD_69));
  rb_define_const(mKey,"WORLD_70",INT2NUM(SDLK_WORLD_70));
  rb_define_const(mKey,"WORLD_71",INT2NUM(SDLK_WORLD_71));
  rb_define_const(mKey,"WORLD_72",INT2NUM(SDLK_WORLD_72));
  rb_define_const(mKey,"WORLD_73",INT2NUM(SDLK_WORLD_73));
  rb_define_const(mKey,"WORLD_74",INT2NUM(SDLK_WORLD_74));
  rb_define_const(mKey,"WORLD_75",INT2NUM(SDLK_WORLD_75));
  rb_define_const(mKey,"WORLD_76",INT2NUM(SDLK_WORLD_76));
  rb_define_const(mKey,"WORLD_77",INT2NUM(SDLK_WORLD_77));
  rb_define_const(mKey,"WORLD_78",INT2NUM(SDLK_WORLD_78));
  rb_define_const(mKey,"WORLD_79",INT2NUM(SDLK_WORLD_79));
  rb_define_const(mKey,"WORLD_80",INT2NUM(SDLK_WORLD_80));
  rb_define_const(mKey,"WORLD_81",INT2NUM(SDLK_WORLD_81));
  rb_define_const(mKey,"WORLD_82",INT2NUM(SDLK_WORLD_82));
  rb_define_const(mKey,"WORLD_83",INT2NUM(SDLK_WORLD_83));
  rb_define_const(mKey,"WORLD_84",INT2NUM(SDLK_WORLD_84));
  rb_define_const(mKey,"WORLD_85",INT2NUM(SDLK_WORLD_85));
  rb_define_const(mKey,"WORLD_86",INT2NUM(SDLK_WORLD_86));
  rb_define_const(mKey,"WORLD_87",INT2NUM(SDLK_WORLD_87));
  rb_define_const(mKey,"WORLD_88",INT2NUM(SDLK_WORLD_88));
  rb_define_const(mKey,"WORLD_89",INT2NUM(SDLK_WORLD_89));
  rb_define_const(mKey,"WORLD_90",INT2NUM(SDLK_WORLD_90));
  rb_define_const(mKey,"WORLD_91",INT2NUM(SDLK_WORLD_91));
  rb_define_const(mKey,"WORLD_92",INT2NUM(SDLK_WORLD_92));
  rb_define_const(mKey,"WORLD_93",INT2NUM(SDLK_WORLD_93));
  rb_define_const(mKey,"WORLD_94",INT2NUM(SDLK_WORLD_94));
  rb_define_const(mKey,"WORLD_95",INT2NUM(SDLK_WORLD_95));


  /* Numeric keypad */
  rb_define_const(mKey,"KP0",INT2NUM(SDLK_KP0));
  rb_define_const(mKey,"KP1",INT2NUM(SDLK_KP1));
  rb_define_const(mKey,"KP2",INT2NUM(SDLK_KP2));
  rb_define_const(mKey,"KP3",INT2NUM(SDLK_KP3));
  rb_define_const(mKey,"KP4",INT2NUM(SDLK_KP4));
  rb_define_const(mKey,"KP5",INT2NUM(SDLK_KP5));
  rb_define_const(mKey,"KP6",INT2NUM(SDLK_KP6));
  rb_define_const(mKey,"KP7",INT2NUM(SDLK_KP7));
  rb_define_const(mKey,"KP8",INT2NUM(SDLK_KP8));
  rb_define_const(mKey,"KP9",INT2NUM(SDLK_KP9));
  rb_define_const(mKey,"KP_PERIOD",INT2NUM(SDLK_KP_PERIOD));
  rb_define_const(mKey,"KP_DIVIDE",INT2NUM(SDLK_KP_DIVIDE));
  rb_define_const(mKey,"KP_MULTIPLY",INT2NUM(SDLK_KP_MULTIPLY));
  rb_define_const(mKey,"KP_MINUS",INT2NUM(SDLK_KP_MINUS));
  rb_define_const(mKey,"KP_PLUS",INT2NUM(SDLK_KP_PLUS));
  rb_define_const(mKey,"KP_ENTER",INT2NUM(SDLK_KP_ENTER));
  rb_define_const(mKey,"KP_EQUALS",INT2NUM(SDLK_KP_EQUALS));
  
  /* Arrows + Home/End pad */
  rb_define_const(mKey,"UP",INT2NUM(SDLK_UP));
  rb_define_const(mKey,"DOWN",INT2NUM(SDLK_DOWN));
  rb_define_const(mKey,"RIGHT",INT2NUM(SDLK_RIGHT));
  rb_define_const(mKey,"LEFT",INT2NUM(SDLK_LEFT));
  rb_define_const(mKey,"INSERT",INT2NUM(SDLK_INSERT));
  rb_define_const(mKey,"HOME",INT2NUM(SDLK_HOME));
  rb_define_const(mKey,"END",INT2NUM(SDLK_END));
  rb_define_const(mKey,"PAGEUP",INT2NUM(SDLK_PAGEUP));
  rb_define_const(mKey,"PAGEDOWN",INT2NUM(SDLK_PAGEDOWN));

  /* Function keys */
  rb_define_const(mKey,"F1",INT2NUM(SDLK_F1));
  rb_define_const(mKey,"F2",INT2NUM(SDLK_F2));
  rb_define_const(mKey,"F3",INT2NUM(SDLK_F3));
  rb_define_const(mKey,"F4",INT2NUM(SDLK_F4));
  rb_define_const(mKey,"F5",INT2NUM(SDLK_F5));
  rb_define_const(mKey,"F6",INT2NUM(SDLK_F6));
  rb_define_const(mKey,"F7",INT2NUM(SDLK_F7));
  rb_define_const(mKey,"F8",INT2NUM(SDLK_F8));
  rb_define_const(mKey,"F9",INT2NUM(SDLK_F9));
  rb_define_const(mKey,"F10",INT2NUM(SDLK_F10));
  rb_define_const(mKey,"F11",INT2NUM(SDLK_F11));
  rb_define_const(mKey,"F12",INT2NUM(SDLK_F12));
  rb_define_const(mKey,"F13",INT2NUM(SDLK_F13));
  rb_define_const(mKey,"F14",INT2NUM(SDLK_F14));
  rb_define_const(mKey,"F15",INT2NUM(SDLK_F15));
  
  /* Key state modifier keys */
  rb_define_const(mKey,"NUMLOCK",INT2NUM(SDLK_NUMLOCK));
  rb_define_const(mKey,"CAPSLOCK",INT2NUM(SDLK_CAPSLOCK));
  rb_define_const(mKey,"SCROLLOCK",INT2NUM(SDLK_SCROLLOCK));
  rb_define_const(mKey,"RSHIFT",INT2NUM(SDLK_RSHIFT));
  rb_define_const(mKey,"LSHIFT",INT2NUM(SDLK_LSHIFT));
  rb_define_const(mKey,"RCTRL",INT2NUM(SDLK_RCTRL));
  rb_define_const(mKey,"LCTRL",INT2NUM(SDLK_LCTRL));
  rb_define_const(mKey,"RALT",INT2NUM(SDLK_RALT));
  rb_define_const(mKey,"LALT",INT2NUM(SDLK_LALT));
  rb_define_const(mKey,"RMETA",INT2NUM(SDLK_RMETA));
  rb_define_const(mKey,"LMETA",INT2NUM(SDLK_LMETA));
  rb_define_const(mKey,"LSUPER",INT2NUM(SDLK_LSUPER));
  rb_define_const(mKey,"RSUPER",INT2NUM(SDLK_RSUPER));
  rb_define_const(mKey,"MODE",INT2NUM(SDLK_MODE));
  
  /* Miscellaneous function keys */
  rb_define_const(mKey,"HELP",INT2NUM(SDLK_HELP));
  rb_define_const(mKey,"PRINT",INT2NUM(SDLK_PRINT));
  rb_define_const(mKey,"SYSREQ",INT2NUM(SDLK_SYSREQ));
  rb_define_const(mKey,"BREAK",INT2NUM(SDLK_BREAK));
  rb_define_const(mKey,"MENU",INT2NUM(SDLK_MENU));
  rb_define_const(mKey,"POWER",INT2NUM(SDLK_POWER));
  rb_define_const(mKey,"EURO",INT2NUM(SDLK_EURO));

  /* Add any other keys here */
  
  rb_define_const(mKey,"LAST",INT2NUM(SDLK_LAST));

  /* key mods */
  rb_define_const(mKey,"MOD_NONE",UINT2NUM(KMOD_NONE));
  rb_define_const(mKey,"MOD_LSHIFT",UINT2NUM(KMOD_LSHIFT));
  rb_define_const(mKey,"MOD_RSHIFT",UINT2NUM(KMOD_RSHIFT));
  rb_define_const(mKey,"MOD_LCTRL",UINT2NUM(KMOD_LCTRL));
  rb_define_const(mKey,"MOD_RCTRL",UINT2NUM(KMOD_RCTRL));
  rb_define_const(mKey,"MOD_LALT",UINT2NUM(KMOD_LALT));
  rb_define_const(mKey,"MOD_RALT",UINT2NUM(KMOD_RALT));
  rb_define_const(mKey,"MOD_LMETA",UINT2NUM(KMOD_LMETA));
  rb_define_const(mKey,"MOD_RMETA",UINT2NUM(KMOD_RMETA));
  rb_define_const(mKey,"MOD_NUM",UINT2NUM(KMOD_NUM));
  rb_define_const(mKey,"MOD_CAPS",UINT2NUM(KMOD_CAPS));
  rb_define_const(mKey,"MOD_MODE",UINT2NUM(KMOD_MODE));
  rb_define_const(mKey,"MOD_RESERVED",UINT2NUM(KMOD_RESERVED));

  rb_define_const(mKey,"MOD_CTRL",UINT2NUM(KMOD_CTRL));
  rb_define_const(mKey,"MOD_SHIFT",UINT2NUM(KMOD_SHIFT));
  rb_define_const(mKey,"MOD_ALT",UINT2NUM(KMOD_ALT));
  rb_define_const(mKey,"MOD_META",UINT2NUM(KMOD_META));

  /* key repeat constants*/
  rb_define_const(mKey,"DEFAULT_REPEAT_DELAY", INT2NUM(SDL_DEFAULT_REPEAT_DELAY));
  rb_define_const(mKey,"DEFAULT_REPEAT_INTERVAL", INT2NUM(SDL_DEFAULT_REPEAT_INTERVAL));
  
}

/* under 2 function is for testing */
static VALUE sdl_keyScan(VALUE mod)
{
  keyState=SDL_GetKeyState(NULL);
  modState=SDL_GetModState();
  return Qnil;
}
static VALUE sdl_keyPressed(VALUE mod,VALUE keysym)
{
  if(NUM2INT(keysym) <SDLK_FIRST || SDLK_LAST < NUM2INT(keysym))
    rb_raise(eSDLError, "keysym number is out of range");
  
  return (keyState[NUM2INT(keysym)]==SDL_PRESSED)?Qtrue:Qfalse;
}
static VALUE sdl_modState(VALUE mod)
{
  return UINT2NUM(modState);
}
static VALUE sdl_enableKeyRepeat(VALUE mod,VALUE delay,VALUE interval)
{
  if( SDL_EnableKeyRepeat( NUM2INT(delay),NUM2INT(interval) )==-1 ){
    rb_raise(eSDLError,"enable key repeat fail: %s",SDL_GetError());
  }
  return Qnil;
}
static VALUE sdl_disableKeyRepeat(VALUE mod)
{
  if( SDL_EnableKeyRepeat( 0,0 )==-1 ){
    rb_raise(eSDLError,"disable key repeat fail: %s",SDL_GetError());
  }
  return Qnil;
}
static VALUE sdl_getKeyName(VALUE mod,VALUE key)
{
  return rb_str_new2( SDL_GetKeyName( NUM2UINT(key) ) );
}
void init_keyEvent()
{
  mKey = rb_define_module_under(mSDL,"Key");
  rb_define_module_function(mKey,"scan",sdl_keyScan,0);
  rb_define_module_function(mKey,"press?",sdl_keyPressed,1);
  rb_define_module_function(mKey,"modState",sdl_modState,0);
  rb_define_module_function(mKey,"enableKeyRepeat",sdl_enableKeyRepeat,2);
  rb_define_module_function(mKey,"disableKeyRepeat",sdl_disableKeyRepeat,0);
  rb_define_module_function(mKey,"getKeyName",sdl_getKeyName,1);

  keyState = ALLOC_N(Uint8,SDLK_LAST);
  memset(keyState, SDL_RELEASED, SDLK_LAST);
  
  defineConstForKey();
}
