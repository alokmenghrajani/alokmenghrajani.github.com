class <<SDL  
  alias init init
  alias inited_system initedSystem
end

# rubysdl_video.c
module SDL
  class Screen
    alias update_rect updateRect
    alias flip flip
    alias toggle_fullscreen toggleFullScreen
  end
end

class << SDL
  alias get_video_surface getVideoSurface
  alias blit_surface blitSurface
  alias set_video_mode setVideoMode
  alias check_video_mode checkVideoMode
  alias list_modes listModes
  alias set_gamma setGamma
  alias get_gamma_ramp getGammaRamp
  alias set_gamma_ramp setGammaRamp
  alias video_info videoInfo
end

module SDL
  
  class << Surface
#   alias new new
    alias load_bmp loadBMP
    alias load_bmp_from_io loadBMPFromIO
  end

  class Surface
    alias display_format displayFormat
    alias display_format_alpha displayFormatAlpha
    alias set_color_key setColorKey
    alias fill_rect fillRect
    alias set_clip_rect setClipRect
    alias get_clip_rect getClipRect
    alias set_alpha setAlpha
    alias save_bmp saveBMP
#   alias h h
#   alias w w
#   alias flags flags
    alias set_palette setPalette
    alias set_colors setColors
    alias get_palette getPalette
    alias must_lock? mustLock?
#   alias lock lock
#   alias unlock unlock
    alias map_rgb mapRGB
    alias map_rgba mapRGBA
    alias get_rgb getRGB
    alias get_rgba getRGBA
#   alias bpp bpp
#   alias colorkey colorkey
#   alias alpha alpha
    alias copy_rect copyRect
  end
end

# rubysdl_event.c
class << SDL::Event
# alias new new
  alias app_state appState
end

module SDL
  class <<Event
    alias enable_unicode enableUNICODE
    alias disable_unicode disableUNICODE
    alias enable_unicode? enableUNICODE?
  end
  
  class Event
# alias poll poll
# alias wait wait
# alias type type
    alias key_press? keyPress?
    alias key_sym keySym
    alias key_mod keyMod
# alias gain? gain?
    alias app_state appState
    alias mouse_x mouseX
    alias mouse_y mouseY
    alias mouse_xrel mouseXrel
    alias mouse_yrel mouseYrel
    alias mouse_button mouseButton
    alias mouse_press? mousePress?
# alias info info
  end
end

# rubysdl_event2.c
module SDL
  if defined?(Event2) then
    class << Event2
#     alias poll poll
#     alias wait wait
#     alias new new
#     alias push push
      alias app_state appState
      alias enable_unicode enableUNICODE
      alias disable_unicode disableUNICODE
      alias enable_unicode? enableUNICODE?
    end
  end
end

#rubysdl_mouse.c
#alias state state
#alias warp warp
#alias set_cursor_imp setCursor_imp
#alias show show
#alias hide hide

# rubysdl_sge_video.c
class << SDL
  if method_defined?(:autoLock)
    alias auto_lock autoLock
    alias auto_lock? autoLock?
    alias auto_lock= autoLock=
    alias auto_lock_on autoLockON 
    alias auto_lock_off autoLockOFF
    alias rotate_scaled_blit rotateScaledBlit
    alias rotate_xy_scaled rotateXYScaled
#   alias transform transform
  end
end


module SDL
  class Surface
    # shared with rubysdl_sge_video.c and rubysdl_pixel.c
    alias get_pixel getPixel
    alias put_pixel putPixel
    if method_defined?(:drawLine) then
      #  alias [] []
      #  alias []= []=
      alias draw_line drawLine
      alias draw_rect drawRect
      alias draw_circle drawCircle
      alias draw_filled_circle drawFilledCircle
      alias draw_ellispe drawEllispe # typo
      alias draw_ellipse drawEllipse
      alias draw_filled_ellispe drawFilledEllispe # typo 
      alias draw_filled_ellipse drawFilledEllipse
      alias rotate_scaled_surface rotateScaledSurface
      alias transform_surface transformSurface
      alias make_collision_map makeCollisionMap

      alias draw_aa_line drawAALine
      alias draw_aa_circle drawAACircle
      alias draw_aa_filled_circle drawAAFilledCircle
      alias draw_aa_ellipse drawAAEllipse

      alias draw_line_alpha drawLineAlpha
      alias draw_rect_alpha drawRectAlpha
      alias draw_filled_rect_alpha drawFilledRectAlpha
      alias draw_circle_alpha drawCircleAlpha
      alias draw_filled_circle_alpha drawFilledCircleAlpha
      alias draw_ellipse_alpha drawEllipseAlpha
      alias draw_filled_ellipse_alpha drawFilledEllipseAlpha

      alias draw_aa_line_alpha drawAALineAlpha
      alias draw_aa_circle_alpha drawAACircleAlpha
      alias draw_aa_ellipse_alpha drawAAEllipseAlpha

      alias draw_bezier drawBezier
      alias draw_aa_bezier drawAABezier
      alias draw_bezier_alpha drawBezierAlpha
      alias draw_aa_bezier_alpha drawAABezierAlpha
    end
  end

  if defined?(CollisionMap) then

    class CollisionMap
      alias collision_check collisionCheck
      alias bounding_box_check boundingBoxCheck
    end

    class << CollisionMap
      alias bounding_box_check boundingBoxCheck
    end
    
  end

  if defined?(BMFont) then
    class BMFont
      alias set_color setColor
      alias text_size textSize
    end
  end

  if defined?(Kanji) then
    class Kanji
      alias set_coding_system setCodingSystem
      alias put_tate putTate
    end
  end
