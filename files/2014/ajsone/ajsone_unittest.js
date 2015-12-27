/**
 * A set of basic unittests for Ajsone.
 *
 * run with: node ajsone_unittest.js 
 */

var fs = require("fs");
function read(f){return fs.readFileSync(f).toString()};
function include(f){eval.apply(global,[read(f)])};

include('ajsone.js');

function my_test(expecting_js, got) {
  var e = JSON.stringify(expecting_js);
  var g = JSON.stringify(got);

  if (e === g) {
    console.log(test_name + ": PASSED");
  } else {
    console.log(test_name + ": FAILED, expecting: " + e + ", got: " + g);
  }
}

// Disable logging
my_log = function(){}

var tests = {
  // Stuff from index.html
  'test_index1': function() {
    var r = new Ajsone().eval(
      {
        "x": 1
      });
    my_test({success: 1, failure: ""}, r);
  },

  'test_index2': function() {
    var r = new Ajsone().eval(
      {
        "x": 1,
        "=x": null
      });
    my_test({success: 1, failure: ""}, r);
  },

  'test_index3': function() {
    var r = new Ajsone().eval(
      {
        "x": { "y": 1 }
      });
    my_test({success: 1, failure: ""}, r);
  },  

  'test_index4': function() {
    var r = new Ajsone().eval(
      {
        "x": 1,
        "y": "=x"
      });
    my_test({success: 1, failure: ""}, r);
  },

  'test_index5': function() {
    var r = new Ajsone().eval(
      {
        "x": 1,
        "y": {"=x": null}
      });
    my_test({success: 1, failure: ""}, r);
  }, 

  'test_index6': function() {
    var r = new Ajsone().eval(
      {
        "x": 1,
        "y": { "foo": "=x"},
        "z": {
          "x": 2,
          "_": {"bar": "=y"}
        }
      });
    my_test({success: 2, failure: ""}, r);
  },

  'test_index7': function() {
    var r = new Ajsone().eval(
      {
        "arr": [1, 2, 3],
        "=arr.len": { "arr": "=arr" }
      });
    my_test({success: 3, failure: ""}, r);
  },

  'test_index8': function() {
    var r = new Ajsone().eval(
      {
        "arr": [1, 2, 3],
        "=arr.len": {}
      });
    my_test({success: 3, failure: ""}, r);
  },

  // Test built-ins
  // +
  'test_add': function() {
    var r = new Ajsone().eval(
      {
        "x": {
          "in1": 1,
          "in2": 41,
          "=+": null
        }
      });
    my_test({success: 42, failure: ""}, r);
  },

  // -
  'test_sub1': function() {
    var r = new Ajsone().eval(
      {
        "x": {
          "in1": 12,
          "in2": 5,
          "=-": null
        }
      });
    my_test({success: 7, failure: ""}, r);   
  },

  'test_sub2': function() {
    var r = new Ajsone().eval(
      {
        "sub": {
          "n_minus_one": {"=-": {"in1": "=n", "in2": 1}},
          "n": "=n_minus_one"
        },
        "=sub": {"n": 4}
      });
    my_test({success: 3, failure: ""}, r);
  },

  // *
  'test_mul': function() {
    var r = new Ajsone().eval(
      {
        "x": {
          "in1": 12,
          "in2": 5,
          "=*": null
        }
      });
    my_test({success: 60, failure: ""}, r);   
  },

  // /
  'test_div': function() {
    var r = new Ajsone().eval(
      {
        "x": {
          "in1": 60,
          "in2": 5,
          "=/": null
        }
      });
    my_test({success: 12, failure: ""}, r);   
  },

  // if
  'test_if1': function() {
    var r = new Ajsone().eval(
      {
        "x": true,
        "y": {
          "cond": "=x",
          "then": 10,
          "else": 20,
          "=if": null
        }
      });
    my_test({success: 10, failure: ""}, r);
  },

  'test_if2': function() {
    var r = new Ajsone().eval(
      {
       "x": false,
       "y": {
         "cond": "=x",
         "then": 10,
         "else": 20,
         "=if": null
       }
     });
    my_test({success: 20, failure: ""}, r);
  },

  // <
  'test_lt1': function() {
    var r = new Ajsone().eval(
      {
        "=<": {"in1": 1, "in2": 2}
      });
    my_test({success: true, failure: ""}, r);
  },

  'test_lt2': function() {
    var r = new Ajsone().eval(
      {
        "=<": {"in1": 3, "in2": 2}
      });
    my_test({success: false, failure: ""}, r);
  },

  // <=
  'test_lte1': function() {
    var r = new Ajsone().eval(
      {
        "=<=": {"in1": 1, "in2": 2}
      });
    my_test({success: true, failure: ""}, r);
  },

  'test_lte2': function() {
    var r = new Ajsone().eval(
      {
        "=<=": {"in1": 2, "in2": 2}
      });
    my_test({success: true, failure: ""}, r);
  },  

  'test_lte3': function() {
    var r = new Ajsone().eval(
      {
        "=<=": {"in1": 3, "in2": 2}
      });
    my_test({success: false, failure: ""}, r);
  },  

  // >
  'test_gt1': function() {
    var r = new Ajsone().eval(
      {
        "=>": {"in1": 2, "in2": 1}
      });
    my_test({success: true, failure: ""}, r);
  },

  'test_gt2': function() {
    var r = new Ajsone().eval(
      {
        "=>": {"in1": 2, "in2": 3}
      });
    my_test({success: false, failure: ""}, r);
  },

  // >=
  'test_gte1': function() {
    var r = new Ajsone().eval(
      {
        "=>=": {"in1": 2, "in2": 1}
      });
    my_test({success: true, failure: ""}, r);
  },

  'test_gte2': function() {
    var r = new Ajsone().eval(
      {
        "=>=": {"in1": 2, "in2": 2}
      });
    my_test({success: true, failure: ""}, r);
  },  

  'test_gte3': function() {
    var r = new Ajsone().eval(
      {
        "=>=": {"in1": 2, "in2": 3}
      });
    my_test({success: false, failure: ""}, r);
  }, 

  // ==
  'test_eq1': function() {
    var r = new Ajsone().eval(
      {
        "===": {"in1": 2, "in2": 2}
      });
    my_test({success: true, failure: ""}, r);
  },

  'test_eq2': function() {
    var r = new Ajsone().eval(
      {
        "===": {"in1": 2, "in2": 3}
      });
    my_test({success: false, failure: ""}, r);
  },  

  // !=
  'test_ne1': function() {
    var r = new Ajsone().eval(
      {
        "=!=": {"in1": 3, "in2": 2}
      });
    my_test({success: true, failure: ""}, r);
  },

  'test_ne2': function() {
    var r = new Ajsone().eval(
      {
        "=!=": {"in1": 2, "in2": 2}
      });
    my_test({success: false, failure: ""}, r);
  },    

  // &&
  'test_boolean_and1': function() {
    var r = new Ajsone().eval(
      {
        "a": true,
        "b": false,
        "=&&": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: false, failure: ""}, r);    
  },

  'test_boolean_and2': function() {
    var r = new Ajsone().eval(
      {
        "a": true,
        "b": false,
        "=&&": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: false, failure: ""}, r);    
  },

  'test_boolean_and3': function() {
    var r = new Ajsone().eval(
      {
        "a": 42,
        "b": false,
        "=&&": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: "", failure: "runtime error, expecting boolean, got: 42"}, r);    
  },

  // ||
 'test_boolean_or1': function() {
    var r = new Ajsone().eval(
      {
        "a": false,
        "b": false,
        "=||": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: false, failure: ""}, r);    
  },

  'test_boolean_or2': function() {
    var r = new Ajsone().eval(
      {
        "a": true,
        "b": false,
        "=||": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: true, failure: ""}, r);    
  },

  'test_boolean_or3': function() {
    var r = new Ajsone().eval(
      {
        "a": true,
        "b": 42,
        "=||": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: "", failure: "runtime error, expecting boolean, got: 42"}, r);    
  },

  // &
  'test_binary_and1': function() {
    var r = new Ajsone().eval(
      {
        "a": 2,
        "b": 3,
        "=&": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: 2, failure: ""}, r);    
  },

  'test_binary_and2': function() {
    var r = new Ajsone().eval(
      {
        "a": 3,
        "b": 4,
        "=&": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: 0, failure: ""}, r);    
  },

  'test_binary_and3': function() {
    var r = new Ajsone().eval(
      {
        "a": 42,
        "b": false,
        "=&": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: "", failure: "runtime error, expecting number, got: false"}, r);    
  },  

  // |
  'test_binary_or1': function() {
    var r = new Ajsone().eval(
      {
        "a": 2,
        "b": 1,
        "=|": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: 3, failure: ""}, r);    
  },

  'test_binary_or2': function() {
    var r = new Ajsone().eval(
      {
        "a": 3,
        "b": 4,
        "=|": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: 7, failure: ""}, r);    
  },

  'test_binary_or3': function() {
    var r = new Ajsone().eval(
      {
        "a": true,
        "b": 42,
        "=|": {"in1": "=a", "in2": "=b"}
      });
    my_test({success: "", failure: "runtime error, expecting number, got: true"}, r);    
  },  

  // ~
 'test_binary_not1': function() {
    var r = new Ajsone().eval(
      {
        "a": 2,
        "=~": {"in1": "=a"}
      });
    my_test({success: -3, failure: ""}, r);    
  },

  'test_binary_not2': function() {
    var r = new Ajsone().eval(
      {
        "a": true,
        "=~": {"in1": "=a"}
      });
    my_test({success: "", failure: "runtime error, expecting number, got: true"}, r);    
  },  

  // arr.len
  'test_array_len': function() {
    var r = new Ajsone().eval(
      {
        "arr": ["a", "b", "c"],
        "=arr.len": null
      });
    my_test({success: 3, failure: ""}, r);
  },

  // arr.append
  'test_array_append': function() {
    var r = new Ajsone().eval(
      {
        "arr": ["a", "b", "c"],
        "e": "d",
        "=arr.append": null
      });
    my_test({success: ["a", "b", "c", "d"], failure: ""}, r);
  },

  // arr.prepend
  'test_array_prepend': function() {
    var r = new Ajsone().eval(
      {
        "arr": ["a", "b", "c"],
        "e": "x",
        "=arr.prepend": null
      });
    my_test({success: ["x", "a", "b", "c"], failure: ""}, r);
  },

  // arr.at
  'test_array_at': function() {
    var r = new Ajsone().eval(
      {
        "arr": ["a", "b", "c"],
        "offset": 1,
        "=arr.at": null
      });
    my_test({success: "b", failure: ""}, r);
  },

  // str.len
 'test_str_len1': function() {
    var r = new Ajsone().eval(
      {
        "=str.len": {"s": "hello world"}
      });
    my_test({success: 11, failure: ""}, r);    
  },

 'test_str_len2': function() {
    var r = new Ajsone().eval(
      {
        "=str.len": {"s": 42}
      });
    my_test({success: "", failure: "runtime error, expecting a string, got: 42"}, r);    
  },

  // str.at
 'test_str_at1': function() {
    var r = new Ajsone().eval(
      {
        "=str.at": {"s": "hello world", "offset": 4}
      });
    my_test({success: "o", failure: ""}, r);    
  },

  // str.append
 'test_str_append1': function() {
    var r = new Ajsone().eval(
      {
        "=str.append": {"s1": "hello", "s2": "x"}
      });
    my_test({success: "hellox", failure: ""}, r);    
  },

  // Make sure that unknown variables get caught
  'test_unknown_variable': function() {
    var r = new Ajsone().eval(
      {
        "x": "=y"
      });
    my_test({success: "", failure: "failed to find 'y' in env!"}, r);
  },

  // chain of assignments
  'test_simple1': function() {
    var r = new Ajsone().eval(
      {
        "a": 1,
        "b": "=a",
        "c": "=b",
        "d": "=c"
      });
    my_test({success: 1, failure: ""}, r);
  },

  'test_simple2': function() {
    var r = new Ajsone().eval(
      {
        "f": {"=x": null},
        "z": {
          "x": 1,
          "=f": null
        }
      });
    my_test({success: 1, failure: ""}, r);
  },

  // The second x "wins"
  'test_edge1': function() {
    var r = new Ajsone().eval(
      {
        "x": 1,
        "y": { "foo": "=x"},
        "z": {
          "x": 2,
          "_": {"bar": "=y"}
        },
      });
    my_test({success: 2, failure: ""}, r);
  },

  'test_edge2': function() {
    var r = new Ajsone().eval(
      {
        "x": {
          "in1": 1,
          "in2": 2,
          "=+": null,
        },
        "y": {
          "in1": "=x",
          "in2": 4,
          "=+": null
        }
      });
    my_test({success: 7, failure: ""}, r);
  },

  // Make sure else branch is "lazy"
  'test_edge3': function() {
    var r = new Ajsone().eval(
      {
        "x": true,
        "=if": {
          "cond": "=x",
          "then": {
            "=x": null
          },
          "else": {
            "y": "=y"
          }
        }
      });
    my_test({success: true, failure: ""}, r);
  },

  // Parameter omission
  'test_param1': function() {
    var r = new Ajsone().eval(
      {
        "arr": [1, 2, 3],
        "=arr.len": null
      });
    my_test({success: 3, failure: ""}, r);
  },

  'test_param2': function() {
    var r = new Ajsone().eval(
      {
        "arr": [1, 2, 3],
        "=arr.len": {"arr": "=arr"}
      });
    my_test({success: 3, failure: ""}, r);
  },

  'test_param3': function() {
    var r = new Ajsone().eval(
      {
        "arr": [1, 2, 3],
        "=arr.len": {}
      });
    my_test({success: 3, failure: ""}, r);
  },

  // Simple recursive functions
  'test_rec1': function() {
    var r = new Ajsone().eval(
      {
        "sub_till1": {
          "n_minus_one": {"=-": {"in1": "=n", "in2": 1}},
          "=if": {
            "cond": {"=<=": {"in1": "=n", "in2": 1}},
            "then": 1,
            "else": {
              "=sub_till1": {
                "n": "=n_minus_one"
              }
            }
          }
        },
        "=sub_till1": {"n": 3}
      });
    my_test({success: 1, failure: ""}, r);
  },  

  'test_rec2': function() {
    var r = new Ajsone().eval(
     {
       "rec": {
         "n_plus_one": {
           "in1": "=n",
           "in2": 1,
           "=+": null
         },
         "cond": {
           "in1": "=n",
           "in2": 9,
           "=>": null
         },
         "then": "=n",
         "else": {
           "n": "=n_plus_one",
           "=rec": null
         },
         "=if": null
       },
       "n": 0,
       "=rec": null
     });
    my_test({success: 10, failure: ""}, r);
  },

  // Factorial
  'test_fact1': function() {
    var r = new Ajsone().eval(
      {
        "fact": {
          "n_minus_one": {"=-": {"in1": "=n", "in2": 1}},
          "=if": {
            "cond": {"=<=": {"in1": "=n", "in2": 1}},
            "then": 1,
            "else": {"=*": {"in1": "=n", "in2": {"=fact": {"n": "=n_minus_one"}}}}
          }
        },
        "=fact": {"n": 5}
      });
    my_test({success: 120, failure: ""}, r);
  },  

  'test_fact2': function() {
    var r = new Ajsone().eval(
      {
        "fact": {
          "=if": {
            "cond": {"=<=": {"in1": "=n", "in2": 1}},
            "then": 1,
            "else": {
              "t": {"=-": {"in1": "=n", "in2": 1}},
              "=*": {"in1": "=n", "in2": {"=fact": {"n": "=t"}}}}
          }
        },
        "=fact": {"n": 5}
      });
    my_test({success: 120, failure: ""}, r);
  },  

  // Compute tail of an array, takes parameter as ll
  'test_tail': function() {
    var r = new Ajsone().eval(
      {
        "tail": {
          "tail_": {
            "=if": {
              "cond": {"=>": {"in1": "=offset", "in2": 0}},
              "then": {
                "new_offset": {"=-": {"in1": "=offset", "in2": 1}},
                "=arr.append": {
                  "e": {"=arr.at": {"arr": "=ll", "offset": "=offset"}},
                  "arr": {"=tail_": {"offset": "=new_offset"}}
                }
              },
              "else": []
            }
          },
          "=tail_": {"offset": {"=-": {"in1": {"=arr.len": {"arr": "=ll"}}, "in2": 1}}}
        },
        "=tail": {"ll": [10, 20, 30, 40]}
      });
    my_test({success: [20, 30, 40], failure: ""}, r);
  },

  // Compute tail of an array, takes parameter as arr
  'test_tail2': function() {
    var r = new Ajsone().eval(
      {
        "tail": {
          "tail_": {
            "=if": {
              "cond": {"=>": {"in1": "=offset", "in2": 0}},
              "then": {
                "new_offset": {"=-": {"in1": "=offset", "in2": 1}},
                "=arr.append": {
                  "e": "=arr.at",
                  "arr": {"=tail_": {"offset": "=new_offset"}}
                }
              },
              "else": []
            }
          },
          "=tail_": {"offset": {"=-": {"in1": "=arr.len", "in2": 1}}}
        },
        "=tail": {"arr": [10, 20, 30, 40]}
      });
    my_test({success: [20, 30, 40], failure: ""}, r);
  },

  // Fibonacci
  'test_fib': function() {
    var r = new Ajsone().eval(
      {
        "fib": {
          "n_minus_one": {"=-": {"in1":"=n", "in2":1}},
          "n_minus_two": {"=-": {"in1":"=n", "in2":2}},
          "=if": {
            "cond": {"=<=": {"in1":"=n", "in2":2}},
            "then": 1,
            "else": {"=+": {
              "in1": {"=fib": {"n": "=n_minus_two"}},
              "in2": {"=fib": {"n": "=n_minus_one"}}
            }}
          }
        },
        "=fib": {"n": 9}
      });
    my_test({success: 34, failure: ""}, r);
  },

  /**
   * Sort an array. This is the probably the most complicated piece of code anyone would write
   * in this silly language.
   * The code is much easier to understand when written in ocaml:
   *
   * let rec sort (ll:int list): int list =
   *   match ll with
   *   | [] -> []
   *   | hd::tl -> insertion_sort hd (sort tl)
   *
   * and insertion_sort (item:int) (sorted_list:int list): int list =
   *   match sorted_list with
   *   | [] -> [item]
   *   | hd::tl ->
   *     if item <= hd then item :: sorted_list
   *     else hd :: (insertion_sort item tl)
   */
  'test_sort': function() {
    var r = new Ajsone().eval(
      {
        "tail": {
          "tail_": {
            "=if": {
              "cond": {"=>": {"in1": "=offset", "in2": 0}},
              "then": {
                "new_offset": {"=-": {"in1": "=offset", "in2": 1}},
                "=arr.append": {
                  "e": "=arr.at",
                  "arr": {"=tail_": {"offset": "=new_offset"}}
                }
              },
              "else": []
            }
          },
          "=tail_": {"offset": {"=-": {"in1": "=arr.len", "in2": 1}}}
        },
        "sort": {
          "=if": {
            "cond": {"=>": {"in1": "=arr.len", "in2": 0}},
            "then": {
              "hd": {"=arr.at": {"offset": 0}},
              "tl": {"=sort": {"arr": "=tail"}},
              "=insertion_sort": {"e": "=hd", "arr": "=tl"}
            },
            "else": []
          }
        },
        "insertion_sort": {
          "=if": {
            "cond": {"=>": {"in1": "=arr.len", "in2": 0}},
            "then": {
              "hd": {"=arr.at": {"offset": 0}},
              "tl": "=tail",
              "=if": {
                "cond": {"=<=": {"in1": "=e", "in2": "=hd"}},
                "then": "=arr.prepend",
                "else": {
                  "=arr.prepend": {
                    "e": "=hd",
                    "arr": {
                      "=insertion_sort": {
                        "arr": "=tl"
                      }
                    }
                  }
                }
              }
            },
            "else": {"=arr.prepend": {"e": "=e", "arr": []}}
          }
        },
        "=sort": {"arr": [2, 1, 3, 4, 6, 8, 7, 5]}
      });
    my_test({success: [1, 2, 3, 4, 5, 6, 7, 8], failure: ""}, r);
  }
}

function run_tests() {
  for (test_name in tests) {
    tests[test_name]();
  }
}
run_tests();
