-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;


procedure Swap is
   A, B: Integer;
   T: Integer;
begin
   A:=10;
   B:=20;
   
   Put("A= ");
   Put(A, 2);
   New_line;
   Put("B= ");
   Put(B, 2);
   
   -- A lot of beginner programmers don't realize that a program
   -- is executed step by step. Therefor a lot of people
   -- would write:
   --
   -- A:=B;
   -- B:=A;
   --
   -- But this is W R O N G !
   -- If you do so, both, A & B will equal to 20. Here is the
   -- right way of interchanging the values of A and B:

   New_line(2);
   Put("Swaping...");
   New_line(2);
   
   T:=A;
   A:=B;
   B:=T;
   
   Put("A= ");
   Put(A, 2);
   New_line;
   Put("B= ");
   Put(B, 2);
end Swap;