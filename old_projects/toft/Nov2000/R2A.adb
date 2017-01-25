-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Roman to arabic converter

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure R2A is
   Roman_Digit: string(1..8):="IVXLCDMT";
   Values: array(1..8) of Integer:=(1, 5, 10, 50, 100, 500, 1000, 0);
   Roman: string(1..16);
   
   output, e, f: integer:=0;
   n: natural;
begin
   Put("Enter roman string: ");
   Get_line(Roman, n);
   for i in 1..n loop
      for j in 1..8 loop
         if Roman_Digit(j..j)=Roman(i..i) then
            e:=Values(j);
            output:=output+e;
            if e>f then
               output:=output-2*f;
            end if;
            f:=e;
         end if;
      end loop;
   end loop;
   put("= ");
   put(output, 2);
end R2A;