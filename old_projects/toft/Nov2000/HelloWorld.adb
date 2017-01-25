-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Every programmers starts learning programming by writting a little
-- program that displays "Hello World !"... So here is the
-- ada version of hello world.

with Ada.Text_Io;
use Ada.Text_Io;

procedure HelloWorld is

begin
   Put_line("Hello World !");   -- You don't need to specify
                                -- Ada.Text_Io.put_line...
                                -- Because you have typed "use Ada.Text_Io;" above.
end HelloWorld;