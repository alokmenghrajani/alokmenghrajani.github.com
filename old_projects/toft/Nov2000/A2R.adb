-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Arabic to roman converter

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure A2R is
   Input: Integer range 0..3999;
   type Roman_Digit is (I, V, X, L, C, D, M, T, U);
   Roman: string(1..15);
   p: integer:=1;
   a: Integer;
   e, f, g: string(1..1);
begin
   Put("Enter arabic number: ");
   Get(Input);
   for i in reverse 0..3 loop
      a:=Input/10**i;
      e:=Roman_Digit'Image(Roman_Digit'Val(i*2));
      f:=Roman_Digit'Image(Roman_Digit'Val(i*2+1));
      g:=Roman_Digit'Image(Roman_Digit'Val(i*2+2));
      put(a, 1);
      if a=1 then Roman(p..p):=e; p:=p+1; end if;
      if a=2 then Roman(p..p+1):=e & e; p:=p+2; end if;
      if a=3 then Roman(p..p+2):=e & e & e; p:=p+3; end if;
      if a=4 then Roman(p..p+1):=e & f; p:=p+2; end if;
      if a=5 then Roman(p..p):=f; p:=p+1; end if;
      if a=6 then Roman(p..p+1):=f & e; p:=p+2; end if;
      if a=7 then Roman(p..p+2):=f & e & e; p:=p+3; end if;
      if a=8 then Roman(p..p+3):=f & e & e & e; p:=p+4; end if;
      if a=9 then Roman(p..p+1):=e & g; p:=p+2; end if;

      input:=input-a*10**i;
   end loop;
   put("= ");
   put(Roman(1..p-1));
end A2R;