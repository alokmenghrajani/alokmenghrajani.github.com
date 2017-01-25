-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch
--
-- The object is to write a program that will find a solution
-- for the following problem:
--
-- How can you place eight queens on a chess board in such a way
-- that no queen can "kill" any other. In other words, you must
-- place eight pieces on a 8x8 board, in such a way that no
-- piece is horizontaly, vertically or diagonally connected to any other.
--
-- One of the 92 solutions:
--
--     + - + Q + - + -
--     - Q - + - + - +
--     + - + - + - Q -
--     - + Q + - + - + 
--     + - + - + Q + -
--     - + - + - + - Q
--     + - + - Q - + -
--     Q + - + - + - +

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure EightQueens is
   pieces: array (1..8) of Integer range 1..8;
-- We won't work on a board, but on a simple uni-dimensional array,
-- because we know that there must be one and only one queen per column.
   nbSolutions: Integer:=0;
   ok: boolean;
   
   procedure increment(n: Integer) is
   begin
      if pieces(n)=8 then
         pieces(n):=1;
         if n<8 then
            increment(n+1);
         else
            ok:=false;
         end if;
      else
         pieces(n):=pieces(n)+1;
      end if;
      
   end increment;

begin
   -- Set all queens of first row:
   for i in 1..8 loop
      pieces(i):=1;
   end loop;
   
   -- Now loop until all possibilites are done:
   loop
      -- Test horizontally:
      -- Two queens cannot have the same value for pieces:
      ok:=true;
      Test1:
      for i in 1..7 loop
         for j in (i+1)..8 loop
            if pieces(i)=pieces(j) then
               ok:=false;
               exit Test1;
            end if;
         end loop;
      end loop Test1;
      
      if ok then
         -- Two queens are on same diagonal if i-j=pieces(i)-pieces(j) or
         -- if i-j=-pieces(i)+pieces(j)...
         Test2:
         for i in 1..7 loop
            for j in (i+1)..8 loop
               if (j-i)=abs(pieces(i)-pieces(j)) then
                  ok:=false;
                  exit Test2;
              end if;
            end loop;
         end loop Test2;
      end if;
   
      if ok then
         -- Hurray we have a solution...
         nbSolutions:=nbSolutions+1;
         Put(nbSolutions);
         New_line;
         for i in 1..8 loop
            for j in 1..(pieces(i)-1) loop
               if (i+j) mod 2=0 then
                  put("- ");
               else
                  put("+ ");
               end if;
            end loop;
               put("Q ");
            for j in (pieces(i)+1)..8 loop
               if (i+j) mod 2=0 then
                  put("- ");
               else
                  put("+ ");
               end if;
            end loop;
            New_line;
         end loop;
         New_line(2);
      end if;
      
      -- Now increment the pieces position... Use recursive call:
      ok:=true;
      increment(1);
      exit when not(ok);
   end loop;
end EightQueens;