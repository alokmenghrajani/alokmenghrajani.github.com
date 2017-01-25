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
#ifdef HAVE_SMPEG
#include "rubysdl.h"
#include "smpeg/smpeg.h"

#ifdef HAVE_SDL_MIXER
#include "SDL_mixer.h"
#endif

static SMPEG_Filter* filters[3];
#define NULL_FILTER 0
#define BILINEAR_FILTER 1
#define DEBLOCKING_FILTER 2
#define NUM_FILTERS 3

static void setInfoToSMPEGInfo(VALUE obj,SMPEG_Info info)
{
  rb_iv_set(obj,"@has_audio",BOOL(info.has_audio));
  rb_iv_set(obj,"@has_video",BOOL(info.has_video));
  rb_iv_set(obj,"@width",INT2NUM(info.width));
  rb_iv_set(obj,"@height",INT2NUM(info.height));
  rb_iv_set(obj,"@current_frame",INT2NUM(info.current_frame));
  rb_iv_set(obj,"@current_fps",INT2NUM(info.current_fps));
  rb_iv_set(obj,"@audio_string",rb_str_new2(info.audio_string));
  rb_iv_set(obj,"@audio_current_frame",INT2NUM(info.audio_current_frame));
  rb_iv_set(obj,"@current_offset",UINT2NUM(info.current_offset));
  rb_iv_set(obj,"@total_size",UINT2NUM(info.total_size));
  rb_iv_set(obj,"@current_time",UINT2NUM(info.current_time));
  rb_iv_set(obj,"@total_time",UINT2NUM(info.total_time));
}

static VALUE smpeg_load(VALUE class,VALUE filename)
{
  SMPEG *mpeg;
  VALUE obj;
  char error_msg[2048];
    
  mpeg = SMPEG_new(GETCSTR(filename),NULL,0);
  if( SMPEG_error(mpeg) ){
    snprintf(error_msg,sizeof(error_msg),"Couldn't load %s: %s",
	     GETCSTR(filename),SMPEG_error(mpeg));
    SMPEG_delete(mpeg);
    rb_raise(eSDLError,"%s",error_msg);
  }

  obj = Data_Wrap_Struct(cMPEG,0,SMPEG_delete,mpeg);
  rb_iv_set(obj,"enable_audio",Qtrue);
  return obj;
}

static VALUE smpeg_getInfo(VALUE obj,VALUE infoObj)
{
  SMPEG *mpeg;
  SMPEG_Info info;
  
  if( !rb_obj_is_kind_of(infoObj,cMPEGInfo) )
    rb_raise(rb_eArgError,"type mismatch(expect SDL::MPEG::Info)");
  Data_Get_Struct(obj,SMPEG,mpeg);

  SMPEG_getinfo(mpeg,&info);
  setInfoToSMPEGInfo(infoObj,info);
  
  return Qnil;
}

static VALUE smpeg_enableAudio(VALUE obj,VALUE enable)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  rb_iv_set(obj,"enable_audio",enable);
  return Qnil;
}

static VALUE smpeg_enableVideo(VALUE obj,VALUE enable)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_enablevideo(mpeg,RTEST(enable));
  return Qnil;
}

static VALUE smpeg_status(VALUE obj)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  return INT2FIX(SMPEG_status(mpeg));
}

static VALUE smpeg_setVolume(VALUE obj,VALUE volume)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_setvolume(mpeg,NUM2INT(volume));
  return Qnil;
}

static VALUE smpeg_setDisplay(VALUE obj,VALUE dst)
{
  SMPEG *mpeg;
  SDL_Surface *surface;
  if( !rb_obj_is_kind_of(dst,cSurface) )
    rb_raise(rb_eArgError,"type mismatchi(expect Surface)");
  
  Data_Get_Struct(obj,SMPEG,mpeg);
  Data_Get_Struct(dst,SDL_Surface,surface);

  SMPEG_setdisplay(mpeg,surface,NULL,NULL);
  rb_iv_set(obj,"surface",dst);
  return Qnil;
}

