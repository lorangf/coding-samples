'user strict';

const text = "first3[abc]2[df]middle4[1[d]]f";
const expected = "abcabcabcddddf";

var decompress = function(str) {
  console.log(`Decompress ${str} from 0 to ${str.length}`);
  return decompressRecursively(str, 0, str.length);
};

var decompressRecursively = function(str, start, end) {
  console.log(`Recursive function called with ${str.substring(start, end)}, ${start}:${end}`)
  let decompressed = "";
  let index = start;

  while(index < end) {
    let first = index;
    let times = parseInt(str.substring(index, end));

    if ( times>0 ) { // ParseInt with letters will return NaN
      console.log(`Repeat ${times} times`);
      let result = "";
      while(str.charAt(index)!='[' ) {
        index++;
      }
      // Index now points to '['
      index++;
      var left = index;

      // Find the matching ']'
      let matches=1;
      while(matches>0 && index<end) {
        if ( str.charAt(index) == '[' ) matches++;
        else if ( str.charAt(index) == ']' ) matches--;

        if ( matches == 0 ) {
          // Index points to ']'
          var right = index;
          result = decompressRecursively(str, left, right);
        }
        index++;
      }

      // Copy the string number of times
      while(times>0) {
        decompressed += result;
        times--;
      }
    } else { // Assume it is a lower case character
      console.log(`Found some letters in the string: ${str.substring(index,end)}`);
      let aCode = "a".charCodeAt(0);
      let zCode = "z".charCodeAt(0);
      while(str.charCodeAt(index) >= aCode && str.charCodeAt(index) <= zCode && index<end) {
        index++;
      }
      decompressed += str.substring(first, index);
    }
  }

  return decompressed;
}

var result = decompress(text);
console.log(`Input:  ${text}`);
console.log(`Output: ${result}`);
