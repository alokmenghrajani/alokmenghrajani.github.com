-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Fibonacci Serie Generator
-- Itirative algorithm


with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure FibonacciA is
   Current, First, Second: Integer;
   N: constant Integer:=10;
begin      
   First:=0;
   Put("   0: ");
   Put(First, 4);
   New_line;
   
   Second:=1;
   Put("   1: ");
   Put(Second, 4);
   New_line;
   for i in 2..N loop
      Current:=First+Second;
      Put(i, 4);
      Put(": ");
      Put(Current, 4);
      New_line;
      First:=Second;
      Second:=Current;
   end loop;
end FibonacciA;