(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {

      var length = array.length;
      if (n === 0) {
        var emptyArray = [];
        return emptyArray;
      }
      if (n > length){
        return array;
      }
      return n === undefined ? array[length-1] : array.slice(n-1, length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    if (!Array.isArray(collection)) {
      for (var key in collection){
        var value = collection[key];
        iterator(value, key, collection);
      }
    }
    else {
      for(var key = 0; key < collection.length; key++){
        var value = collection[key];
        iterator(value, key, collection);
      }
     } 
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // var newCollection = [];

    // for (var key = 0; key < collection.length; key++){
    //   var num = collection[key];
    //  if (test(num)) {
    //     newCollection.push(num);
    //   }    
    // }
    // return newCollection;
    let newCollection = [];
  
    _.each(collection, (item) => {
      if(test(item)){
        newCollection.push(item);
      }
    });

    // let boundFunc = function thing(){

    // }.bind(this);

    return newCollection;
  };

  // _.filter(function(){
  //   this.blah
  // })

  // _.blah

  // function _() {

  // }

  // let obj = {};

  // obj.filter = function() {

  // }

  // _.filter(function() {

  // });

  // Return all elements of an array that don't pass a truth test.
  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    // 
    // 
    let rejects = _.filter(collection, (item) => {
      if(!test(item)){
        return true;
      }
      else {
        return false;
      }
    });

    return rejects;
  };


  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let specialArray = [];
    let anObject = {};
    for (let i = 0; i < array.length; i++){
      if (!(array[i] in anObject)){
        anObject[array[i]] = true;
        specialArray.push(array[i]);
      }
    }
    return specialArray;
  };
   // for (let i = 0; i < array.length; i++){
    //   if(!specialArray.includes(array[i])){
    //     specialArray.push(array[i]);
    //   }
    // }

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let newCollection = [];
    _.each(collection, (item) => {
      newCollection.push(iterator(item));
    });
    return newCollection;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // collection = [{name: "moe", age: 30}, {name: "curly", age: 50}];
  // should return ["moe", "curly"];
  // OKAY!! ^^
  // 
  // 
  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    let total = accumulator;
    if(Array.isArray(collection)){
      for(let i = 0; i < collection.length; i++){
        if(total == undefined){
          total = collection[0];
          i++;
          if(collection.length <= 1){
            break;
          }
        }
        total = iterator(total, collection[i]);
      }
    }
    else {
      let keys = Object.keys(collection);
      for (let value of keys){
        total = iterator(total, collection[value]);
      }
    }
    return total;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  // iterator here seems to just return the value that is put into it
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator == undefined){
      iterator = _.identity;
    }
    return _.reduce(collection, (passes, item) => {
      if(passes === false){
        return false;
      }
      return passes === !!iterator(item);
    }, true);
  
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator == undefined){
      iterator = _.identity;
    }
    return !_.every(collection, (item) => {
      return !iterator(item);
    });
    
    // if (iterator == undefined){
    //   iterator = _.identity;
    // }
    // for(let i = 0; i < collection.length; i++){
    //   if(iterator(collection[i])){
    //     return true;
    //   }
    // }
    // return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"}, 
  //     {bla: "even more stuff"}); 
  //   // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    let newObj;
    for(var j = 0; j < arguments.length; j++){
      if(newObj == undefined){
        newObj = arguments[j];
        j++;
        if(arguments.length <= 1){
          return newObj;
        }
      }
      let key = Object.keys(arguments[j]);
      let value = Object.values(arguments[j]);
      if(key == [] && value == []){
        // newObj = Object.assign(newObj, arguments[j]);
        newObj = newObj;
      }
      else {
        for(let i = 0; i < key.length; i++){
          newObj[key[i]] = value[i];
        }
      }
    }
    return newObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
     let newObj;
    for(var j = 0; j < arguments.length; j++){
      if(newObj == undefined){
        newObj = arguments[j];
        j++;
        if(arguments.length <= 1){
          return newObj;
        }
      }
      let key = Object.keys(arguments[j]);
      let value = Object.values(arguments[j]);
      if(key == [] && value == []){
        // newObj = Object.assign(newObj, arguments[j]);
        // newObj = newObj;
        break;
      }
      else {
        for(let i = 0; i < key.length; i++){
          if([key[i]] in newObj){
            break;
          }
          newObj[key[i]] = value[i];
        }
      }
    }
    return newObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    let result;
    let previousArguments;
    let alreadyCalled = false;

    return function(){
      if(!alreadyCalled){
        previousArguments = arguments;
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      else {
        for(let i = 0; i < previousArguments.length; i++){
          if (previousArguments[i] !== arguments[i]){
            result = func.apply(this, arguments);
            break;
          }
        }
      }
      return result;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    let argArray = Array.prototype.slice.call(arguments, 2);
    let result = function() {
      return func.apply(this, argArray);
    }

    return setTimeout(result, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  // _.shuffle = function(array) {
  //   let newArray = [];
  //   for (let i = 0; i < array.length; i++){
  //     let item = array.slice(i, i + 1);
  //     let position = Math.floor(Math.random() * array.length);
  //     newArray.splice(position, 0, item[0]);
  //   }
  //   return newArray;
  // };

  // _.shuffle = function(array) {
  //   let newArray = array.slice(0);

  //   for (let i = 0; i < newArray.length; i++){
  //     let position = Math.ceil(Math.random() * newArray.length);
  //     newArray.splice(position, 0, newArray[0]);
  //     newArray.shift();
  //   }
  //   return newArray;
  // };
    _.shuffle = function(array) {
    let newArray = array.slice();

    for (let i = 0; i < newArray.length; i++){
      let current = newArray[i];
      let position = Math.floor(Math.random() * newArray.length);
      let positionValue = newArray[position];
      newArray[position] = current;
      newArray[i] = positionValue;
    }
    return newArray;
  };
  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
      let answer = [];

      if (typeof functionOrKey == "string") {
        functionOrKey = String.prototype[functionOrKey];
      }
      if (args == undefined || args == null){
        for (let item of collection) { 
          let functionResult = functionOrKey.apply(item, collection);
          answer.push(functionResult);
        }
      }
      else {
        let functionResult = functionOrKey.apply(args, collection);
        answer.push(functionResult);
      } 
      return answer;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    let highestObj;
    let highestValue;
    let currentObj;
    let currentValue;

    for (let i = 0; i < collection.length; i++) {
      if (typeof iterator == "string") {
        highestObj = collection[0];
        highestValue = highestObj[iterator];
      }
      else {
        highestObj = collection[0];
        highestValue = iterator(highestObj);
      }
      for (let j = 0; j < collection.length - i; j++){
        if (typeof iterator == "string") {
          currentObj = collection[j];
          currentValue = currentObj[iterator];
        }
        else {
          currentObj = collection[j];
          currentValue = iterator(currentObj);
        }

        if(currentValue == undefined){
          highestValue = currentValue;
          highestObj = currentObj;
        }
        else if (highestValue == undefined){
          collection[j] = highestObj;
          collection[j - 1] = currentObj;
        }
        else if (currentValue < highestValue) {
          collection[j] = highestObj;
          collection[j - 1] = currentObj;
        }
        else {
          highestValue = currentValue;
          highestObj = currentObj;
        }
      }
     
    }  
    return collection;
  };

   // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    if (result == undefined){
      result = [];
    }
    if(nestedArray.length == 0){
        return result;
      }
    if(Array.isArray(nestedArray)){
      return _.flatten(nestedArray.shift(), result) && _.flatten(nestedArray, result);     
    }
    else {
      result.push(nestedArray);
      return result;
    }
    // result = [];
    // let current = nestedArray[0];
    // let currentArray = [];

    // while(current !== undefined) {
    //   while (Array.isArray(current)) {
    //     currentArray = current;
    //     current = current[0];
    //   }
    //   result.push(current);
    //   if (currentArray.length > 1) {
    //     currentArray.shift();
    //     current = currentArray;
    //   }
    //   else {
    //     nestedArray.shift();
    //     current = nestedArray[0];
    //   }   
    // }
    // return result;
  };
  //
  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3], [poop, farts, cheese]) returns [['a',1, poop], ['b',2, farts], ['c',3, cheese], ['d',undefined, undefined]]
  _.zip = function() {
    let collections = Array.from(arguments);
    // Array.prototype.slice.call(arguments);
    let zipped = [];
    let firstArg = collections[0];
    for (let i = 0; i < firstArg.length; i++) {
      let zippedElement = [];
      for (let j = 0; j < collections.length; j++) {
        zippedElement.push(collections[j][i]);
      }
      zipped.push(zippedElement);
    }
    return zipped;
  };

 

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    let argsArray = Array.from(arguments);
    let firstArray = argsArray[0];
    let nextArray = argsArray[1];

    while(argsArray.length !== 1) {
      for (let i = 0; i < firstArray.length; i++){
        for(let j = 0; j < nextArray.length; j++){
          if (firstArray[i] == nextArray[j]) {
            break;
          }
          else if(j == nextArray.length - 1){
            firstArray.splice(i, 1);
            i--;
          }
        }
      }
      argsArray.shift();
      nextArray = argsArray[1];
    }
    return firstArray;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    let argsArray = Array.from(arguments);
    let firstArray = argsArray[0];
    let nextArray = argsArray[1];

    while(argsArray.length !== 1) {
      for (let i = 0; i < firstArray.length; i++){
        for(let j = 0; j < nextArray.length; j++){
          if (firstArray[i] == nextArray[j]) {
            firstArray.splice(i, 1);
            i--;
            break;
          }
        }
      }
      argsArray.shift();
      nextArray = argsArray[1];
    }
    return firstArray;

  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    let canExecuteFunction = true;

    function isTrue () {
      return canExecuteFunction = true;
    }

    return function(){
      if(canExecuteFunction == true) {
        func();
        canExecuteFunction = false;
        setTimeout(isTrue, wait);
      }
    }
    
  };
}());