end


# rubysdl_time.c
class << SDL
  alias get_ticks getTicks
  alias delay delay
end

module SDL
# rubysdl_cdrom.c
  class << CD
    alias num_drive numDrive
    alias index_name indexName
    alias frames_to_msf framesToMSF
    alias msf_to_frames MSFToFrames
# alias open open
  end

  class CD
# alias status status
# alias play play
    alias play_tracks playTracks
    alias pause pause
# alias resume resume
# alias stop stop
# alias eject eject
    alias num_tracks numTracks
    alias current_track currentTrack
    alias current_frame currentFrame
    alias track_type trackType
    alias track_length trackLength
  end
end

# rubysdl_joystick.c
module SDL
  class << Joystick
#  alias poll poll
#  alias poll= poll=
# alias num num
    alias index_name indexName
# alias open open
# alias open? open?
    alias update_all updateAll
  end

  class Joystick
# alias index index
    alias num_axes numAxes
    alias num_balls numBalls
    alias num_hats numHats
    alias num_buttons numButtons
# alias axis axis
# alias hat hat
# alias button button
# alias ball ball
  end
end

# rubysdl_event_key.c
module SDL
  class << Key
# alias scan scan
# alias press? press?
    alias mod_state modState
    alias enable_key_repeat enableKeyRepeat
    alias disable_key_repeat disableKeyRepeat
    alias get_key_name getKeyName
  end
end

# rubysdl_wm.c
class << SDL::WM
# alias caption caption
  alias set_caption setCaption
# alias icon= icon=
# alias iconify iconify
  alias grab_input grabInput
end

# rubysdl_mixer.c
module SDL
  if defined?(Mixer) then
    class << Mixer
#     alias open open
#     alias spec spec
      alias play_channel playChannel
      alias play_channel_timed playChannelTimed
      alias fade_in_channel fadeInChannel
      alias fade_in_channel_timed fadeInChannelTimed
#     alias play? play?
      alias set_volume setVolume
      alias allocate_channels allocateChannels
#     alias halt halt
#     alias pause pause
#     alias resume resume
#     alias pause? pause?
      alias fade_out fadeOut
      alias play_music playMusic
      alias fade_in_music fadeInMusic
      alias set_volume_music setVolumeMusic
      alias halt_music haltMusic
      alias fade_out_music fadeOutMusic
      alias pause_music pauseMusic
      alias resume_music resumeMusic
      alias rewind_music rewindMusic
      alias pause_music? pauseMusic?
      alias play_music? playMusic?
      alias fading_music fadingMusic
    end

    module Mixer
      class Wave
        class << self
          alias load_from_io loadFromIO
        end
	alias set_volume setVolume
      end
      
      class << Music
        alias load_from_string loadFromString
      end
    end
  end
end

# rubysdl_image.c
module SDL
  class Surface
    if method_defined?(:load)
      alias load_from_io loadFromIO
    end
  end
end

# rubysdl_ttf.c
module SDL
  if defined?(TTF) then
    #alias init init
    #alias open open

    class TTF
#     alias style style
#     alias style= style=
      alias text_size textSize
#     alias faces faces
      alias fixed_width? fixedWidth?
      alias family_name familyName
      alias style_name styleName
      alias line_skip lineSkip
      alias draw_solid_utf8 drawSolidUTF8
      alias draw_blended_utf8 drawBlendedUTF8
      alias draw_shaded_utf8 drawShadedUTF8
      alias render_solid_utf8 renderSolidUTF8
      alias render_blended_utf8 renderBlendedUTF8
      alias render_shaded_utf8 renderShadedUTF8
    end
  end
end

# rubysdl_smpeg.c
module SDL
  if defined?(MPEG) then
    class MPEG
#     alias load load
#     alias new new
#     alias info info
      alias enable_audio enableAudio
      alias enable_video enableVideo
#     alias status status
      alias set_volume setVolume
      alias set_display setDisplay
      alias set_loop setLoop
      alias scale_xy scaleXY
#     alias scale scale
#     alias move move
      alias set_display_region setDisplayRegion
#     alias play play
#     alias pause pause
#     alias stop stop
#     alias rewind rewind
#     alias seek seek
#     alias skip skip
      alias render_frame renderFrame
      alias render_final renderFinal
      alias set_filter setFilter
    end
  end
end

# rubysdl_opengl.c
class <<  SDL
  if method_defined?(:getGLAttr)
    alias get_GL_attr getGLAttr
    alias set_GL_attr setGLAttr
    alias GL_swap_buffers GLSwapBuffers
  end
end

# sdl.rb

module SDL
  class Surface
    if method_defined?(:rotateScaledSurface) then
      alias rotate_scaled_surface rotateScaledSurface
      alias rotate_surface rotateSurface
    end
  end
end

class << SDL
  if method_defined?(:rotateScaled) then
    alias rotate_scaled rotateScaled 
#   alias rotate
    alias rotate_blit rotateBlit
  end

  if method_defined?(:transform) then
    alias transform_blit transformBlit
  end

  alias blit_surface2 blitSurface2
end
