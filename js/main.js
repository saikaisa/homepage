// /* 结束加载动画 */
// document.addEventListener("DOMContentLoaded", function() {
//   var startTime = new Date().getTime();
//   var minimumLoadingTime = 500; // 最少的加载时间

//   var checkLoadingTime = function() {
//       var currentTime = new Date().getTime();
//       var elapsedTime = currentTime - startTime;

//       if (elapsedTime >= minimumLoadingTime) {
//           // 隐藏加载动画
//           var loader = document.querySelector('.loader');
//           if (loader) {
//               loader.style.display = 'none';
//           }
//           // 显示主内容
//           var mainContent = document.getElementById('main-content');
//           if (mainContent) {
//               mainContent.style.visibility = 'visible';
//               addCircles();
//           }
//       } else {
//           setTimeout(checkLoadingTime, minimumLoadingTime - elapsedTime);
//       }
//   };
//   checkLoadingTime();
// });
// 有 BUG：加载动画启用时，bio 的过渡效果没了

window.addEventListener('load', () => {
  $('h1').addClass('ready');
  $('.bio').addClass('ready');
  $('li').addClass('ready');
});

/* 字母过渡动画 */
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      var firstPart = document.querySelector('.first-part');
      var secondPart = document.querySelector('.second-part');
      var firstTransitionCompleted = false;
      var secondTransitionCompleted = false;

      firstPart.style.transform = 'translateX(-20%)';
      secondPart.style.transform = 'translateX(-42%)';
      secondPart.style.opacity = '1';

      var checkTransitions = function() {
          if (firstTransitionCompleted && secondTransitionCompleted) {
              firstPart.style.transition = 'none';
              secondPart.style.transition = 'none';
              firstPart.style.transform = 'translateX(0%)';
              secondPart.style.transform = 'translateX(0%)';
              secondPart.style.position = 'static';
          }
      };

      firstPart.addEventListener('transitionend', function() {
          firstTransitionCompleted = true;
          checkTransitions();
      });

      secondPart.addEventListener('transitionend', function() {
          secondTransitionCompleted = true;
          checkTransitions();
      });
  }, 2000);
});

/* 画圆 */
var timer = 350;

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