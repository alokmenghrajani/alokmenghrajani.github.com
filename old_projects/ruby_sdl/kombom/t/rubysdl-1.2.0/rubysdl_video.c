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

void sdl_freeSurface(SDL_Surface* surface)
{
  if( !rubysdl_is_quit() ){
    SDL_FreeSurface(surface);
  }
}

Uint32 VALUE2COLOR(VALUE color,SDL_PixelFormat *format)
{
  if( rb_obj_is_kind_of( color, rb_cArray ) ){
    switch( RARRAY(color)->len ){
    case 3:
      return SDL_MapRGB(format,
			NUM2UINT(rb_ary_entry(color,0)),
			NUM2UINT(rb_ary_entry(color,1)),
			NUM2UINT(rb_ary_entry(color,2)) );
    case 4:
      return SDL_MapRGBA(format,
                         NUM2UINT(rb_ary_entry(color,0)),
                         NUM2UINT(rb_ary_entry(color,1)),
                         NUM2UINT(rb_ary_entry(color,2)),
                         NUM2UINT(rb_ary_entry(color,3)) );
    default:
      rb_raise(rb_eArgError,"type mismatch:color array needs 3 or 4 elements");
    }
  }else{
    return NUM2UINT(color);
  }
}

static VALUE sdl_getVideoSurface(VALUE mod)
{
  SDL_Surface *surface;
  surface = SDL_GetVideoSurface();
  if(surface==NULL)
    rb_raise(eSDLError,"Couldn't get video surface: %s",SDL_GetError());
  return Data_Wrap_Struct(cSurface,0,0,surface);
}

static VALUE sdl_videoDriverName(VALUE mod)
{
  char namebuf[256];
  SDL_VideoDriverName( namebuf, sizeof(namebuf) );
  return rb_str_new2( namebuf );
}

static VALUE sdl_listModes(VALUE mod,VALUE flags)
{
  SDL_Rect **modes;
  int i;
  VALUE modesArray;
  
  modes=SDL_ListModes(NULL,NUM2UINT(flags));

  if( modes == NULL )
    return Qnil;/* no modes available */
  if( modes == (SDL_Rect **)-1)
    return Qtrue;/* all resolutions available */

  /* available modes into modesArray */
  modesArray=rb_ary_new();
  
  for(i=0;modes[i]!=NULL;++i){
    rb_ary_push( modesArray,
		 rb_ary_new3( 2, INT2NUM(modes[i]->w), INT2NUM(modes[i]->h)) );
  }
  return modesArray;
}

static VALUE sdl_checkVideoMode(VALUE mod,VALUE w,VALUE h,VALUE bpp,
				VALUE flags)
{
  return INT2FIX( SDL_VideoModeOK(NUM2INT(w),NUM2INT(h),NUM2INT(bpp),
				  NUM2UINT(flags)) );
}
static VALUE sdl_getVideoInfo(VALUE mod)
{
  const SDL_VideoInfo *info;
  VALUE obj;
  info = SDL_GetVideoInfo();
  if(info==NULL)
    rb_raise(eSDLError,"Couldn't get video information");
  obj=rb_obj_alloc(cVideoInfo);
  rb_iv_set(obj,"@hw_available",BOOL(info->hw_available));
  rb_iv_set(obj,"@wm_available",BOOL(info->wm_available));
  rb_iv_set(obj,"@blit_hw",BOOL(info->blit_hw));
  rb_iv_set(obj,"@blit_hw_CC",BOOL(info->blit_hw_CC));
  rb_iv_set(obj,"@blit_hw_A",BOOL(info->blit_hw_A));
  rb_iv_set(obj,"@blit_sw",BOOL(info->blit_sw));
  rb_iv_set(obj,"@blit_sw_CC",BOOL(info->blit_sw_CC));
  rb_iv_set(obj,"@blit_sw_A",BOOL(info->blit_sw_A));
  rb_iv_set(obj,"@blit_fill",BOOL(info->blit_fill));
  rb_iv_set(obj,"@video_mem",UINT2NUM(info->video_mem));
  rb_iv_set(obj,"@bpp",UINT2NUM(info->vfmt->BitsPerPixel));
  return obj;
}


