require 'sdl'
require 'opengl'

SDL.init SDL::INIT_VIDEO
SDL.setGLAttr SDL::GL_RED_SIZE,5
SDL.setGLAttr SDL::GL_GREEN_SIZE,5
SDL.setGLAttr SDL::GL_BLUE_SIZE,5
SDL.setGLAttr SDL::GL_DEPTH_SIZE,16
SDL.setGLAttr SDL::GL_DOUBLEBUFFER,1
SDL.setVideoMode 640,400,16,SDL::OPENGL
GL::Viewport( 0, 0, 640, 400 );
GL::MatrixMode( GL::PROJECTION );
GL::LoadIdentity( );

GL::MatrixMode( GL::MODELVIEW );
GL::LoadIdentity( );

GL::Enable(GL::DEPTH_TEST);

GL::DepthFunc(GL::LESS);

GL::ShadeModel(GL::SMOOTH);

event=SDL::Event.new
shadedCube=true

color =
  [[ 1.0,  1.0,  0.0], 
  [ 1.0,  0.0,  0.0],
  [ 0.0,  0.0,  0.0],
  [ 0.0,  1.0,  0.0],
  [ 0.0,  1.0,  1.0],
  [ 1.0,  1.0,  1.0],
  [ 1.0,  0.0,  1.0],
  [ 0.0,  0.0,  1.0]]

cube =
  [[ 0.5,  0.5, -0.5], 
  [ 0.5, -0.5, -0.5],
  [-0.5, -0.5, -0.5],
  [-0.5,  0.5, -0.5],
  [-0.5,  0.5,  0.5],
  [ 0.5,  0.5,  0.5],
  [ 0.5, -0.5,  0.5],
  [-0.5, -0.5,  0.5]]


loop do

  if  event.poll != 0 then
    if event.type==SDL::Event::QUIT then
      break
    end
    if event.type==SDL::Event::KEYDOWN then
      exit
    end
  end

    GL.ClearColor(0.0, 0.0, 0.0, 1.0);
  GL.Clear(GL::COLOR_BUFFER_BIT|GL::DEPTH_BUFFER_BIT);


  GL::Begin(GL::QUADS) 

  if shadedCube then
    GL::Color(color[0]);
    GL::Vertex(cube[0]);
    GL::Color(color[1]);
    GL::Vertex(cube[1]);
    GL::Color(color[2]);
    GL::Vertex(cube[2]);
    GL::Color(color[3]);
    GL::Vertex(cube[3]);
    
    GL::Color(color[3]);
    GL::Vertex(cube[3]);
    GL::Color(color[4]);
    GL::Vertex(cube[4]);
    GL::Color(color[7]);
    GL::Vertex(cube[7]);
    GL::Color(color[2]);
    GL::Vertex(cube[2]);
    
    GL::Color(color[0]);
    GL::Vertex(cube[0]);
    GL::Color(color[5]);
    GL::Vertex(cube[5]);
    GL::Color(color[6]);
    GL::Vertex(cube[6]);
    GL::Color(color[1]);
    GL::Vertex(cube[1]);
    
    GL::Color(color[5]);
    GL::Vertex(cube[5]);
    GL::Color(color[4]);
    GL::Vertex(cube[4]);
    GL::Color(color[7]);
    GL::Vertex(cube[7]);
    GL::Color(color[6]);
    GL::Vertex(cube[6]);
    
    GL::Color(color[5]);
    GL::Vertex(cube[5]);
    GL::Color(color[0]);
    GL::Vertex(cube[0]);
    GL::Color(color[3]);
    GL::Vertex(cube[3]);
    GL::Color(color[4]);
    GL::Vertex(cube[4]);
    
    GL::Color(color[6]);
    GL::Vertex(cube[6]);
    GL::Color(color[1]);
    GL::Vertex(cube[1]);
    GL::Color(color[2]);
    GL::Vertex(cube[2]);
    GL::Color(color[7]);
    GL::Vertex(cube[7]);
    
  else
    GL::Color(1.0, 0.0, 0.0);
    GL::Vertex(cube[0]);
    GL::Vertex(cube[1]);
    GL::Vertex(cube[2]);
    GL::Vertex(cube[3]);
    
    GL::Color(0.0, 1.0, 0.0);
    GL::Vertex(cube[3]);
    GL::Vertex(cube[4]);
    GL::Vertex(cube[7]);
    GL::Vertex(cube[2]);
    
    GL::Color(0.0, 0.0, 1.0);
    GL::Vertex(cube[0]);
    GL::Vertex(cube[5]);
    GL::Vertex(cube[6]);
    GL::Vertex(cube[1]);
    
    GL::Color(0.0, 1.0, 1.0);
    GL::Vertex(cube[5]);
    GL::Vertex(cube[4]);
    GL::Vertex(cube[7]);
    GL::Vertex(cube[6]);
    
    GL::Color(1.0, 1.0, 0.0);
    GL::Vertex(cube[5]);
    GL::Vertex(cube[0]);
    GL::Vertex(cube[3]);
    GL::Vertex(cube[4]);
    
    GL::Color(1.0, 0.0, 1.0);
    GL::Vertex(cube[6]);
    GL::Vertex(cube[1]);
    GL::Vertex(cube[2]);
    GL::Vertex(cube[7]);
    
  end

  GL::End()
  
  GL::MatrixMode(GL::MODELVIEW);
  GL::Rotate(5.0, 1.0, 1.0, 1.0);
  
  SDL.GLSwapBuffers

end
