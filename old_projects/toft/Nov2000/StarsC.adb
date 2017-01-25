-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- The object is to draw a triangle of stars, using a function.
-- This code has got a nice tick...

with Ada.Text_Io;
use Ada.Text_Io;

procedure StarsC is
   Size: constant Integer :=10;             -- Constant specifying the size of the triangle.
   Car: constant Character :='*';           -- Constant specifying the character to plot.

   function Rep(N: Integer; C: Character) return string is
      S: String(1..N);
   begin
      for i in 1..N loop
         S(i..i):=C & "";           -- To convert character to string, use an empty concatenation !
      end loop;
      return S;
   end;
begin
   Put("Hello to the world of stars...");
   New_line(3);
   for i in reverse 1..Size loop
      Put_line(Rep(i, Car));   
   end loop;
end StarsC;