static VALUE sdl_updateRect(VALUE obj,VALUE x,VALUE y,VALUE w,VALUE h)
{
  SDL_Surface *screen;
  Data_Get_Struct(obj,SDL_Surface,screen);
  SDL_UpdateRect(screen,NUM2INT(x),NUM2INT(y),NUM2INT(w),NUM2INT(h));
  return Qnil;
}

static VALUE sdl_flip(VALUE obj)
{
  SDL_Surface *screen;
  Data_Get_Struct(obj,SDL_Surface,screen);
  if( SDL_Flip(screen) < 0 ){
    rb_raise( eSDLError,"flip fail : %s",SDL_GetError() );
  }
  return Qnil;
}

static VALUE sdl_toggleFullScreen(VALUE obj)
{
  SDL_Surface *screen;
  Data_Get_Struct(obj,SDL_Surface,screen);
  if( SDL_WM_ToggleFullScreen(screen)==0 ){
    rb_raise( eSDLError,"toggle full screen fail : %s", SDL_GetError() );
  }
  return Qnil;
}

static VALUE sdl_setVideoMode(VALUE mod,VALUE w,VALUE h,VALUE bpp,
       VALUE flags)
{
  SDL_Surface *screen;
  screen=SDL_SetVideoMode(NUM2INT(w),NUM2INT(h),NUM2INT(bpp),
			  NUM2UINT(flags));
  if( screen==NULL ){
    rb_raise(eSDLError,"Cound't set %dx%d %d bpp video mode: %s",
	     NUM2INT(w),NUM2INT(h),NUM2INT(bpp),SDL_GetError());
  }  
  return Data_Wrap_Struct(cScreen,0,0,screen);
}
static VALUE sdl_setGamma(VALUE mod,VALUE rgamma,VALUE ggamma,VALUE bgamma)
{
  if(SDL_SetGamma(NUM2DBL(rgamma),NUM2DBL(ggamma),NUM2DBL(bgamma))==-1)
    rb_raise(eSDLError,"set gamma failed: %s",SDL_GetError());
  return Qnil;
}

static VALUE sdl_getGammaRamp(VALUE mod)
{
  Uint16 table[3][256];
  VALUE ary_table, ary_subtable;
  int i,j;
  
  if( SDL_GetGammaRamp( table[0], table[1], table[2] ) == -1 ){
    rb_raise(eSDLError,"cannot get gamma lookup table: %s",SDL_GetError());
  }
  
  ary_table = rb_ary_new();
  for( i=0; i<3; ++i ){
    ary_subtable = rb_ary_new();
    for( j=0; j<256; ++j ){
      rb_ary_push( ary_subtable, INT2FIX(table[i][j]) );
    }
    rb_ary_push( ary_table, ary_subtable );
  }
  return ary_table;
}

static VALUE sdl_setGammaRamp(VALUE mod, VALUE ary_table)
{
  Uint16 table[3][256];
  VALUE ary_subtable;
  int i,j;

  for( i=0; i<3; ++i ){
    ary_subtable = rb_ary_entry( ary_table, i );
    for( j=0; j<256; ++j ){
      table[i][j] = NUM2INT( rb_ary_entry( ary_subtable, j ) );
    }
  }
  if( SDL_SetGammaRamp( table[0], table[1], table[2] )==-1 ){
    rb_raise(eSDLError,"cannot set gamma lookup table: %s",SDL_GetError());
  }
  return Qnil;
}

static VALUE sdl_createSurface(VALUE class,VALUE flags,VALUE w,VALUE h,
			       VALUE format)
{
  SDL_Surface *newSurface;
  SDL_Surface *formatSurface;
  SDL_PixelFormat *pixFormat;
  if( rb_obj_is_kind_of( format,cSurface ) ){
    Data_Get_Struct(format,SDL_Surface,formatSurface);
  }else{
    rb_raise( rb_eArgError,"type mismatch(expect Surface)" );
  }
  pixFormat = formatSurface->format;
  newSurface = SDL_CreateRGBSurface( NUM2UINT(flags),NUM2INT(w),NUM2INT(h),
				     pixFormat->BitsPerPixel,
				     pixFormat->Rmask,pixFormat->Gmask,
				     pixFormat->Bmask,pixFormat->Amask );
  if( newSurface==NULL ){
    rb_raise( eSDLError,"Couldn't Create Surface: %s",SDL_GetError() );
  }
  return Data_Wrap_Struct(class,0,sdl_freeSurface,newSurface);
}

