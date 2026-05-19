// ===== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 10
// Copyright 2002-2003 by Tor Olav Kristensen, except for the textures
// Email: t o r _ o l a v _ k [ a t ] h o t m a i l . c o m
// http://home.no/t-o-k
// ===== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 10

#version 3.5;

#include "colors.inc"
#include "functions.inc" // For f_r() and f_sphere()
#include "rad_def.inc"

global_settings { radiosity { Rad_Settings(Radiosity_OutdoorHQ, on, off) } }

// ===== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 10
// Modified versions of a texture once made by Gilles Tran

#declare GillesTexMod1 =
  texture {
    pigment {
      bozo
      color_map {
        [ 0 color White*0.7 ]
        [ 1 color White*1.1 ]
      }
    }
    normal {
      agate 0.3
      scale <1.6, 1.6, 1.6>
    }
    finish {
      ambient color Black
      diffuse 0.8
      specular 0.1
      roughness 0.1
      metallic
      brilliance 1
    }
    scale <0.4, 0.4, 0.4>
  }

#declare GillesTexMod2 =
  texture {
    pigment {
      crackle solid
      color_map {
        [ 0 color White*0.5 ]
        [ 1 color White*0.9 ]
      }
    }
    normal {
      granite 0.9
      scale <3, 3, 3>
    }
    finish {
      ambient color Black
      diffuse 0.8
      specular 0.1
      roughness 0.1
      metallic
      brilliance 1
    }
    scale <0.4, 0.4, 0.4>
  }

// ===== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 10

#macro SphereSpiralsFunction(Rmaj, Rmin, TwistFn, NrOfBands, GapRatio)

  #local TwoPi = 2*pi;
  #local FourPi = 2*TwoPi;
  #local DivAngle = TwoPi/NrOfBands;
  #local GapAngle = DivAngle*GapRatio;
  #local HalfGapAngle = GapAngle/2;
  #local AdjFn = function(A) { A + select(A, FourPi, TwoPi) }
  #local TempFn =
    function(x, y, z, Theta, ModAngle, RR) {
      select(
        ModAngle - GapAngle,
        select(
          ModAngle - HalfGapAngle,
          f_sphere(
            x - RR*f_r(x, 0, z)*cos(Theta - ModAngle),
            y - RR*y,
            z - RR*f_r(x, 0, z)*sin(Theta - ModAngle),
            Rmin
          ),
          f_sphere(
            x - RR*f_r(x, 0, z)*cos(Theta - ModAngle + GapAngle),
            y - RR*y,
            z - RR*f_r(x, 0, z)*sin(Theta - ModAngle + GapAngle),
            Rmin
          )
        ),
        abs(f_sphere(x, y, z, Rmaj)) - Rmin
      )
    }

  function {
    TempFn(
      x, y, z,
      atan2(z, x),
      mod(AdjFn(atan2(z, x) - TwistFn(x, y, z)), DivAngle),
      Rmaj/(Nothing + f_r(x, y, z))
    )
  }

#end // macro SphereSpiralsFunction

// ===== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 10

#declare Nothing = 1E-10;
#declare NegOne = Nothing - 1;
#declare PosOne = 1 - Nothing;

#declare ClampFn = function(N, Min, Max) { max(Min, min(N, Max)) }

#declare Rmajor = 3.0;
#declare Rminor = 0.1;
#declare NrOfBands = 4;
#declare GapSize = 0.5;
#declare K = 1.8; // Controls the "Twisting rate"

#declare LogFn = function(A) { ln(2/(1 - A) - 1)/K }

#declare yFn = function { LogFn(ClampFn(y/(Nothing + f_r(x, y, z)), NegOne, PosOne)) }


isosurface {
  SphereSpiralsFunction(Rmajor, Rminor, yFn, NrOfBands, GapSize) 
  max_gradient 2
  contained_by { sphere { <0, 0, 0>, Rmajor + Rminor } }
  rotate 180*x
  rotate 32*y
  texture { GillesTexMod1 }
}
 
plane {
  y, -(Rmajor + Rminor + 2.5)
  texture { GillesTexMod2 }
}

// ===== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 10

sky_sphere {
  pigment {
    gradient y
    color_map {
      [ 0 White ]
      [ 1 rgb <0.25, 0.46, 0.80>*0.9 ]
    }
  }
}

light_source {
  <34, 29, -16>*4
  color rgb <0.76, 0.62, 0.34>
  area_light
  2*x, 2*z,
  4, 4
  circular
  orient
  adaptive 1
  jitter
}

camera {
  location <0, 21.7, -10.5>
  look_at <-2.5, 0.0, 0>
  angle 34
}

// ===== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 10
