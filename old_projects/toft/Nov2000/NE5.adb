-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Probleme:
-- On ecrit les soixante premiers entiers a la queue leu leu:
-- 123456789101112...585960
-- Barrer cent chiffres ecrits, de facon que le nombre forme des chiffres
-- restants soit le plus grand possible.

-- Reponse: 99'999'785'960

with Ada.Text_Io;
use Ada.Text_Io;


procedure NE5 is
   s: string(1..111);
   t: string(1..3);
   p, c: integer;
begin
   
   -- Create string.
   for i in 1..9 loop
      t(1..2):=Integer'Image(i);
      s(i..i):=t(2..2);
   end loop;
   
   for i in 10..60 loop
      t(1..3):=Integer'Image(i);
      s((2*i-10)..(2*i-9)):=t(2..3);
   end loop;
   
   -- trim N if N+1 is greater.
   p:=1;
   c:=0;
   loop
      if s(p..p)<s(p+1..p+1) then
         s(p..s'length-1-c):=s(p+1..s'length-c);
         c:=c+1;
         if p>1 then p:=p-1; end if;   
         exit when c=100;
      else
         p:=p+1;
      end if;
   end loop;   
   Put(s(1..s'length-c));
end NE5;