static VALUE sdl_createSurfaceWithFormat(VALUE class,VALUE flags,VALUE w,
                                         VALUE h,VALUE depth,VALUE Rmask,
                                         VALUE Gmask,VALUE Bmask,
                                         VALUE Amask)
{
  SDL_Surface *surface;

  surface = SDL_CreateRGBSurface(NUM2UINT(flags),NUM2INT(w),NUM2INT(h),
                                 NUM2UINT(depth),NUM2UINT(Rmask),
                                 NUM2UINT(Gmask),NUM2UINT(Bmask),
                                 NUM2UINT(Amask));
  if( surface == NULL ){
    rb_raise(eSDLError,"Couldn't Create Surface: %s",SDL_GetError());
  }
  return Data_Wrap_Struct(class,0,sdl_freeSurface,surface);
}


static VALUE sdl_createSurfaceFrom(VALUE class,VALUE pixels,VALUE w,
                                   VALUE h,VALUE depth,VALUE pitch,
                                   VALUE Rmask,VALUE Gmask,VALUE Bmask,
                                   VALUE Amask)
{
  SDL_Surface *surface;
  void* pixel_data;
  
  StringValue(pixels);
  pixel_data = ALLOC_N(char, RSTRING(pixels)->len);
  memcpy(pixel_data,RSTRING(pixels)->ptr,RSTRING(pixels)->len);
  
  surface = SDL_CreateRGBSurfaceFrom(pixel_data,NUM2INT(w),NUM2INT(h),
                                     NUM2UINT(depth),NUM2INT(pitch),
                                     NUM2UINT(Rmask),NUM2UINT(Gmask),
                                     NUM2UINT(Bmask),NUM2UINT(Amask));
  if( surface == NULL ){
    rb_raise(eSDLError,"Couldn't Create Surface: %s",SDL_GetError());
  }
  surface->flags &= ~SDL_PREALLOC;
  return Data_Wrap_Struct(class,0,sdl_freeSurface,surface);
}

static VALUE sdl_loadBMP(VALUE class,VALUE filename)
{
  SDL_Surface *image;
  image=SDL_LoadBMP(GETCSTR(filename));
  if( image==NULL ){
    rb_raise(eSDLError,"Couldn't Load BMP file %s : %s",
	     GETCSTR(filename),SDL_GetError());
  }
  return Data_Wrap_Struct(class,0,sdl_freeSurface,image);
}

static VALUE sdl_loadBMPFromIO(VALUE class, VALUE io)
{
  volatile VALUE guard = io;
  SDL_Surface* image;
  image = SDL_LoadBMP_RW(rubysdl_RWops_from_ruby_obj(io), 1);
  if(image == NULL)
    rb_raise(eSDLError, "Couldn't Load BMP file from IO : %s",
             SDL_GetError());
  return Data_Wrap_Struct(class,0,sdl_freeSurface,image);
}

static VALUE sdl_saveBMP(VALUE obj,VALUE filename)
{
  SDL_Surface *image;
  Data_Get_Struct( obj, SDL_Surface, image );
  if( SDL_SaveBMP( image, GETCSTR(filename) )==-1 ){
    rb_raise(eSDLError,"cannot save %s: %s",GETCSTR(filename),SDL_GetError());
  }
  return Qnil;
}
  
static VALUE sdl_displayFormat(VALUE obj)
{
  SDL_Surface *srcImage,*destImage;
  Data_Get_Struct(obj,SDL_Surface,srcImage);
  destImage=SDL_DisplayFormat(srcImage);
  if( destImage==NULL ){
    rb_raise(eSDLError,"Couldn't convert surface format: %s",SDL_GetError());
  }
  return Data_Wrap_Struct(cSurface,0,sdl_freeSurface,destImage);
}

static VALUE sdl_displayFormatAlpha(VALUE obj)
{
  SDL_Surface *srcImage,*destImage;
  Data_Get_Struct(obj,SDL_Surface,srcImage);
  destImage=SDL_DisplayFormatAlpha(srcImage);
  if( destImage==NULL ){
    rb_raise(eSDLError,"Couldn't convert surface format: %s",SDL_GetError());
  }
  return Data_Wrap_Struct(cSurface,0,sdl_freeSurface,destImage);
}

