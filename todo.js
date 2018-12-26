var STATE = (function() {
  var p = {
    toString: function() {
      return '진행';
    }
  };
  var c = {
    toString: function() {
      return '완료';
    }
  };
  return {
    PROGRESS: function() {
      return p;
    },
    COMPLETE: function() {
      return c;
    }
  };
})();

var todo = (function() {
  var tasks = [];
  var target;
  var addTask = (function() {
    var id = 0;

    return function(title) {
      var result = id;
      tasks.push({ id: id++, title: title, state: STATE_P });
      render();
      return result;
    };
  })();

  var removeTask = function(id) {
    var isRemoved = false;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
        isRemoved = true;
        break;
      }
    }

    if (!isRemoved) {
      warning('삭제된거 없음(removeTask : invalid id)');
    }
    render();
  };

  var changeState = function(id, state) {
    var ID = false,
      STATE;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        ID = id;
        break;
      }
    }
    if (ID === false) {
      warning('changeState : invalid id - ' + id);
      return;
    }
    STATE = state;

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === ID) {
        tasks[i].state = STATE;
        break;
      }
    }
    render();
  };

  var warning = console.log;

  var init = function() {
    target.init();
  };
  var render = function() {
    target.render(Object.assign(tasks), STATE_P, STATE_C);
  };

  return {
    init: init,
    add: addTask,
    remove: removeTask,
    toggle: function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          if (tasks[i].state === STATE_P) changeState(id, STATE_C);
          else changeState(id, STATE_P);

          break;
        }
      }
    },
    setRenderer: function(renderer) {
      if (
        typeof renderer.init !== 'function' ||
        typeof renderer.render !== 'function'
      )
        return;
      target = renderer;
      target.init();
    }
  };
})();

var html = (function() {
  var host, progressLi, completeLi;

  return {
    init: function(todo) {
      host = todo;
      progressLi = document.querySelector('#todo .progress li');
      completeLi = document.querySelector('#todo .complete li');
      progressLi.parentNode.removeChild(progressLi);
      completeLi.parentNode.removeChild(completeLi);
    },
    render: function(tasks, STATE_P, STATE_C) {
      if (
        typeof completeLi === 'undefined' ||
        typeof progressLi === 'undefined'
      ) {
        return;
      }
      //목록 찾기
      var progress = document.querySelector('#todo .progress');
      var complete = document.querySelector('#todo .complete');
      // 각 목록(진행, 완료)을 비우기
      progress.innerHTML = '';
      complete.innerHTML = '';

      var task, child, inputs;
      for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (task.state === STATE_P) {
          child = progressLi.cloneNode(true);
          child.querySelector('p').innerHTML = task.title;
          // 각 input 태그에 기능넣기
          inputs = child.querySelectorAll('input');
          inputs[0].setAttribute('data-task-id', task.id);
          inputs[0].onclick = function() {
            host.toggle(this.getAttribute('data-task-id'));
          };
          inputs[1].setAttribute('data-task-id', task.id);
          inputs[1].onclick = function() {
            host.remove(this.getAttribute('data-task-id'));
          };

          progress.appendChild(child);
        } else if (task.state === STATE_C) {
          child = completeLi.cloneNode(true);
          complete.appendChild(child);
        }
      }
      console.log('// 할일 입력창을 비운다.');
    }
  };
})();
var con = (function() {
  return {
    init: function() {
      // 콘솔을 깨끗하게 비워주자!
      console.clear();
    },
    render: function(tasks, STATE_P, STATE_C) {
      var task;
      console.log('진행');
      for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (task.state === STATE_P) {
          console.log(task.id + '.', task.title + '(' + task.state + ')');
        }
      }
      console.log('완료');
      for (var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (task.state === STATE_C) {
          console.log(task.id + '.', task.title + '(' + task.state + ')');
        }
      }
    } //render 메서드 끝
  }; // return 문 끝
})();
todo.setRenderer(html);
