console.blacktable = function(arg) {

  var types = ['object', 'string', 'number'];

  var include = function(arr, obj) {
    return (arr.indexOf(obj) != -1);
  };

  var isEmberModel = function(obj) {
    return obj.hasOwnProperty('_data');
  };

  var emberModelData = function(obj) {
    return obj._data; 
  };  

  var recursiveArrayToObject = function(arr) { 
    var rv = {};

    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] == undefined) continue;

      if (Array.isArray(arr[i])) {
        rv[i] = recursiveArrayToObject(arr[i]);
      } else {      
        rv[i] = (typeof arg === 'object')
          ? arr[i]
          : {0: arr[i]}
      }

    }
    return rv;    
  };  

  var transformArray = function(arg) {
    var array = arg;

    array.forEach(function(i, index) {
      var obj = i;

      if (isEmberModel(obj)) {
        obj = (emberModelData(obj));
      } else {
        obj = (Array.isArray(obj)) 
          ? recursiveArrayToObject(obj)
          : {0: obj};
      }

      return array[index] = obj;
    });
    
    return recursiveArrayToObject(array); 
  };

  var transformObject = function(arg) {
    return object = (isEmberModel(arg)) ? (emberModelData(arg)) : arg;  
  };

  var convert = function(arg) {
    var object = {};

    if (!include(types, (typeof arg))) return null;

    if (typeof arg === 'object') {
      object = (Array.isArray(arg))
        ? transformArray(arg)
        : transformObject(arg)
    } else if (typeof arg === 'string' || typeof arg === 'number') {
      object = {0: {0: arg}};
    }

    return object;
  };

  var print = function(arg) {
    var result = convert(arg);

    console.table(result);
  };

  print(arg);

};