static VALUE sdl_setColorKey(VALUE obj,VALUE flag,VALUE key)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  if( SDL_SetColorKey(surface,NUM2UINT(flag),VALUE2COLOR(key,surface->format))
      < 0 ){
    rb_raise(eSDLError,"setColorKey failed: %s",SDL_GetError());
  }
  return Qnil;
}

/* return 0 if succeed, return -2 video memory lost (on Direct X)*/
static VALUE sdl_blitSurface(VALUE obj,VALUE src,VALUE srcX,VALUE srcY,
			     VALUE srcW,VALUE srcH,VALUE dest,VALUE destX,
			     VALUE destY)
{
  SDL_Surface *srcSurface,*destSurface;
  SDL_Rect srcRect,destRect;
  int result;

  if( !rb_obj_is_kind_of(src,cSurface) ||
      !rb_obj_is_kind_of(dest,cSurface) ){
    rb_raise(rb_eArgError,"type mismatch");
  }
  Data_Get_Struct(src,SDL_Surface,srcSurface);
  Data_Get_Struct(dest,SDL_Surface,destSurface);

  if (NUM2INT(srcX)==0&&NUM2INT(srcY)==0&&NUM2INT(srcW)==0&&NUM2INT(srcH)==0){
    if (NUM2INT(destX)==0&&NUM2INT(destY)==0&&NUM2INT(srcW)==0&&NUM2INT(srcH)==0){
      result = SDL_BlitSurface(srcSurface,NULL,destSurface,NULL);
    }else{
      SetRect(destRect,destX,destY,srcW,srcH);
      result = SDL_BlitSurface(srcSurface,NULL,destSurface,&destRect);
    }
  }else{
    SetRect(srcRect,srcX,srcY,srcW,srcH);
    if (NUM2INT(destX)==0&&NUM2INT(destY)==0&&NUM2INT(srcW)==0&&NUM2INT(srcH)==0){
      result = SDL_BlitSurface(srcSurface,&srcRect,destSurface,NULL);
    }else{
      SetRect(destRect,destX,destY,srcW,srcH);
      result = SDL_BlitSurface(srcSurface,&srcRect,destSurface,&destRect);
    }
  }

  if( result == -1 ){
    rb_raise(eSDLError,"SDL_BlitSurface fail: %s",SDL_GetError());
  }
  return INT2NUM(result);
}

static VALUE sdl_setAlpha(VALUE obj,VALUE flag,VALUE alpha)
{
  SDL_Surface *surface;

  Data_Get_Struct(obj,SDL_Surface,surface);
  SDL_SetAlpha(surface,NUM2UINT(flag),NUM2INT(alpha));
  return Qnil;
}

static VALUE sdl_setClipRect(VALUE obj,VALUE x,VALUE y,VALUE w,VALUE h)
{
  SDL_Surface *surface;
  SDL_Rect rect;

  Data_Get_Struct(obj,SDL_Surface,surface);
  SetRect(rect,x,y,w,h);
  SDL_SetClipRect(surface,&rect);
  return Qnil;
}

static VALUE sdl_getClipRect(VALUE obj)
{
  SDL_Surface *surface;
  SDL_Rect rect;
  VALUE ary_rect;
  
  Data_Get_Struct( obj, SDL_Surface, surface );
  SDL_GetClipRect( surface, &rect );
  
  ary_rect = rb_ary_new();
  rb_ary_push( ary_rect, INT2FIX(rect.x) );
  rb_ary_push( ary_rect, INT2FIX(rect.y) );
  rb_ary_push( ary_rect, INT2FIX(rect.w) );
  rb_ary_push( ary_rect, INT2FIX(rect.h) );
  
  return ary_rect;
}

static VALUE sdl_fillRect(VALUE obj,VALUE x,VALUE y,VALUE w,VALUE h,
		      VALUE color)
{
  SDL_Surface *surface;
  SDL_Rect rect;
  
  SetRect(rect,x,y,w,h);
  Data_Get_Struct(obj,SDL_Surface,surface);
  if( SDL_FillRect(surface,&rect,VALUE2COLOR(color,surface->format)) < 0 ){
    rb_raise(eSDLError,"fillRect fail: %s",SDL_GetError());
  }
  return Qnil;
}

static VALUE sdl_surfaceH(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return INT2NUM( surface->h );
}
static VALUE sdl_surfaceW(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return INT2NUM( surface->w );
}

