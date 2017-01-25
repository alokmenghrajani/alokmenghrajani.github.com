-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Egyptians did not represent fractions as we do. They
-- represented them as sums of 1/n. So instead of 2/3 they
-- used the sum 1/2 + 1/6.

-- This ada program converts conventional fractions to egyptian fractions.

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure Egypt is
   n, d, t: integer;
   a, b, c: integer;
begin
   Put("Enter numerator: ");
   Get(n);
   Put("Enter denominator: ");
   Get(d);
   New_line(3);
   
   Put(n,1);
   Put("/");
   Put(d,1);
   Put(" = ");
   
   t:=2;
   while n>1 and n<d loop
      if t*n>d then
         n:=t*n-d;
         d:=d*t;
         
         -- pgcd
         a:=d;
         b:=n;
         while a mod b/=0 loop
            c:=a;
            a:=b;
            b:=c mod b;
         end loop;
         
         n:=n/b;
         d:=d/b;
         put("1/");
         put(t, 1);
         put(" + ");
      end if;
      t:=t+1;
   end loop;
   put(n, 1);
   put("/");
   put(d, 1);
end Egypt;