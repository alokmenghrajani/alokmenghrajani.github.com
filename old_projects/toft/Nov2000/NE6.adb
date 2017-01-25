-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Probleme:
-- Trouver le plus petit nombre se terminant par 6 tel qu'en transferant le 6 terminal a
-- gauche du nombre, sans modifier les autres chiffres, on obtienne son quadruple.
--
-- Solution: 153846

with Ada.Integer_Text_Io, Ada.Numerics.Elementary_Functions;
use Ada.Integer_Text_Io, Ada.Numerics.Elementary_Functions;

procedure NE6 is
   n1, n2, i: Integer:=1;
begin
   loop
         n1:=i*10+6;
         n2:=i+6*10**(Integer(log(float(i), 10.0))+1);
         if n2=n1*4 then
            Put(n1);
            exit;
         end if;
         i:=i+1;
   end loop;
end NE6;