static VALUE smpeg_setLoop(VALUE obj,VALUE repeat)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_loop(mpeg,RTEST(repeat));
  return Qnil;
}

static VALUE smpeg_scaleXY(VALUE obj,VALUE w,VALUE h)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_scaleXY(mpeg,NUM2INT(w),NUM2INT(h));
  return Qnil;
}

static VALUE smpeg_scale(VALUE obj,VALUE scale)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_scale(mpeg,NUM2INT(scale));
  return Qnil;
}

static VALUE smpeg_move(VALUE obj,VALUE x,VALUE y)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_move(mpeg,NUM2INT(x),NUM2INT(y));
  return Qnil;
}

static VALUE smpeg_setDisplayRegion(VALUE obj,VALUE x,VALUE y,VALUE w,
				    VALUE h)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_setdisplayregion(mpeg,NUM2INT(x),NUM2INT(y),NUM2INT(w),NUM2INT(h));
  return Qnil;
}

static VALUE smpeg_play(VALUE obj)
{
  SMPEG *mpeg;
  int use_audio;
  
  Data_Get_Struct(obj,SMPEG,mpeg);

#if HAVE_SDL_MIXER
  use_audio = RTEST(rb_iv_get(obj,"enable_audio")) &&
    Mix_QuerySpec( NULL, NULL, NULL );

  if( use_audio ){
    SDL_AudioSpec audiofmt;
    Uint16 format;
    int freq, channels;
    
    SMPEG_enableaudio(mpeg, 0);
    /* Tell SMPEG what the audio format is */
    Mix_QuerySpec(&freq, &format, &channels);
    audiofmt.format = format;
    audiofmt.freq = freq;
    audiofmt.channels = channels;
    SMPEG_actualSpec(mpeg, &audiofmt);

    /* Hook in the MPEG music mixer */
    Mix_HookMusic(NULL,NULL);
    Mix_HookMusic(SMPEG_playAudioSDL, mpeg);
    SMPEG_enableaudio(mpeg, 1);
  }
#else
  SMPEG_enableaudio(mpeg, RTEST(rb_iv_get(obj,"enable_audio")));
#endif
  
  SMPEG_play(mpeg);
  return Qnil;
}

static VALUE smpeg_pause(VALUE obj)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_pause(mpeg);
  return Qnil;
}

static VALUE smpeg_stop(VALUE obj)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_stop(mpeg);
  Mix_HookMusic(NULL,NULL);
  return Qnil;
}

static VALUE smpeg_rewind(VALUE obj)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_rewind(mpeg);
  return Qnil;
}

static VALUE smpeg_seek(VALUE obj,VALUE bytes)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_seek(mpeg,NUM2INT(bytes));
  return Qnil;
}

static VALUE smpeg_skip(VALUE obj,VALUE seconds)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_skip(mpeg,NUM2DBL(seconds));
  return Qnil;
}

static VALUE smpeg_renderFrame(VALUE obj,VALUE framenum)
{
  SMPEG *mpeg;
  Data_Get_Struct(obj,SMPEG,mpeg);
  SMPEG_renderFrame(mpeg,NUM2INT(framenum));
  return Qnil;
}

static VALUE smpeg_renderFinal(VALUE obj,VALUE dst, VALUE x, VALUE y)
{
  SMPEG *mpeg;
  SDL_Surface *surface;
  if( !rb_obj_is_kind_of(dst,cSurface) )
    rb_raise(rb_eArgError,"type mismatchi(expect Surface)");
  
  Data_Get_Struct(obj,SMPEG,mpeg);
  Data_Get_Struct(dst,SDL_Surface,surface);
  
  SMPEG_renderFinal(mpeg, surface, NUM2INT(x), NUM2INT(y));
  return Qnil;
}
  
static VALUE smpeg_setFilter(VALUE obj,VALUE filter)
{
  SMPEG *mpeg;
  
  Data_Get_Struct(obj,SMPEG,mpeg);
  if( (NUM2INT(filter)<0) || (NUM2INT(filter)>=NUM_FILTERS) )
    rb_raise(eSDLError,"There isn't that filter");
  SMPEG_filter(mpeg,filters[NUM2INT(filter)]);
  return Qnil;
}

