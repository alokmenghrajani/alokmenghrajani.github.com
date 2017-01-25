-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- The object is to find the greatest number from a file and display
-- it's position.
-- In case there are several occurance of the greatest number,
-- it would be nice to display each one of them.

with Ada.Text_Io, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_Io;

procedure Ex3 is
   myFile: File_Type;
   input, maxVal, lastPos: Integer :=0;
begin
   Open(myFile, In_File, "Ex3Data.txt");            -- Opens the file.
   for I in 1..Positive'Last loop                   -- It isn't the nicest way of doing things
                                                    -- but using a for loop saves a veriable declaration.
      if End_Of_File(myFile) then exit; end if;
      Get(myFile, input);
      if input>=maxVal then
         maxVal:=input;
         lastPos:=I;
      end if;
      
   end loop;
         
   Put("The maximum value is: ");
   Ada.Integer_Text_Io.Put(maxVal, 2);
   New_line;
   Close(myFile);
   
   Open(myFile, In_File, "Ex3Data.txt");   
   for I in 1..lastPos loop         -- By saving lastPos, I optimize
      Get(myFile, input);                        -- this second loop.
      if input=maxVal then
         Put("Found at position: ");
         Put(I, 2);
         New_line;
      end if;
   end loop;
   Close(myFile);
end Ex3;