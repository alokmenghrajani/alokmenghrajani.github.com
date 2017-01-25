-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure Combinaison is
   n: constant Integer:=4;
   p: constant Integer range 1..n:=2;
   combin: array(1..p) of Integer range 1..n;
   ok: boolean:=true;
   
   procedure Disp is
   begin
      -- display:
      for i in 1..p loop
         Put(combin(i), 2);
      end loop;
      New_line;
   end;
   
   procedure Next(t: Integer) is
   begin
      if combin(t)<n then
         combin(t):=combin(t)+1;
      else
         if t>1 then
            Next(t-1);
            combin(t):=combin(t-1);
            if ok then
               Next(t);
            end if;
         else
            ok:=false;
         end if;
      end if;
   end;
begin
   Put("Combinaison of ");
   Put(n,1);
   Put(" elements taken ");
   Put(p, 1);
   Put(" by ");
   Put(p, 1);
   Put(" without repetition.");
   New_line(2);
   for i in 1..p loop
      combin(i):=i;
   end loop;

   while ok loop
      Disp;
      Next(p);
   end loop;
end Combinaison;