static void defineConstForSMPEG()
{
  rb_define_const(cMPEG,"ERROR",INT2FIX(SMPEG_ERROR));
  rb_define_const(cMPEG,"STOPPED",INT2FIX(SMPEG_STOPPED));
  rb_define_const(cMPEG,"PLAYING",INT2FIX(SMPEG_PLAYING));
  rb_define_const(cMPEG,"NULL_FILTER",INT2FIX(NULL_FILTER));
  rb_define_const(cMPEG,"BILINEAR_FILTER",INT2FIX(BILINEAR_FILTER));
  rb_define_const(cMPEG,"DEBLOCKING_FILTER",INT2FIX(DEBLOCKING_FILTER));
}

void init_smpeg()
{
  cMPEG = rb_define_class_under(mSDL,"MPEG",rb_cObject);
  cMPEGInfo = rb_define_class_under(cMPEG,"Info",rb_cObject);

  filters[NULL_FILTER] = SMPEGfilter_null();
  filters[BILINEAR_FILTER] = SMPEGfilter_bilinear();
  filters[DEBLOCKING_FILTER] = SMPEGfilter_deblocking();

  defineConstForSMPEG();
  
  rb_define_attr(cMPEGInfo,"has_audio",1,0);
  rb_define_attr(cMPEGInfo,"has_video",1,0);
  rb_define_attr(cMPEGInfo,"width",1,0);
  rb_define_attr(cMPEGInfo,"height",1,0);
  rb_define_attr(cMPEGInfo,"current_frame",1,0);
  rb_define_attr(cMPEGInfo,"current_fps",1,0);
  rb_define_attr(cMPEGInfo,"audio_string",1,0);
  rb_define_attr(cMPEGInfo,"audio_current_frame",1,0);
  rb_define_attr(cMPEGInfo,"current_offset",1,0);
  rb_define_attr(cMPEGInfo,"total_size",1,0);
  rb_define_attr(cMPEGInfo,"current_time",1,0);
  rb_define_attr(cMPEGInfo,"total_time",1,0);

  rb_define_singleton_method(cMPEG,"load",smpeg_load,1);
  rb_define_singleton_method(cMPEG,"new",smpeg_load,1);

  rb_define_method(cMPEG,"info",smpeg_getInfo,1);
  rb_define_method(cMPEG,"enableAudio",smpeg_enableAudio,1);
  rb_define_method(cMPEG,"enableVideo",smpeg_enableVideo,1);
  rb_define_method(cMPEG,"status",smpeg_status,0);
  rb_define_method(cMPEG,"setVolume",smpeg_setVolume,1);
  rb_define_method(cMPEG,"setDisplay",smpeg_setDisplay,1);
  rb_define_method(cMPEG,"setLoop",smpeg_setLoop,1);
  rb_define_method(cMPEG,"scaleXY",smpeg_scaleXY,2);
  rb_define_method(cMPEG,"scale",smpeg_scale,1);
  rb_define_method(cMPEG,"move",smpeg_move,1);
  rb_define_method(cMPEG,"setDisplayRegion",smpeg_setDisplayRegion,4);
  rb_define_method(cMPEG,"play",smpeg_play,0);
  rb_define_method(cMPEG,"pause",smpeg_pause,0);
  rb_define_method(cMPEG,"stop",smpeg_stop,0);
  rb_define_method(cMPEG,"rewind",smpeg_rewind,0);
  rb_define_method(cMPEG,"seek",smpeg_seek,1);
  rb_define_method(cMPEG,"skip",smpeg_skip,1);
  rb_define_method(cMPEG,"renderFrame",smpeg_renderFrame,1);
  rb_define_method(cMPEG,"renderFinal",smpeg_renderFinal,3);
  rb_define_method(cMPEG,"setFilter",smpeg_setFilter,1);
  
}
#endif /* HAVE_SMPEG */
