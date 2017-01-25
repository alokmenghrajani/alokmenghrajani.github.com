-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- The object is to draw a triangle of stars, using for loops.

with Ada.Text_Io;
use Ada.Text_Io;

procedure StarsB is
   Size: constant Integer :=10;                  -- Constant specifying the size of the triangle.
   CounterA, CounterB: Integer;
begin
   Put("Hello to the world of stars...");
   New_line(3);
   CounterA:=Size;
   while CounterA>0 loop
      CounterB:=1;
      while CounterB<=CounterA loop
         Put("*");
         CounterB:=CounterB+1;                   -- This counter goes frontwards.
      end loop;
      New_line;
      CounterA:=CounterA-1;                      -- This counter goes backwards.
   end loop;
end StarsB;