/* palette and colormap methods */
static void check_given_colors(VALUE colors,VALUE firstcolor)
{
  if( NUM2INT(firstcolor)<0 || NUM2INT(firstcolor)>255 )
    rb_raise(eSDLError,"firstcolor must be more than 0,less than 255");
  Check_Type(colors,T_ARRAY);
  if( RARRAY(colors)->len+NUM2INT(firstcolor) > 256 )
    rb_raise(eSDLError,"colors is too large");
}
static void set_colors_to_array(VALUE colors,SDL_Color palette[])
{
  VALUE color;
  int i;
  
  for( i=0; i < RARRAY(colors)->len; ++i){
    color = rb_ary_entry(colors,i);
    Check_Type(color,T_ARRAY);
    if( RARRAY(color)->len != 3)
      rb_raise(rb_eArgError,"a color must be array that has 3 length");
    palette[i].r = NUM2INT(rb_ary_entry(color,0));
    palette[i].g = NUM2INT(rb_ary_entry(color,1));
    palette[i].b = NUM2INT(rb_ary_entry(color,2));
  }
  
}

static VALUE sdl_setPalette(VALUE obj,VALUE flags,VALUE colors,VALUE firstcolor)
{
  SDL_Surface *surface;
  SDL_Color palette[256];
  
  check_given_colors(colors,firstcolor);
  
  Data_Get_Struct(obj,SDL_Surface,surface);

  set_colors_to_array(colors,palette);
  
  return BOOL(SDL_SetPalette( surface, NUM2UINT(flags), palette,
			      NUM2INT(firstcolor), RARRAY(colors)->len));
}

static VALUE sdl_setColors(VALUE obj,VALUE colors,VALUE firstcolor)
{
  SDL_Surface *surface;
  SDL_Color palette[256];

  check_given_colors(colors,firstcolor);
  Data_Get_Struct(obj,SDL_Surface,surface);
  set_colors_to_array(colors,palette);
  return BOOL(SDL_SetColors( surface, palette,
			     NUM2INT(firstcolor), RARRAY(colors)->len));
}

static VALUE sdl_getPalette(VALUE obj)
{
  SDL_Surface *surface;
  int i;
  VALUE palette;
  SDL_Color *colors;
  VALUE color;
  
  Data_Get_Struct(obj,SDL_Surface,surface);

  if( surface->format->palette == NULL )
    return Qnil;

  palette = rb_ary_new();
  colors = surface->format->palette->colors;
  
  for( i=0; i < surface->format->palette->ncolors; ++i ){
    color = rb_ary_new3( 3, INT2NUM(colors[i].r), INT2NUM(colors[i].g), INT2NUM(colors[i].b) );
    rb_ary_push( palette, color );
  }
  return palette;
}

/* surface lock methods */
static VALUE sdl_mustlock(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return BOOL( SDL_MUSTLOCK(surface) );
}
static VALUE sdl_lockSurface(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return INT2FIX(SDL_LockSurface(surface));
}
static VALUE sdl_unlockSurface(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  SDL_UnlockSurface(surface);
  return Qnil;
}

/* methods to get infomation from SDL_PixelFormat */
static VALUE sdl_mapRGB(VALUE obj,VALUE r,VALUE g,VALUE b)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM( SDL_MapRGB( surface->format,NUM2INT(r),NUM2INT(g),
			       NUM2INT(b) ) );
}
static VALUE sdl_mapRGBA(VALUE obj,VALUE r,VALUE g,VALUE b,VALUE a)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM( SDL_MapRGBA( surface->format,NUM2INT(r),NUM2INT(g),NUM2INT(b),
				NUM2INT(a) ) );
}
static VALUE sdl_getRGB(VALUE obj,VALUE pixel)
{
  SDL_Surface *surface;
  Uint8 r,g,b;
  Data_Get_Struct(obj,SDL_Surface,surface);
  SDL_GetRGB(NUM2UINT(pixel),surface->format,&r,&g,&b);
  return rb_ary_new3( 3,UINT2NUM(r),UINT2NUM(g),UINT2NUM(b) );
}
static VALUE sdl_getRGBA(VALUE obj,VALUE pixel)
{
  SDL_Surface *surface;
  Uint8 r,g,b,a;
  Data_Get_Struct(obj,SDL_Surface,surface);
  SDL_GetRGBA(NUM2UINT(pixel),surface->format,&r,&g,&b,&a);
  return rb_ary_new3( 4,UINT2NUM(r),UINT2NUM(g),UINT2NUM(b),UINT2NUM(a) );
}
static VALUE sdl_getBpp(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return INT2FIX(surface->format->BitsPerPixel);
}
static VALUE sdl_getColorkey(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM(surface->format->colorkey);
}
static VALUE sdl_getAlpha(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM(surface->format->alpha);
}
static VALUE sdl_getFlags(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM(surface->flags);
}
static VALUE sdl_surface_rmask(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM(surface->format->Rmask);
}
static VALUE sdl_surface_gmask(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM(surface->format->Gmask);
}
static VALUE sdl_surface_bmask(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM(surface->format->Bmask);
}
static VALUE sdl_surface_amask(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM(surface->format->Amask);
}

