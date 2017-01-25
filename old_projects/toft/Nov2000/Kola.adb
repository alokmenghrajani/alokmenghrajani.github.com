-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- A program that will invert the entry... Eg if you
-- enter ALOK, it'll give you KOLA.

-- Did you know that NEVER ODD OR EVEN gives the same. It's called a
-- palindrome !
-- (There is a nice one in french too: Elu par cette crapule)

with Ada.Text_Io;
use Ada.Text_Io;

procedure Kola is
   s: String(1..80);
   n: Natural;
begin
   Get_line(s, n);
   New_line;
   declare
      t: String(1..n);
   begin
      for i in 1..n loop
         t(i..i):=s(n-i+1..n-i+1);
      end loop;
      Put(t);
   end;
end Kola;