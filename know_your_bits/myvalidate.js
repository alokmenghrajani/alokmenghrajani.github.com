function validate_expressions(ll, variables) {
  var score = 0;
  for (var i=0; i<ll.length; i++) {
    score += validate_expression(ll[i], variables);
  }
  return score;
}

function validate_expression(e, variables) {
  if (e.constant != undefined) {
    if (e.constant > 255) {
      console.log(e);
      throw {message:"You may only use constants between 0 and 255", line:e.line};
    }
  } else if (e.variable != undefined) {
    if (!variables[e.variable]) {
      throw {message:"You are using an undefined variable: "+e.variable, line:e.line};
    }
  }
  var score = 0;
  if (e.op != undefined) {
    score += validate_operator(e);
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
  var input = $('#text').val() + "\n";
  $('#error').hide();
  $('#line-error').text("");
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
    if (e.line != undefined) {
      $('#line-error').text(Array(3+e.line).join("\n")+"  >");
    }
  }
}


