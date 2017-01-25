=begin

= SDL

Interface of this lib is very close to SDL.
So you also had better refer to SDL document.

nAll classes/modules in Ruby/SDL are in "module SDL".
In this module number starts 0,not 1.

== Class/Module
* ((<Error handling>))
  * ((<SDL::Error>))
* ((<initialize>))
* ((<video>))
  * ((<SDL::Surface>))
    * ((<SDL::Screen>))
  * ((<SDL::CollisionMap>))
  * ((<SDL::PixelFormat>))
* ((<Event handling>))
  * ((<SDL::Event>))
  * ((<SDL::Event2>))
  * ((<SDL::Key>)) (module)
  * ((<SDL::Mouse>)) (module) 
* ((<audio>))
  * ((<SDL::Mixer>)) (module)
  * ((<SDL::Mixer::Wave>))
  * ((<SDL::Mixer::Music>))
* ((<Window Manager>))
  * ((<SDL::WM>)) (module)
* ((<CDROM>))
  * ((<SDL::CD>))
* ((<Joystick handling>))
  * ((<SDL::Joystick>))
* ((<Font handling>))
  * ((<SDL::BMFont>))
  * ((<SDL::Kanji>))
  * ((<SDL::TTF>))
* ((<MPEG stream>))
  * ((<SDL::MPEG>))
* ((<Time>))
* ((<Japanese input method with SDLSKK>))
  * ((<SDL::SKK::Context>))
  * ((<SDL::SKK::Dictionary>))
  * ((<SDL::SKK::RomKanaRuleTable>))
  * ((<SDL::SKK::Keybind>))
* ((<3D drawing with OpenGL>))
* ((<Others>))

== Error handling
=== SDL::Error

SDL::Error is exception class. Almost all of errors in Ruby/SDL are
reported by this class.

==== super class

StandardError

== initialize

=== module functions in module SDL

--- SDL.init(flag)
      Initialize SDL. This should be called before all other SDL functions. The
      flags parameter specifies what part(s) of SDL to initialize.
        SDL::INIT_AUDIO  initialize audio output functions
        SDL::INIT_VIDEO  initialize video output functions and input functions
        SDL::INIT_CDROM  initialize CD playback fucntions
        SDL::INIT_JOYSTICK  initialize joystick input functions
      You should call this method before calling other Ruby/SDL methods.

--- SDL.quit
      Quit SDL system. You needn't call this function normally because
      this library call this function automatically when the process 
      stops.

      
--- SDL.initedSystem(flag)
--- SDL.inited_system(flag)
      Not documented yet

