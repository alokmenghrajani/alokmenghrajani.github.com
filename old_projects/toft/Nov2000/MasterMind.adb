-- Ver 1.2

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch
--
-- Hi Class mates !
-- My name is alok and I have already got a pretty good programming knwoledge.
-- Here is a little game I designed for you, so that you can have a look at
-- an Ada code programmed by a student. This code is far from perfect, and I still
-- need to do some work on it.
--
-- If you have any questions, please feel free to get in touch with me.
-- Good Luck !


-- SOON TO COME FEATURES:

-- Color interface.
-- Modify the keyboard input methode.
-- Enhanced use of screen.
-- Hint option. (-> using the algorithm I wrote to years ago)




with Ada.Text_Io;
with Ada.integer_text_io;
with Ada.Numerics.Float_Random;
use Ada.Numerics.Float_Random;

procedure MasterMind is

Level : constant Integer := 4;                     -- The number of entries you make at a time
NbColors : constant Integer := 6;                  -- The number of colors used
Duplicates : constant Boolean := true;            -- If true then code made up of same colors will be allowed
NbGuess : constant Integer := 10;                  -- The number of chances allowed.

type color is (none, A, B, C, D, E, F, G, H, I, J);

Code, Bckp: array (Integer range 1 .. Level) of color;         -- The code is saved here. A backup array is needed so that if you play AABC and the code is DEAE, you don't get two miss placed, but only one.
Play : array (Integer range 1 .. Level, Integer range 1 .. NbGuess) of color;   -- The display grid. Actually I needn't save the play list, but this way you get to play from bottom to top.
Result : array  (Integer range 1 .. 2, Integer range 1 .. NbGuess) of integer;   -- The result grid.

Gene : Generator;                                     -- Random Number generator.
uniqueOK : Boolean;                                 -- Used in a loop below to generate unique digits in code.
Counter : Integer := 1;                           -- Move counter.

Input,RightPlaced,MissPlaced : Integer;

 procedure Display (A: in Integer:=0) is
 -- This is a display procedure. It has got an input parameter called A, which can influence the
 -- output in two ways.
 -- If A has a zero value, then the code will be hidden.
 -- If A has a non-zero value, then the code will be shown. This way if you don't get
 -- to guess the code in the number of tries you have, the computer will show it to you.
   begin
   Ada.text_io.new_line(40);
   Ada.Text_IO.New_line(5);
   Ada.Text_IO.Put_line("Alok Menghrajani");
   Ada.Text_IO.New_line;
   Ada.Text_IO.Put_line("Welcome to the world of MasterMind");
   Ada.Text_IO.New_line;
   Ada.Text_IO.New_line;
      
     for i in 1..Level loop
      if (A=0) then
         Ada.Text_IO.Put(" *");
      else
         Ada.Integer_Text_IO.Put(color'Pos(Code(i)),2);      -- The ",2" will force the diplay to take only 2 spaces.
      end if;
   end loop;
   Ada.Text_Io.new_line;
   
   for i in reverse 1..NbGuess loop                  -- Notice the construction of an reverse loop, so that you play from bottom to top, like in the real mastermind.
      for j in 1..Level loop
         if (Play(j,i)=none) then
            Ada.Text_io.Put(" -");
         else          
            Ada.Integer_Text_IO.Put(color'pos(Play(j,i)),2); -- Right now I convert color to integer for display, but later I can add colored squares.

         end if;
      end loop;
      
      if (Result(1,i)=-1) then
          Ada.Text_IO.put(" ? ?");
      else
          Ada.Integer_Text_IO.put(Result(1,i),2);
            Ada.Integer_Text_IO.put(Result(2,i),2);
      end if;
      Ada.Text_Io.new_line;
   end loop;    
    Ada.Text_Io.new_line;
   Ada.Text_Io.put("Enter your guess:");
 Ada.Text_Io.new_line(2);
end Display;



begin
   
   reset(Gene);

   -- Init:
   for i in 1..NbGuess loop
      for j in 1..Level loop
         Play(j,i):=none;
         Result(1,i):=-1;
         Result(2,i):=-1;      -- Acctually this line is useless, can you point out why ?
      end loop;
   end loop;

   -- Select random code, each element is different from previous:
   for i in 1..Level loop
      uniqueOK := false;
      While (not(uniqueOK)) loop
         uniqueOK := true;
         Code(i):=color'val(Integer(Random(Gene)*float(NbColors))+1);         -- Convert Integer to Color
         for j in 1 .. i-1 loop
            if (Code(i)=Code(j) and not(Duplicates)) then
               uniqueOK:=false;
            end if;
         end loop;
      end loop;
   end loop;
   
   -- Call display table:
   MainGameLoop:                              -- You should give names to your main loops, so that the code is more readible.
   loop
         Display(0);
   for i in 1..Level loop
      Ada.Integer_Text_Io.Get(Input);
      Play(i, Counter):=color'val(Input+1);      -- Convert Integer to Color.
   end loop;

      -- Calculate:
      
   RightPlaced:=0;
   MissPlaced:=0;
   
   for i in 1..Level loop                        -- Try to understand how I do the input checking...
      Bckp(i):=Code(i);                           -- First I check the right placed...
      if (Play(i, Counter)=Bckp(i)) then
         RightPlaced:=RightPlaced+1;
         Bckp(i):=none;
      end if;
   end loop;
  
   for i in 1..Level loop                        -- ...then the miss placed.
      for j in 1..Level loop
         if (i/=j) then
            if (Play(i, Counter)=Bckp(j)) then
               MissPlaced:=MissPlaced+1;
               Bckp(j):=none;
            end if;
         end if;      
      end loop;
   end loop;
      Result(1,Counter):=RightPlaced;
      Result(2,Counter):=MissPlaced;
      
      Counter:=Counter+1;
      if (Counter>NbGuess) or (RightPlaced=Level) then
         exit MainGameLoop;
      end if;   
   end loop MainGameLoop;

Display(1);

   Ada.Text_IO.new_line(5);   
   Ada.Text_IO.Put_line("http://aloksoft.hypermart.net/");
   
end MasterMind;
