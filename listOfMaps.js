function LookUp(level) {
  this.item = new Map();
  this.level = level;
  this.nextNode = null;
}
LookUp.prototype.add = function (word) {
  var node = this;
  for (var i = 0; i < word.length; i++) {
    var key = word.charAt(i);
    var value = word.slice(0, i + 1);
    if (node.item.has(key))
      node.item.get(key).push(value);
    else
      node.item.set(key, [value]);
    if (!node.nextNode)
      node.nextNode = new LookUp(i + 1);
    node = node.nextNode;
  }
};
LookUp.prototype.find = function (word) {
  var node = this;
  var key = word.charAt(word.length - 1);
  while (node.level < word.length - 1) {
    if (node.nextNode)
      node = node.nextNode;
    else
      return 0;
  }
  if (node.item.has(key))
    var prefixes = node.item.get(key);
  else
    return 0;
  return prefixes.filter(function (value) { return value == word; })
                 .length;
};

function main() {
  var list = new LookUp(0)
  var n = parseInt(readLine());
  for (var a0 = 0; a0 < n; a0++) {
    var op_temp = readLine().split(' ');
    var op = op_temp[0];
    var contact = op_temp[1];

    if (op == 'add')
      list.add(contact);
    else
      console.log(list.find(contact));
  }
}
