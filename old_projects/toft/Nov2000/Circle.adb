-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- This program is a bit like exercice 2 and 4, except that it's
-- more complex because it draws a circle...

with Ada.Text_Io, Ada.integer_text_io, Ada.Numerics.Elementary_Functions;
use Ada.Text_Io, Ada.integer_text_io, Ada.Numerics.Elementary_Functions;

procedure Circle is
   Size: constant Integer:=9;
   Car: constant character:='*';
   L, S: Integer;

   function Rep(N: Integer; C: Character) return string is
      S: String(1..N);
   begin
      for i in 1..N loop
         S(i..i):=C & "";
      end loop;
      return S;
   end;
begin
   for i in 0..2*Size loop
      L:=Integer(Sin(Arccos(Float(Size-i)/Float(size)))*Float(Size));
      S:=(Size-L);
      Put(Rep(S, ' '));
      Put(Rep(L, Car));
      Put(Rep(L, Car));
      Put(Rep(S, ' '));
      New_line;
   end loop;
end Circle;