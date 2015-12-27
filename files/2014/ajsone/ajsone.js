/**
 * Ajsone is an esoteric programming language designed for fun.
 * See http://quaxio.com/ajsone/ for more info.
 */
function Ajsone() {
  /**
   * Main entry point to the Ajsone interpreter.
   */
  this.eval = function(json) {
    // We "detect" infinite loops by using a depth counter.
    // TODO: It would be nicer to write this code using setTimeout and some form of continuation passing.
    // We could then have a stop button instead of this ugly depth stuff.
    this.depth = 0;

    try {
      var r = this.eval_(json, [{}]);
      return {success: r, failure: ""};
    } catch (e) {
      return {success: "", failure: e};
    }
  }

  /**
   * Complex built-ins get their own handling functions.
   */
  this.handleIf = function(env) {
    var cond = this.getBinding(env, 'cond');
    var condthen = this.getBinding(env, 'then');
    var condelse = this.getBinding(env, 'else');
    var cond = this.eval_(cond, env);
    if (cond) {
      my_log(function(){return "going to eval the 'then' case"});
      return this.eval_(condthen, env);
    } else {
      my_log(function(){return "going to eval the 'else' case"});      
      return this.eval_(condelse, env);
    }
  }

  this.handleArrLen = function(env) {
    var arr = this.getBinding(env, 'arr');
    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);
    return arr.length;
  }

  this.handleArrPrepend = function(env) {
    var arr = this.getBinding(env, 'arr');
    var e = this.getBinding(env, 'e');

    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);

    e = this.eval_(e, env);

    // Ajsone is functional, so array appending needs to return a new array.
    // A better way to do this involves reading:
    // http://www.amazon.com/Purely-Functional-Structures-Chris-Okasaki/dp/0521663504
    var new_arr = arr.splice(0);

    new_arr.unshift(e);
    return new_arr;    
  }

  /**
   * Very similar to array prepend. It's nice to have both available,
   * although just one of them would be enough.
   */
  this.handleArrAppend = function(env) {
    var arr = this.getBinding(env, 'arr');
    var e = this.getBinding(env, 'e');

    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);

    e = this.eval_(e, env);

    // Ajsone is functional, so array appending needs to return a new array.
    // A better way to do this involves reading:
    // http://www.amazon.com/Purely-Functional-Structures-Chris-Okasaki/dp/0521663504
    var new_arr = arr.splice(0);

    new_arr.push(e);
    return new_arr;
  }

  this.handleArrAt = function(env) {
    var arr = this.getBinding(env, 'arr');
    var offset = this.getBinding(env, 'offset');

    arr = this.eval_(arr, env);
    Ajsone.expectArray(arr);

    offset = this.eval_(offset, env);
    Ajsone.expectNumeral(offset);

    Ajsone.guard(typeof(arr[offset]) != "undefined", "runtime error, out of bounds");
    return arr[offset];
  }

  this.handleStrLen = function(env) {
    var s = this.getBinding(env, 's');
    s = this.eval_(s, env);
    Ajsone.expectString(s);
    return s.length;
  }

  this.handleStrAt = function(env) {
    var s = this.getBinding(env, 's');
    var offset = this.getBinding(env, 'offset');

    s = this.eval_(s, env);
    Ajsone.expectString(s);

    offset = this.eval_(offset, env);
    Ajsone.expectNumeral(offset);

    Ajsone.guard(typeof(s[offset]) != "undefined", "runtime error, out of bounds");
    return s[offset];
  }

  this.handleStrAppend = function(env) {
    var s1 = this.getBinding(env, 's1');
    var s2 = this.getBinding(env, 's2');

    s1 = this.eval_(s1, env);
    Ajsone.expectString(s1);

    s2 = this.eval_(s2, env);
    Ajsone.expectString(s2);

    return s1+s2;
  }  

 /**
   * Helper function to avoid code copy-pasta.
   * params_ty is a key-value hash, where the keys
   * refer to parameters, and the values are
   * validation functions.
   * 
   * Returns a function which checks every parameter
   * (using the validation function) and then
   * calls op() if the parameters have the right type.
   */
  this.buildOp = function(params_ty, op) {
    return function(env) {
      var params = {};
      for (var p in params_ty) {
        // Grab value from env
        var val = this.getBinding(env, p);
        val = this.eval_(val, env);
        // Check the value's type
        params_ty[p](val);
        // Save it
        params[p] = val;
      }
      // Call the underlying function
      return op(params);
    }.bind(this);
  }
  
  /**
   * Returns a map of built-in name -> function which handles type checking & computation.
   * Simpler cases are inlined using buildOp.
   */
  this.getBuiltins = function() {
    return {
      '+': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']+p['in2']}),
      '-': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']-p['in2']}),
      '*': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']*p['in2']}),
      '/': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']/p['in2']}),
      '<': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']<p['in2']}),
      '<=': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']<=p['in2']}),
      '>': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']>p['in2']}),
      '>=': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']>=p['in2']}),
      '==': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']==p['in2']}),
      '!=': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']!=p['in2']}),
      '&&': this.buildOp({'in1': Ajsone.expectBoolean, 'in2': Ajsone.expectBoolean}, function(p){return p['in1']&&p['in2']}),
      '||': this.buildOp({'in1': Ajsone.expectBoolean, 'in2': Ajsone.expectBoolean}, function(p){return p['in1']||p['in2']}),
      '&': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']&p['in2']}),
      '|': this.buildOp({'in1': Ajsone.expectNumeral, 'in2': Ajsone.expectNumeral}, function(p){return p['in1']|p['in2']}),
      '~': this.buildOp({'in1': Ajsone.expectNumeral}, function(p){return ~p['in1']}),
      'if': this.handleIf.bind(this),
      'arr.len': this.handleArrLen.bind(this),
      'arr.append': this.handleArrAppend.bind(this),
      'arr.prepend': this.handleArrPrepend.bind(this),
      'arr.at': this.handleArrAt.bind(this),
      'str.len': this.handleStrLen.bind(this),
      'str.at': this.handleStrAt.bind(this),
      'str.append': this.handleStrAppend.bind(this)
    }
  }

  /**
   * For debugging purpose only.
   */
  this.logEntry = function(body, msg, env) {
    my_log(function(){return "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"});
    my_log(function(){return "entering: " + msg});
    my_log(function(){return "depth: " + this.depth + ", going to eval:" + JSON.stringify(body)}.bind(this));
    my_log(function(){return "and env: " + JSON.stringify(env)});
  }

  this.logExit = function(body, msg, r, env1, env2) {
    my_log(function(){return ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"});
    my_log(function(){return "exiting: " + msg});
    my_log(function(){return "depth: " + this.depth + ", evaled:" + JSON.stringify(body)}.bind(this));
    my_log(function(){return "and env1: " + JSON.stringify(env1)});
    my_log(function(){return "and env2: " + JSON.stringify(env2)});
    my_log(function(){return "returning: " + JSON.stringify(r)});
  }

  /**
   * In general, compilers use something called a LeBlanc-Cook symbol table (or something similar).
   * It's way easier to be lazy and loop through the environments, it's not like anyone will notice
   * any difference?
   */
  this.getBinding = function(env, k) {
    for (var i=env.length-1; i>=0; i--) {
      if (typeof(env[i][k]) != "undefined") {
        return env[i][k];
      }
    }
    Ajsone.guard(false, "failed to find '"+k+"' in env!");
  }

  this.setBinding = function(env, k, v) {
    for (var i=env.length-1; i>=0; i--) {
      if (typeof(env[i][k]) != "undefined") {
        env[i][k] = v;
        return;
      }
    }
    // Add k to the newest env.
    env[env.length-1][k] = v;
  }

  /**
   * The main piece of code which interprets the language.
   *
   * body is the piece of JSON we are evaluating.
   * env is an array of env we have encountered until this point.
   */
  this.eval_ = function(json, env) {
    Ajsone.guard(typeof(json) != "undefined", "internal interpreter error, undefined json");

    this.depth++;
    if (this.depth == 100) {
      throw "inf loop?";
    }
    
    // Create new env
    var current_scope = {};
    env.push(current_scope);    

    var r = this.eval__(json, env);

    env.pop();
    this.depth--;
    return r;
  }

  /**
   * Very creative function name...
   */
  this.eval__ = function(json, env) {
    if (Ajsone.isPrimitive(json)) {
      // Primitives are easy to handle, just return the value as-is.
      return json;
    }

    if (typeof(json) == "string") {
      // Function application without any arguments (see test_index4)
      this.logEntry(json, "string starting with =", env);
      Ajsone.guard(Ajsone.isDeref(json), "internal interpreter error: json should have been considered a primitive");

      var jt = json.substr(1);

      var builtins = this.getBuiltins();
      if (typeof(builtins[jt]) != "undefined") {
        // Built-in
        var r = builtins[jt](env);
        this.logExit(json, "builtin", r);
        return r;
      } else {
        // User defined function
        var f = this.getBinding(env, jt);
        var r = this.eval_(f, env);
        this.logExit(json, "exiting function application", r);
        return r;
      }
    }

    if (typeof(json) == "object") {
      this.logEntry(json, "object", env);

      if (Ajsone.isEmptyObject(json)) {
        this.logExit(json, "empty object", null);
        return null;
      }

      // Register the assignments
      var last_key = undefined;
      for (var k in json) {
        my_log(function(){return "handling :"+k});
        last_key = k;
        if (Ajsone.isDeref(k) == "=") {
          // don't eval yet!
          continue;
        }
        if (Ajsone.isPrimitive(json[k]) || (typeof(json[k]) == "string")) {
          // We have something we can eval_ eagerly.
          my_log(function(){return "it's a non-function"});
          var v = this.eval_(json[k], env);
          my_log(function(){return "got: " + v});
          this.setBinding(env, k, v);
        } else {
          // We have a function, just save it.
          my_log(function(){return "it's a function"});
          this.setBinding(env, k, json[k]);
        }
      }
      Ajsone.guard(typeof(last_key) != "undefined", "we didn't set last_key");

      // Return the value of the last_key
      if (Ajsone.isDeref(last_key)) {
        my_log(function(){return "going to handle '"+last_key+"', with params"});
        // We need to handle the parameters. They "live" in their own env.
        // note: we don't call setBinding, because we want throw away variables.
        var p_env = {};
        for (var k in json[last_key]) {
          my_log(function(){return "handling param:"+k});
          // we want to evaluate the parameters,
          // the "if" case is unique, because we want lazy evaluation.
          var v = json[last_key][k];
          if (last_key != "=if") {
            var v = this.eval_(v, env);
            my_log(function(){return "got: " + v});
          }             
          p_env[k] = v;
        }

        env.push(p_env);
        var r = this.eval_(last_key, env);
        env.pop(); // pop the p_env

        this.logExit(json, "returning from function", r);
        return r;
      }

      my_log(function(){return "going to handle '"+last_key+"', without params"});

      var b = this.getBinding(env, last_key);
      var r = this.eval_(b, env);

      this.logExit(json, "done with object", r);
      return r;
    }

    Ajsone.guard(false, 'unknown json type: '+typeof(json));
  }
}

/**
 * Most JSON types are trivial to handle. The only ones that
 * need special treatment are:
 * 1. strings which being with '=' -> function call
 * 2. objects -> function definition
 */
Ajsone.isPrimitive = function(x) {
  if (Array.isArray(x)) {
    return true;
  }
  var t = typeof(x);
  if (t === "number") {
    return true;
  }
  if (t === "boolean") {
    return true;
  }
  if ((t === "string") && !Ajsone.isDeref(x)) {
    return true;
  }
  if (x === null) {
    return true;
  }
  return false;
}

Ajsone.isDeref = function(str) {
  return str[0] == "=";
}

Ajsone.isEmptyObject = function(json) {
  return JSON.stringify(json) == "{}";
}

/**
 * Normally, you want to distinguish between internal errors and runtime errors.
 * I'm lazy and I don't.
 */
Ajsone.guard = function(expr, msg) {
  if (!expr) {
    throw msg;
  }
}

/**
 * Helper functions for runtime type checking
 */
Ajsone.expectNumeral = function(n) {
  Ajsone.guard(typeof(n) == "number", "runtime error, expecting number, got: " + JSON.stringify(n));
}

Ajsone.expectBoolean = function(b) {
  Ajsone.guard(typeof(b) == "boolean", "runtime error, expecting boolean, got: " + JSON.stringify(b));
}

Ajsone.expectArray = function(a) {
  Ajsone.guard(Array.isArray(a), "runtime error, expecting an array, got: " + JSON.stringify(a));
}

Ajsone.expectString = function(s) {
  Ajsone.guard(typeof(s) == "string", "runtime error, expecting a string, got: " + JSON.stringify(s));
}

