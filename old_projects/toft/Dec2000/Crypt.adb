-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- This is a simple illustration of cryptography with a key.
-- One important point in key based cryptography is that
-- If a hacker has a normal and crypted text, he should not be
-- Able to determine the key used.

-- This program creates a table using the key. Suppose the key
-- Entered is "JORNOD" here is what it does to create the table...
-- First delete all duplicate letters => JORND
-- This is the row line of the table.
-- Now start filling the table from top to bottom with all unused
-- Letters, the second row is:
-- ABCEF
-- Go on until all letters have been used, if the last row
-- Is incomplete, fill it up with the first row.

-- Here is the complete table for the Key "JORNOD"
-- JORND
-- ABCEF
-- GHIKL
-- MPQST
-- UVWXY
-- ZORND

-- Once you have the table, to crypt a character just
-- Get the one underneath it in the table, and to
-- Decrypt, get the one above...

-- Notice that Z crypts to J, wheras O crpyts to B and not O. So
-- You must crypt by searching the table from top to bottom and
-- Decrypt by searching the table from bottom to top...

with Ada.Text_Io;
use Ada.Text_Io;

procedure Crypt is
   Key: String(1..80);
   LMsg, LKey: Positive;
   Msg: String(1..80);
   Crypt: String(1..80);
   Table: String(1..26);
   LTable: Natural:=0;
   Count: Integer;
   
   Height: Integer;
   
   procedure Insert (C: Character) is
   -- Inserts C in Table if it's not already there.
      Ok: Boolean:=true;
   begin
      For I in 1..LTable loop
         if Table(I)=C then
            Ok:=False;
            exit;
         end if;
      end loop;
      if Ok then
         LTable:=LTable+1;
         Table(LTable):=C;
      end if;
   end;
 
begin
   Put("Enter Key: ");
   Get_Line(Key, LKey);
   New_Line;
   Put("Enter Message: ");
   Get_Line(Msg, LMsg);
   New_Line(3);
   -- Remove all non alphabetique characters from key
   Count:=1;
   for I in 1..LKey loop
      if Key(I) in 'a'..'z' then
         Key(I):=Character'Val(Character'Pos(Key(I))-32);
      elsif Character'Pos(Key(I))<65 or Character'Pos(Key(I))>90 then
         Key(Count+1..I):=Key(Count..I-1);
         Count:=Count+1;
      end if;
   end loop;
   Key(1..LKey-Count+1):=Key(Count..LKey);
   LKey:=Lkey-Count+1;
   
   -- Convert message to upper case
   for I in 1..LMsg loop
      if Msg(I) in 'a'..'z' then
         Msg(I):=Character'Val(Character'Pos(Msg(I))-32);
      end if;
   end loop;
   
   -- Create table
   for I in 1..LKey loop
      Insert(Key(I));
      Count:=LTable;
   end loop;
   
   for I in 1..26 loop
      Insert(Character'Val(I+64));
   end loop;
   
   -- Create 2D table
   Height:=Integer(26/Count);
   if 26 mod Count /= 0 then
      Height:=Height+1;
   end if;

   declare
      Disp: array (0..Count-1, 0..Height-1) of Character;
   begin
      for I in 0..Count-1 loop
         for J in 0..Height-1 loop
            if J*Count+I<26 then
               Disp(I, J):=Table(J*Count+I+1);
            else
               Disp(I, J):=Table(I+1);
            end if;
         end loop;
      end loop;

   -- Display the 2D table
      Put("Table: ");
      New_Line(2);
      for I in 0..Height-1 loop
         for J in 0..Count-1 loop
            Put(Disp(J, I));
         end loop;
         New_Line;
      end loop;
      New_Line(3);
            
   -- Encode the message
      for I in 1..LMsg loop
         if Character'Pos(Msg(I)) in 65..90 then
            Outer:
            for S in 0..Count-1 loop
               for T in 0..Height-1 loop
                  if Disp(S, T)=Msg(I) then
                     Crypt(I):=Disp(S, (T+1) mod Height);
                     exit Outer;
                  end if;
               end loop;
            end loop Outer;
         else
            Crypt(I):=Msg(I);
         end if;
      end loop;

   -- Display crpyted message
      Put("Crypted Message: ");
      New_Line(2);
      Put_Line(Crypt(1..LMsg));
   end;   
end Crypt;
