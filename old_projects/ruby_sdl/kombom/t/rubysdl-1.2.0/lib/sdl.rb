#
# Ruby/SDL   Ruby extension library for SDL
#  Copyright (C) 2001-2006 Ohbayashi Ippei
# 
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either
# version 2.1 of the License, or (at your option) any later version.
#  This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
#  You should have received a copy of the GNU Lesser General Public
# License along with this library; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
# 
require 'sdl.so'
require 'forwardable'

if !defined?(block_given?) then
  alias block_given? iterator?
end

module SDL

  VERSION = "1.2.0"

  class PixelFormat

    extend Forwardable
    
    def initialize(surface)
      @surface = surface
    end

    def_delegators( :@surface, :mapRGB, :mapRGBA, :getRGB, :getRGBA, :bpp,
		    :colorkey, :alpha )
  end

  class Surface
    def put(surface,x,y)
      SDL::blitSurface(surface,0,0,surface.w,surface.h,self,x,y)
    end

    def format
      return PixelFormat.new(self)
    end

    if method_defined?(:rotateScaledSurface) then
      def rotateSurface(angle,bgcolor)
	rotateScaledSurface(angle,1.0,bgcolor)
      end
    end

    
    def copyRect(x,y,w,h)
      flagbase=SDL::SWSURFACE|SDL::HWSURFACE|SDL::SRCCOLORKEY|SDL::SRCALPHA
      alpha_flag = self.flags & (SDL::SRCCOLORKEY|SDL::RLEACCEL)
      self.setAlpha(0,self.alpha)
      begin
        new_surface=Surface.new(flagbase&self.flags,w,h,self)
      ensure
        self.setAlpha(alpha_flag,self.alpha)
      end
      SDL.blitSurface(self,x,y,w,h,new_surface,0,0)
      new_surface.setColorKey(self.flags & (SDL::SRCCOLORKEY|SDL::RLEACCEL),
                              self.colorkey )
      new_surface.setAlpha(self.flags & (SDL::SRCALPHA|SDL::RLEACCEL),
                           self.alpha )
      return new_surface
    end

    def self.new(*args)
      case args.size
      when 4
        create(*args)
      when 8
        createWithFormat(*args)
      else
        raise ArgumentError,"must be SDL::Surface.new(flags,w,h,surface) or SDL::Surface.new(flags,w,h,depth,Rmask,Gmask,Bmask,Amask)"
      end
    end
  end

  def color2int(color,format)
    case color
    when Integer
      return color
    when Array
      return format.mapRGB(*color)
    else
      raise Error,'first argument must be Integer or Array'
    end
  end
  module_function :color2int
    
  module Mouse
    module_function

    def setCursor(bitmap,white,black,transparent,inverted,hot_x=0,hot_y=0)
      if bitmap.w % 8 != 0 then
	raise SDL::Error,"width of cursor must be muliple of 8"
      end

      white=SDL.color2int(white,bitmap.format)
      black=SDL.color2int(black,bitmap.format)
      transparent=SDL.color2int(transparent,bitmap.format)
      inverted=SDL.color2int(inverted,bitmap.format)
      
      data=[]
      mask=[]

      i=-1
      for y in 0..(bitmap.h-1)
	for x in 0..(bitmap.w-1)
	  if x%8 != 0 then
	    data[i] <<= 1
	    mask[i] <<= 1
	  else
	    i+=1
	    data[i]=mask[i]=0
	  end
	  
	  case bitmap.getPixel(x,y)
	  when white
	    mask[i] |= 0x01
	  when black
	    data[i] |= 0x01
	    mask[i] |= 0x01
	  when transparent
	    # do nothing 
	  when inverted
	    data[i] |= 0x01
	  end

	end
      end

      setCursor_imp data.pack('C*'),mask.pack('C*'),bitmap.w,bitmap.h,hot_x,hot_y
    end
    
  end # of module Mouse

  class CD
    def in_drive?
      status > 0
    end
  end
  
  module_function

  if defined?(rotateXYScaled) then
    def rotateScaled(src,dst,x,y,angle,scale)
      rotateXYScaled(src,dst,x,y,angle,scale,scale)
    end
    def rotate(src,dst,x,y,angle)
      rotateXYScaled(src,dst,x,y,angle,1,1)
    end

    def rotateBlit(src,dst,x,y,angle)
      rotateScaledBlit(src,dst,x,y,angle,1)
    end

    def autoLock?
      autoLock
    end
    
    def autoLockON
      self.autoLock = true
    end
    def autoLockOFF
      self.autoLock =false
    end
  end

  if defined?(transform) then
    def transformBlit(src,dst,angle,xscale,yscale,px,py,qx,qy,flags)
      transformed = src.transformSurface( src.colorkey, angle,
					 xscale, yscale, flags )
      transformed.setColorKey( src.flags & (SDL::SRCCOLORKEY|SDL::RLEACCEL),
			      src.colorkey )
      transformed.setAlpha( src.flags & (SDL::SRCALPHA|SDL::RLEACCEL),
			    src.alpha )
      rad = Math::PI*angle/180.0
      x = px - src.w/2.0 ; y = py - src.h/2.0
      x *= xscale ; y *= yscale
      dst_x = x*Math.cos(rad)-y*Math.sin(rad) 
      dst_y = x*Math.sin(rad)+y*Math.cos(rad) 
      dst_x += transformed.w/2
      dst_y += transformed.h/2
      blitSurface( transformed, 0, 0, 0, 0, dst, qx-dst_x, qy-dst_y )
    end      
  end

  Rect = Struct.new( :x, :y, :w, :h )
  
  def convertRect(rect)
    case rect
    when NilClass
      return Rect.new( 0, 0, 0, 0 )
    when Array
      return Rect.new( rect[0], rect[1], rect[2], rect[3] )
    else
      return rect
    end
  end
  
  def blitSurface2(src,srcRect,dst,dstRect)
    srcR = convertRect(srcRect)
    dstR = convertRect(dstRect)
    blitSurface( src, srcR.x, srcR.y, srcR.w, srcR.h , dst, dstR.x, dstR.y )
  end
  
  if defined?(Mixer)
    class << Mixer
      alias open_imp open
      private :open_imp
      def open(frequency=Mixer::DEFAULT_FREQUENCY,format=Mixer::DEFAULT_FORMAT,
	       cannels=Mixer::DEFAULT_CHANNELS,chunksize=4096)
	open_imp(frequency,format,cannels,chunksize)
      end
    end
  end

  if defined?(MPEG)
    class MPEG
      alias info_imp info
      private :info_imp
      def info(*arg)
	case arg.size
	when 0
	  result = SDL::MPEG::Info.new
	  info_imp(result)
	  result
	when 1
	  info_imp(arg[0])
	  arg[0]
	end
      end
    end
  end
  
end

if defined?(GL) then
  class << GL
    alias Begin_imp Begin
    private :Begin_imp
    def Begin(mode)
      if block_given? then
	begin
	  Begin_imp(mode)
	  yield
	ensure
	  End()
	end
      else
	Begin_imp(mode)
      end
    end
  end
end

require 'rubysdl_aliases.rb'
