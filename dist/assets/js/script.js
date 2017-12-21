(function () {
  const items = document.querySelectorAll('.countdown');
  countdown.init(items);

  const popup = $('.popup-overlay');
  $('.show-popup').on('click', e => {
    e.preventDefault();
    popup.addClass('opened');
  });

  $('.popup').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e = event || window.event;
    if (e.target == this) {
      $('.popup-overlay').removeClass('opened');
    }
  });

  $('.popup .close').on('click', function (e) {
    e.preventDefault();
    $('.popup-overlay').removeClass('opened');
  });

  $('.xs-menu-btn').on('click', function (e) {
    e.preventDefault();
    $('.xs-menu').addClass('opened');
  });

  $('.xs-menu .close').on('click', function (e) {
    e.preventDefault();
    $('.xs-menu').removeClass('opened');
  });

  const links = $('header .link');

  [].forEach.call(links, function (link) {
    $(link).on('click', function (e) {
      e.preventDefault();
      $('.xs-menu').removeClass('opened');
      const href = $(this).attr('href');
      $('body,html').animate({
        scrollTop: $(href).offset().top - 110
      }, 800);
    });
  });

  //calculator

  const incomeHtml = $('.calculator .income span');
  const incomePersentHtml = $('.calculator .income-percent span');
  const preSaleX = $('.calculator .pre-sale .x');
  const preSaleY = $('.calculator .pre-sale .y');
  const preSaleZ = $('.calculator .pre-sale .z');
  const tokenSaleX = $('.calculator .token-sale .x');
  const tokenSaleY = $('.calculator .token-sale .y');
  const tokenSaleZ = $('.calculator .token-sale .z');
  const closedRaundX = $('.calculator .closed .x');
  const closedRaundY = $('.calculator .closed .y');
  const closedRaundZ = $('.calculator .closed .z');
  const afterRaundX = $('.calculator .after .x');
  const afterRaundY = $('.calculator .after .y');
  const afterRaundZ = $('.calculator .after .z');
  const rangeValue = $('.calculator .range .value');
  const range = $('.calculator input[type="range"]');
  range.rangeslider({
    polyfill: false,
    onSlide: function (position, value) {
      const width = rangeValue.width();
      rangeValue.css('left', position - width / 3 + 'px');
      rangeValue.text(value);
      if (value % 500 === 0) {
        calculate(position, value);
      }
    }
  });

  function calculate(position, value) {
    const factors = factor(value);
    const incomeValue = income(value, factors);
    const incomePersentValue = Math.floor(incomePersent(value, factors));
    const preSaleValue = preSale(value, factors);
    const tokenSaleValue = tokenSale(value, factors);
    const closedRaundValue = closedRaund(value, factors);
    const afterRaundValue = afterRaund(value, factors);

    incomeHtml.text(incomeValue);
    incomePersentHtml.text(incomePersentValue);

    preSaleX.text(preSaleValue.x);
    preSaleY.text(preSaleValue.y);
    preSaleZ.text(preSaleValue.z);

    closedRaundX.text(closedRaundValue.x);
    closedRaundY.text(closedRaundValue.y);
    closedRaundZ.text(closedRaundValue.z);

    afterRaundX.text(afterRaundValue.x);
    afterRaundY.text(afterRaundValue.y);
    afterRaundZ.text(afterRaundValue.z);

    tokenSaleX.text(tokenSaleValue.x);
    tokenSaleY.text(tokenSaleValue.y);
    tokenSaleZ.text(tokenSaleValue.z);
  }

  function factor(value) {
    let a = 5;
    let b = 1;
    if (value >= 2000 && value < 20000) {
      a = 4;
      b = 5;
    } else if (value >= 20000 && value < 50000) {
      a = 3;
      b = 4;
    } else if (value >= 50000) {
      a = 2;
      b = 3;
    }
    return { a, b };
  }

  function income(value, factor) {
    return value < 2000 ? Math.floor(8.5 * value / factor.a - value) : Math.floor(72.25 * value / factor.a * factor.b - value);
  }

  function incomePersent(value, factor) {
    return value < 2000 ? Math.floor((8.5 - factor.a) / factor.a * 100) : Math.floor((72.25 - factor.a * factor.b) / factor.a * factor.b * 100);
  }

  function preSale(value, factor) {
    return { x: value, y: Math.floor(value / factor.a), z: factor.a };
  }

  function tokenSale(value, factor) {
    return { x: Math.floor(value / factor.a), y: Math.floor(8.5 * value / factor.a), z: Math.floor(8.5 * value / factor.a - value) };
  }

  function closedRaund(value, factor) {
    return { x: Math.floor(8.5 * value / factor.a), y: Math.floor(8.5 * value / (factor.a * factor.b)), z: factor.b };
  }

  function afterRaund(value, factor) {
    return {
      x: Math.floor(8.5 * value / (factor.a * factor.b)),
      y: Math.floor(72.25 * value / (factor.a * factor.b)),
      z: Math.floor(72.25 * value / (factor.a * factor.b) - 8.5 * value / (factor.a * factor.b))
    };
  }

  // command

  const commandHeadsList = document.querySelector('.heads .scroll-menu ul');
  const commandList = document.querySelector('.departments .scroll-menu ul');
  if (commandList.addEventListener) {
    commandList.addEventListener("mousewheel", mouseWheelHandler(), false);
    commandList.addEventListener("DOMMouseScroll", mouseWheelHandler(), false);
    commandList.addEventListener("mousewheel", mouseWheelHandler(), false);
    commandList.addEventListener("DOMMouseScroll", mouseWheelHandler(), false);

    commandHeadsList.addEventListener("mousewheel", mouseWheelHandler(), false);
    commandHeadsList.addEventListener("DOMMouseScroll", mouseWheelHandler(), false);
    commandHeadsList.addEventListener("mousewheel", mouseWheelHandler(), false);
    commandHeadsList.addEventListener("DOMMouseScroll", mouseWheelHandler(), false);
  } else {
    commandList.attachEvent("onmousewheel", mouseWheelHandler());
    commandList.attachEvent("onmousewheel", mouseWheelHandler());

    commandHeadsList.attachEvent("onmousewheel", mouseWheelHandler());
    commandHeadsList.attachEvent("onmousewheel", mouseWheelHandler());
  }

  let slickSlider = null; // for sliders
  const components = document.querySelectorAll('.tabs');
  components.forEach(el => {
    //sliders in departments block
    const withSliders = el.className.split(" ")[1] === 'departments';
    const list = el.querySelector('.tabs-list');
    const tabs = list.querySelectorAll('a');
    const container = el.querySelector('.tabs-container');
    const containers = container.querySelectorAll('.container');

    tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.preventDefault();
        const index = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        containers.forEach(c => {
          c.classList.remove('active');
          let slider = c.querySelector('.slider');
          if (c.dataset.tab === index) {
            c.classList.add('active');
            withSliders && initSlick(slider);
          }
        });
        tab.classList.add('active');
      });
    });
    tabs[0].click();
  });

  function mouseWheelHandler() {
    return function (e) {
      e.preventDefault();
      const event = window.event || e;
      const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
      this.scrollLeft += (delta < 0 ? 1 : -1) * 30;
    };
  }

  function initSlick(item) {
    destroySlick();
    if (item) {
      slickSlider = $(item).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [{
          breakpoint: 600,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    }
  }

  function destroySlick() {
    slickSlider && $(slickSlider).slick('unslick');
  }

  //roadmap

  const roadmap = $('.line-slider');
  const roadmapRange = $('.line-slider-menu input[type="range"]');
  const roadmapNext = $('.line-slider-menu .next');
  const roadmapPrev = $('.line-slider-menu .prev');
  roadmapRange.rangeslider({
    polyfill: false,
    onSlide: function (position, value) {
      roadmap.scrollLeft(value);
    }
  });
  roadmapNext.on('click', e => {
    e.preventDefault();
    const range = roadmapRange.val();
    if (range < 4000) {
      roadmapRange.val(+range + 100);
      roadmapRange.rangeslider('update', true);
    }
  });
  roadmapPrev.on('click', e => {
    e.preventDefault();
    const range = roadmapRange.val();
    if (range > 0) {
      roadmapRange.val(+range - 100);
      roadmapRange.rangeslider('update', true);
    }
  });

  const el = document.querySelector('.wrapper-slide');
  const data = [{ x: 0, y1: 5000, y2: 128154, title: { y1: '6000', y2: '138 154' } }, { x: 1, y1: 6000, y2: 138154, title: { y1: '6000', y2: '138 154' } }, { x: 2, y1: 8500, y2: 169162, title: { y1: '8500', y2: '189 162' } }, { x: 3, y1: 12700, y2: 210000, title: { y1: '21 500', y2: '477 500' } }, { x: 4, y1: 19500, y2: 250000, title: { y1: '45 000', y2: '999 320' } }];

  let width = 4000;
  let height = 200;
  let margin = 20;
  let svg = d3.select(el).append('svg:svg').attr('class', 'line-svg-slider').attr('width', width + 2 * margin).attr('height', height + 4 * margin).append("g").attr("transform", "translate(0," + 3 * margin + ")");

  let x = d3.scaleTime().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  x.domain(d3.extent(data, function (d) {
    return d.x;
  }));
  y.domain([0, d3.max(data, function (d) {
    return d.y2;
  })]);

  let line = d3.line().curve(d3.curveCardinal).x(d => x(d.x)).y(d => y(d.y));

  let data1 = data.map(item => ({ x: item.x, y: item.y1, title: item.title.y1 }));
  let data2 = data.map(item => ({ x: item.x, y: item.y2, title: item.title.y2 }));

  createLine(data1, '#ea483c', '1');
  createLine(data2, '#4fa3d6', '2');

  function createLine(dataLine, color, title) {
    let path = svg.append("path").data([dataLine]).attr("class", `line-${title}`).attr('stroke', color).attr('stroke-width', 4).attr('fill', 'transparent').attr("d", line);

    let dots = svg.selectAll("dot").data(dataLine).enter().filter((item, i) => {
      return i > 0 && i < 5;
    }).append('circle').attr('class', 'dot').attr('fill', color).attr('stroke', 'white').attr('stroke-width', 2).attr('cx', d => x(d.x)).attr('cy', d => y(d.y)).attr('r', 7).append('text').text(d => d.title).attr('style', 'color:' + color + '; font-size: 36px; font-weight: 400; font-family: "Gotham Pro", Arial, sans-serif');

    let titles = svg.selectAll("dot").data(dataLine).enter().filter((item, i) => {
      return i > 0 && i < 5;
    }).append('text').attr('class', 'title').text(d => d.title).attr('style', 'fill:' + color + '; font-size: 36px; font-weight: 400; font-family: "Gotham Pro", Arial, sans-serif').attr('dy', d => y(d.y) - 20).attr('dx', d => x(d.x)).attr('text-anchor', 'end');
  }
})();

