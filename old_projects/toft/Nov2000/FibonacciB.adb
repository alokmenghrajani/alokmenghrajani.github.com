-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Fibonacci Serie Generator
-- Recursive algorithm


with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure FibonacciB is
   N: constant Integer:=10;
   
   procedure Next(First, Second, I: Integer) is
   begin
      Put(I, 4);
      Put(": ");
      Put(First+Second, 4);
      New_line;
      if I<N then
         Next(Second, First+Second, I+1);
      end if;
   end Next;
begin
   Put_line("   0:    0");
   Put_line("   1:    1");
   Next(0, 1, 2);
end FibonacciB;