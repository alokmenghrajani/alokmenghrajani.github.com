-- Ver 1.1

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch


with Ada.Text_Io, Ada.integer_text_io, Ada.Numerics.Elementary_Functions;
use Ada.Text_Io, Ada.integer_text_io, Ada.Numerics.Elementary_Functions;

procedure Factor is
input,powerCounter,max : Integer;
begin
   Put("Enter a number to be factorized: ");
   Get(input);
   New_line;
   max := integer(sqrt(float(input)));  -- The greatest factor is square root of input.
   powerCounter:=0;

   for test in 2 .. max loop                             -- The basic idea is to try to divide input by all numbers between
                                                         -- 1 and sqrt(input).
      while (integer(input/test)*test = input) loop      -- This checks wheter input can be divded by test.
         input := input/test;
         powerCounter:=powerCounter+1;
      end loop;
      
      if (powerCounter > 0) then
         Put(test, 3);
         Put(" ^");
         Put(powerCounter, 2);
         New_line;
         powerCounter:=0;
      end if;
   end loop;
   
   if (input>1) then                                    -- Plus whatever hasn't been factorized.
      Put(input, 3);
      Put_line(" ^ 1");
   end if;
end Factor;