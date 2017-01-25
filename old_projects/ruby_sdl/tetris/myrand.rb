class MyRand
  @numbers
  @size
  @p

  def initialize(size)
    @size = size
    @numbers = (0..(@size-1))
    @p = 0
    shuffle
  end

  def shuffle
    for i in (0..(@size-1))
      j = rand(@size-2)
      if j>=i
        j=j+1
      end
      t = @numbers[i]
      @numbers[i]=@numbers[j]
      @numbers[j]=t
    end
  end

  def next
    t = @numbers[@p]
    @p=@p+1
    if @p==@size
      @p = 0
      shuffle
    end
  end

  def debug
    @numbers.each{|n|
      print n.to_s + " "
    }
    puts
  end

end
