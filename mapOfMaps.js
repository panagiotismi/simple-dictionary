function LookUp() {
  this.levels = new Map();
  this.populate = function (index) {
    if (!this.levels.has(index))
      this.levels.set(index, new Map());
    return this.levels.get(index);
  };
}

LookUp.prototype.add = function (word) {
  for (var i = 0; i < word.length; i++) {
    var node = this.populate(i);
    var key = word.charAt(i);
    var value = word.slice(0, i + 1);
    if (node.has(key))
      node.get(key).push(value);
    else
      node.set(key, [value]);
  }
};
LookUp.prototype.find = function (word) {
  var node = this.levels.get(word.length - 1);
  var key = word.charAt(word.length - 1);
  if (node && node.has(key))
    var prefixes = node.get(key);
  else
    return 0;
  return prefixes.filter(function (value) { return value == word; })
                 .length;
};

// Test prototype
function main() {
  var dict = new LookUp()
  var n = parseInt(INPUT);
  for (var i = 0; i < n; i++) {
    var temp = INPUT.split(' ');
    var op = temp[0];
    var contact = temp[1];

    if (op == 'add')
      dict.add(contact);
    else
      console.log(dict.find(contact));
  }
}
