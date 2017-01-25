-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Given a knight and a chess board, move the knight 63 times
-- around the board without going twice on the same square.

-- WARNING: The program might take a few minutes to find the solution...
--          Ada compiler isn't really fast :(

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure Knight is
   type Point is
   record
      x: Integer;
      y: Integer;
   end record;
   
   Dir: array (1..8) of Point;
   Board: array (1..8, 1..8) of Integer range 0..64;
   Moves: array (2..64) of Integer range 1..8;
   Knight: Point;
   c: Integer;
   
   procedure Next is
   begin
      if Moves(c)=8 then
         Moves(c):=1;
         c:=c-1;
         Board(Knight.x, Knight.y):=0;
         Knight.x:=Knight.x-Dir(Moves(c)).x;
         Knight.y:=Knight.y-Dir(Moves(c)).y;
         if c>1 then
            Next;
         end if;
      else
         Moves(c):=Moves(c)+1;
      end if;
   end;
begin
   -- Create list of directions:
   c:=1;
   for i in -2..2 loop
      for j in -2..2 loop
         if abs(i)/=abs(j) and i/=0 and j/=0 then
            Dir(c).x:=i;
            Dir(c).y:=j;         
            c:=c+1;
         end if;
      end loop;
   end loop;
   
   -- Init move list:
   for i in 2..64 loop
      Moves(i):=1;
   end loop;
   
   -- Init board:
   for i in 1..8 loop
      for j in 1..8 loop
         Board(i, j):=0;
      end loop;
   end loop;
   
   c:=2;
   Knight.x:=1;
   Knight.y:=1;
   Board(Knight.x, Knight.y):=1;
   loop
      -- Try to make move c:
      if (Knight.x+Dir(Moves(c)).x in 1..8 and Knight.y+Dir(Moves(c)).y in 1..8) and then Board(Knight.x+Dir(Moves(c)).x, Knight.y+Dir(Moves(c)).y)=0 then
         Knight.x:=Knight.x+Dir(Moves(c)).x;
         Knight.y:=Knight.y+Dir(Moves(c)).y;
         Board(Knight.x, Knight.y):=c;
         c:=c+1;
      else
         Next;
      end if;
      exit when c=1 or c=65;
   end loop;
   
   -- Draw board.
   for i in 1..8 loop
      for j in 1..8 loop
         Put(Board(i,j), 3);
      end loop;
      New_line(2);
   end loop;
   
end Knight;