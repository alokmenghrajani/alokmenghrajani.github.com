function validate_expressions(ll, variables) {
  var score = 0;
  for (var i=0; i<ll.length; i++) {
    score += validate_expression(ll[i], variables);
  }
  return score;
}

function validate_expression(e, variables) {
  if (typeof(e) == "number") {
    if (e > 255) {
      throw {message:"You may only use constants between 0 and 255"};
    }
  } else if (typeof(e) == "string") {
    if (!variables[e]) {
      throw {message:"You are using an undefined variable: "+e};
    }
  }
  var score = 0;
  if ((typeof(e) == "object") && !jQuery.isEmptyObject(e)) {
    score += validate_operator(e.op);
    score += validate_expression(e.right, variables);
    if (e.op == "=") {
      variables[e.left] = 1;
    }
    score += validate_expression(e.left, variables);
  }
  return score;
}

function render_score(score, best) {
  r = "You got the right solution. Your score: "+score+". ";
  if (score < best) {
    r+="Wow, you beat the best known solution!";
  } else if (score == best) {
    r+="Great, you found the best known solution.";
  } else {
    r+="But can you do better?";
  }
  return r;
}

function validate(best, variables) {
  // step 1: parse the input
  var input = $('#input')[0].value + "\n";
  $('#error').hide();
  $('#score').hide();
  try {
    var r = myparser.parse(input);
    // step 2: validate the tree, keep track of declared variables
    var score = validate_expressions(r, variables);

    // step 3: validate the correctness of the input
    // TODO: implement an interpreter?
    validate_correctness(input);

    score = render_score(score, best);
    $('#score').text(score).show();
  } catch (e) {
    $('#error').text(e.message).show();
  }
}


