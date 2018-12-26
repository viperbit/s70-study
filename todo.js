var Task = (function() {
  var p = {},
    c = {};
  var Task = function(title) {
    this._title = title;
    this._state = p;
  };
  Task.prototype.isComplete = function() {
    return this._state === c;
  };
  Task.prototype.toggle = function() {
    if (this._state === c) this._state = p;
    else this._state = c;
  };
  Task.prototype.toString = function() {
    return this._title;
  };
  return Task;
})();

var Html = function() {};
Html.prototype = new Renderer();
Html.prototype._init = function() {
  //host = todo;
  this.progressLi = document.querySelector('#todo .progress li');
  this.completeLi = document.querySelector('#todo .complete li');
  this.progressLi.parentNode.removeChild(this.progressLi);
  this.completeLi.parentNode.removeChild(this.completeLi);
};
Html.prototype._render = function() {
  if (
    typeof this.completeLi === 'undefined' ||
    typeof this.progressLi === 'undefined'
  ) {
    return;
  }
  this.progress = document.querySelector('#todo .progress');
  this.complete = document.querySelector('#todo .complete');
  // 각 목록(진행, 완료)을 비우기
  this.progress.innerHTML = '';
  this.complete.innerHTML = '';

  var self = this;
  for (var i = 0; i < self.tasks.length; i++) {
    (function() {
      var task, child, inputs;
      task = self.tasks[i];
      if (task.isComplete()) {
        child = self.progressLi.cloneNode(true);
        //(기존코드) child.querySelector('p').innerHTML = task.title;
        // task의 toString 메서드로 title 값을 출력한다.
        child.querySelector('p').innerHTML = task;
        // 각 input 태그에 기능넣기
        inputs = child.querySelectorAll('input');
        //inputs[0].setAttribute('data-task-id', task.id);
        inputs[0].onclick = function() {
          //this.todo.toggle(this.getAttribute('data-task-id'));
          self.todo.toggle(task);
        };
        //inputs[1].setAttribute('data-task-id', task.id);
        inputs[1].onclick = function() {
          //this.todo.remove(this.getAttribute('data-task-id'));
          self.todo.remove(task);
        };
        progress.appendChild(child);
      } else {
        child = self.completeLi.cloneNode(true);
        child.querySelector('p').innerHTML = task;
        inputs = child.querySelectorAll('input');
        inputs[0].onclick = function() {
          self.todo.toggle(task);
        };
        inputs[1].onclick = function() {
          self.todo.remove(task);
        };
        self.complete.appendChild(child);
      }
    })();
  }
  console.log('// 할일 입력창을 비운다.');
};

var Con = function() {};
Con.prototype = new Renderer();
Con.prototype._init = function() {
  console.clear();
};
Con.prototype._render = function() {
  var task;
  console.log('진행');
  for (var i = 0; i < tasks.length; i++) {
    task = this.tasks[i];
    if (task.state === STATE.PROGRESS()) {
      console.log(task.id + '.', task.title + '(' + task.state + ')');
    }
  }
  console.log('완료');
  for (var i = 0; i < tasks.length; i++) {
    task = this.tasks[i];
    if (task.state === STATE.COMPLETE()) {
      console.log(task.id + '.', task.title + '(' + task.state + ')');
    }
  }
};

var TaskManager = (function() {
  var TaskManager = function() {
    this._tasks = [];
    this._renderer = null;
  };
  var fn = TaskManager.prototype;
  fn._render = function() {
    this._renderer.render(this._tasks.slice(0));
  };
  fn._checkTask = function() {
    return task instanceof Task && this._tasks.indexIf(task) > -1;
  };
  fn.setRenderer = function(renderer) {
    if (!(renderer instanceof Renderer)) return;
    this._renderer = renderer;
    renderer.init(this);
  };
  fn.add = function(title) {
    this._tasks.push(new Task(title));
    this._render();
  };
  fn.remove = function(task) {
    var tasks = this._tasks;
    if (this._checkTask(task)) tasks.splice(indexOf(task), 1);
    this._render();
  };
  fn.toggle = function(task) {
    if (this._checkTask(task)) task.toggle();
    this._render();
  };
  return TaskManager;
})();
var html = new Html();
var con = new Con();

todo.setRenderer(html);