static VALUE sdl_surface_pixels(VALUE obj)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return rb_str_new(surface->pixels,
                    surface->w * surface->h * surface->format->BytesPerPixel);
}

static void defineConstForVideo()
{
  /* Available for Screen.setVideoMode */
  rb_define_const(mSDL,"SWSURFACE",UINT2NUM(SDL_SWSURFACE));
  rb_define_const(mSDL,"HWSURFACE",UINT2NUM(SDL_HWSURFACE));
  rb_define_const(mSDL,"ASYNCBLIT",UINT2NUM(SDL_ASYNCBLIT));
  rb_define_const(mSDL,"ANYFORMAT",UINT2NUM(SDL_ANYFORMAT));
  rb_define_const(mSDL,"HWPALETTE",UINT2NUM(SDL_HWPALETTE));
  rb_define_const(mSDL,"DOUBLEBUF",UINT2NUM(SDL_DOUBLEBUF));
  rb_define_const(mSDL,"FULLSCREEN",UINT2NUM(SDL_FULLSCREEN));
  rb_define_const(mSDL,"OPENGL",UINT2NUM(SDL_OPENGL));
  rb_define_const(mSDL,"OPENGLBLIT",UINT2NUM(SDL_OPENGLBLIT));
  rb_define_const(mSDL,"RESIZABLE",UINT2NUM(SDL_RESIZABLE));
  rb_define_const(mSDL,"HWACCEL",UINT2NUM(SDL_HWACCEL));
  rb_define_const(mSDL,"SRCCOLORKEY",UINT2NUM(SDL_SRCCOLORKEY));
  rb_define_const(mSDL,"RLEACCELOK",UINT2NUM(SDL_RLEACCELOK));
  rb_define_const(mSDL,"RLEACCEL",UINT2NUM(SDL_RLEACCEL));
  rb_define_const(mSDL,"SRCALPHA",UINT2NUM(SDL_SRCALPHA));
  rb_define_const(mSDL,"PREALLOC",UINT2NUM(SDL_PREALLOC));

  /*Transparency definitions: These define alpha as the opacity of a surface*/
  rb_define_const(mSDL,"ALPHA_OPAQUE",INT2NUM(SDL_ALPHA_OPAQUE));
  rb_define_const(mSDL,"ALPHA_TRANSPARENT",INT2NUM(SDL_ALPHA_TRANSPARENT));

  /* flags for SDL::Surface.setPalette */
  rb_define_const(mSDL,"LOGPAL",INT2NUM(SDL_LOGPAL));
  rb_define_const(mSDL,"PHYSPAL",INT2NUM(SDL_PHYSPAL));
}

