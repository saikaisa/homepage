/* 结束加载动画 */
window.addEventListener("load", function() {
  setTimeout(() => {
          // 隐藏加载动画
          var loader = document.querySelector('.loader');
          if (loader) {
              loader.style.display = 'none';
          }
          // 显示主内容
          var mainContent = document.getElementById('main-content');
          if (mainContent) {
              
              $('.pre-text').addClass('text');
              $('.bio').addClass('ready');
              generateStaticCircles();
              addCircles();
              setTimeout(() => {
                mainContent.style.visibility = 'visible';
              }, 50);
          }
        }, 1000);  // 至少加载 1 秒
});

/* 画圆 */
// 静态圆
// 调色板
const colorPalettes = [
  ['#81ecec', '#74b9ff', '#a29bfe'], // 蓝色系
  ['#fab1a0', '#ff7675', '#fd79a8'], // 粉色系
  ['#ffeaa7', '#fab1a0', '#ff7675'], // 橙色系
  ['#55efc4', '#00cec9', '#00b894'], // 绿色系
  ['#ffeaa7', '#ffcccc', '#ffd700'] // 黄色系
];

const staticCircles = [
  { x: 0, y: 10, r: 80 },
  { x: 4, y: 0, r: 100 },
  { x: 100, y: 92, r: 80 },
  { x: 95, y: 100, r: 100 },
  { x: 98, y: 0, r: 110 },
  { x: 0, y: 99, r: 80 },
  { x: 4, y: 100, r: 60 }
];

// 生成静态背景圆的函数
function generateStaticCircles() {
  const selectedPalette = randomPalette(); // 随机选择一个颜色组
  staticCircles.forEach((circle, index) => {
    addStaticCircle(circle.x, circle.y, circle.r, selectedPalette[index % selectedPalette.length]);
  });
}

// 创建单个静态圆的函数
function addStaticCircle(x, y, radius, color) {
  var circle = document.createElement('div');
  circle.classList.add('circle', 'static');
  
  // 设置位置
  circle.style.left = x + 'vw';
  circle.style.top = y + 'vh';
  
  // 使用 transform 来确保圆心对齐
  circle.style.transform = 'translate(-50%, -50%)';
  
  // 设置圆的大小
  circle.style.width = radius * 2 + 'px';
  circle.style.height = radius * 2 + 'px';
  circle.style.borderRadius = '50%';
  
  // 使用传入的颜色
  circle.style.backgroundColor = color;
  
  // 添加到 body 中
  document.body.appendChild(circle);
}

// 随机选择一个颜色组
function randomPalette() {
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}

// 动态圆
function addCircles() {
  addCircle(...randomPosition()); // 生成第一个圆
}

function addCircle(x, y) {
  var circle = document.createElement('div');

  circle.classList.add('circle', 'dynamic');
  
  // 设置圆的位置
  circle.style.left = x + 'vw';
  circle.style.top = y + 'vh';
  circle.style.backgroundColor = randomColor();

  // 监听动画结束后再移除圆
  circle.addEventListener('animationend', () => {
      removeCircle(circle);
      
      // 等待 800 毫秒后生成下一个圆
      setTimeout(() => {
        addCircle(...randomPosition());
    }, 800); 
  });

  document.body.appendChild(circle);
}

function removeCircle(circle) {
  document.body.removeChild(circle);
}

function randomPosition() {
  return [
      Math.random() * 95 + 1,
      Math.random() * 90 + 1
  ];
}

function randomColor() {
  const colors = [
      '#81ecec',
      '#74b9ff',
      '#a29bfe',
      '#ffeaa7',
      '#fab1a0',
      '#ff7675',
      '#fd79a8'
  ];
  return colors[Math.round(Math.random() * (colors.length - 1))];
}


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