-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure Anagramme is
   s: constant string:="aleb";

   n: constant Integer:=s'length;
   p: constant Integer range 1..n:=s'length;
   permu: array(1..p) of Integer range 1..n;
   ok: boolean:=true;
   myFile: File_Type;
   
   procedure Disp is
      test: string(1..s'length);
      test2: string(1..80);
      nat: natural;
   begin
      -- display:
      for i in 1..p loop
         test(i..i):=s(permu(i)..permu(i));
      end loop;

      -- find it in file:
      open(myFile, in_file, "Output.txt");
         while not(End_of_file(myFile)) loop
            get_line(myFile, test2, nat);
            if test2(1..nat)=test(1..p) then
               put(test);
               new_line;
               exit;
            end if;
         end loop;
      close(myFile);
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
   Put(" without repetition.");
   New_line(2);
   for i in 1..p loop
      permu(i):=1;
   end loop;

   while ok loop
      Check:
      for i in 1..p-1 loop
         for j in i+1..p loop
            if permu(i)=permu(j) then
               ok:=false;
               exit Check;
            end if;
         end loop;
      end loop Check;
      if ok then
         Disp;
      else
         ok:=true;
      end if;
      Next(p);
   end loop;
end Anagramme;