--- SDL.getenv
--- SDL.putenv(envstr)
      Change or add an environment variable on Win32. On other platforms
      this method is equal to ENV.
      
      ((|envstr|)) should be of the form "name=value".

      Returns nil, raise exception `SDL::Error' when it fails.

      You should use this method to set SDL_WINDOWID or SDL_VIDEODRIVER.
== video

some functions need SGE or SDL_image

=== functions in module SDL

--- SDL.getVideoSurface
--- SDL.get_video_surface
      Not documented yet

--- SDL.setVideoMode(w,h,bpp,flags)
--- SDL.set_video_mode(w,h,bpp,flags)
      Set up a video mode with the specified width, height and bits-per-pixel.
      If bpp is 0, it is treated as the current display bits per pixel.
      Return the instanse of ((<SDL::Screen>)), if succeeded.
      Raise SDL::Error, if failed.
      * SDL::SWSURFACE
        
        Create the video surface in system memory.

      * SDL::HWSURFACE

        Create the video surface in video memory.

      * SDL::FULLSCREEN

        SDL will attempt to use a fullscreen mode.

      * SDL::SDL_DOUBLEBUF

        Enable double buffering.
        Calling ((<SDL::Screen#flip>)) will flip the  buffers and update
        the screen.

--- SDL.checkVideoMode(w,h,bpp,flags)
--- SDL.check_video_mode(w,h,bpp,flags)
      Check to see if a particular video mode is supported.
      Returns 0 if the requested mode is not supported under any
      bit depth, or returns the bits-per-pixel of the closest available mode
      with the given width, height and requested surface flags (see 
      SDL_SetVideoMode).

      The bits-per-pixel value returned is only a suggested mode. You can
      usually request and bpp you want when setting the video mode and SDL will
      emulate that color depth with a shadow video surface.
      
      The arguments to checkVideoMode are the same ones you would pass to
      ((<SDL.setVideoMode>)).

--- SDL.listModes(flags)
--- SDL.list_modes(flags)
      Returns availanel screen demensions for the given flags.
      Returns nil if there are no available dimensions.
      Returns true if any dimension is okay.
      Otherwise returns list of available dimensions in array.

--- SDL.videoDriverName
--- SDL.video_driver_name
      Returns the name of initialized video driver like "x11" or "windib".
      Raise exeption if video have not been initialized.

--- SDL.setGamma(redgamma,greengamma,bluegamma)
--- SDL.set_gamma(redgamma,greengamma,bluegamma)
      Sets the "gamma function" for the display of each color component.
      Gamma controls the brightness/contrast of colors displayed on
      the screen. A gamma value of 1.0 is identity
      (i.e., no adjustment is made).

--- SDL.getGammaRamp
--- SDL.get_gamma_ramp
      Returns the gamma translation lookup tables currently used
      by the display. Return value is array that has r, g, b table.
      Each table is array that has 256 integer.

--- SDL.setGammaRamp(table)
--- SDL.set_gamma_ramp(table)
      Sets the gamma lookup tables for the display for each color component.
      table should be an array like what you can get
      with ((<SDL.getGammaRamp>)).

--- SDL.autoLock
--- SDL.auto_lock
--- SDL.autoLock?
--- SDL.auto_lock?
      Needs SGE

      Returns whether Ruby/SDL locks surface automatically when
      need.Default is true.

      Please see ((<SDL::Surface#lock>)) to know more.

--- SDL.autoLock=(autolocking)
--- SDL.auto_lock=(autolocking)
--- SDL.autoLockON
--- SDL.auto_lock_on
--- SDL.autoLockOFF
--- SDL.auto_lock_off
      Needs SGE

      Set whether Ruby/SDL locks surface automatically when
      needed.

--- SDL.videoInfo
--- SDL.video_info
      Return  video information in the object of VideoInfo .
      The contents are following.
      Values represent boolean value are true/false .
      Please read SDL document to know about this information.
        SDL::VideoInfo#hw_available
        SDL::VideoInfo#wm_available
        SDL::VideoInfo#blit_hw
        SDL::VideoInfo#blit_hw_CC
        SDL::VideoInfo#blit_hw_A
        SDL::VideoInfo#blit_sw
        SDL::VideoInfo#blit_sw_CC
        SDL::VideoInfo#blit_sw_A
        SDL::VideoInfo#blit_fill
        SDL::VideoInfo#video_mem
        SDL::VideoInfo#bpp
	
--- SDL.blitSurface(src,srcX,srcY,srcW,srcH,dst,dstX,dstY)
--- SDL.blit_surface(src,srcX,srcY,srcW,srcH,dst,dstX,dstY)
      This performs a fast blit from the source surface to the destination
      surface.

      If srcX=srcY=srcW=srcH=0,the entire surface is copied.

      The blit function should not be called on a locked surface.

--- SDL.blitSurface2(src,srcRect,dst,dstRect)
--- SDL.blit_surface2(src,src_rect,dst,dst_rect)
      You use this function like:
        blitSurface2(src,[0,32,32,32],dst,[100,200])
      or
        Rect = Struct.new( 'Rect', :x, :y, :w, :h )
        
        rect1 = Rect.new( 16, 0, 16, 16 )
        rect2 = Rect.new( 120, 0, 0, 0 )
        blitSurface2( src, rect1, dst, rect2 )
      
--- SDL.rotateXYScaled(src,dst,x,y,angle,xscale,yscale)
--- SDL.rotateXY_scaled(src,dst,x,y,angle,xscale,yscale)
      Needs SGE

      Note that this function is different from SGE sge_rotate_xyscaled API
      in that src and dst are changing.
      Following two functions are same.
      This is equal to blitSurface.

      And note that this function ignores colorkey.

      This method is obsolete. Please use ((<SDL.transform>)) or
      ((<SDL.transformBlit>))

--- SDL.rotateScaled(src,dst,x,y,angle,scale)
--- SDL.rotate_scaled(src,dst,x,y,angle,scale)
      Same as above, but with xscale=yscale.

--- SDL.rotate(src,dst,x,y,angle)
      Same as above, but with xscale=yscale=1.0.

--- SDL.rotateScaledBlit(src,dst,x,y,angle,scale)
--- SDL.rotate_scaled_blit(src,dst,x,y,angle,scale)
      Needs SGE

      Same as rotateScaled,but respect colorkey.

--- SDL.rotateBlit(src,dst,x,y,angle)
--- SDL.rotate_blit(src,dst,x,y,angle)
      Same as rotateScaledBlit,but with scale=1.0;

--- SDL.transform(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
      Need SGE

      Draw src surface to dst surface with scaling and rotation.
      Ignore colorkey.

      *src - The surface to be rotated and scaled
      *src - The surface to be rotated and scaled
      *angle - The rotation angle in degrees.
      *xscale  yscale - The x and y scaling factor. Can be negative
       (mirroring). 1.0 is 1:1 scale.
      *px / py - The pivot point to rotate around in the src surface.
      *qx / qy - The destination point on dst surface.
      *flags
        *0 - Default.
        *SGE_TAA - Use the interpolating renderer. Much slower but
         can look better.
        *SGE_TSAFE - Don't asume that the src and dst surfaces has the
         same pixel format. This is the default when the two surfaces
         don't have the same BPP.
         This is slower but will render wierd pixel formats right.
        *SGE_TTMAP - Use texture mapping. This is a bit faster
         but the result isn't
         as nice as in the normal mode. This mode will also ignore the px/py
         coordinates and the other flags.

--- SDL.transformBlit(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
--- SDL.transform_blit(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
      Need SGE

      Blit src surface to dst surface with scaling and rotation.
      Same as ((<SDL.transform>)) , but respect colorkey.

=== SDL::Surface

This class have image.

==== super class

Object

==== class method

--- SDL::Surface.new(flag,w,h,format)
--- SDL::Surface.new(flags,w,h,depth,Rmask,Gmask,Bmask,Amask)
      Create an empty surface.
      You must call this method after ((<SDL.setVideoMode>))

      format must be the instance of ((<SDL::Surface>)), and create the
      surface that has same bpp as specified surface.
      
      The flags specifies the type of surface that should be
      created, it is an OR'd combination of the following possible values.
      
      * SDL::SWSURFACE

        SDL will create the surface in system memory.

      * SDL::HWSURFACE

        SDL will attempt to create the surface in video memory.

      * SDL::SRCCOLORKEY

        With this flag SDL will attempt to find the best
        location for this surface, either in system memory or
        video memory, to obtain hardware colorkey blitting
        support.

      * SDL::SRCALPHA

        With this flag SDL will attempt to find the best
        location for this surface, either in system memory or
        video memory, to obtain hardware alpha support.
        
--- SDL::Surface.new_from(pixels,w,h,depth,pitch,Rmask,Gmask,Bmask,Amask)
      Create a surface from pixel data.
      ((|pixels|)) must be String. ((|pitch|)) is the length of
      each scanline in bytes.
      
--- SDL::Surface.loadBMP(filename)
--- SDL::Surface.load_bmp(filename)
      Loads a image from a named Windows BMP file and return
      the instance of ((<SDL::Screen>)).

      Raise SDL::Error if you have an error,for example file didn't exist.
      
--- SDL::Surface.load(filename)
      Needs SDL_image
      Loads a image from a named Windows BMP file and return
      the instance of ((<SDL::Screen>)).

      Available formats are BMP,PPX,XPM,PCX,GIF,JPEG,PNG,TGA.

==== method

--- SDL::Surface#saveBMP(filename)
--- SDL::Surface#save_bmp(filename)
      Saves the surface as a Windows BMP file named file.

--- SDL::Surface#displayFormat
--- SDL::Surface#display_format
      This method copies self to a new surface of the pixel
      format and colors of the video framebuffer, suitable for fast blitting
      onto the display surface.
      
      If you want to take advantage of hardware colorkey or alpha blit
      acceleration, you should set the colorkey and alpha value before calling
      this method.

--- SDL::Surface#displayFormatAlpha
--- SDL::Surface#display_format_alpha
      Same as ((<SDL::Surface#displayFormat>)), except respecting
      alpha value per pixel.

--- SDL::Surface#setColorKey(flag,key)
--- SDL::Surface#set_color_key(flag,key)
      Sets the color key (transparent pixel) in a blittable surface and enables
      or disables RLE blit acceleration.
      If flag is SDL::SRCCOLORKEY then key is the transparent pixel
      value in the source image of a blit.
      If flag is OR'd with SDL::RLEACCEL then the surface will be draw
      using RLE acceleration when drawn with blitting.

--- SDL::Surface#fillRect(x,y,w,h)
--- SDL::Surface#fill_rect(x,y,w,h)
      This function performs a fast fill of the given rectangle with color.

--- SDL::Surface#setClipRect(x,y,w,h)
--- SDL::Surface#set_clip_rect(x,y,w,h)
      Sets the clipping rectangle for a surface. When this surface is the
      destination of a blit, only the area within the clip rectangle will
      be drawn into.
      
      The rectangle pointed to by rect will be clipped to the edges of the
      surface so that the clip rectangle for a surface can never fall
      outside the edges of the surface.

--- SDL::Surface#getClipRect
--- SDL::Surface#get_clip_rect
      Returns the clipping rectangle for this surface.
      Return value is an array including x, y, r, w value.

--- SDL::Surface#setAlpha(flag,alpha)
--- SDL::Surface#set_alpha(flag,alpha)
      SDL_SetAlpha is used for setting the per-surface alpha and/or enabling
      and disabling per-pixel alpha blending.
      
      flags is used to specify whether alpha blending should be used
      (SDL::SRCALPHA) and whether the surface should use RLE acceleration
      for blitting (SDL::RLEACCEL). flags can be an OR'd combination of these
      two options, one of these options or 0. If SDL_SRCALPHA is not passed
      as a flag then all alpha information is ignored when blitting
      the surface. The alpha parameter is the per-surface alpha value,
      a surface need not have an alpha channel to use
      per-surface alpha and blitting can still be accelerated with
      SDL_RLEACCEL. Setting the per-surface alpha value to 0 disables
      per-surface alpha blending.

--- SDL::Surface#h
      Return height.

--- SDL::Surface#w
      Return width.

--- SDL::Surface#format
      Return pixel format.
      See ((<SDL::PixelFormat>)).

--- SDL::Surface#put(image,x,y)
      Draw image on (x,y) in self.
      This method are implemented using blitSurface.

--- SDL::Surface#copyRect(x,y,w,h)
--- SDL::Surface#copy_rect(x,y,w,h)
      Copy given rect and return copyed surface.
      
--- SDL::Surface#lock
      This method sets up a surface for directly accessing the pixels.You call
      this before calling ((<SDL::Surface#getPixel>)) ,
      ((<SDL::Surface#drawLine>)) or some other mehtods of Surface.

      Between calls to ((<SDL::Surface#lock>)) and ((<SDL::Surface#unlock>)),
      you can use methods that 'need locking'.
      Once you are done accessing the surface, you
      should use ((<SDL::Surface#unlock>)) to release it.
      
      Not all surfaces require locking. If ((<SDL::Surface#mustLock?>)) returns
      false, then you can read and write to the surface at any time, and the
      pixel format of the surface will not change.
      
      No operating system or library calls should be made between lock/unlock
      pairs, as critical system locks may be held during this time.
      
      If ((<SDL.autoLock>)) returns true,you don't have to call this methods
      because this library locks surface automatically.

--- SDL::Surface#unlock
      Unlock the surface.

--- SDL::Surface#mustLock?
--- SDL::Surface#must_lock?
      Returns true if you must lock surface for directly accessing the pixels,
      otherwise returns false.

--- SDL::Surface#getPixel(x,y) 
--- SDL::Surface#get_pixel(x,y) 
--- SDL::Surface#[](x,y)
      Needs SGE ,Needs lock
      Gets the color of the specified pixel.

--- SDL::Surface#putPixel(x,y,color)
--- SDL::Surface#put_pixel(x,y,color)
--- SDL::Surface#[]=(x,y,color)
      Needs SGE ,Needs lock
      Changes the color of the pixel on (x, y).

--- SDL::Surface#drawLine(x1,y1,x2,y2,color)
--- SDL::Surface#draw_line(x1,y1,x2,y2,color)
      Needs SGE ,Needs lock
      Draws a line from (x1,y1) to (x2,y2).

--- SDL::Surface#drawRect(x,y,w,h,color)
--- SDL::Surface#draw_rect(x,y,w,h,color)
      Needs SGE ,Needs lock
      Draws a rectangle.

--- SDL::Surface#drawCircle(x,y,r,color)
--- SDL::Surface#draw_circle(x,y,r,color)
      Needs SGE ,Needs lock
      Draws a circle.

--- SDL::Surface#drawFilledCircle(x,y,r,color)
--- SDL::Surface#draw_filled_circle(x,y,r,color)
      Needs SGE ,Needs lock
      Draws a filled circle.

--- SDL::Surface#drawEllipse(x,y,rx,ry,color)
--- SDL::Surface#draw_ellipse(x,y,rx,ry,color)
      Needs SGE, Needs lock
      Draws an ellipse.

--- SDL::Surface#drawEllispe(x,y,rx,ry,color)
      See drawEllipse.  This method exists for compatability but should not
      be used.

--- SDL::Surface#drawFilledEllipse(x,y,rx,ry,color)
--- SDL::Surface#draw_filled_ellipse(x,y,rx,ry,color)
      Needs SGE, Needs lock
      Draws a filled ellipse.

--- SDL::Surface#drawFilledEllispe(x,y,rx,ry,color)
      See drawFilledEllipse.  This method exists for compatability but
      should not be used.

--- SDL::Surface#drawAALine(x1,y1,x2,y2,color)
--- SDL::Surface#draw_aa_line(x1,y1,x2,y2,color)
      Needs SGE ,Needs lock
      
      Draws an antialiased line from (x1,y1) to (x2,y2).
      
--- SDL::Surface#drawAACircle(x,y,r,color)
--- SDL::Surface#draw_aa_circle(x,y,r,color)
      Needs SGE ,Needs lock

      Draws an antialiased circle.
      
--- SDL::Surface#drawAAFilledCircle(x,y,r,color)
--- SDL::Surface#draw_aa_filled_circle(x,y,r,color)
      Needs SGE ,Needs lock

      Draws a filled antialiased circle.
      
--- SDL::Surface#drawAAEllipse(x,y,rx,ry,color)
--- SDL::Surface#draw_aa_ellipse(x,y,rx,ry,color)
      Needs SGE ,Needs lock

      Draws an antialiased ellipse.
      
--- SDL::Surface#drawLineAlpha(x1,y1,x2,y2,color,alpha)
--- SDL::Surface#draw_line_alpha(x1,y1,x2,y2,color,alpha)
      Needs SGE ,Needs lock

      Draws a line with alpha blending.
      
--- SDL::Surface#drawRectAlpha(x,y,w,h,color,alpha)
--- SDL::Surface#draw_rect_alpha(x,y,w,h,color,alpha)
      Needs SGE ,Needs lock

      Draws a rectangle with alpha blending.
      
--- SDL::Surface#drawFilledRectAlpha(x,y,w,h,color,alpha)
--- SDL::Surface#draw_filled_rect_alpha(x,y,w,h,color,alpha)
      Needs SGE ,Needs lock

      x
      
--- SDL::Surface#drawCircleAlpha(x,y,r,color,alpha)
--- SDL::Surface#draw_circle_alpha(x,y,r,color,alpha)
      Needs SGE ,Needs lock

      Draws a circle with alpha blending.
      
--- SDL::Surface#drawFilledCircleAlpha(x,y,r,color,alpha)
--- SDL::Surface#draw_filled_circle_alpha(x,y,r,color,alpha)
      Needs SGE ,Needs lock

      Draws a filled circle with alpha blending.
      
--- SDL::Surface#drawEllipseAlpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#draw_ellipse_alpha(x,y,rx,ry,color,alpha)
      Needs SGE ,Needs lock

      Draws an ellipse with alpha blending.
      
--- SDL::Surface#drawFilledEllipseAlpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#draw_filled_ellipse_alpha(x,y,rx,ry,color,alpha)
      Needs SGE ,Needs lock

      Draws a filled ellipse with alpha blending.
      
--- SDL::Surface#drawAALineAlpha(x1,y1,x2,y2,color,alpha)
--- SDL::Surface#draw_aa_line_alpha(x1,y1,x2,y2,color,alpha)
      Needs SGE ,Needs lock

      Draws an antialiased line with alpha blending.
      
--- SDL::Surface#drawAACircleAlpha(x,y,r,color,alpha)
--- SDL::Surface#draw_aa_circle_alpha(x,y,r,color,alpha)
      Needs SGE ,Needs lock

      Draws an antialiased circle with alpha blending.
      
--- SDL::Surface#drawAAEllipseAlpha(x,y,rx,ry,color,alpha)
--- SDL::Surface#draw_aa_ellipse_alpha(x,y,rx,ry,color,alpha)
      Needs SGE ,Needs lock

      Draws an antialiased ellipse with alpha blending.

--- SDL::Surface#drawBezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
--- SDL::Surface#draw_bezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
      Needs SGE ,Needs lock
      
      Draws a bezier curve from (x1,y1) to (x4,y4) with the control
      points (x2,y2) and (x3,y3). level indicates how good precision
      the function should use, 4-7 is normal.
      
--- SDL::Surface#drawAABezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
--- SDL::Surface#draw_aa_bezier(x1,y1,x2,y2,x3,y3,x4,y4,level,color)
      Needs SGE ,Needs lock
      
      Draws a antialiased bezier curve from (x1,y1) to (x4,y4) with the control
      points (x2,y2) and (x3,y3). level indicates how good precision
      the function should use, 4-7 is normal.
      
--- SDL::Surface#drawBezierAlpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
--- SDL::Surface#draw_bezier_alpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
      Needs SGE ,Needs lock
      
      Draws an alpha bezier curve from (x1,y1) to (x4,y4) with the control
      points (x2,y2) and (x3,y3). level indicates how good precision
      the function should use, 4-7 is normal.
      
--- SDL::Surface#drawAABezierAlpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
--- SDL::Surface#draw_aa_bezier_alpha(x1,y1,x2,y2,x3,y3,x4,y4,level,color,alpha)
      Needs SGE ,Needs lock
      
      Draws an antialiased alpha bezier curve from (x1,y1) to (x4,y4)
       with the control
      points (x2,y2) and (x3,y3). level indicates how good precision
      the function should use, 4-7 is normal.

--- SDL::Surface#rotateScaledSurface(angle,scale,bgcolor)
--- SDL::Surface#rotate_scaled_surface(angle,scale,bgcolor)
      Needs SGE
      This function makes the instance of Surface with a rotated and scaled
      copy of "self". "angle" is the rotation angle in degrees.
      "scale" is the scaling value , 1.0 is the normal size.

      This method is obsolete. Please use ((<SDL::Surface#transformSurface>)).

--- SDL::Surface#rotateSurface(angle,bgcolor)
--- SDL::Surface#rotate_surface(angle,bgcolor)
      Same as above,but with scale=1.0 .

--- SDL::Surface#transformSurface(bgcolor,angle,xscale,yscale,flags)
--- SDL::Surface#transform_surface(bgcolor,angle,xscale,yscale,flags)
      Creates a rotated and scaled image of src. See ((<SDL.transform>))
      for more information.

      * bgcolor - What background color should the new surface have.
      
--- SDL::Surface#mapRGB(r,g,b)
--- SDL::Surface#map_rgb(r,g,b)
    Maps the RGB color value to the pixel format of specified surface
    and returns the pixel value as a integer.

--- SDL::Surface#mapRGBA(r,g,b,a)
--- SDL::Surface#map_rgba(r,g,b,a)
      Same as above,but includes alpha value.

--- SDL::Surface#getRGB(pixel)
--- SDL::Surface#get_rgb(pixel)
      Get RGB component values from a pixel stored in the specified pixel
      format.Returns r,g,b value in array as [r,g,b].

--- SDL::Surface#getRGBA(pixel)
--- SDL::Surface#get_rgba(pixel)
      Same as above, but return value includes alplah value.
      Returns r,g,b,a in arrary as [r,g,b,a].

--- SDL::Surface#bpp
      Return bits per pixel on this surface.

--- SDL::Surface#colorkey
      Returns colorkey on this surface.

--- SDL::Surface#alpha
      Returns alpha on this surface.

--- SDL::Surface#flags
      Returns flags on this surface.

--- SDL::Surface#Rmask
--- SDL::Surface#Gmask
--- SDL::Surface#Bmask
--- SDL::Surface#Amask
      Returns [RGBA] mask on this surface.

--- SDL::Surface#pixels
      Returns pixel data as String.
      
--- SDL::Surface#setPalette(flag,colors,firstcolor)
--- SDL::Surface#set_palette(flag,colors,firstcolor)
      Sets a portion of the palette for the given 8-bit surface.

      Palettized (8-bit) screen surfaces with the SDL_HWPALETTE flag have two
      palettes, a logical palette that is used for mapping blits to/from
      the surface and a physical palette (that determines how the
      hardware will map the colors to the display).

      This method can modify either the logical or physical
      palette by specifing SDL::LOGPAL or SDL::PHYSPAL in the flags parameter.

      If you want to modify the palette from Xth to th, you will give
      following array as colors, and X as firstcolor.
        [ [rX,gX,bX],[rX+1,gX+1,bX+1], ... ,[rY,gY,bY] ]

--- SDL::Surface#setColors(colors,firstcolor)
--- SDL::Surface#set_colors(colors,firstcolor)
      Same as ((<SDL::Surface#setPalette>)), but flag is
      SDL::LOGPAL|SDL::PHYSPAL.

--- SDL::Surface#getPalette
--- SDL::Surface#get_palette
      Returns the palette of the specified surface. Return value is array
      as following.
        [ [r0,g0,b0],[r1,g1,b1], ... ,[r255,g255,b255] ]
      Returns nil if the surface have no palette.

--- SDL::Surface#makeCollisionMap
      Need SGE

      Create a collision map.  Call SetColorKey first.  Every
      non-transparent pixel in the surface is set to solid in the collision
      map.  Returns an instance of CollisionMap.

=== SDL::CollisionMap

Need SGE

This is a map of which pixels in a surface are solid and which are
transparent.  Its methods can quickly determine whether or not two
surfaces would overlap if drawn at particular coordinates.

Only ((<SDL::Surface#makeCollisionMap>)) makes this object.

==== class method

--- SDL::CollisionMap#boundingBoxCheck(x1, y1, w1, h1, x2, y2, w2, h2)
      Return true if the bounding boxes overlap.

==== method

--- SDL::CollisionMap#collisionCheck(x1, y1, collisionMap, x2, y2)
      Determine if this collision map, if drawn with its upper-left
      corner at (x1, y1), would collide with collisionMap if drawn
      with its upper-left corner at (x2, y2).  If so, return the
      coordinate of the last collision found as an array ([x, y]).
      If no collision, returns nil.

      This method calls boundingBoxCheck automatically.

--- SDL::CollisionMap#boundingBoxCheck(x1, y1, collisionMap, x2, y2)
      Return true if the bounding boxes of the two maps would overlap if
      drawn with upper-left corners at (x1, y1) and (x2, y2).

--- SDL::CollisionMap#clear(x1, y1, w, h)
      Clear (make transparent) an area of the collision map.

--- SDL::CollisionMap#set(x1, y1, w, h)
      Set (make solid) an area of the collision map.

=== SDL::Screen

SDL display the image that the instance of "Screen" have.
Only ((<SDL.setVideoMode>)) makes this object.
In fact the class named "Screen" doesn't exist,and the object that
SDL::setVideoMode returns is the instance of Surface with following
singleton methods.

==== super class

((<SDL::Surface>))

==== class method


==== method

--- SDL::Screen#updateRect(x,y,w,h)
--- SDL::Screen#update_rect(x,y,w,h)
      Makes sure the given  rectangle is updated on the given screen.
      Thhis function should not be called while screen is locked.

      If 'x', 'y', 'w' and 'h' are all 0, SDL_UpdateRect will update the entire
      screen.

--- SDL::Screen#flip
      On hardware that supports double-buffering, this method sets up a flip
      and returns. The hardware will wait for vertical retrace, and then swap
      video buffers before the next video surface blit or lock will return. On
      hardware that doesn't support double-buffering, this is equivalent to
      calling ((<SDL::Screen#updateRect>))(0, 0, 0, 0)
      
      The SDL::DOUBLEBUF flag must have been passed to
      ((<SDL.setVideoMode>)), when
      setting the video mode for this method to perform hardware flipping.

=== SDL::PixelFormat

((<SDL::Surface>)) has all methods of ((<SDL::PixelFormat>)).
This class is obsolete,
and you should use ((<SDL::Surface>)) instead of ((<SDL::PixelFormat>)).

In SDL you can use some type surface,for example 32bit color surface and
16bit surface.Therefore you need the information about that type,and
object of PixelFormat represents this information.

In this lib,you use one integer to specify color.To change from r,g,b value
to this integer you use ((<SDL::PixelFormat#mapRGB>)) and to change this integer
to r,g,b value ((<SDL::PixelFormat#getRGB>))

==== super class

Object

==== class method

nothing

==== method

--- SDL::PixelFormat#mapRGB(r,g,b)
    Maps the RGB color value to the specified pixel format and returns the
    pixel value as a integer.

--- SDL::PixelFormat#mapRGBA(r,g,b,a)
      Same as above,but includes alpha value.

--- SDL::PixelFormat#getRGB(pixel)
      Get RGB component values from a pixel stored in the specified pixel
      format.Returns r,g,b value in array as [r,g,b].

--- SDL::PixelFormat#getRGBA(pixel)
      Same as above, but return value includes alplah value.
      Returns r,g,b,a in arrary as [r,g,b,a].

--- SDL::PixelFormat#bpp
      Return bits per pixel on this format.

--- SDL::PixelFormat#colorkey
      Not documented yet

--- SDL::PixelFormat#alpha
      Not documented yet

== Event handling

=== SDL::Event

The class handling event.
You had better use ((<SDL::Event2>)) instead of this class.

==== super class

Object

==== class method

--- SDL::Event.new
      Create a new ((<SDL::Event>)) Object. 

--- SDL::Event.appState
--- SDL::Event.app_state
      Returns the current state of the application. The value returned
      is a bitwise combination of:
        SDL::Event::APPMOUSEFOCUS
        SDL::Event::APPINPUTFOCUS
        SDL::Event::APPACTIVE
        
--- SDL::Event.enableUNICODE
--- SDL::Event.enable_unicode
      Enables UNICODE keyboard translation.
      UNICODE translation is disabled by default.
      If you will use SDLSKK on Ruby/SDL, you should enable translation.
      
--- SDL::Event.disableUNICODE
--- SDL::Event.disable_unicode
      Disable UNICODE keyboard translation.
      
--- SDL::Event.enableUNICODE?
--- SDL::Event.enable_unicode?
      Returns whether UNICODE keyboard translation is enabled.
      
==== method

--- SDL::Event#poll
      Polls for currently pending events, and returns 1 if there are any
      pending events, or 0 if there are none available.
      If there are any events ,the next event is removed from the queue
      and stored in self.

--- SDL::Event#wait
      Waits indefinitely for the next available event, returning 1, or 0 if
      there was an error while waiting for events.
      The next event is removed from the queue and stored in self.

--- SDL::Event#type
      Returns the type of stored event.
        SDL::Event::ACTIVEEVENT 
        SDL::Event::KEYDOWN
        SDL::Event::KEYUP
        SDL::Event::MOUSEMOTION
        SDL::Event::MOUSEBUTTONDOWN
        SDL::Event::MOUSEBUTTONUP
        SDL::Event::JOYAXISMOTION
        SDL::Event::JOYBALLMOTION
        SDL::Event::JOYHATMOTION
        SDL::Event::JOYBUTTONDOWN
        SDL::Event::JOYBUTTONUP
        SDL::Event::QUIT
        SDL::Event::SYSWMEVENT
        SDL::Event::VIDEORESIZE

--- SDL::Event#info
      Return event information in array.
      This method can handle all event.

--- SDL::Event#keyPress?
--- SDL::Event#key_press?
      Returns true when you got key event and a key pressed down,
      otherwise returns false.

--- SDL::Event#keySym
--- SDL::Event#key_sym
      Returns SDL vertual keysym.

--- SDL::Event#keyMod
--- SDL::Event#key_mod
      Returns Current Key modifiers.

--- SDL::Event#gain?
      On ACTIVEEVENT,
      returns true when gaining focus in this event,otherwise retursn false.

--- SDL::Event#appState
--- SDL::Event#app_state
      Returns the kind of ActiveEvent.
      This value is following.
        SDL::Event::APPMOUSEFOCUS
        SDL::Event::APPINPUTFOCUS
        SDL::Event::APPACTIVE

--- SDL::Event#mouseX
--- SDL::Event#mouse_x
      Returns the X coordinate of the mouse.

--- SDL::Event#mouseY
--- SDL::Event#mouse_y
      Returns the Y coordinate of the mouse.

--- SDL::Event#mouseXrel
--- SDL::Event#mouse_xrel
      Returns the relative motion in the X direction.

--- SDL::Event#mouseYrel
--- SDL::Event#mouse_yrel
      Returns the relative motion in the Y direction.

--- SDL::Event#mouseButton
--- SDL::Event#mouse_button
      Returns the mouse button index.
        SDL::Mouse::BUTTON_LEFT  
        SDL::Mouse::BUTTON_MIDDLE  
        SDL::Mouse::BUTTON_RIGHT 

--- SDL::Event#mousePress?
--- SDL::Event#mouse_press?
      Returns true when this mouse event is SDL::Event::MOUSEBUTTONDOWN,
      otherwise returns false.

=== SDL::Event2
Another event handling class.
I think ((<SDL::Event2>)) is easier to use than ((<SDL::Event>))

==== super class

Object

==== class method

--- SDL::Event2.poll
    Polls for currently pending events, and returns the instance represents
    that event.Returns nil if there is no pending event.
    The class of that instance is following.
      SDL::Event2::Active
      SDL::Event2::KeyDown
      SDL::Event2::KeyUp
      SDL::Event2::MouseMotion
      SDL::Event2::MouseButtonDown
      SDL::Event2::MouseButtonUp
      SDL::Event2::JoyAxis
      SDL::Event2::JoyBall
      SDL::Event2::JoyHat
      SDL::Event2::JoyButtonUp
      SDL::Event2::JoyButtonDown
      SDL::Event2::Quit
      SDL::Event2::SysWM
      SDL::Event2::VideoResize
    All of these classes are subclass of SDL::Event2.

--- SDL::Event2.wait
    Waits indefinitely for the next available event,returning the instance
    represents that event.

--- SDL::Event2.push(event)
      Not documented yet.

--- SDL::Event2.new
      Not documented yet.

--- SDL::Event2.appState
--- SDL::Event2.app_state
      Same as ((<SDL::Event.appState>)).

--- SDL::Event2.enableUNICODE
--- SDL::Event2.enable_unicode
      Same as ((<SDL::Event.enableUNICODE>)).
      
--- SDL::Event2.disableUNICODE
--- SDL::Event2.disable_unicode
      Same as ((<SDL::Event2.disableUNICODE>)).
      
--- SDL::Event2.enableUNICODE?
--- SDL::Event2.enable_unicode?
      Same as ((<SDL::Event.enableUNICODE?>)).
      
==== method

Nothing

=== subclasses of SDL::Event2
SDL::Event2.poll and SDL::Event2.wait return the instance of
the subclasses of SDL::Event2.
These classes and  following.

==== SDL::Event2::Active
This event occurs when mouse/keyboard focus gains/loss.
+ Method
--- SDL::Event2::Active#gain
      Returns true focus gains, otherwise returns false
--- SDL::Event2::Active#state
      Returns the kind of event.
        SDL::Event::APPMOUSEFOCUS 
        SDL::Event::APPINPUTFOCUS
        SDL::Event::APPACTIVE   iconify or restored.

==== SDL::Event2::KeyDown
This event occurs when a key is pressed.
+ Method
--- SDL::Event2::KeyDown#press
      Returns true.
--- SDL::Event2::KeyDown#sym
      Returns the pressed key such as SDL::Key::ESCAPE.
--- SDL::Event2::KeyDown#mod
      Same as ((<SDL::Key.modState>)).
--- SDL::Event2::KeyDown#unicode
      Returns key input translated to UNICODE.If you will use this,
      you need to call ((<SDL::Event2.enableUNICODE>)) beforehand.
==== SDL::Event2::KeyUp
This event occurs when a key is released.
+ Method
--- SDL::Event2::KeyUp#press
      Returns false.
--- SDL::Event2::KeyUp#sym
      Returns the released key such as SDL::Key::ESCAPE.
--- SDL::Event2::KeyUp#mod
      Same as ((<SDL::Key.modState>)).

==== SDL::Event2::MouseMotion
This event occurs when mouse is moved.
+ Method
--- SDL::Event2::MouseMotion#state
      Returns the button state.
--- SDL::Event2::MouseMotion#x
      Returns x of mouse cursor.
--- SDL::Event2::MouseMotion#y
      Returns y of mouse cursor.
--- SDL::Event2::MouseMotion#xrel
      Returns relative x coordinates.
--- SDL::Event2::MouseMotion#yrel
      Returns relative y coordinates.

==== SDL::Event2::MouseButtonDown
This event occurs when a mouse button is pressed.
+ Method
--- SDL::Event2::MouseButtonDown#button
      Returns the which button is pressed.
        SDL::Mouse::BUTTON_LEFT
        SDL::Mouse::BUTTON_MIDDLE
        SDL::Mouse::BUTTON_RIGHT

--- SDL::Event2::MouseButtonDown#press
      Returns true.
--- SDL::Event2::MouseButtonDown#x
      Returns x of mouse cursor.
--- SDL::Event2::MouseButtonDown#y
      Returns y of mouse cursor.

==== SDL::Event2::MouseButtonUp
This event occurs when a mouse button is pressed.
+ Method
--- SDL::Event2::MouseButtonUp#button
      Returns the which button is released.
        SDL::Mouse::BUTTON_LEFT
        SDL::Mouse::BUTTON_MIDDLE
        SDL::Mouse::BUTTON_RIGHT

--- SDL::Event2::MouseButtonUp#press
      Returns false.
--- SDL::Event2::MouseButtonUp#x
      Returns x of mouse cursor.
--- SDL::Event2::MouseButtonUp#y
      Returns y of mouse cursor.

==== SDL::Event2::JoyAxis
This event occurs when axis of joystick is moved.
+ Method
--- SDL::Event2::JoyAxis#which
      Returns joystick device index.
--- SDL::Event2::JoyAxis#axis
      Returns joystick axis index.
--- SDL::Event2::JoyAxis#value
      Returns axis value(from -32768 to 32767).

==== SDL::Event2::JoyBall
This event occurs when joystick trackball moves.
+ Method
--- SDL::Event2::JoyBall#which
      Returns joystick device index.
--- SDL::Event2::JoyBall#ball
      Returns joystick trackball index.
--- SDL::Event2::JoyBall#xrel
      Returns the relative motion in the X direction.
--- SDL::Event2::JoyBall#yrel
      Returns the relative motion in the Y direction.

==== SDL::Event2::JoyHat
This event occurs when joystick hat moves.
+ Method
--- SDL::Event2::JoyHat#which
      Returns joystick device index.
--- SDL::Event2::JoyHat#hat
      Returns joystick hat index.
--- SDL::Event2::JoyHat#value
      Returns hat position.
      That values  is a logically OR'd combination
      of the following values.
        SDL::Joystick::HAT_CENTERED
        SDL::Joystick::HAT_UP
        SDL::Joystick::HAT_RIGHT
        SDL::Joystick::HAT_DOWN
        SDL::Joystick::HAT_LEFT

      The following defines are also provided
        SDL::Joystick::HAT_RIGHTUP
        SDL::Joystick::HAT_RIGHTDOWN
        SDL::Joystick::HAT_LEFTUP
        SDL::Joystick::HAT_LEFTDOWN

==== SDL::Event2::JoyButtonUp
This event occurs when joystick button is released.
+ Method
--- SDL::Event2::JoyButtonUp#which
      Returns joystick device index.
--- SDL::Event2::JoyButtonUp#button
      Returns joystick button index.
--- SDL::Event2::JoyButtonUp#press
      Returns false.

==== SDL::Event2::JoyButtonDown
This event occurs when joysick button is pressed.
+ Method
--- SDL::Event2::JoyButtonDown#which
      Returns joystick device index.
--- SDL::Event2::JoyButtonDown#button
      Returns joystick button index.
--- SDL::Event2::JoyButtonDown#press
      Returns true.

==== SDL::Event2::Quit
This event occurs when quit requested, such as pressed exit button.

==== SDL::Event2::SysWM
This event occurs when platform-dependent window manager occurs.
You can't get more information.

==== SDL::Event2::VideoResize
This event occurs when window are resized.
You will get this event only when you call ((<SDL.setVideoMode>)) with
SDL::RESIZABLE.

+ Method
--- SDL::Event2::VideoResize#w
      Returns new width of window.
--- SDL::Event2::VideoResize#h
      Returns new height of window.

=== SDL::Key

The module defines key constants.
This module has some functions to get the key state.

==== module functions

--- SDL::Key.scan
      scan key state.

--- SDL::Key.press?(key)
      Get key state that "scan" function scan.
      return true if "key" is pressed and return false if "key" is released.

--- SDL::Key.modState
--- SDL::Key.mod_state
      Returns the current of the modifier keys (CTRL,ATL,etc.).
      The return value can be an OR'd combination of following constants.  
        SDL::Key::MOD_NONE
        SDL::Key::MOD_LSHIFT
        SDL::Key::MOD_RSHIFT
        SDL::Key::MOD_LCTRL
        SDL::Key::MOD_RCTRL
        SDL::Key::MOD_LALT
        SDL::Key::MOD_RALT
        SDL::Key::MOD_LMETA
        SDL::Key::MOD_RMETA
        SDL::Key::MOD_NUM
        SDL::Key::MOD_CAPS
        SDL::Key::MOD_MODE
        SDL::Key::MOD_RESERVED
        SDL::Key::MOD_CTRL = SDL::Key::MOD_LCTRL|SDL::Key::MOD_RCTRL
        SDL::Key::MOD_SHIFT = SDL::Key::MOD_LSHIFT|SDL::Key::MOD_RSHIFT
        SDL::Key::MOD_ALT = SDL::Key::MOD_LALT|SDL::Key::MOD_RALT
        SDL::Key::MOD_META = SDL::Key::MOD_LMETA|SDL::Key::MOD_RMETA

--- SDL::Key.enableKeyRepeat(delay,interval)
--- SDL::Key.enable_key_repeat(delay,interval)
      Set keyboard repeat rate.

--- SDL::Key.disableKeyRepeat
--- SDL::Key.disable_key_repeat
      Disables key repeat.

--- SDL::Key.getKeyName(key)
--- SDL::Key.get_key_name(key)
      Return the string of key name.
      
=== SDL::Mouse

The module mouse constants and mouse functions.

=== module functions

--- SDL::Mouse.state
      Return mouse state in array.
      Return value is following,
        [ x , y , pressLButton? , pressMButton? , pressRButton? ]

--- SDL::Mouse.warp(x,y)
      Set the position of the mouse cursor (generates a mouse motion event).

--- SDL::Mouse.show
      Show mouse cursor.

--- SDL::Mouse.hide
      Hide mouse cursor.

--- SDL::Mouse.setCursor(bitmap,white,black,transparent,inverted,hot_x=0,hot_y=0)
--- SDL::Mouse.set_cursor(bitmap,white,black,transparent,inverted,hot_x=0,hot_y=0)
      Change mouse cursor. bitmap is form of cursor,instance of
      ((<SDL::Surface>)).The cursor width must be a multiple of 8.
      The cursor is created in black and white according to
      bitmap and white,black,transparent,inverted.
      white,black,transparent,inverted represents that elements in
      bitmap as pixel value.

== audio

=== SDL::Mixer

The module that have sound functions and constants.
Note that volume is between 0 and 128.
Needs SDL_mixer to use functions if this module.

==== module functions

--- SDL::Mixer.open(frequency=Mixer::DEFAULT_FREQUENCY,format=Mixer::DEFAULT_FORMAT,cannels=Mixer::DEFAULT_CHANNELS,chunksize=4096)
      Initializes SDL_mixer.

--- SDL::Mixer.spec
      Returns the audio spec in array.
        [ rate,format,channels ]

--- SDL::Mixer.allocateChannels(numchannels)
--- SDL::Mixer.allocate_channels(numchannels)
      Dynamically change the number of channels managed by the mixer.
      If decreasing the number of channels, the upper channels are
      stopped.
      This method returns the new number of allocated channels.

--- SDL::Mixer.playChannel(channel,wave,looping)
--- SDL::Mixer.play_channel(channel,wave,looping)
      Play a wave on a specific channel.

      If the specified channel is -1, play on the first free channel.
      If 'loops' is greater than zero, loop the sound that many times.
      If 'loops' is -1, loop inifinitely (~65000 times).

      Returns which channel was used to play the sound.

--- SDL::Mixer.play?(channel)
      Returns whether specific channel is playing or not.

      If the specified channel is -1, check all channels.

--- SDL::Mixer.setVolume(channel,volume)
--- SDL::Mixer.set_volume(channel,volume)
      Set the volume in the range of 0-128 of a specific channel.
      If the specified channel is -1, set volume for all channels.
      Returns the original volume.
      If the specified volume is -1, just return the current volume.

--- SDL::Mixer.halt(channel)
      Halt playing of a particular channel

--- SDL::Mixer.pause(chennel)
      Pause a particular channel

--- SDL::Mixer.resume(channel)
      Resume a particular channel

--- SDL::Mixer.pause?(channel)
      Returns whether a particular channel is pausing.

--- SDL::Mixer.playMusic(music,loops)
--- SDL::Mixer.play_music(music,loops)
      Play a music.
      
--- SDL::Mixer.fadeInMusic(music,loops,ms)
--- SDL::Mixer.fade_in_music(music,loops,ms)
      Fade in the given music in ms milliseconds.
      The meaning of loops is same as in ((<SDL::Mixer.playChannel>))

--- SDL::Mixer.setVolumeMusic(volume)
--- SDL::Mixer.set_volume_music(volume)
      Sets the volume of music.

--- SDL::Mixer.haltMusic
--- SDL::Mixer.halt_music
      Halts music.

--- SDL::Mixer.fadeOutMusic(ms)
--- SDL::Mixer.fade_out_music(ms)
      Fade out the music in ms milliseconds.

--- SDL::Mixer.pauseMusic
--- SDL::Mixer.pause_music
      Pauses music.

--- SDL::Mixer.resumeMusic
--- SDL::Mixer.resume_music
      Resumes music.

--- SDL::Mixer.rewindMusic
--- SDL::Mixer.rewind_music
      Rewinds music.

--- SDL::Mixer.pauseMusic?
--- SDL::Mixer.pause_music?
      Returns whether the music is pausing.

--- SDL::Mixer.playMusic?
--- SDL::Mixer.play_music?
      Returns whether the music is playing.

=== SDL::Mixer::Wave

The class handling wave

==== super class

Object

==== class method

--- SDL::Mixer::Wave.load(filename)
      Loads a wave file and returns the object of ((<SDL::Mixer::Wave>)).

==== method

--- SDL::Mixer::Wave#setVolume(volume)
--- SDL::Mixer::Wave#set_volume(volume)
      Set volume of self.

=== SDL::Mixer::Music

==== super class

Object

==== class method

--- SDL::Mixer::Music.load(filename)
      Loads a music (.mod .s3m .it .xm .mid .mp3, .ogg) file and returns the
      object of ((<SDL::Mixer::Music>)).

      You have to setup your environment to play MIDI, Ogg Vorbis, and MP3 file.

== Window Manager 

=== SDL::WM

The module that have the functions for window management.

==== module functions

--- SDL::WM.caption
      Returns captions of the window title and icon name.

--- SDL::WM.setCaption(title,icon)
--- SDL::WM.set_caption(title,icon)
      Set captions of the window title and icon name.

--- SDL::WM.icon=(iconImage)
--- SDL::WM.icon=(icon_image)
      Sets the icon for the display window.
      
      This function must be called before the first call to
      setVideoMode.

      It takes an icon surface.

--- SDL::WM.iconify
      If the application is running in a window managed environment SDL
      attempts to iconify/minimise it. If ((<SDL::WM.iconify>)) is successful,
      the application will receive a APPACTIVE loss event.

--- SDL::Screen#toggleFullScreen
--- SDL::Screen#toggle_fullscreen
      Toggles fullscreen mode.
      
== CDROM

=== SDL::CD

The class represents CDROM drive.

Note that the information that you get with ((<SDL::CD#numTracks>)) is stored
when you call ((<SDL::CD#status>)).

A CD-ROM is organized into one or more tracks, each consisting of a
certain number of "frames". Each frame is ~2K in size, and at normal
playing speed, a CD plays 75 frames per second. SDL works with the
number of frames on a CD.

==== super class

==== class method

--- SDL::CD.numDrive
--- SDL::CD.num_drive
      Returns the number of CD-ROM drives on the system.

--- SDL::CD.indexName(drive)
--- SDL::CD.index_name(drive)
      Returns a human-readable, system-dependent identifier for the CD-ROM.
      drive is the index of the drive. Drive indices start to 0 and end at
      SDL::CD.numDrive-1

--- SDL::CD.open(drive)
      Opens a CD-ROM drive for access.
      It returns a object of CD.
      Raises SDL::Error if the drive was invalid or busy.
      Drives are numbered starting with 0. Drive 0 is the system default
      CD-ROM.

==== method

--- SDL::CD#status
      Stores the information of currentTrack,currentFrame,numTracks,trackType,
      trackLenght .
      This function returns the current status.
      Status is described like so:
        SDL::CD::TRAYEMPTY
        SDL::CD::STOPPED
        SDL::CD::PLAYING
        SDL::CD::PAUSED
        SDL::CD::ERROR

--- SDL::CD#play(start,length)
      Plays the given cdrom, starting a frame start for length frames.

--- SDL::CD#playTrack(start_track,start_frame,ntracks,nframes)
--- SDL::CD#play_track(start_track,start_frame,ntracks,nframes)
      SDL_CDPlayTracks plays the given CD starting at track start_track, for
      ntracks tracks.
      
      start_frame is the frame offset, from the beginning of the start_track,
      at which to start. nframes is the frame offset, from the beginning of
      the last track (start_track+ntracks), at which to end playing.

      SDL::CD#playTracks should only be called after calling
      ((<SDL::CD#status>)) to get track information about the CD.

--- SDL::CD#pause
      Pauses play.

--- SDL::CD#resume
      Resumes play.

--- SDL::CD#stop
      Stops play.

--- SDL::CD#eject
      Ejects cdrom.

--- SDL::CD#numTracks
--- SDL::CD#num_tracks
      Returns the number of tracks on the CD.

--- SDL::CD#currentTrack
--- SDL::CD#current_track
      Returns current track.

--- SDL::CD#currentFrame
--- SDL::CD#current_frame
      Returns current frame.

--- SDL::CD#trackType(track)
--- SDL::CD#track_type(track)
      Returns the track type of given track.
      SDL::CD::AUDIO_TRACK
      SDL::CD::DATA_TRACK

--- SDL::CD#trackLength(track)
--- SDL::CD#track_length(track)
      Returns the track length in frame,of given track.

== Joystick handling

=== SDL::Joystick

The class represents one joystick.

=== super class

Object

=== class method

--- SDL::Joystick.pall
      Return whether Joystick.updateAll is called automatically.
      
--- SDL::JoyStick.pall=(polling)
      Set whether Joystick.updateAll is called automatically and
      whether joystick events are processed.
      Default is true, and you shouldn't change.

--- SDL::Joystick.num
      Returns the number of attached joysticks.

--- SDL::Joystick.indexName(index)
--- SDL::Joystick.index_name(index)
      Get the implementation dependent name of joystick. The index parameter
      refers to the N'th joystick on the system.

--- SDL::Joystick.open(index)
      Opens a joystick for use within SDL. The index refers to the N'th
      joystick in the system. A joystick must be opened before it game be
      used.
      Returns the object of Joystick.

--- SDL::Joystick.open?(index)
      Determines whether a joystick has already been opened within the
      application. index refers to the N'th joystick on the system.

--- SDL::Joystick.updateAll
--- SDL::Joystick.update_all
      Updates the state(position, buttons, etc.) of all open joysticks.

=== method

--- SDL::Joystick#index
      Returns the index of self.

--- SDL::Joystick#numAxes
--- SDL::Joystick#num_axes
      Return the number of axes available from a previously opened 
      joystick.

--- SDL::Joystick#numBalls
--- SDL::Joystick#num_balls
      Return the number of trackballs available.

--- SDL::Joystick#numButtons
--- SDL::Joystick#num_buttons
      Returns the number of buttons available.

--- SDL::Joystick#axis(axis_index)
      Returns a 16-bit signed integer representing the current position of the
      axis.
      On most modern joysticks the X axis is usually represented by axis 0 and
      the Y axis by axis 1. The value returned by Joystick#axis is a
      signed integer (-32768 to 32768) representing the current position of
      the axis, it maybe necessary to impose certain tolerances on these
      values to account for jitter. It is worth noting that some joysticks use
      axes 2 and 3 for extra buttons.

--- SDL::Joystick#hat(hat_index)
      The current state is returned as a 8bit unsigned integer
      which is defined as an OR'd combination of one or more of the following
        SDL::Joystick::HAT_CENTERED
        SDL::Joystick::HAT_UP
        SDL::Joystick::HAT_RIGHT
        SDL::Joystick::HAT_DOWN
        SDL::Joystick::HAT_LEFT
        SDL::Joystick::HAT_RIGHTUP
        SDL::Joystick::HAT_RIGHTDOWN
        SDL::Joystick::HAT_LEFTUP
        SDL::Joystick::HAT_LEFTDOWN

--- SDL::Joystick#button(button_index)
      Returns the current state of the given button.
      Returns true if the button is pressed,otherwise 0.

--- SDL::Joystick#ball(ball_index)
      Returns the motion deltas in array, [ dx,dy ] .
      Trackballs can only return relative motion since the last call to
      Joystick#ball, these motion deltas a placed into dx and dy.

== Font handling

=== SDL::BMFont

The class handles BitMap Font. This needs SGE.

==== super class

Object

==== class method

--- SDL::BMFont.open(filename,flags)
      Open a font file and create a bitmap font object.
      * SDL::BMFont::TRANSPARENT
          Transparent(Should usually be set)
      * SDL::BMFont::NOCONVERT
      * SDL::BMFont::SFONT
      * SDL::BMFont::PALETTE

==== method
--- SDL::BMFont#setColor(r,g,b)
--- SDL::BMFont#set_color
      Changes the color of the font.
      This doesn't work on 'color font' or sfont.

--- SDL::BMFont#height
      Get the height of the font.
      
--- SDL::BMFont#width
      Get the width of the font.
      
--- SDL::BMFont#textout(surface,string,x,y)
      Render the given string on surface. (x,y) is the position
      of the left top corner.

=== SDL::Kanji
This class handles bdf fonts. You can draw Japanese character with this
class.

==== super class

Object

==== class method
--- SDL::Kanji.open(filename,size)
      Open bdf font file and return font object.
      You should specify font size as ((|size|)).
      
==== method
--- SDL::Kanji#add(filename)
      Open other bdf file and add lacked glyphs.
      
--- SDL::Kanji#setCodingSystem
--- SDL::Kanji#set_coding_system
      Set Character coding system. You can use following.
      * SDL::Kanji::JIS
      * SDL::Kanji::SJIS
      * SDL::Kanji::EUC
      
      Default is SDL::Kanji::EUC.
      
--- SDL::Kanji#textwidth(text)
      Return the width of text.
      
--- SDL::Kanji#width
      Return the width of one ascii character.
      
--- SDL::Kanji#height
      Return font height.
      
--- SDL::Kanji#put(surface,text,x,y,r,g,b)
      Draw text on surface at (x,y) whose color is (r,g,b).
      
--- SDL::Kanji#putTate(surface,text,x,y,r,g,b)
--- SDL::Kanji#put_tate(surface,text,x,y,r,g,b)
      Draw Tategaki text.
      
=== SDL::TTF

The class handles True Type Font. This needs SDL_ttf.

==== super class

Object

==== class method

--- SDL::TTF.init
      You must call TTF.init first when you use True Type Font.

--- SDL::TTF.open(filename,size,index=0)
      Open a font file and create a font of the specified point size.

      And you can specify font face with index. Need SDL_ttf 2.0.4 or
      later to use this feature.

==== method

--- SDL::TTF#style
      Returns the font style.

--- SDL::TTF#style=(style)
      Set font style.
      style is an OR'd conbination of one or more of the following
        SDL::TTF::STYLE_NORMAL
        SDL::TTF::STYLE_BOLD
        SDL::TTF::STYLE_ITALIC
        SDL::TTF::STYLE_UNDERLINE

--- SDL::TTF#textSize(text)
--- SDL::TTF#text_size(text)
      Get Text size on image in array. Return [width,height].

--- SDL::TTF#faces
      Need SDL_ttf 2.0.4 or later
      Returns the number of face.

--- SDL::TTF#fixedWidth?
--- SDL::TTF#fixed_width?
      Need SDL_ttf 2.0.4 or later.
      Returns whether this font has fixed width or not.

--- SDL::TTF#familyName
--- SDL::TTF#family_name
      Need SDL_ttf 2.0.4 or later
      Returns the name of font family.

--- SDL::TTF#styleName
--- SDL::TTF#style_name
      Need SDL_ttf 2.0.4 or later
      Returns the name of style.

--- SDL::TTF#height
      Get the total height of the font - usually equal to point size.
      
--- SDL::TTF#ascent
      Get the offset from the baseline to the top of the font
      This is a positive value, relative to the baseline.
      
--- SDL::TTF#descent
      Get the offset from the baseline to the bottom of the font
      This is a negative value, relative to the baseline.
      
--- SDL::TTF#lineSkip
--- SDL::TTF#line_skip
      Get the recommended spacing between lines of text for this font.
      
--- SDL::TTF#drawSolidUTF8(dest,text,x,y,r,g,b)
--- SDL::TTF#draw_solid_utf8(dest,text,x,y,r,g,b)
      Draw text on "dest" at ("x","y"). r,g,b are color elements of text.
      This function use colorkey internally.
      Text must be UTF-8 (you can use ASCII code).

--- SDL::TTF#drawBlendedUTF8(dest,text,x,y,r,g,b)
--- SDL::TTF#draw_blended_utf8(dest,text,x,y,r,g,b)
      Similar to drawSolidUTF8.
      More beautiful than drawSolidUTF8,but more slowly than drawSolidUTF8.

--- SDL::TTF#drawShadedUTF8(dest,text,x,y,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
--- SDL::TTF#draw_shaded_utf8(dest,text,x,y,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
      Similar to drawSolidUTF8.
      This method is defferent from drawSolidUTF8 in that this method
      fills the background of text with specified color.

--- SDL::TTF#renderSolidUTF8(text,r,g,b)
--- SDL::TTF#render_solid_utf8(text,r,g,b)
      Draws text on the new surface and returns it.
      If this method fails to render, you'll get nil.
      This method draws text like drawSolidUTF8.
      
--- SDL::TTF#renderBlendedUTF8(text,r,g,b)
--- SDL::TTF#render_blended_utf8(text,r,g,b)
      Same as ((<SDL::TTF#renderSolidUTF8>)), but this method draws
      like ((<SDL::TTF#drawBlendedUTF8>)).
      
--- SDL::TTF#renderShadedUTF8(text,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
--- SDL::TTF#render_shaded_utf8(text,fg_r,fg_g,fg_b,bg_r,bg_g,bg_b)
      Same as ((<SDL::TTF#renderSolidUTF8>)), but this method draws
      like ((<SDL::TTF#drawShadedUTF8>)).
      
== MPEG stream

Needs SMPEG library.

If you will play mpeg with sound, you should call ((<SDL.init>)) with
SDL::INIT_AUDIO, and call ((<SDL::Mixer.open>)).

Don't touch the destination surface while playing mpeg, because smpeg uses
native thread.

Don't play sound with ((<SDL::Mixer>)) when playing mpeg, because smpeg
hooks SDL_Mixer's playback functions.

=== SDL::MPEG

This class handles MPEG stream

==== super class 

Object

==== class method 

--- SDL::MPEG.load(filename)
--- SDL::MPEG.new(filename)
      Create a new SDL::MPEG object from an MPEG file.

==== メソッド

--- SDL::MPEG#info
      Returns the current information of SDL::MPEG instance.
      Return value is a instance of ((<SDL::MPEG::Info>))

--- SDL::MPEG#enableAudio(enable)
--- SDL::MPEG#enable_audio(enable)
      Enable or disable audio playback in MPEG stream.
      
--- SDL::MPEG#enableVideo(enable)
--- SDL::MPEG#enable_video(enable)
      Enable or disable video playback in MPEG stream.

--- SDL::MPEG#status
      Returns the current status.Returns following value.
        SDL::MPEG::ERROR
        SDL::MPEG::STOPPED
        SDL::MPEG::PLAYING

--- SDL::MPEG#setVolume(volume)
--- SDL::MPEG#set_volume(volume)
      Set the audio volume of an MPEG stream, in the range 0-100.

--- SDL::MPEG#setDisplay(surface)
--- SDL::MPEG#set_display(surface)
      Set the destination surface for MPEG video playback.

--- SDL::MPEG#setLoop(repeat)
--- SDL::MPEG#set_loop(repeat)
      Set or clear looping play.
      
--- SDL::MPEG#scaleXY(w,h)
--- SDL::MPEG#scale_xy(w,h)
      Scale pixel display.

--- SDL::MPEG#scale(scale)
      Scale pixel display.

--- SDL::MPEG#move(x,y)
      Move the video display area within the destination surface.

--- SDL::MPEG#setDisplayRegion(x,y,w,h)
--- SDL::MPEG#set_display_region(x,y,w,h)
      Set the region of the video to be shown.

--- SDL::MPEG#play
      Play an MPEG stream.

      Warning: Don't access the surface while playing.

--- SDL::MPEG#pause
      Pause/Resume playback.

--- SDL::MPEG#stop
      Stop playback.

--- SDL::MPEG#rewind
      Rewind the play position of MPEG stream  to the begining of the MPEG.

--- SDL::MPEG#seek(bytes)
      Seek 'bytes' bytes in the MPEG stream.

--- SDL::MPEG#skip(seconds)
      Skip 'seconds' seconds in the MPEG stream.

--- SDL::MPEG#renderFrame(framenum)
--- SDL::MPEG#render_frame(framenum)
      Render a particular frame in the MPEG video.

--- SDL::MPEG#setFilter(filter)
--- SDL::MPEG#set_filter(filter)
      Set video filter. Available filter is following.
        SDL::MPEG::NULL_FILTER  No filter
        SDL::MPEG::BILINEAR_FILTER  Bilinear filter
        SDL::MPEG::DEBLOCKING_FILTER  Deblocking filter

=== SDL::MPEG::Info

The instance of this class has the information of ((<SDL::MPEG>)).
Get that with ((<SDL::MPEG#info>)).

==== super class

Object

==== method

--- SDL::MPEG::Info#has_audio
--- SDL::MPEG::Info#has_video
--- SDL::MPEG::Info#width
--- SDL::MPEG::Info#height
--- SDL::MPEG::Info#current_frame
--- SDL::MPEG::Info#current_fps
--- SDL::MPEG::Info#audio_string
--- SDL::MPEG::Info#audio_current_frame
--- SDL::MPEG::Info#current_offset
--- SDL::MPEG::Info#total_size
--- SDL::MPEG::Info#current_time
--- SDL::MPEG::Info#total_time

== Time

=== module function

--- SDL.getTicks
--- SDL.get_ticks
      Get the number of milliseconds since the SDL library initialization.
      Note that this value wraps if the program runs for more than ~49 days.

--- SDL.delay(ms)
      Wait a specified number of milliseconds before returning. this
      function will wait at least the specified time, but possible
      longer due to OS scheduling.
      
== Japanese input method with SDLSKK
      
Needs SDLSKK library.

You need calling ((<SDL::Event2.enableUNICODE>)) after calling ((<SDL.init>))
to use SDLSKK.

=== module function

--- SDL::SKK.encoding=(encoding)
      Set encoding of SDLSKK.
      * SDL::SKK::EUCJP
      * SDL::SKK::UTF8
      * SDL::SKK::SJIS

--- SDL::SKK.encoding
      Return encoding.
      
=== SDL::SKK::Context

This class represents the state of input.

==== super class

Object

==== class method

--- SDL::SKK::Context.new(dict,romkana_table,keybind,use_minibuffer)
      Create an instance of ((<SDL::SKK::Context>)) from the dictionary,
      the keybind and the RomKanaRuleTable. And if use_minibuffer is true, you
      can use minibuffer.      
      
==== method

--- SDL::SKK::Context#input(event)
      Inputs from keyboard thorough event object.
      
--- SDL::SKK::Context#str
      Returns input (Japanese) string.
      
--- SDL::SKK::Context#render_str(font,r,g,b)
      Renders the text.

--- SDL::SKK::Context#render_minibuffer_str(font,r,g,b)
      Renders minibuffer text.

--- SDL::SKK::Context#clear
      Clears text and initializes context.

--- SDL::SKK::Context#get_basic_mode
      Returns whether context's state is basic mode.
      
      If this method returns true, and you get return, you can
      stop inputting.
      
      
=== SDL::SKK::Dictionary

==== super class

Object

==== class method

--- SDL::SKK::Dictionary.new
      Creates the instance of ((<SDL::SKK::Dictionary>)).
      The content of that is empty just after creating.
      
==== method

--- SDL::SKK::Dictionary#load(dictfile,users)
      Load dictionary from file.
      If users is true, then this method regards it as user's dictionary.
      
--- SDL::SKK::Dictionary#save(filename)
      Save user's dictionary.
      
=== SDL::SKK::RomKanaRuleTable

This class represents the rule of conversion from Alphabet to Japanese kana.

==== super class

Object

==== class method

--- SDL::SKK::RomKanaRuleTable.new(table_file)
      Create the instance of ((<SDL::SKK::RomKanaRuleTable>)) from rule file.
      
==== method

=== SDL::SKK::Keybind

This class represents the keybind in SDLSKK input system.

==== super class

Object

==== class method

--- SDL::SKK::Keybind.new
      Create the instance of ((<SDL::SKK::Keybind>)) without any keybind.

==== method

--- SDL::SKK::Keybind#set_key(key_str,cmd_str)
      Set keybind.
      
      You can use following string as ((|key_str|)).
      * alphabet and other ascii character
      * "SPC" "TAB" "DEL" "RET" "UP" "DOWN" "RIGHT" "LEFT" "INSERT" "HOME" "END"
        "PAGEUP" "PAGEDOWN" "F1" "F2" "F3" "F4" "F5" "F6" "F7" "F8" "F9" "F10"
        "F11" "F12" "F13" "F14" "F15" "HELP"
      * Modified key like "C-a" or "M-C-a"

      And you can following as ((|cmd_str|))
      * "backward-char",
      * "forward-char",
      * "backward-delete-char",
      * "delete-char",
      * "kakutei",
      * "kettei",
      * "space",
      * "keyboard-quit",
      * "set-mark-command",
      * "kill-region",
      * "yank",
      * "copy",
      * "graph-char",
      * "upper-char",
      * "lower-char",
      * "abbrev-input",
      * "latin-mode",
      * "previous-candidate",
      * "jisx0208-mode",
      * "toggle-kana",
      * "beginning-of-line"
      * "end-of-line"
      * "do-nothing"

      You should not set any command on one ascii character like "a" or "/".

--- SDL::SKK::Keybind#set_default_key
      Set default keybind. You should call this method immediately after
      call ((<SDL::SKK::Keybind.new>))

--- SDL::SKK::Keybind#unset_key(key_str)
      Unset keybind.

== 3D drawing with OpenGL
You can draw 3D graphics with OpenGL.

How to use OpenGL.
(1) require 'sdl'; require 'opengl'
(2) Call ((<SDL.init>)) with SDL::INIT_VIDEO
(3) Set attribute of OpenGL, please use ((<SDL.setGLAttr>))
(4) Call ((<SDL.setVideoMode>)) with SDL::OPENGL
(5) Use GL module methods to draw
(6) Call ((<SDL.GLSwapBuffersn>)) instead of ((<SDL.flip>)) to update screen

Please see sample/opengl.rb .

=== module function
--- SDL.setGLAttr(attr,val)
--- SDL.set_GL_attr(attr,val)
      Set the value of special SDL/OpenGL attribute.

      List of attribute:
      * SDL::GL_RED_SIZE
      * SDL::GL_GREEN_SIZE
      * SDL::GL_BLUE_SIZE
      * SDL::GL_ALPHA_SIZE
      * SDL::GL_BUFFER_SIZE
      * SDL::GL_DOUBLEBUFFER
      * SDL::GL_DEPTH_SIZE
      * SDL::GL_STENCIL_SIZE
      * SDL::GL_ACCUM_RED_SIZE
      * SDL::GL_ACCUM_GREEN_SIZE
      * SDL::GL_ACCUM_BLUE_SIZE
      * SDL::GL_ACCUM_ALPHA_SIZE

--- SDL.getGLAttr(attr)
--- SDL.get_GL_attr(attr)
      Get the value of special SDL/OpenGL attribute.
      
--- SDL.GLSwapBuffers
--- SDL.GL_swap_buffers
      Swap the OpenGL buffers, update display, if double-buffering is supported.
      
== Others
=== Avoid pthread problem
You can possibly avoid Ruby/SDL pthread problem when you put following 
in your script.
  require 'rbconfig'
  
  if RUBY_PLATFORM =~ /linux/
    trap('INT','EXIT')
    trap('EXIT','EXIT')
  end

=end
