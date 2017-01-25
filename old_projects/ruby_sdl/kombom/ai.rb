class AI
  @depth

  def initialize(depth)
    @depth = depth
  end

  def eval(board, player)
  end

  def possible_moves(board, player)
    captures = board.possible_captures(player)
    drops = board.possible_drops
    moves = []
    if captures==[]
      drops.each{|d| moves << Move.new(d, nil)}
      return moves
    end
    if drops==nil
      captures.each{|c| moves << Move.new(nil, c)}
      return moves
    end
    drops.each{|d|
      captures.each{|c|
        moves << Move.new(d, c)
      }
    }
    return moves
  end
end
