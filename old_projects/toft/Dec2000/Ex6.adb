-- Ver 1.2

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

with Ada.Text_Io, Ada.Integer_Text_Io, Ada.Strings.Fixed;
use Ada.Text_Io, Ada.Integer_Text_Io, Ada.Strings.Fixed;

procedure Ex6 is
   subtype HeightRange is Positive range 3..40;
   Height: HeightRange;
   Tile: Character;
   Col: constant Positive:=80;
   
   procedure Put_Centered(S: String) is
      N: Natural;
   begin
      N:=(Col-S'Length)/2;
      Put(N * " ");
      Put(S);
      New_line;
   end;
   
begin
      loop
      begin
         Put("Height (");
         Put(HeightRange'First, 1);
         Put("-");
         Put(HeightRange'Last, 1);
         Put(") = ");

         Get(Height);
         New_line;
         Put("Tile = ");
         Get(Tile);
         New_line(2);
         exit;
      exception
         when others =>
            Skip_line;
            Put_line("Error !");
      end;
   end loop;

   for I in 1..Height loop
      Put_Centered((2*I-1) * Tile);
   end loop;
   
   for I in 1..4 loop
      Put_Centered(Tile & "");
   end loop;
   New_line;
   Put_Centered("Merry Christmas & A Happy New Year !");
end Ex6;