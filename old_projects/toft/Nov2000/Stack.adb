-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;


procedure Stack is
   StackSize: constant Integer:=10;
   Stack: array(1..StackSize) of Integer;
   SP: Integer range 1..StackSize:=1;
   
   procedure Push(I: Integer) is
   begin
      Stack(SP):=I;
      SP:=SP+1;
   end;
   
   procedure Pop(I: out Integer) is
   begin
      SP:=SP-1;
      I:=Stack(SP);
   end;
   A, B: Integer;
begin
   A:=10;
   B:=15;
   Push(A);
   Push(B);
   Pop(A);
   Pop(B);
   Put("A= ");
   Put(A, 2);
   New_line;
   Put("B= ");
   Put(B, 2);
end Stack;