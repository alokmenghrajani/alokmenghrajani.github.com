-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- The object is to draw a triangle of stars, using for loops.

with Ada.Text_Io;
use Ada.Text_Io;

procedure StarsA is
   Size: constant Integer :=10;             -- Constant specifying the size of the triangle.
begin
   Put("Hello to the world of stars...");
   New_line(3);
   for i in reverse 1..Size loop            -- In Ada, the range is always in an increasing ordre.
                                            -- that's why to loop from Size to 1, you must write reverse 1..Size
      for j in 1..i loop
         Put("*");
      end loop;
      New_line;
   end loop;
end StarsA;