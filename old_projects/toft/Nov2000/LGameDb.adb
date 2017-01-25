-- Ver 1.2

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- Ada program to generate all winning positions for
-- the LGame. There are 240 such positions, but actually there are much less solutions,
-- since some are obtained by rotating/mirroring the board or swaping the two neutral pieces.

with Ada.Text_IO, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_IO;

procedure LGameDb is

   type PieceID is (empty, A, B, C, D);
   
   type NeutralPiece is
   record
      id: PieceID range A..D;
      x: Integer range 1..4:=1;
      y: Integer range 1..4:=1;
   end record;
   
   type Board is array (1..4, 1..4) of PieceID;
   LPieceData: array (1..3, 1..3, 1..8) of Boolean;
         
   type LPiece is
   record
      id: PieceID range A..D;
      x: Integer range 1..4:=1;
      y: Integer range 1..4:=1;
      dir: Integer range 1..8:=1;
   end record;
   
   GameBoard, BckBoard: Board;
   Lp: array (1..2) of LPiece;
   Np: array (1..2) of NeutralPiece;
   
   counter: Integer;
   ok: boolean;
   nbSolutions: integer:=0;
   myFile: File_Type;
-----------------------------------------------------------------------------------------
   procedure fnew_line(f: file_type; n: Integer:=1) is
   begin
      for i in 1..n loop
         put(f, Character'Val(13));
         put(f, Character'Val(10));
      end loop;
   end;
   procedure Drop(P: NeutralPiece) is
   begin
      if GameBoard(P.x, P.y)=empty then
         GameBoard(P.x, P.y):=P.id;
      else
         ok:=false;
      end if;
   end;
   
   procedure Next(P: in out NeutralPiece) is
   begin
      if P.x=4 then
         P.x:=1;
         if P.y=4 then
            P.y:=1;
            ok:=false;
         else
            P.y:=P.y+1;
         end if;
      else
         P.x:=P.x+1;
      end if;
   end;
   
   procedure Next(P: in out LPiece) is
   begin
      if P.x=4 then
         P.x:=1;
         if P.y=4 then
            P.y:=1;
            if P.dir=8 then
               P.dir:=1;
               ok:=false;
            else
               P.dir:=P.dir+1;
            end if;
         else
            P.y:=P.y+1;
         end if;
      else
         P.x:=P.x+1;
      end if;
   end;
   
   procedure Drop(P: LPiece) is
   begin
      Outer:
      for i in 1..3 loop
         for j in 1..3 loop
            if LPieceData(i, j, P.dir) then
               if ((i+P.x-2) in 1..4) and ((j+P.y-2) in 1..4) then
                  if Gameboard(i+P.x-2, j+P.y-2)=empty then
                     Gameboard(i+P.x-2, j+P.y-2):=P.id;
                  else
                     ok:=false;
                     exit Outer;
                  end if;
               else
                     ok:=false;
                     exit Outer;
               end if;            
            end if;
         end loop;
      end loop Outer;
   end;
      
   procedure DrawBoard is
   begin
      for i in 1..4 loop
         for j in 1..4 loop
            if bckBoard(j, i)/=empty then
               put(myFile, PieceID'Image(bckBoard(j,i)));
               put(PieceID'Image(bckBoard(j,i)));
            else
               put(myFile, "-");
               put("-");
            end if;
         end loop;
         new_line;
         fnew_line(myFile);
      end loop;
      new_line(2);
      fnew_line(myFile, 2);
   end;

begin
-----------------------------------------------------------------------------------------
   
   -- Create the LPieceData:
   
   -- Set all cells to false.
   for i in 1..3 loop
      for j in 1..3 loop
         for k in 1..8 loop
            LPieceData(i, j, k):=false;
         end loop;
      end loop;
   end loop;
   
   -- Draw first L.
   LPieceData(1, 1, 1):=true;
   LPieceData(2, 1, 1):=true;
   LPieceData(3, 1, 1):=true;
   LPieceData(3, 2, 1):=true;

   for i in 2..4 loop
      -- Draw three other by rotating by 90 degrees:
      LPieceData(2, 1, i):=LPieceData(3, 2, i-1);
      LPieceData(3, 2, i):=LPieceData(2, 3, i-1);
      LPieceData(2, 3, i):=LPieceData(1, 2, i-1);
      LPieceData(1, 2, i):=LPieceData(2, 1, i-1);
      
      LpieceData(1, 1, i):=LPieceData(3, 1, i-1);
      LPieceData(3, 1, i):=LPieceData(3, 3, i-1);
      LPieceData(3, 3, i):=LPieceData(1, 3, i-1);
      LPieceData(1, 3, i):=LpieceData(1, 1, i-1);
   end loop;
   
   for i in 1..4 loop
      -- Draw the other four by mirroring the first four.
      for j in 1..3 loop
         for k in 1..3 loop
            LPieceData(j, k, i+4):=LPieceData(4-j, k, i);
         end loop;
      end loop;
   end loop;
   
   -- Init the Pieces:
   Np(1).id:=A;
   Np(2).id:=B;
   Lp(1).id:=C;
   Lp(2).id:=D;

   -- Set the counter to zero.
   counter:=0;
   
   -- Create a file.
   Create(myFile, Out_File, "LGamedata.txt"); 
   
   -- Now we are ready to begin the search...
   Outer:
   loop
      -- Empty board.
      for i in 1..4 loop
         for j in 1..4 loop
            GameBoard(i,j):=empty;
         end loop;
      end loop;
      
      -- Set ok to true.
      ok:=true;
      
      -- Place pieces on the board.
      Drop(Np(1));
      
      if ok then
         Drop(Np(2));
      end if;
      
      if ok then
         Drop(Lp(1));
      end if;

      if ok then
         Drop(Lp(2));
      end if;
      
      if ok then
         counter:=counter+1;
         bckBoard:=GameBoard;
      end if;      
      
     
           
      -- Next position.
      ok:=true;
      Next(Lp(2));
     
      if not(ok) and counter=1 then
         nbSolutions:=nbSolutions+1;
         put(myFile, nbSolutions);
         put(nbSolutions);
         new_line;
         fnew_line(myFile);
         DrawBoard;
      end if;
                      
      if not(ok) then
         counter:=0;
         ok:=true;
         Next(Lp(1));
      end if;
      
      if not(ok) then
         ok:=true;
         Next(Np(1));
      end if;
            
      if not(ok) then
         ok:=true;
         Next(Np(2));
      end if;
      
      if not(ok) then
         exit Outer;
      end if;
 
   end loop Outer;
   Close(myFile);
end LGameDb;