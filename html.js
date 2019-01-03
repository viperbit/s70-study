var ListManager = (function() {
  var ListManager = function(add, pList, cList) {
    if (typeof add !== 'function') throw 'add is not a function';
    if (!(pList instanceof List) || !(cList instanceof List))
      throw 'list object must be created with new';
    this._add = add;
    this._pList = pList;
    this._cList = cList;
    this._isInitialized = false;
  };
  ListManager.prototype = new Renderer();
  var fn = ListManager.prototype;
  fn._init = function() {
    if (this._isInitialized) return;
    this._isInitialized = true;
    //console.log('taskmanager:',this._taskManager)
    this._add(this._taskManager);
    this._pList.init(this._taskManager);
    this._cList.init(this._taskManager);
  };
  fn._render = function() {
    var task;
    this._pList.clear();
    this._cList.clear();
    for (var i = 0; i < this._tasks.length; i++) {
      task = this._tasks[i];
      if (task.isComplete()) this._cList.add(task);
      else this._pList.add(task);
    }
  };
  return ListManager;
})();

var List = (function() {
  var containers = {};
  var List = function(selector, item) {
      if (!(item instanceof Item)) throw 'item object must be created with new';

      if (typeof selector !== 'string') throw 'Type of selector must be string';

      if (containers[selector]) throw 'Already defined List';

      this._el = containers[selector] = selector;
      this._item = item;
      this._isInitialized = false;
    },
    fn = List.prototype;
  fn.init = function(taskManager) {
    if (this._isInitialized) return;
    this._isInitialized = true;
    this._el = document.querySelector(this._el);
    this._item.init(taskManager);
  };
  fn.clear = function() {
    this._el.innerHTML = '';
  };
  fn.add = function(task) {
    this._el.appendChild(this._item.add(task));
  };
  return List;
})();

var Item = (function() {
  var items = {};
  var Item = function(selector) {
      if (typeof selector !== 'string') throw 'Type of selector must be string';
      if (items[selector]) throw 'Already defined Item';
      this._isInitialized = false;
      this._el = items[selector] = selector;
    },
    fn = Item.prototype;

  fn.init = function(taskManager) {
    if (this._isInitialized) return;
    this._isInitialized = true;
    var el = document.querySelector(this._el);
    this._el = el;
    if (el.parentNode) el.parentNode.removeChild(el);
    this._taskManager = taskManager;
  };
  fn.add = function(task) {
    var el = this._el.cloneNode(true);
    el.querySelector('p').innerHTML = task;
    var taskManager = this._taskManager;
    var btns = el.querySelectorAll('input');
    btns[0].onclick = function() {
      taskManager.toggle(task);
    };
    btns[1].onclick = function() {
      taskManager.remove(task);
    };
    return el;
  };
  return Item;
})();
