fi = (function() {
  return {
    // collection functions
    each: function (collection, iteratee) {

      // check if collection is object or array
      if (Array.isArray(collection)) {
        // arrays
        let newArray = []
        for (let i = 0; i < collection.length; i++) {
          iteratee(collection[i]);
          newArray.push(collection[i]);
        }
        return newArray
      } else {
        // objects
        let newObject = {}
        for (const key in collection) {
          iteratee(collection[key]);
          newObject[key] = collection[key];
        }
        return newObject
      }
    },

    map: function (collection, iteratee) {
      let newArray = [];

      // check if collection is object or array
      if (Array.isArray(collection)) {
        // arrays
        for (let i = 0; i < collection.length; i++) {
          newArray.push(iteratee(collection[i]));
        }
      } else {
        // objects
        for (const key in collection) {

          newArray.push(iteratee(collection[key]));
        }
      }
      return newArray
    },

    reduce: function (collection, iteratee, acc) {
      for (let i = 0; i < collection.length; i++) {
        acc = iteratee(acc, collection[i], collection);
      }

      return acc;
    },

    find: function (collection, predicate) {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          return collection[i]
        }
      }
    },

    filter: function (collection, predicate) {
      let newArray = [];
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          newArray.push(collection[i])
        }
      }
      return newArray;
    },

    size: function (collection) {
      if (Array.isArray(collection)) {
        return collection.length;
      } else {
        let counter = 0;
        for (const key in collection) {
          counter++
        }
        return counter;
      }
    },

    // array functions
    first: function (array, n) {
      return array.slice(0, n || 1);
    },

    last: function (array, n) {
      return array.slice(-n || -1)
    },

    compact: function (array) {
      newArray = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          newArray.push(array[i])
        }
      }
      return newArray;
    },

    sortBy: function (array, iteratee) {
      return [...array].sort(function (a, b) {
        if (typeof a === 'object') {
          return iteratee(a).localeCompare(iteratee(b));
        } else {
          return iteratee(a) - iteratee(b);
        }
      });
    },

    flatten: function (array, result=[]) {
      newArray = result;

      for (const element of array) {
        if (Array.isArray(element)) {
          debugger;
          fi.flatten(element, newArray)
        } else {
          newArray.push(element)
        }
      }

      return newArray;
    },

    uniq: function (array, isSorted, iteratee) {
      let newArray = [];

      for (let i = 0; i < array.length; i++) {
        let exists = false

        if (isSorted == true) {
          for (let j = 0; j < i; j++) {
            if (iteratee !== undefined) {
              if (iteratee(array[i]) === iteratee(newArray[j])) {
                exists = true;
              }
            } else {
              if (array[i] === newArray[j]) {
                exists = true;
              }
            }
          }
        } else {
          for (let j = 0; j < newArray.length; j++) {
            if (iteratee !== undefined) {
              if (iteratee(array[i]) === iteratee(newArray[j])) {
                exists = true;
              }
            } else {
              if (array[i] === newArray[j]) {
                exists = true;
              }
            }
          }
        }

        if (exists === false) {
          newArray.push(array[i])
        }
      }

      return newArray;
    },

    keys: function (object) {
      let newArray = [];

      for (const key in object) {
        newArray.push(key)
      }

      return newArray;
    },

    values: function (object) {
      let newArray = [];

      for (const key in object) {
        newArray.push(object[key])
      };
    },

    functions: function (object) {
      return Object.getOwnPropertyNames(object).sort();
    }

  // end of top-level return statement
  };
// end of function declaration and IIFE
})()
