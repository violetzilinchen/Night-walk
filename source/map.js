const mapState = {
  choice: 1,
  reverse: false,
  exploring: false,
  pin: null,
  zoom: 1,
};

function renderMap() {
  const options = [
    [L("Direct route", "直接路线"), 18, "M178 546L263 490Q280 473 320 458L442 388Q477 372 512 349L580 302Q625 270 658 229L717 168L786 106"],
    [L("Main-road route", "沿主干道"), 20, "M178 546Q219 544 231 521Q253 475 320 458Q373 434 390 418Q421 382 462 380Q496 380 512 349Q544 304 580 302Q637 290 647 259Q650 237 658 229Q692 204 699 178Q708 154 737 154Q774 155 786 106"],
    [L("Longer route", "较长路线"), 22, "M178 546Q205 503 226 475L243 445Q254 431 287 438Q309 439 320 458Q344 469 374 441L406 416Q440 391 480 389Q504 385 512 349Q522 317 552 320Q568 321 580 302Q607 273 613 245Q624 217 658 229Q688 232 714 208Q728 191 723 163Q728 141 750 133Q768 131 786 106"],
  ];
  const points = [
    {x:320,y:458,name:L("Elephant & Castle","Elephant & Castle"),type:L("Route context","路线观察"),text:L("This junction brings several routes together. In the prototype, the road layout gives us a way to ask how busy streets and quieter alternatives can feel different at night.","这个路口汇合了多条路线。在原型中，路网帮助我们思考：繁忙的街道和安静的路线，在夜里会带来怎样不同的感受？"),question:L("What makes a street feel accessible after dark?","天黑后，什么会让一条街更容易通行？"),image:"street"},
    {x:512,y:349,name:L("A quieter crossing","较安静的路口"),type:L("Illustrated experience","示例体验"),text:L("A fictional walk pauses at a crossing where the next stretch of pavement is difficult to see. The moment invites us to think about how sightlines affect a person’s choices.","一则虚构的夜行故事停在路口：行人很难看清接下来的一段路。这个场景帮助我们思考视线怎样影响路线选择。"),question:L("What details would you want to know before choosing this crossing?","在决定走这个路口之前，你希望了解什么？"),image:"street"},
    {x:580,y:302,name:L("Walworth Road","Walworth Road"),type:L("Environment · demo","环境 · 演示"),text:L("This illustrative pin shows how a night-walk archive could present observations about lighting, visibility and what lies beyond the next corner. The location name anchors the example and the note is fictional.","这个示意点展示夜行档案怎样呈现照明、视野和街角可见度。地名用于定位示例，观察记录为虚构。"),question:L("What can a route planner reveal about the experience of walking here at night?","路线规划能呈现这里的哪些夜行体验？"),image:"c3"},
    {x:658,y:229,name:L("Pullens Gardens approach","Pullens Gardens 附近"),type:L("Care & connection","关怀与联系"),text:L("This example considers the end of a night walk, when a familiar turn or a message to someone waiting can change how the final stretch feels.","这个示例关注夜行最后一段路：熟悉的拐角，或发给等待者的一条消息，都可能改变临近目的地时的感受。"),question:L("Who might be waiting at the other end of a route?","路线的另一端，可能有谁在等待？"),image:"waiting"},
  ];
  const start = "Elephant & Castle";
  const end = "Pullens Gardens";
  const [from, to] = mapState.reverse ? [end, start] : [start, end];
  const focusPoint = points[mapState.pin];
  const scale = mapState.zoom;
  const zoomCenter = focusPoint || {x:500,y:330};
  const offsetX = Math.max(0, Math.min(1000 - 1000/scale, zoomCenter.x - 500/scale));
  const offsetY = Math.max(0, Math.min(660 - 660/scale, zoomCenter.y - 330/scale));
  const position = (x,y) => `left:${x/10}%;top:${y/6.6}%`;

  let seed = 479;
  const noise = () => {
    seed = (seed * 48271) % 2147483647;
    return seed / 2147483647;
  };
  const roads = [];
  for (let index = -9; index < 29; index += 1) {
    const origin = index * 48;
    const x = Array.from({length: 17}, (_,i) => {
      const y = i * 49 - 50;
      return `${Math.round(origin + y*.23 + Math.sin(y/105 + index*.31)*26 + noise()*11)},${y}`;
    });
    roads.push(`<polyline points="${x.join(" ")}" opacity="${(0.28 + noise()*0.45).toFixed(2)}" stroke-width="${index%4 === 0 ? 4 : 1.9}"/>`);
  }
  for (let index = -7; index < 23; index += 1) {
    const origin = index * 44;
    const y = Array.from({length: 25}, (_,i) => {
      const x = i * 46 - 50;
      return `${x},${Math.round(origin - x*.19 + Math.cos(x/133 + index*.29)*24 + noise()*10)}`;
    });
    roads.push(`<polyline points="${y.join(" ")}" opacity="${(0.25 + noise()*0.48).toFixed(2)}" stroke-width="${index%5 === 0 ? 4 : 1.8}"/>`);
  }
  const routePath = options[mapState.choice][2];
  const marker = (point, index) => `<button type="button" class="map-pin ${mapState.pin === index ? "selected" : ""}" data-map-pin="${index}" aria-label="C${index+1} · ${point.name}" aria-pressed="${mapState.pin === index}" style="position:absolute;${position(point.x,point.y)};transform:translate(-50%,-86%);pointer-events:auto" title="${point.name}">
      <svg viewBox="0 0 30 38" aria-hidden="true" width="29" height="35"><path d="M15 37C11.5 29.6 1.5 20.9 1.5 15a13.5 13.5 0 1 1 27 0C28.5 20.9 18.5 29.6 15 37Z" fill="${mapState.pin === index ? "#ffc7e4" : "#dd87b7"}" stroke="#ffc6e4" stroke-width="1.2"/><circle cx="15" cy="14.6" r="6" fill="#20192d"/><text x="15" y="18" text-anchor="middle" fill="#ffdbed" font-size="8.5" font-family="system-ui" font-weight="700">${index+1}</text></svg>
    </button>`;

  return `<section class="page map-page" id="map-page" aria-labelledby="map-title">
    <div class="page-intro">
      <p class="eyebrow">${L("02 / Explore the map","02 / 探索地图")}</p>
      <h1 id="map-title">${L("Navigate the City","走进夜间城市")}</h1>
      <p>${L("Explore three illustrated routes through South London and open the notes along the way.","探索伦敦南部的三条示意路线，打开沿途的夜行笔记。")}</p>
    </div>
    <div class="route-layout">
      <aside class="glass route-planner">
        <h2>${L("Plan a Route","规划路线")}</h2>
        <div class="route-field"><span>${L("From","出发地")}</span><div>${ico("pin")}<strong>${from}</strong></div></div>
        <div class="route-field"><span>${L("To","目的地")}</span><div>${ico("pin")}<strong>${to}</strong></div></div>
        <button class="small-btn route-swap" id="route-swap" type="button" title="${L("Swap endpoints","交换起终点")}" aria-label="${L("Swap endpoints","交换起终点")}">${ico("swap")}</button>
        <fieldset class="route-options">
          <legend>${L("Route options","路线选项")}</legend>
          ${options.map(([title, time],index) => `<label class="route-option"><input type="radio" name="nightwalk-route" id="route-choice-${index}" value="${index}" ${mapState.choice === index ? "checked" : ""}><span>${title}</span><small>${L(`≈ ${time} min`, `约 ${time} 分钟`)}</small></label>`).join("")}
        </fieldset>
        <button class="primary route-start" id="route-start" type="button">${mapState.exploring ? L("Restart Route","从头探索") : L("Explore Route","探索路线")} ${ico("arrow")}</button>
        <p class="route-status" aria-live="polite">${mapState.exploring
          ? L(`Exploring ${options[mapState.choice][0].toLowerCase()}. Select a pin to read its note.`, `正在探索${options[mapState.choice][0]}。点击地图图钉阅读笔记。`)
          : L("Illustrative routes and durations for exploring the archive.","路线与时长为示意，用于探索档案。")}</p>
      </aside>
      <section class="route-map" aria-label="${L("South London schematic route map","伦敦南部示意路线图")}" style="position:relative;overflow:hidden">
        <div class="map-canvas" style="position:absolute;inset:0">
          <div class="map-art" style="position:absolute;inset:0;transform-origin:top left;transform:translate(${-offsetX*scale/10}%, ${-offsetY*scale/6.6}%) scale(${scale})">
            <svg width="100%" height="100%" viewBox="0 0 1000 660" preserveAspectRatio="none" aria-hidden="true" style="display:block">
              <defs>
                <radialGradient id="nw-map-base" cx="60%" cy="42%" r="75%"><stop stop-color="#2c243e"/><stop offset="1" stop-color="#171423"/></radialGradient>
                <linearGradient id="nw-map-route" x1="0%" y1="100%" x2="100%" y2="0%"><stop stop-color="#e681b8"/><stop offset="1" stop-color="#f7a6d7"/></linearGradient>
                <filter id="nw-map-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
              </defs>
              <rect width="1000" height="660" fill="url(#nw-map-base)"/>
              <g fill="#29293d" stroke="#55516c" stroke-width="1.5" opacity=".78"><path d="M73 222l78-14 44 33-19 54-83 18-38-35Z"/><path d="M737 127l45-37 43 10 28 29-8 55-58 14-55-35Z"/><path d="M472 490l34-26 53 16 9 58-47 21-43-15Z"/></g>
              <g fill="none" stroke="#665771" stroke-linecap="round" stroke-linejoin="round">${roads.join("")}</g>
              <path d="M-29 419C104 379 169 399 217 314S351 236 418 245 502 315 570 292 672 200 712 192 845 227 916 130 984 41 1033 60" fill="none" stroke="#37364e" stroke-width="31"/>
              <path d="M-29 419C104 379 169 399 217 314S351 236 418 245 502 315 570 292 672 200 712 192 845 227 916 130 984 41 1033 60" fill="none" stroke="#41435f" stroke-width="21"/>
              <g fill="none" stroke="#756688" stroke-width="5.4" opacity=".77">
                <path d="M34-40C155 63 217 183 248 265S230 429 303 515 425 590 488 708"/>
                <path d="M472-20C405 69 450 134 524 192S701 284 741 379 762 578 933 670"/>
                <path d="M-43 530C103 493 172 556 288 533S450 430 558 418 763 447 1019 346"/>
                <path d="M-22 111C144 163 275 93 375 119S584 170 712 118 860 15 1077 10"/>
              </g>
              <path d="${routePath}" fill="none" stroke="#e76caa" stroke-width="15" opacity=".39" filter="url(#nw-map-glow)"/>
              <path d="${routePath}" fill="none" stroke="#402038" stroke-width="9" stroke-linecap="round"/>
              <path d="${routePath}" fill="none" stroke="url(#nw-map-route)" stroke-width="${mapState.exploring ? 5.6 : 4.8}" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="178" cy="546" r="8" fill="${mapState.reverse ? "#e884b9" : "#2f2639"}" stroke="#ffd0eb" stroke-width="2.5"/>
              <circle cx="786" cy="106" r="8" fill="${mapState.reverse ? "#2f2639" : "#e884b9"}" stroke="#ffd0eb" stroke-width="2.5"/>
            </svg>
            <div class="route-overlay" style="position:absolute;inset:0;pointer-events:none">
              <span class="map-place map-place-first" style="position:absolute;${position(176,575)}">${start}</span>
              <span class="map-place map-place-last" style="position:absolute;${position(783,77)}">${end}</span>
              ${points.map(marker).join("")}
            </div>
          </div>
        </div>
        <div class="map-tools" aria-label="${L("Map zoom","地图缩放")}">
          <button class="small-btn" id="map-plus" type="button" aria-label="${L("Zoom in","放大")}" ${mapState.zoom >= 1.75 ? "disabled" : ""}>${ico("plus")}</button>
          <button class="small-btn" id="map-minus" type="button" aria-label="${L("Zoom out","缩小")}" ${mapState.zoom <= 1 ? "disabled" : ""}>${ico("minus")}</button>
          <button class="small-btn" id="map-reset" type="button" aria-label="${L("Reset zoom","重置缩放")}">1×</button>
        </div>
        <aside class="glass map-legend" aria-label="${L("Map key","地图图例")}">
          <span><i class="legend-route"></i>${L("Illustrated route","示意路线")}</span>
          <span>${ico("pin")}${L("Context note","沿途笔记")}</span>
        </aside>
        ${focusPoint ? `<aside class="glass map-detail" id="map-detail" aria-label="${L("Route note","路线笔记")}">
          <div class="map-detail-photo"><img src="${pic(focusPoint.image) || pic("street")}" alt=""><button class="small-btn map-detail-close" id="map-close" type="button" aria-label="${L("Close route note","关闭路线笔记")}">${ico("close")}</button></div>
          <div class="map-detail-content">
            <h2 id="map-detail-title" tabindex="-1">C${mapState.pin+1} · ${focusPoint.name}</h2>
            <div class="map-detail-tags"><span>${focusPoint.type}</span><span>${L("Prototype note","原型笔记")}</span></div>
            <p>${focusPoint.text}</p>
            <div class="map-question"><strong>${ico("info")} ${L("A Question to Consider","值得思考的问题")}</strong><p>${focusPoint.question}</p></div>
            <div class="map-detail-nav"><button type="button" class="small-btn" id="map-prev" aria-label="${L("Previous route note","上一条路线笔记")}">‹</button><small>${L("Route note","路线笔记")} ${mapState.pin+1} / ${points.length}</small><button type="button" class="small-btn" id="map-next" aria-label="${L("Next route note","下一条路线笔记")}">›</button></div>
          </div>
        </aside>` : ""}
      </section>
    </div>
  </section>`;
}

