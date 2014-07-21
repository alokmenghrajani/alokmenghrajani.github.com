function run() {
  $('#output-success').text('');
  $('#output-failure').text('');

  var r;
  try {
    var main = JSON.parse($('#input').val());
    r = new Ajsone().eval(main);
  } catch (e) {
    r = {success: "", failure: "Please enter valid JSON, or use one of the examples."};
  }

  if (r.success) {
    $('#output-success').text("result: "+JSON.stringify(r.success));
  } else {
    $('#output-failure').text("error: "+r.failure);
  }
}

function load_hello_world() {
  $('#input').text(
"{ \n\
  \"=str.append\": { \n\
    \"s1\": \"hello\", \n\
    \"s2\": { \n\
      \"=str.append\": {\"s1\": \" \", \"s2\": \"world\"} \n\
    } \n\
  } \n\
}");
  return false;
}

function load_fact() {
  $('#input').text(
"{ \n\
  \"fact\": { \n\
    \"=if\": { \n\
      \"cond\": {\"=<=\": {\"in1\":\"=n\", \"in2\":1}}, \n\
      \"then\": 1, \n\
      \"else\": { \n\
        \"t\": {\"=-\": {\"in1\": \"=n\", \"in2\": 1}}, \n\
        \"=*\": {\"in1\": \"=n\", \"in2\": {\"=fact\": {\"n\": \"=t\"}}}} \n\
      } \n\
    }, \n\
    \"=fact\": {\"n\": 5} \n\
}");
  return false;
}

function load_fib() {
  $('#input').text(
"{ \n\
  \"fib\": { \n\
    \"n_minus_one\": {\"=-\": {\"in1\":\"=n\", \"in2\":1}}, \n\
    \"n_minus_two\": {\"=-\": {\"in1\":\"=n\", \"in2\":2}}, \n\
    \"=if\": { \n\
      \"cond\": {\"=<=\": {\"in1\":\"=n\", \"in2\":2}}, \n\
      \"then\": 1, \n\
      \"else\": {\"=+\": { \n\
        \"in1\": {\"=fib\": {\"n\": \"=n_minus_two\"}}, \n\
        \"in2\": {\"=fib\": {\"n\": \"=n_minus_one\"}} \n\
      }} \n\
    } \n\
  }, \n\
  \"=fib\": {\"n\": 6} \n\
}");
  return false;
}

function load_sort() {
  $('#input').text(
"{ \n\
  \"tail\": { \n\
    \"tail_\": { \n\
      \"=if\": { \n\
        \"cond\": {\"=>\": {\"in1\": \"=offset\", \"in2\": 0}}, \n\
        \"then\": { \n\
          \"new_offset\": {\"=-\": {\"in1\": \"=offset\", \"in2\": 1}}, \n\
          \"=arr.append\": { \n\
            \"e\": \"=arr.at\", \n\
            \"arr\": {\"=tail_\": {\"offset\": \"=new_offset\"}} \n\
          } \n\
        }, \n\
        \"else\": [] \n\
      } \n\
    }, \n\
    \"=tail_\": {\"offset\": {\"=-\": {\"in1\": \"=arr.len\", \"in2\": 1}}} \n\
  }, \n\
  \"sort\": { \n\
    \"=if\": { \n\
      \"cond\": {\"=>\": {\"in1\": \"=arr.len\", \"in2\": 0}}, \n\
      \"then\": { \n\
        \"hd\": {\"=arr.at\": {\"offset\": 0}}, \n\
        \"tl\": {\"=sort\": {\"arr\": \"=tail\"}}, \n\
        \"=insertion_sort\": {\"e\": \"=hd\", \"arr\": \"=tl\"} \n\
      }, \n\
      \"else\": [] \n\
    } \n\
  }, \n\
  \"insertion_sort\": { \n\
    \"=if\": { \n\
      \"cond\": {\"=>\": {\"in1\": \"=arr.len\", \"in2\": 0}}, \n\
      \"then\": { \n\
        \"hd\": {\"=arr.at\": {\"offset\": 0}}, \n\
        \"tl\": \"=tail\", \n\
        \"=if\": { \n\
          \"cond\": {\"=<=\": {\"in1\": \"=e\", \"in2\": \"=hd\"}}, \n\
          \"then\": \"=arr.prepend\", \n\
          \"else\": { \n\
            \"=arr.prepend\": { \n\
              \"e\": \"=hd\", \n\
              \"arr\": { \n\
                \"=insertion_sort\": { \n\
                  \"arr\": \"=tl\" \n\
                } \n\
              } \n\
            } \n\
          } \n\
        } \n\
      }, \n\
      \"else\": {\"=arr.prepend\": {\"e\": \"=e\", \"arr\": []}} \n\
    } \n\
  }, \n\
  \"=sort\": {\"arr\": [2, 1, 3, 4, 6, 8, 7, 5]} \n\
}");

  return false;
}

function my_log(s) {
  //console.log(s());
}

