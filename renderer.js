function Renderer() {}

Renderer.prototype.init = function(taskManager) {
  this.taskManager = taskManager;
  this._init();
};
Renderer.prototype.render = function(tasks) {
  this.tasks = tasks;
  this._render();
};
Renderer.prototype._init = function() {
  throw '_init must me override';
};
Renderer.prototype._render = function() {
  throw '_render must be overide';
};