function bindMap() {
  const page = document.querySelector("#map-page");
  if (!page) return;

  function refresh(selector, scroll = false) {
    page.outerHTML = renderMap();
    bindMap();
    const replacement = document.querySelector("#map-page");
    const target = replacement.querySelector(selector);
    (target?.disabled ? replacement.querySelector("#map-reset") : target)?.focus({preventScroll:!scroll});
  }

  page.addEventListener("change", (event) => {
    if (event.target.name !== "nightwalk-route") return;
    mapState.choice = Number(event.target.value);
    mapState.exploring = false;
    refresh("#" + event.target.id);
  });
  page.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.mapPin !== undefined) {
      mapState.pin = Number(button.dataset.mapPin);
      refresh("#map-detail-title");
      return;
    }
    switch (button.id) {
      case "route-swap":
        mapState.reverse = !mapState.reverse;
        refresh("#route-swap");
        break;
      case "route-start":
        mapState.exploring = true;
        mapState.pin = mapState.reverse ? 3 : 0;
        refresh("#map-detail-title", true);
        break;
      case "map-close": {
        const previous = mapState.pin;
        mapState.pin = null;
        refresh(`[data-map-pin="${previous}"]`);
        break;
      }
      case "map-prev":
      case "map-next": {
        const step = (button.id === "map-next") !== mapState.reverse ? 1 : -1;
        mapState.pin = (mapState.pin + 4 + step) % 4;
        refresh("#" + button.id);
        break;
      }
      case "map-plus":
      case "map-minus":
      case "map-reset":
        mapState.zoom = button.id === "map-reset" ? 1 : Math.min(1.75, Math.max(1, mapState.zoom + (button.id === "map-plus" ? .25 : -.25)));
        refresh("#" + button.id);
        break;
    }
  });
}
