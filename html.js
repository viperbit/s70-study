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
    this.el.innerHtml = '';
  };
  fn.add = function(task) {
    this._el.appendchild(this._item.add(task));
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
    el.querySelector('p').innerHtml = task;
    var taskManager = this._taskManager;
    var btns = el.querySelectorAll('input');
    btns[0].onClick = function() {
      taskManager.toggle(task);
    };
    btns[1].onClick = function() {
      taskManager.remove(task);
    };
    return el;
  };
  return Item;
})();

// var Html = (function() {
//   var Html = function() {};
//   Html.prototype = new Renderer();
//   var fn = Html.prototype;
//   fn._init = function() {
//     if (
//       typeof this.completeLi !== 'undefined' &&
//       typeof this.progressLi !== 'undefined'
//     )
//       return;
//     this.progressLi = document.querySelector('#todo .progress li');
//     this.completeLi = document.querySelector('#todo .complete li');

//     this.progressLi.parentNode.removeChild(this.progressLi);
//     this.completeLi.parentNode.removeChild(this.completeLi);

//     console.log('task 입력을 처리할 코드');
//   };
//   fn._render = function() {
//     if (
//       typeof this.completeLi === 'undefined' ||
//       typeof this.progressLi === 'undefined'
//     ) {
//       return;
//     }
//     this.progress = document.querySelector('#todo .progress');
//     this.complete = document.querySelector('#todo .complete');
//     // 각 목록(진행, 완료)을 비우기
//     this.progress.innerHTML = '';
//     this.complete.innerHTML = '';

//     var self = this;
//     for (var i = 0; i < self.tasks.length; i++) {
//       (function() {
//         var task, child, inputs;
//         task = self.tasks[i];
//         if (task.isComplete()) {
//           child = self.progressLi.cloneNode(true);
//           //(기존코드) child.querySelector('p').innerHTML = task.title;
//           // task의 toString 메서드로 title 값을 출력한다.
//           child.querySelector('p').innerHTML = task;
//           // 각 input 태그에 기능넣기
//           inputs = child.querySelectorAll('input');
//           //inputs[0].setAttribute('data-task-id', task.id);
//           inputs[0].onclick = function() {
//             //this.todo.toggle(this.getAttribute('data-task-id'));
//             self.todo.toggle(task);
//           };
//           //inputs[1].setAttribute('data-task-id', task.id);
//           inputs[1].onclick = function() {
//             //this.todo.remove(this.getAttribute('data-task-id'));
//             self.todo.remove(task);
//           };
//           progress.appendChild(child);
//         } else {
//           child = self.completeLi.cloneNode(true);
//           child.querySelector('p').innerHTML = task;
//           inputs = child.querySelectorAll('input');
//           inputs[0].onclick = function() {
//             self.todo.toggle(task);
//           };
//           inputs[1].onclick = function() {
//             self.todo.remove(task);
//           };
//           self.complete.appendChild(child);
//         }
//       })();
//     }
//     console.log('// 할일 입력창을 비운다.');
//   };
// })();
