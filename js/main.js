/* 结束加载动画 */
document.addEventListener("DOMContentLoaded", function() {
  var startTime = new Date().getTime();
  var minimumLoadingTime = 2000; // 最少的加载时间

  var checkLoadingTime = function() {
      var currentTime = new Date().getTime();
      var elapsedTime = currentTime - startTime;

      if (elapsedTime >= minimumLoadingTime) {
          // 隐藏加载动画
          var loader = document.querySelector('.loader');
          if (loader) {
              loader.style.display = 'none';
          }
          // 显示主内容
          var mainContent = document.getElementById('main-content');
          if (mainContent) {
              mainContent.style.visibility = 'visible';
              $('.bio').addClass('ready');
              $('.pre-text').addClass('text');
              addCircles();
          }
      } else {
          setTimeout(checkLoadingTime, minimumLoadingTime - elapsedTime);
      }
  };
  checkLoadingTime();
});

/* 画圆 */
var timer = 500;

function addCircles() {
	setTimeout(() => {
		addCircle(...randomPosition());
		addCircles();
	}, timer);
}

function addCircle(x, y) {
	var circle = document.createElement('div');
	var animationTime = Math.round(Math.random() * 10);
	circle.classList.add('circle');
	circle.style.left = x + 'vw';
	circle.style.top = y + 'vh';
	circle.style.backgroundColor = randomColor();
	circle.style.setProperty('--grow-time', `${animationTime}s`);

	requestAnimationFrame(() => {
		document.body.appendChild(circle);
		setTimeout(removeCircle.bind(this, circle), animationTime * 1000);
	});
}

function removeCircle(circle) {
	document.body.removeChild(circle);
}

function randomPosition() {
	return [
		Math.random() * 95 + 1,
		Math.random() * 90 + 1];
}

function randomColor() {
	const colors = [
		'#81ecec',
		'#74b9ff',
		'#a29bfe',
		'#ffeaa7',
		'#fab1a0',
		'#ff7675',
		'#fd79a8'];
	return colors[Math.round(Math.random() * colors.length)];
}
/*--*/
class Rail {

  static getInstance(selector) {
    if (!Rail.instances) Rail.instances = {};
    if (!Rail.instances[selector]) Rail.instances[selector] = new Rail(selector);
    return Rail.instances[selector];
  }

  static filter(arr, func) {
    const res = [];
    for (let item of arr) if (func(item)) res.push(item);
    return res;
  }

  constructor(selector) {
    this.ele = document.querySelectorAll(selector);
  }

  addClass(className) {
    for (let item of this.ele) {
      const classArr = Rail.filter(item.className.split(' '), (cls) => !!cls);
      classArr.push(className);
      item.className = classArr.join(' ');
    }
    return this;
  }

  removeClass(className) {
    for (let item of this.ele) {
      const classArr = item.className.split(' ');
      item.className = Rail.filter(classArr, (cls) => cls !== className).join(' ');
    }
    return this;
  }

  getOrigionalElement(idx) {
    if (!!idx) return this.ele[idx];
    return this.ele;
  }

  setStyle(styleName, styStr) {
    for (let item of this.ele) {
      item.style[styleName] = styStr;
    }
    return this;
  }
}
window.$ = (selector) => {
  return Rail.getInstance(selector);
};