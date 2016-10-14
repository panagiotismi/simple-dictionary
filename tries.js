function Node(item) {
  this.item = item;
  this.count = 0;
  this.children = {};
}

function Trie() {
  this.root = new Node('');
}

Trie.prototype.add = function (word) {
  if (!this.root)
    return null;
  this._addNode(this.root, word);
};
Trie.prototype._addNode = function (node, word) {
  if (!node || !word)
    return null;
  var letter = word.charAt(0);
  var child = node.children[letter];
  if (!child) {
    child = new Node(letter);
    node.children[letter] = child;
  }
  child.count++;
  var rest = word.slice(1);
  this._addNode(child, rest);
};

Trie.prototype.find = function (word) {
  if (!this.root)
    return -1;
  return this._find(this.root, word);
};
Trie.prototype._find = function (node, word) {
  if (!node || !word)
    return -1;
  var letter = word.charAt(0);
  var child = node.children[letter];
  if (child) {
    var rest = word.slice(1);
    return (!rest) ? child.count : this._find(child, rest);
  }
  else 
    return 0;
};

// Test prototype
function main() {
  var trie = new Trie();
  var n = parseInt(INPUT);
  for(var i = 0; i < n; i++) {
    var temp = INPUT.split(' ');
    var op = temp[0];
    var contact = temp[1];
      
    if (op == "add")
      trie.add(contact);
    else if (op == "find")
      console.log(trie.find(contact));
  }
}
