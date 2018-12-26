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
