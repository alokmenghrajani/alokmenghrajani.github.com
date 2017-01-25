-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure PermutationR is
   n: constant Integer:=4;
   p: constant Integer range 1..n:=2;
   permu: array(1..p) of Integer range 1..n;
   ok: boolean:=true;
   
   procedure Disp is
   begin
      -- display:
      for i in 1..p loop
         Put(permu(i), 2);
      end loop;
      New_line;
   end;
   
   procedure Next(t: Integer) is
   begin
      if permu(t)<n then
         permu(t):=permu(t)+1;
      else
         if t>1 then
            Next(t-1);
            permu(t):=1;
         else
            ok:=false;
         end if;
      end if;
   end;
begin
   Put("Permutation of ");
   Put(n,1);
   Put(" elements taken ");
   Put(p, 1);
   Put(" by ");
   Put(p, 1);
   Put(" with repetition.");
   New_line(2);
   for i in 1..p loop
      permu(i):=1;
   end loop;

   while ok loop
      Disp;
      Next(p);
   end loop;
end PermutationR;