(function () {
  //top chart
  const data = [{ x: 0, y: 10 }, { x: 1, y: 11 }, { x: 2, y: 15 }, { x: 3, y: 10 }, { x: 4, y: 10 }, { x: 5, y: 9 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 9 }, { x: 9, y: 12 }, { x: 10, y: 15 }, { x: 11, y: 16 }, { x: 12, y: 14 }, { x: 13, y: 14 }, { x: 14, y: 10 }, { x: 15, y: 8 }, { x: 16, y: 9 }, { x: 17, y: 10 }, { x: 18, y: 12 }, { x: 19, y: 14 }, { x: 20, y: 15 }, { x: 21, y: 13 }, { x: 22, y: 13 }, { x: 23, y: 13 }, { x: 24, y: 15 }, { x: 25, y: 18 }, { x: 26, y: 10 }, { x: 27, y: 17 }, { x: 28, y: 20 }, { x: 29, y: 21 }, { x: 30, y: 16 }, { x: 31, y: 20 }, { x: 32, y: 22 }, { x: 33, y: 24 }, { x: 34, y: 25 }, { x: 35, y: 25 }];

  let index = 11;
  let extData = [];
  for (var i = 0; i <= index; i++) {
    extData.push(data[i]);
  }

  const el = document.getElementById('chart');
  let width = el.getBoundingClientRect().width;
  let height = 290;
  let margin = 20;

  let svg = d3.select(el).append('svg:svg').attr('class', 'line-svg').attr('width', width).attr('height', height).append("g").attr("transform", "translate(0," + 3 * margin + ")");

  let x = d3.scaleTime().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  x.domain(d3.extent(data, function (d) {
    return d.x;
  }));
  y.domain([0, d3.max(data, function (d) {
    return d.y;
  })]);

  let valueline = d3.line().curve(d3.curveCardinal).x(d => x(d.x)).y(d => y(d.y));

  let area = d3.area().curve(d3.curveCardinal).x(d => x(d.x)).y0(height).y1(d => y(d.y));

  svg.append("path").data([data]).attr("class", "line-area").attr("d", area);

  svg.append("path").data([data]).attr("class", "line").attr('stroke', 'rgba(0,0,0,.2)').attr('stroke-width', 4).attr('fill', 'transparent').attr("d", valueline);

  let progress = svg.append("path").data([extData]).attr("class", "line-progress").attr('stroke', '#1492ff').attr('stroke-width', 4).attr('fill', 'transparent').attr("d", valueline).attr("stroke-dasharray", width).attr("stroke-dashoffset", width).transition().duration(2000).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

  let dot = svg.append('circle').attr('class', 'dot').attr('r', 0).attr('fill', '#1492ff').attr('stroke', 'white').attr('stroke-width', 2).attr('cx', d => x(extData[extData.length - 1].x)).attr('cy', d => y(extData[extData.length - 1].y)).transition().duration(200).delay(1200).attr('r', 7);

  let text = svg.append('text').attr('class', 'dot-text').text('$135 668').attr('dx', d => x(extData[extData.length - 1].x) - 50).attr('dy', d => y(extData[extData.length - 1].y) - 10).attr('style', 'fill: #252729; font-size: 18px; font-weight: 400; font-family: "Gotham Pro", Arial, sans-serif');

  d3.select(window).on('resize.line', () => {
    let w = $(el).width();
    svg.attr('width', w);
    x.range([0, w]);
    svg.select('.line').attr("d", valueline);
    svg.select('.line-progress').attr("d", valueline);
    svg.select('.line-area').attr("d", area);
    svg.select('.dot').attr('cx', d => x(extData[extData.length - 1].x)).attr('cy', d => y(extData[extData.length - 1].y));
    svg.select('.dot-text').attr('dx', d => x(extData[extData.length - 1].x) - 50).attr('dy', d => y(extData[extData.length - 1].y) - 10);
  });
})();

