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
