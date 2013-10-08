define(function() {

  var slice = Array.prototype.slice;

  return {
    chain: function() {
      var fools = slice.call(arguments);
      var i = -1;
      var next = function() {
        i++;
        var f = fools[i];
        var args = slice.call(arguments);
        args.push(next);
        if (f) {
          f.apply(null, args);
        }
      }
      next();
    },
    map: function(a, f, c) {
      var mapped = [];
      var completed = 0;
      var check = function(index, value) {
        mapped[index] = value;
        completed++;
        if (completed == a.length) {
          c(mapped);
        }
      };
      for (var i = 0; i < a.length; i++) {
        f(a[i], i, check.bind(null, i));
      }
    }
  }

});