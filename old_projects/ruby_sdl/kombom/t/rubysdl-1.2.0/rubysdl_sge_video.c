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
#ifdef HAVE_SGE

#include "rubysdl.h"
#include <sge.h>

static VALUE sdl_get_autoLocking(VALUE mod)
{
  return BOOL(sge_getLock());
}

static VALUE  sdl_set_autoLocking(VALUE mod,VALUE bool)
{
  if(RTEST(bool))
    sge_Lock_ON();
  else
    sge_Lock_OFF();
  return Qnil;
}

     
static VALUE sdl_getPixel(VALUE obj,VALUE x,VALUE y)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  return UINT2NUM( sge_GetPixel(surface,NUM2INT(x),NUM2INT(y)) );
}
static VALUE sdl_putPixel(VALUE obj,VALUE x,VALUE y,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_PutPixel(surface,NUM2INT(x),NUM2INT(y),VALUE2COLOR(color,surface->format));
  return Qnil;
}
static VALUE sdl_drawLine(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_Line( surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
	    VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawAALine(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AALine( surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
	    VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawLineAlpha(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_LineAlpha( surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
                 VALUE2COLOR(color,surface->format), NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawAALineAlpha(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AALineAlpha( surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
                   VALUE2COLOR(color,surface->format),NUM2UINT(alpha) );
  return Qnil;
}

static VALUE sdl_drawRect(VALUE obj,VALUE x,VALUE y,VALUE w,VALUE h,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_Rect( surface,NUM2INT(x),NUM2INT(y),NUM2INT(x)+NUM2INT(w),
	    NUM2INT(y)+NUM2INT(h),VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawRectAlpha(VALUE obj,VALUE x,VALUE y,VALUE w,VALUE h,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_RectAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(x)+NUM2INT(w),
                 NUM2INT(y)+NUM2INT(h),VALUE2COLOR(color,surface->format),
                 NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawFilledRectAlpha(VALUE obj,VALUE x,VALUE y,VALUE w,VALUE h,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_FilledRectAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(x)+NUM2INT(w),
                       NUM2INT(y)+NUM2INT(h),VALUE2COLOR(color,surface->format),
                       NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawCircle(VALUE obj,VALUE x,VALUE y,VALUE r,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_Circle( surface,NUM2INT(x),NUM2INT(y),NUM2INT(r),
	      VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawAACircle(VALUE obj,VALUE x,VALUE y,VALUE r,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AACircle( surface,NUM2INT(x),NUM2INT(y),NUM2INT(r),
	      VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawCircleAlpha(VALUE obj,VALUE x,VALUE y,VALUE r,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_CircleAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(r),
                   VALUE2COLOR(color,surface->format),NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawAACircleAlpha(VALUE obj,VALUE x,VALUE y,VALUE r,VALUE color,
                                   VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AACircleAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(r),
                     VALUE2COLOR(color,surface->format),NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawFilledCircle(VALUE obj,VALUE x,VALUE y,VALUE r,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_FilledCircle( surface,NUM2INT(x),NUM2INT(y),NUM2INT(r),
		    VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawAAFilledCircle(VALUE obj,VALUE x,VALUE y,VALUE r,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AAFilledCircle( surface,NUM2INT(x),NUM2INT(y),NUM2INT(r),
		    VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawFilledCircleAlpha(VALUE obj,VALUE x,VALUE y,VALUE r,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_FilledCircleAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(r),
                         VALUE2COLOR(color,surface->format),NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawEllipse(VALUE obj,VALUE x,VALUE y,VALUE rx,VALUE ry,
			     VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_Ellipse( surface,NUM2INT(x),NUM2INT(y),NUM2INT(rx),NUM2INT(ry),
	       VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawAAEllipse(VALUE obj,VALUE x,VALUE y,VALUE rx,VALUE ry,
			     VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AAEllipse( surface,NUM2INT(x),NUM2INT(y),NUM2INT(rx),NUM2INT(ry),
	       VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawEllipseAlpha(VALUE obj,VALUE x,VALUE y,VALUE rx,VALUE ry,
                                  VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_EllipseAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(rx),NUM2INT(ry),
                    VALUE2COLOR(color,surface->format),NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawAAEllipseAlpha(VALUE obj,VALUE x,VALUE y,VALUE rx,VALUE ry,
                                    VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AAEllipseAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(rx),NUM2INT(ry),
                      VALUE2COLOR(color,surface->format),NUM2UINT(alpha) );
  return Qnil;
}
static VALUE sdl_drawFilledEllipse(VALUE obj,VALUE x,VALUE y,VALUE rx,VALUE ry,
				   VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_FilledEllipse( surface,NUM2INT(x),NUM2INT(y),NUM2INT(rx),NUM2INT(ry),
		     VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawAAFilledEllipse(VALUE obj,VALUE x,VALUE y,VALUE rx,VALUE ry,
				   VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AAFilledEllipse( surface,NUM2INT(x),NUM2INT(y),NUM2INT(rx),NUM2INT(ry),
		     VALUE2COLOR(color,surface->format) );
  return Qnil;
}
static VALUE sdl_drawFilledEllipseAlpha(VALUE obj,VALUE x,VALUE y,VALUE rx,VALUE ry,
                                        VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_FilledEllipseAlpha( surface,NUM2INT(x),NUM2INT(y),NUM2INT(rx),NUM2INT(ry),
                          VALUE2COLOR(color,surface->format),NUM2UINT(alpha) );
  return Qnil;
}

static VALUE sdl_drawBezier(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,
                            VALUE x3,VALUE y3,VALUE x4,VALUE y4,
                            VALUE level,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_Bezier(surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
             NUM2INT(x3),NUM2INT(y3),NUM2INT(x4),NUM2INT(y4),
             NUM2INT(level),VALUE2COLOR(color,surface->format));
  return Qnil;
}

static VALUE sdl_drawBezierAlpha(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,
                                 VALUE x3,VALUE y3,VALUE x4,VALUE y4,
                                 VALUE level,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_BezierAlpha(surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
                  NUM2INT(x3),NUM2INT(y3),NUM2INT(x4),NUM2INT(y4),
                  NUM2INT(level),VALUE2COLOR(color,surface->format),
                  NUM2UINT(alpha));
  return Qnil;
}

static VALUE sdl_drawAABezier(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,
                              VALUE x3,VALUE y3,VALUE x4,VALUE y4,
                              VALUE level,VALUE color)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AABezier(surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
               NUM2INT(x3),NUM2INT(y3),NUM2INT(x4),NUM2INT(y4),
               NUM2INT(level),VALUE2COLOR(color,surface->format));
  return Qnil;
}

static VALUE sdl_drawAABezierAlpha(VALUE obj,VALUE x1,VALUE y1,VALUE x2,VALUE y2,
                                 VALUE x3,VALUE y3,VALUE x4,VALUE y4,
                                 VALUE level,VALUE color,VALUE alpha)
{
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  sge_AABezierAlpha(surface,NUM2INT(x1),NUM2INT(y1),NUM2INT(x2),NUM2INT(y2),
                    NUM2INT(x3),NUM2INT(y3),NUM2INT(x4),NUM2INT(y4),
                    NUM2INT(level),VALUE2COLOR(color,surface->format),
                    NUM2UINT(alpha));
  return Qnil;
}

static VALUE sdl_rotateScaledSurface(VALUE obj,VALUE angle,VALUE scale,VALUE bgcolor)
{
  SDL_Surface *surface,*result;
  Data_Get_Struct(obj,SDL_Surface,surface);
  result=sge_rotate_scaled_surface(surface,NUM2INT(angle),NUM2DBL(scale),
				   VALUE2COLOR(bgcolor,surface->format) );
  if( result==NULL )
    rb_raise( eSDLError,"Couldn't Create Surface: %s",SDL_GetError() );
  return Data_Wrap_Struct(cSurface,0,sdl_freeSurface,result);
}
/* doesn't respect ColorKey */
static VALUE sdl_rotateXYScaled(VALUE mod,VALUE src,VALUE dst,VALUE x,
				VALUE y,VALUE angle,VALUE xscale,
				VALUE yscale)
{
  SDL_Surface *srcSurface,*dstSurface;
  if( !rb_obj_is_kind_of(src,cSurface) || !rb_obj_is_kind_of(dst,cSurface) )
    rb_raise(rb_eArgError,"type mismatch(expect Surface)");
  Data_Get_Struct(src,SDL_Surface,srcSurface);
  Data_Get_Struct(dst,SDL_Surface,dstSurface);
  sge_rotate_xyscaled(dstSurface,srcSurface,NUM2INT(x),NUM2INT(y),
		      NUM2INT(angle),NUM2DBL(xscale),NUM2DBL(yscale));
  return Qnil;
}
static VALUE sdl_rotateScaledBlit(VALUE mod,VALUE src,VALUE dst,VALUE x,
				  VALUE y,VALUE angle,VALUE scale)
{
  SDL_Surface *srcSurface,*dstSurface,*tmpSurface;
  SDL_Rect destRect;
  Uint32 colorkey;
  Uint32 flags;
  int result;
  
  if( !rb_obj_is_kind_of(src,cSurface) || !rb_obj_is_kind_of(dst,cSurface) )
    rb_raise(rb_eArgError,"type mismatch(expect Surface)");
  Data_Get_Struct(src,SDL_Surface,srcSurface);
  Data_Get_Struct(dst,SDL_Surface,dstSurface);
  colorkey=srcSurface->format->colorkey;
  flags = srcSurface->flags & ( SDL_RLEACCEL|SDL_SRCCOLORKEY );
  tmpSurface = sge_rotate_scaled_surface(srcSurface,NUM2INT(angle),
					 NUM2DBL(scale),colorkey);
  if( tmpSurface==NULL )
    rb_raise(eSDLError,"SDL memory allocate failed :%s",SDL_GetError());
  SDL_SetColorKey(tmpSurface,flags,colorkey);
  destRect.x=NUM2INT(x)-tmpSurface->h/2;
  destRect.y=NUM2INT(y)-tmpSurface->w/2;
  result = SDL_BlitSurface(tmpSurface,NULL,dstSurface,&destRect);
  SDL_FreeSurface(tmpSurface);
  if( result == -1 ){
    rb_raise(eSDLError,"SDL_BlitSurface fail: %s",SDL_GetError());
  }
  return INT2NUM(result);
}

static VALUE sdl_transform(VALUE mod,VALUE src,VALUE dst,VALUE angle,
			   VALUE xscale,VALUE yscale,VALUE px,VALUE py,
			   VALUE qx,VALUE qy,VALUE flags)
{
  SDL_Surface *srcSurface,*dstSurface;
  if( !rb_obj_is_kind_of(src,cSurface) || !rb_obj_is_kind_of(dst,cSurface) )
    rb_raise(rb_eArgError,"type mismatch(expect Surface)");
  Data_Get_Struct(src,SDL_Surface,srcSurface);
  Data_Get_Struct(dst,SDL_Surface,dstSurface);
  sge_transform(srcSurface,dstSurface,NUM2DBL(angle),NUM2DBL(xscale),
		NUM2DBL(yscale),NUM2INT(px),NUM2INT(py),NUM2INT(qx),
		NUM2INT(qy),NUM2UINT(flags));
  return Qnil;
}

static VALUE sdl_transformSurface(VALUE obj,VALUE bgcolor,VALUE angle,
				  VALUE xscale,VALUE yscale,VALUE flags)
{
  SDL_Surface *surface,*result;
  Data_Get_Struct(obj,SDL_Surface,surface);
  result = sge_transform_surface(surface,VALUE2COLOR(bgcolor,surface->format),
				 NUM2DBL(angle),NUM2DBL(xscale),
				 NUM2DBL(yscale),NUM2UINT(flags));
  if( result==NULL )
    rb_raise( eSDLError,"Couldn't Create Surface: %s",SDL_GetError() );
  return Data_Wrap_Struct(cSurface,0,sdl_freeSurface,result);
}

static VALUE sdl_makeCollisionMap(VALUE obj)
{
  sge_cdata * cdata;
  SDL_Surface *surface;
  Data_Get_Struct(obj,SDL_Surface,surface);
  cdata = sge_make_cmap(surface);
  if( cdata==NULL )
    rb_raise( eSDLError,"Couldn't Create CollisionMap: %s",SDL_GetError() );
  return Data_Wrap_Struct(cCollisionMap,0,sge_destroy_cmap,cdata);
}

static sge_cdata * value_to_collision_map(VALUE value)
{
  sge_cdata * cdata;
  if( !rb_obj_is_kind_of(value, cCollisionMap) )
    rb_raise(rb_eArgError,"type mismatch(expect CollisionMap)");
  Data_Get_Struct(value, sge_cdata, cdata);
  return cdata;
}

static VALUE sdl_classBoundingBoxCheck(VALUE class,
                                       VALUE x1, VALUE y1, VALUE w1, VALUE h1,
                                       VALUE x2, VALUE y2, VALUE w2, VALUE h2)
{
  return BOOL(_sge_bbcheck
              ((Sint16) NUM2INT(x1), (Sint16) NUM2INT(y1),
               (Sint16) NUM2INT(w1), (Sint16) NUM2INT(h1),
               (Sint16) NUM2INT(x2), (Sint16) NUM2INT(y2),
               (Sint16) NUM2INT(w2), (Sint16) NUM2INT(h2)));
}

static VALUE sdl_collisionCheck(VALUE collisionMap1, VALUE x1, VALUE y1,
                                VALUE collisionMap2, VALUE x2, VALUE y2)
{
  sge_cdata * cdata1 = value_to_collision_map(collisionMap1);
  sge_cdata * cdata2 = value_to_collision_map(collisionMap2);
  int collided;
  collided = sge_cmcheck
    (cdata1, (Sint16) NUM2INT(x1), (Sint16) NUM2INT(y1),
     cdata2, (Sint16) NUM2INT(x2), (Sint16) NUM2INT(y2));
  if(!collided)
    return Qnil;
  return rb_ary_new3(2, INT2NUM(sge_get_cx()), INT2NUM(sge_get_cy()));
}

static VALUE sdl_boundingBoxCheck(VALUE collisionMap1, VALUE x1, VALUE y1,
                                  VALUE collisionMap2, VALUE x2, VALUE y2)
{
  sge_cdata * cdata1 = value_to_collision_map(collisionMap1);
  sge_cdata * cdata2 = value_to_collision_map(collisionMap2);
  return BOOL(sge_bbcheck
              (cdata1, (Sint16) NUM2INT(x1), (Sint16) NUM2INT(y1),
               cdata2, (Sint16) NUM2INT(x2), (Sint16) NUM2INT(y2)));
}

static VALUE sdl_set_cdata(VALUE obj, VALUE vx, VALUE vy, VALUE vw, VALUE vh)
{
  sge_cdata * cdata = value_to_collision_map(obj);
  Sint16 x, y, w, h;
  
  x = NUM2INT(vx);
  y = NUM2INT(vy);
  w = NUM2INT(vw);
  h = NUM2INT(vh);
  if( x < 0 || y < 0 || x+w > cdata->w || y+h > cdata->h ){
    rb_raise(eSDLError,"Couldn't clear that area");
  }
  sge_set_cdata(cdata, x, y, w, h );
  return Qnil;
}

static VALUE sdl_unset_cdata(VALUE obj, VALUE vx, VALUE vy, VALUE vw, VALUE vh)
{
  sge_cdata * cdata = value_to_collision_map(obj);
  Sint16 x, y, w, h;
  
  x = NUM2INT(vx);
  y = NUM2INT(vy);
  w = NUM2INT(vw);
  h = NUM2INT(vh);
  if( x < 0 || y < 0 || x+w > cdata->w || y+h > cdata->h ){
    rb_raise(eSDLError,"Couldn't clear that area");
  }
  sge_unset_cdata(cdata, x, y, w, h);
  return Qnil;
}

static VALUE sdl_w_cdata(VALUE obj)
{
  sge_cdata * cdata = value_to_collision_map(obj);
  return INT2FIX(cdata->w);
}

static VALUE sdl_h_cdata(VALUE obj)
{
  sge_cdata * cdata = value_to_collision_map(obj);
  return INT2FIX(cdata->h);
}

/* bitmap font */
static void sdl_bf_close(sge_bmpFont* font)
{
  if(!rubysdl_is_quit()){
    sge_BF_CloseFont(font);
  }
}

static VALUE sdl_bf_open(VALUE obj, VALUE file, VALUE flags)
{
  sge_bmpFont* font;

  font = sge_BF_OpenFont(GETCSTR(file),NUM2UINT(flags));
  if( font == NULL )
    rb_raise(eSDLError,"Couldn't open font: %s", GETCSTR(file));
  
  return Data_Wrap_Struct(cBMFont,0,sdl_bf_close,font);
}

static VALUE sdl_bf_setColor(VALUE obj,VALUE r,VALUE g,VALUE b)
{
  sge_bmpFont* font;
  Data_Get_Struct(obj,sge_bmpFont,font);
  
  sge_BF_SetColor(font,NUM2UINT(r),NUM2UINT(g),NUM2UINT(b));
  return Qnil;
}

static VALUE sdl_bf_getHeight(VALUE obj)
{
  sge_bmpFont* font;
  Data_Get_Struct(obj,sge_bmpFont,font);
  return INT2FIX(sge_BF_GetHeight(font));
}

static VALUE sdl_bf_getWidth(VALUE obj)
{
  sge_bmpFont* font;
  Data_Get_Struct(obj,sge_bmpFont,font);
  return INT2FIX(sge_BF_GetWidth(font));
}

static VALUE sdl_bf_textSize(VALUE obj, VALUE text)
{
  sge_bmpFont* font;
  SDL_Rect rect;
  Data_Get_Struct(obj,sge_bmpFont,font);
  rect = sge_BF_TextSize(font, GETCSTR(text));
  return rb_ary_new3(2, INT2FIX(rect.w), INT2FIX(rect.h));
}

static VALUE sdl_bf_textout(VALUE obj,VALUE surface,VALUE string,
                            VALUE x, VALUE y)
{
  sge_bmpFont* font;
  SDL_Surface* target;
  
  if(!rb_obj_is_kind_of(surface,cSurface))
    rb_raise( rb_eArgError,"type mismatch(expect Surface)" );
  Data_Get_Struct(obj,sge_bmpFont,font);
  Data_Get_Struct(surface,SDL_Surface,target);
  sge_BF_textout(target,font,GETCSTR(string),NUM2INT(x),NUM2INT(y));
  return Qnil;
}

static void defineConstForSGE()
{
  rb_define_const(mSDL,"TRANSFORM_AA",UINT2NUM(SGE_TAA));
  rb_define_const(mSDL,"TRANSFORM_SAFE",UINT2NUM(SGE_TSAFE));
  rb_define_const(mSDL,"TRANSFORM_TMAP",UINT2NUM(SGE_TTMAP));

  rb_define_const(cBMFont,"TRANSPARENT",UINT2NUM(SGE_BFTRANSP));
  rb_define_const(cBMFont,"NOCONVERT",UINT2NUM(SGE_BFNOCONVERT));
  rb_define_const(cBMFont,"SFONT",UINT2NUM(SGE_BFSFONT));
  rb_define_const(cBMFont,"PALETTE",UINT2NUM(SGE_BFPALETTE));
}

void init_sge_video()
{
  sge_Update_OFF();
  sge_Lock_ON();

  rb_define_module_function(mSDL,"autoLock",sdl_get_autoLocking,0);
  rb_define_module_function(mSDL,"autoLock=",sdl_set_autoLocking,1);

  rb_define_method(cSurface,"getPixel",sdl_getPixel,2);
  rb_define_method(cSurface,"putPixel",sdl_putPixel,3);
  rb_define_method(cSurface,"[]",sdl_getPixel,2);
  rb_define_method(cSurface,"[]=",sdl_putPixel,3);

  /* primitive drawing */
  rb_define_method(cSurface,"drawLine",sdl_drawLine,5);
  rb_define_method(cSurface,"drawRect",sdl_drawRect,5);
  rb_define_method(cSurface,"drawCircle",sdl_drawCircle,4);
  rb_define_method(cSurface,"drawFilledCircle",sdl_drawFilledCircle,4);
  rb_define_method(cSurface,"drawEllispe",sdl_drawEllipse,5);
  rb_define_method(cSurface,"drawFilledEllispe",sdl_drawFilledEllipse,5);
  rb_define_method(cSurface,"drawEllipse",sdl_drawEllipse,5);
  rb_define_method(cSurface,"drawFilledEllipse",sdl_drawFilledEllipse,5);
  rb_define_method(cSurface,"drawBezier",sdl_drawBezier,10);
    
  /* antialiased primitive drawing */
  rb_define_method(cSurface,"drawAALine",sdl_drawAALine,5);
  rb_define_method(cSurface,"drawAACircle",sdl_drawAACircle,4);
  rb_define_method(cSurface,"drawAAFilledCircle",sdl_drawAAFilledCircle,4);
  rb_define_method(cSurface,"drawAAEllipse",sdl_drawAAEllipse,5);
  rb_define_method(cSurface,"drawAAFilledEllipse",sdl_drawAAFilledEllipse,5);
  rb_define_method(cSurface,"drawAABezier",sdl_drawAABezier,10);
    
  /* primitive drawing with alpha */
  rb_define_method(cSurface,"drawLineAlpha",sdl_drawLineAlpha,6);
  rb_define_method(cSurface,"drawRectAlpha",sdl_drawRectAlpha,6);
  rb_define_method(cSurface,"drawFilledRectAlpha",sdl_drawFilledRectAlpha,6);
  rb_define_method(cSurface,"drawCircleAlpha",sdl_drawCircleAlpha,5);
  rb_define_method(cSurface,"drawFilledCircleAlpha",sdl_drawFilledCircleAlpha,5);
  rb_define_method(cSurface,"drawEllipseAlpha",sdl_drawEllipseAlpha,6);
  rb_define_method(cSurface,"drawFilledEllipseAlpha",sdl_drawFilledEllipseAlpha,6);
  rb_define_method(cSurface,"drawBezierAlpha",sdl_drawBezierAlpha,11);
    
  /* antialiased primitive drawing with alpha */
  rb_define_method(cSurface,"drawAALineAlpha",sdl_drawAALineAlpha,6);
  rb_define_method(cSurface,"drawAACircleAlpha",sdl_drawAACircleAlpha,5);
  rb_define_method(cSurface,"drawAAEllipseAlpha",sdl_drawAAEllipseAlpha,6);
  rb_define_method(cSurface,"drawAABezierAlpha",sdl_drawAABezierAlpha,11);
    
  /* rotation and scaling */
  rb_define_method(cSurface,"rotateScaledSurface",sdl_rotateScaledSurface,3);
  rb_define_module_function(mSDL,"rotateScaledBlit",sdl_rotateScaledBlit,6);
  rb_define_module_function(mSDL,"rotateXYScaled",sdl_rotateXYScaled,7);

  rb_define_module_function(mSDL,"transform",sdl_transform,10);
  rb_define_method(cSurface,"transformSurface",sdl_transformSurface,5);

  /* collision detection */
  rb_define_method(cSurface,"makeCollisionMap", sdl_makeCollisionMap, 0);

  cCollisionMap = rb_define_class_under(mSDL,"CollisionMap",rb_cObject);
  rb_define_singleton_method(cCollisionMap,"boundingBoxCheck",
                             sdl_classBoundingBoxCheck, 8);
  rb_define_method(cCollisionMap,"collisionCheck", sdl_collisionCheck, 5);
  rb_define_method(cCollisionMap,"boundingBoxCheck", sdl_boundingBoxCheck, 5);
  rb_define_method(cCollisionMap,"clear", sdl_unset_cdata, 4);
  rb_define_method(cCollisionMap,"set", sdl_set_cdata, 4);
  rb_define_method(cCollisionMap,"w", sdl_w_cdata, 0);
  rb_define_method(cCollisionMap,"h", sdl_h_cdata, 0);

  /* bitmap font */
  cBMFont = rb_define_class_under(mSDL,"BMFont",rb_cObject);
  rb_define_singleton_method(cBMFont,"open",sdl_bf_open,2);

  rb_define_method(cBMFont,"setColor",sdl_bf_setColor,3);
  rb_define_method(cBMFont,"height",sdl_bf_getHeight,0);
  rb_define_method(cBMFont,"width",sdl_bf_getWidth,0);
  rb_define_method(cBMFont,"textSize",sdl_bf_textSize, 1);
  rb_define_method(cBMFont,"textout",sdl_bf_textout,4);

  defineConstForSGE();
}
#endif /* HAVE_SGE */