(function () {
  //histogram

  let svg = null;
  const labels = ['Pre-Sale', 'Main Sale', 'Розничная цена'];
  const income = $('#histogram .income');
  const el = document.getElementById('histogram');
  const height = 200;
  const margin = 50;
  const blockWidth = 300;
  let yAxisLength = height - margin * 2;
  let xAxisLength = blockWidth;

  let x = d3.scaleBand().domain(labels).range([0, xAxisLength]);

  let y = d3.scaleLinear().domain([0, 10]).range([yAxisLength, 0]);

  let xAxis = d3.axisBottom(x).ticks(1);

  let yAxis = d3.axisLeft(y).ticks(1).tickSizeInner(-xAxisLength);

  const profit = ['40-50%', '50-60%', '60-70%', '70-80%'];

  const tabs = $('.histogramm ul a');
  [].forEach.call(tabs, tab => {
    $(tab).on('click', e => {
      e.preventDefault();
      const index = $(tab).data('index');
      const info = getInfo(index);
      const svg = document.getElementById('histogram').querySelector('svg');
      $('.histogramm ul a').removeClass('active');
      $(tab).addClass('active');
      if (svg) {
        updateHistogram(info);
      } else {
        drawHistogram(info);
      }
    });
  });

  tabs[0].click();

  function getInfo(index) {
    const data = [{ label: 'Pre-Sale', values: [2, 3, 4, 5] }, { label: 'Main Sale', values: [3, 4, 5, 6] }, { label: 'Розничная цена', values: [10, 10, 10, 10] }];
    return data.map(d => ({ label: d.label, value: d.values[index], income: profit[index] }));
  }

  function drawHistogram(info) {
    let index;
    svg = d3.select(el).append('svg:svg').attr('class', 'his').attr('width', blockWidth).attr('height', height + 2 * margin).append("g").attr("transform", "translate(0," + margin + ")");

    svg.append('g').attr('class', 'x-axis').call(xAxis);

    svg.append('g').attr('class', 'y-axis').call(yAxis);

    let bar = svg.selectAll('.rect').data(info).enter().append('rect').attr('x', function (d) {
      return x(d.label) + 10;
    }).attr('width', x.bandwidth() - 20).attr('fill', function (d, i) {
      return i === 2 ? '#ea4a3e' : '#41aef1';
    }).attr('class', 'rect').attr('y', function (d) {
      return y(d.value);
    }).attr('height', function (d) {
      return height - y(d.value);
    });

    const rects = $('.histogramm .rect');
    let hs = [];
    [].forEach.call(rects, r => {
      hs.push($(r).attr('height'));
    });

    income[0].innerHTML = info[0].income + '<br/>выгода';

    svg.selectAll('.tick text').attr('class', 'tick-text').attr('dy', height + 10).attr('style', 'font-size: 16px; font-family: "Gotham Pro", Arial, sans-serif; font-weight: 300; fill: #262729;').call(wrap, x.bandwidth() - 20);

    svg.selectAll('.x-axis .tick').append('text').attr('class', 'text').text((d, i) => '$' + info[i].value).attr('dy', (d, i) => height - hs[i] - 10).attr('style', 'font-size: 24px; font-family: "Gotham Pro", Arial, sans-serif; font-weight: 300; fill: #262729;');
  }

  function updateHistogram(info) {
    let bar = svg.selectAll('.rect');

    bar.exit().remove();
    bar.data(info).enter().append('rect').merge(bar).attr('fill', function (d, i) {
      return i === 2 ? '#ea4a3e' : '#41aef1';
    }).transition().duration(800).attr('y', function (d) {
      return y(d.value);
    }).attr('height', function (d) {
      return height - y(d.value);
    });

    income[0].innerHTML = info[0].income + '<br/>выгода';

    setTimeout(() => {
      const rects = $('.histogramm .rect');
      let hs = [];
      [].forEach.call(rects, r => {
        hs.push($(r).attr('height'));
      });

      svg.selectAll('.text').text((d, i) => '$' + info[i].value).transition().duration(800).attr('dy', (d, i) => height - (height - y(info[i].value)) - 10);
    });
  }

  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1,
          // ems
      y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy);
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * 20 + dy).text(word);
        }
      }
    });
  }
})();