void init_video()
{
  rb_define_module_function(mSDL,"getVideoSurface",sdl_getVideoSurface,0);
  rb_define_module_function(mSDL,"videoDriverName",sdl_videoDriverName,0);
  rb_define_module_function(mSDL,"blitSurface",sdl_blitSurface,8);
  rb_define_module_function(mSDL,"setVideoMode",sdl_setVideoMode,4);
  rb_define_module_function(mSDL,"checkVideoMode",sdl_checkVideoMode,4);
  rb_define_module_function(mSDL,"listModes",sdl_listModes,1);
  rb_define_module_function(mSDL,"setGamma",sdl_setGamma,3);
  rb_define_module_function(mSDL,"getGammaRamp",sdl_getGammaRamp,0);
  rb_define_module_function(mSDL,"setGammaRamp",sdl_setGammaRamp,1);
  cVideoInfo=rb_define_class_under(mSDL,"VideoInfo",rb_cObject);
  rb_define_attr(cVideoInfo,"hw_available",1,0);
  rb_define_attr(cVideoInfo,"wm_available",1,0);
  rb_define_attr(cVideoInfo,"blit_hw",1,0);
  rb_define_attr(cVideoInfo,"blit_hw_CC",1,0);
  rb_define_attr(cVideoInfo,"blit_hw_A",1,0);
  rb_define_attr(cVideoInfo,"blit_sw",1,0);
  rb_define_attr(cVideoInfo,"blit_sw_CC",1,0);
  rb_define_attr(cVideoInfo,"blit_sw_A",1,0);
  rb_define_attr(cVideoInfo,"blit_fill",1,0);
  rb_define_attr(cVideoInfo,"video_mem",1,0);
  rb_define_attr(cVideoInfo,"bpp",1,0);

  
  rb_define_module_function(mSDL,"videoInfo",sdl_getVideoInfo,0);
  
  cSurface = rb_define_class_under(mSDL,"Surface",rb_cObject);

  rb_define_singleton_method(cSurface,"create",sdl_createSurface,4);
  rb_define_singleton_method(cSurface,"createWithFormat",sdl_createSurfaceWithFormat,8);
  rb_define_singleton_method(cSurface,"new_from",sdl_createSurfaceFrom,9);
  rb_define_singleton_method(cSurface,"loadBMP",sdl_loadBMP,1);
  rb_define_singleton_method(cSurface,"loadBMPFromIO",sdl_loadBMPFromIO,1);
  rb_define_method(cSurface,"saveBMP",sdl_saveBMP,1);
  rb_define_method(cSurface,"displayFormat",sdl_displayFormat,0);
  rb_define_method(cSurface,"displayFormatAlpha",sdl_displayFormatAlpha,0);
  rb_define_method(cSurface,"setColorKey",sdl_setColorKey,2);
  rb_define_method(cSurface,"fillRect",sdl_fillRect,5);
  rb_define_method(cSurface,"setClipRect",sdl_setClipRect,4);
  rb_define_method(cSurface,"getClipRect",sdl_getClipRect,0);
  rb_define_method(cSurface,"setAlpha",sdl_setAlpha,2);
  rb_define_method(cSurface,"h",sdl_surfaceH,0);
  rb_define_method(cSurface,"w",sdl_surfaceW,0);
  rb_define_method(cSurface,"flags",sdl_getFlags,0);
  
  rb_define_method(cSurface,"setPalette",sdl_setPalette,3);
  rb_define_method(cSurface,"setColors",sdl_setColors,2);
  rb_define_method(cSurface,"getPalette",sdl_getPalette,0);
  
  rb_define_method(cSurface,"mustLock?",sdl_mustlock,0);
  rb_define_method(cSurface,"lock",sdl_lockSurface,0);
  rb_define_method(cSurface,"unlock",sdl_unlockSurface,0);

  rb_define_method(cSurface,"mapRGB",sdl_mapRGB,3);
  rb_define_method(cSurface,"mapRGBA",sdl_mapRGBA,4);
  rb_define_method(cSurface,"getRGB",sdl_getRGB,1);
  rb_define_method(cSurface,"getRGBA",sdl_getRGBA,1);
  rb_define_method(cSurface,"bpp",sdl_getBpp,0);
  rb_define_method(cSurface,"colorkey",sdl_getColorkey,0);
  rb_define_method(cSurface,"alpha",sdl_getAlpha,0);
  rb_define_method(cSurface,"Rmask",sdl_surface_rmask,0);
  rb_define_method(cSurface,"Gmask",sdl_surface_gmask,0);
  rb_define_method(cSurface,"Bmask",sdl_surface_bmask,0);
  rb_define_method(cSurface,"Amask",sdl_surface_amask,0);
  rb_define_method(cSurface,"pixels",sdl_surface_pixels,0);
  
  cScreen = rb_define_class_under(mSDL,"Screen",cSurface);
  rb_define_method(cScreen,"updateRect",sdl_updateRect,4);
  rb_define_method(cScreen,"flip",sdl_flip,0);
  rb_define_method(cScreen,"toggleFullScreen",sdl_toggleFullScreen,0);
  defineConstForVideo();
  return;
}
