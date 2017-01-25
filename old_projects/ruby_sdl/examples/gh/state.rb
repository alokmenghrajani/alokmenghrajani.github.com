
module JT
  
  class State
    
    def initialize(first_state)
      state_initializer = StateInitializer.new
      yield state_initializer
      
      @state_hash = state_initializer.state_hash
      @state_driver = StateDriver.new(self)
      @state = first_state

      @state_hash.each do |key,val|
	self.instance_eval <<-EOS
	  def self.#{key.id2name}(*arg)
	    if @state_hash[:#{key.id2name}][@state] then
	      @state_hash[:#{key.id2name}][@state].call(@state_driver,*arg)
	    end
	  end
	EOS
      end
	    
    end
	
    def move_state(new_state)
      @state=new_state
    end

    attr_reader :state
    
    private
    
    class StateInitializer
    
      def initialize
	@state_hash={}
      end
      
      attr_reader :state_hash
    
      def add_event(state,event,&block)
	if not @state_hash[event] then
	  @state_hash[event]={}
	end
	@state_hash[event][state]=block
      end
      
    end

    class StateDriver
      def initialize(state_obj)
	@state_obj=state_obj
      end
      def move_state(new_state)
	@state_obj.move_state(new_state)
      end
    end
    
  end #State
  
end #JT
