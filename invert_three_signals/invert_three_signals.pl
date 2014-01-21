make_signal((V1, E1), (V2, E2), or, NewSignal) :-
  O is V1 \/ V2,
  NewSignal = (O, or(E1, E2)).

make_signal((V1, E1), (V2, E2), and, NewSignal) :-
  O is V1 /\ V2,
  NewSignal = (O, and(E1, E2)).

make_signal((V, E), not, NewSignal) :-
  O is \V /\ 255,
  NewSignal = (O, not(E)).

% Given two signals, create a new signal using 'OR' and 'AND' operations.
op(SignalsIn, S1, S2, Op, SignalsOut) :-
  % S1, S2 must be in the input set.
  member(S1, SignalsIn),
  member(S2, SignalsIn),
  % Create a new signal.
  make_signal(S1, S2, Op, (V, E)),
  (member((V, _), SignalsIn) ->
      % The resulting signal already exists, bail.
      false;
      % Add the new signal to the list of outputs.
      append(SignalsIn, [(V, E)], SignalsOut)).

% Calls the above function as long as it returns true.
combination_and_or(Sin, Sout) :-
  (op(Sin, _, _, _, S) ->
      % The list changed, so call combination_and_or recursively.
      combination_and_or(S, Sout);
      % We are done.
      Sout = Sin).

op(SignalsIn, S, not, SignalsOut) :-
  member(S, SignalsIn),
  make_signal(S, not, (V, E)),
  (member((V, _), SignalsIn) ->
      % The resulting signal already exists, bail.
      false;
      % Add the new signal to the list of outputs.
      append(SignalsIn, [(V, E)], SignalsOut)).

solve :-
  % Source signals
  S0 = [(0b11110000, a), (0b11001100, b), (0b10101010, c)],

  % Target signals
  T1 = 0b00001111, T2 = 0b00110011, T3 = 0b01010101,

  combination_and_or(S0, S1),
  op(S1, _, not, S2),
  combination_and_or(S2, S3),
  op(S3, _, not, S4),
  combination_and_or(S4, S5),

  % Pull the solutions out of S5 and print them
  member((T1, Solution1), S5),
  member((T2, Solution2), S5),
  member((T3, Solution3), S5),
  write('Found a solution!'), nl,
  write('not(a) = '), write(Solution1), nl,
  write('not(b) = '), write(Solution2), nl,
  write('not(c) = '), write(Solution3), nl,
  true.

