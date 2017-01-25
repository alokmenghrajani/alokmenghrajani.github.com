-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch


with Ada.Text_Io;

procedure SolitaireSolver is

type Soli is (m, b, t);            -- Mur / Billes / Trou
type Dir is (none, up, down, left, right);            -- Haut, bas, gauche, droite, aucun
type Move is
record
   X: Integer:=1;
   Y: Integer:=1;
   D: Dir:=none;
end record;
NbBilles: constant Integer:=32;
TailleX: constant Integer:=7;
TailleY: constant Integer:=7;

Stack: array(1..(NbBilles-1)) of Move;
i, rx, ry, SP: Integer:=1;
GetKey: Character;
Current: Move;
Avail: Boolean;

Board, Cop: array(1..TailleX, 1..TailleY) of Soli := ((m, m, b, b, b, m, m),
                                     (m, m, b, b, b, m, m),
                                     (b, b, b, b, b, b, b),
                                     (b, b, b, t, b, b, b),
                                     (b, b, b, b, b, b, b),
                                     (m, m, b, b, b, m, m),
                                     (m, m, b, b, b, m, m));

begin
Ada.Text_IO.put_line("ALOK MENGHRAJANI");



Outer:
while SP<nbBilles loop
   Current.X:=1;
   Current.Y:=1;
   Current.D:=up;
 
   
   Inner:
   loop
--   Ada.Integer_Text_Io.put(Current.X);
--   Ada.Text_Io.new_Line;
--   
--   Ada.Integer_Text_Io.put(Current.Y);
--   Ada.Text_Io.new_Line;
--   
--   Ada.Integer_Text_Io.put(Dir'Pos(Current.D));
--   Ada.Text_Io.new_Line;
   
      -- Check move
      if board(Current.X, Current.Y)=b then
         if (Current.D=up and Current.Y>2) and then (board(Current.X, Current.Y-1)=b and board(Current.X, Current.Y-2)=t) then
            -- Make Move
            Stack(SP).X:=Current.X;
            Stack(SP).Y:=Current.Y;
            Stack(SP).D:=Current.D;
            SP:=SP+1;
            board(Current.X, Current.Y):=t;
            board(Current.X, Current.Y-1):=t;
            board(Current.X, Current.Y-2):=b;

            exit Inner;
         end if;
         if (Current.D=down and Current.Y<(TailleY-1)) and then (board(Current.X, Current.Y+1)=b and board(Current.X, Current.Y+2)=t) then
            -- Make Move
            Stack(SP).X:=Current.X;
            Stack(SP).Y:=Current.Y;
            Stack(SP).D:=Current.D;
            SP:=SP+1;
            board(Current.X, Current.Y):=t;
            board(Current.X, Current.Y+1):=t;
            board(Current.X, Current.Y+2):=b;
  
             exit Inner;
         end if;
         if (Current.D=left and Current.X>2) and then (board(Current.X-1, Current.Y)=b and board(Current.X-2, Current.Y)=t) then
            -- Make Move
            Stack(SP).X:=Current.X;
            Stack(SP).Y:=Current.Y;
            Stack(SP).D:=Current.D;
            SP:=SP+1;
            board(Current.X, Current.Y):=t;
            board(Current.X-1, Current.Y):=t;
            board(Current.X-2, Current.Y):=b;
  
            exit Inner;
         end if;
         if (Current.D=right and Current.X<(TailleX-1)) and then (board(Current.X+1, Current.Y)=b and board(Current.X+2, Current.Y)=t) then
            -- Make Move
            Stack(SP).X:=Current.X;
            Stack(SP).Y:=Current.Y;
            Stack(SP).D:=Current.D;
            SP:=SP+1;
            board(Current.X, Current.Y):=t;
            board(Current.X+1, Current.Y):=t;
            board(Current.X+2, Current.Y):=b;
   
            exit Inner;
         end if;
      else
         Current.D:=right;   -- Empty space.         
      end if;


      -- Next Move      
      Looper:
      loop 
      If Current.D=right then
         Current.D:=up;
         If Current.X=TailleX then
            Current.X:=1;
            if Current.Y=TailleY then
            -- Back one move
                   SP:=SP-1;
                  board(Stack(SP).X, Stack(SP).Y):=b;
                  if Stack(SP).D=up then
                     board(Stack(SP).X, Stack(SP).Y-1):=b;
                     board(Stack(SP).X, Stack(SP).Y-2):=t;
                  end if;
                  if Stack(SP).D=down then
                     board(Stack(SP).X, Stack(SP).Y+1):=b;
                     board(Stack(SP).X, Stack(SP).Y+2):=t;
                  end if;
                  if Stack(SP).D=left then
                     board(Stack(SP).X-1, Stack(SP).Y):=b;
                     board(Stack(SP).X-2, Stack(SP).Y):=t;
                  end if;
                  if Stack(SP).D=right then
                     board(Stack(SP).X+1, Stack(SP).Y):=b;
                     board(Stack(SP).X+2, Stack(SP).Y):=t;
                  end if;
                 Current.X:=Stack(SP).X;
                 Current.Y:=Stack(SP).Y;
                 Current.D:=Stack(SP).D;
               
            else
               Current.Y:=Current.Y+1;
               exit Looper;
            end if;
         else
            Current.X:=Current.X+1;
            exit Looper;
         end if;
      else
         Current.D:=Dir'Succ(Current.D);
         exit Looper;
      end if;
      end loop Looper;
      
   end loop Inner;
end loop Outer;


i:=1;
loop
   Ada.Text_Io.new_line(40);
   for x in 1..TailleX loop
      for y in 1..TailleY loop
         if Cop(y,x)=b then
            if Stack(i).x=y and Stack(i).y=x then
               Ada.Text_IO.put("X");
            elsif rx=y and ry=x then
               Ada.Text_IO.put("%");
            else
               Ada.Text_Io.put("O");
            end if;
         end if;
         if Cop(y,x)=t then
             Ada.Text_Io.put("-");
         end if;
         if cop(y,x)=m then
            Ada.Text_Io.put(" ");
         end if;
      end loop;
      Ada.Text_Io.new_line;
   end loop;

   -- WAIT FOR KEY
   Avail:=false;
   While Avail=false loop
      Ada.Text_IO.get_immediate(GetKey, Avail);
   end loop;
   
   if i=Sp then
      exit;
   end if;
   
   cop(Stack(i).X, Stack(i).Y):=t;
   if Stack(i).D=up then
      cop(Stack(i).X, Stack(i).Y-1):=t;
      cop(Stack(i).X, Stack(i).Y-2):=b;
      rx:=Stack(i).X;
      ry:=Stack(i).Y-2;
   end if;
   if Stack(i).D=down then
      cop(Stack(i).X, Stack(i).Y+1):=t;
      cop(Stack(i).X, Stack(i).Y+2):=b;
      rx:=Stack(i).X;
      ry:=Stack(i).Y+2;
   end if;
   if Stack(i).D=left then
      cop(Stack(i).X-1, Stack(i).Y):=t;
      cop(Stack(i).X-2, Stack(i).Y):=b;
      rx:=Stack(i).X-2;
      ry:=Stack(i).Y;
   end if;
   if Stack(i).D=right then
      cop(Stack(i).X+1, Stack(i).Y):=t;
      cop(Stack(i).X+2, Stack(i).Y):=b;
      rx:=Stack(i).X+2;
      ry:=Stack(i).Y;
   end if;
   i:=i+1;
end loop;


end SolitaireSolver;
