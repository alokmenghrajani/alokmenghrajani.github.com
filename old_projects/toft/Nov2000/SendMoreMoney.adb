-- Ver 1.0

-- Code written by Alok Menghrajani.
-- http://aloksoft.hypermart.net/
-- alok@aloksoft.hypermart.net
-- alok.menghrajani@epfl.ch

-- A little program to solve the famous equation:

--  SEND  SOLUTION: 9567
-- +MORE           +1085
-- =====           =====
-- MONEY           10652

with Ada.Text_IO, Ada.Integer_Text_Io;
use Ada.Text_Io, Ada.Integer_Text_IO;

procedure SendMoreMoney is
begin
   for S in 1..9 loop
      for E in 0..9 loop
         for N in 0..9 loop
            for D in 0..9 loop
               for M in 1..9 loop
                  for O in 0..9 loop
                     for R in 0..9 loop
                        for Y in 0..9 loop
                           if S/=E and S/=N and S/=D and S/=M and S/=O and S/=R and S/=Y then
                              if E/=N and E/=D and E/=M and E/=O and E/=R and E/=Y then
                                 if N/=D and N/=M and N/=O and N/=R and N/=Y then
                                    if D/=M and D/=M and D/=O and D/=R and D/=Y then
                                       if M/=O and M/=R and M/=Y then
                                          if O/=R and O/=Y then
                                             if R/=Y then
                                                if 1000*(S+M)+100*(E+O)+10*(N+R)+D+E=10000*M+1000*O+100*N+10*E+Y then
                                                   put(" ");
                                                   put(S, 1);
                                                   put(E, 1);
                                                   put(N, 1);
                                                   put(D, 1);
                                                   new_line;
                                                   put(" ");
                                                   put(M, 1);
                                                   put(O, 1);
                                                   put(R, 1);
                                                   put(E, 1);
                                                   new_line;
                                                   put("-----");
                                                   new_line;
                                                   put(M, 1);
                                                   put(O, 1);
                                                   put(N, 1);
                                                   put(E, 1);
                                                   put(Y, 1);
                                                   new_line(3);
                                                end if;
                                             end if;
                                          end if;
                                       end if;
                                    end if;
                                 end if;
                              end if;
                           end if;
                        end loop;
                     end loop;
                  end loop;
               end loop;
            end loop;
         end loop;
      end loop;
   end loop;
end SendMoreMoney;