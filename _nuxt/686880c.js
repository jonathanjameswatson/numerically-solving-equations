(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{313:function(t,e,h){"use strict";h.d(e,"a",(function(){return f}));var n=h(32),r=h(15),l=h(128),c=h(129);h(177),h(31),h(97),h(46),h(33),h(45),h(67),h(68);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(object);t&&(h=h.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,h)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f=function(){function t(e){var h=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];Object(l.a)(this,t),this.p5=e,this.updateFunction=n,this.paused=c,this.time=0,this.lastTime=0,this.graphs=[],this.animations=[],e.preload=function(){h.font=e.loadFont("/numerically-solving-equations/robotomono.ttf")},e.setup=function(){h.canvas=e.createCanvas(16,9).elt,h.canvas.classList.add("has-ratio"),h.resize(),h.graphs.forEach((function(t){t.resize()})),e.textFont(h.font),e.disableFriendlyErrors=!0,h.paused&&(h.updateFunction(h),e.noLoop())},e.windowResized=function(){h.resize(),h.graphs.forEach((function(t){t.resize()})),e.redraw()},r||(e.mouseClicked=function(t){if(t.target.classList.contains("p5Canvas"))return h.handleClick(t.target),!1})}return Object(c.a)(t,[{key:"passTime",value:function(){if(this.paused)return!1;this.time+=Math.min(100,window.performance.now()-this.lastTime)/2500,this.lastTime=window.performance.now()}},{key:"update",value:function(){this.paused||(this.passTime(),this.updateFunction(this),this.animations.forEach((function(t){return t.update()})))}},{key:"resize",value:function(){this.p5.resizeCanvas(this.canvas.parentElement.offsetWidth,this.canvas.parentElement.offsetHeight),this.p5.textSize(this.p5.width/50)}},{key:"handleClick",value:function(t){t===this.canvas?(this.paused=!1,this.p5.loop()):(this.paused=!0,this.p5.noLoop())}},{key:"addGraph",value:function(t,e,h,n,r,l,c,o){var x=new k(this,t,e,h,n,r,l,c,o);return this.graphs.push(x),x}},{key:"addAnimation",value:function(t){var e=new y(this,t);return this.animations.push(e),e}},{key:"displayList",value:function(t){var e=this;this.p5.noStroke(),this.p5.fill("black"),t.forEach((function(line,i){e.p5.text(line,e.p5.width/100,e.p5.width/40+i*e.p5.width/35)}))}},{key:"displayDictionary",value:function(t){this.displayList(Object.entries(t).map((function(t){var e=Object(r.a)(t,2),h=e[0],n=e[1];return"".concat(h," = ").concat(n)})))}},{key:"background",value:function(){this.p5.background("#ff7070")}}]),t}(),k=function(){function t(e,h,n,r,c,o,x,f,k){Object(l.a)(this,t),this.sketch=e,this.x=h,this.y=n,this.width=r,this.height=c,this.xAxis=o,this.yAxis=x,this.xScale=f,this.yScale=k}return Object(c.a)(t,[{key:"resize",value:function(){this.xPixels=this.x*this.sketch.p5.width,this.yPixels=this.y*this.sketch.p5.height,this.widthPixels=this.width*this.sketch.p5.width,this.heightPixels=this.height*this.sketch.p5.height,this.xAxisPixels=this.yPixels+this.yAxis*this.heightPixels,this.yAxisPixels=this.xPixels+this.xAxis*this.widthPixels,this.xScalePixels=this.widthPixels/this.xScale,this.yScalePixels=this.heightPixels/this.yScale}},{key:"plotAxes",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.sketch.p5.stroke("black"),t&&this.sketch.p5.line(this.xPixels,this.xAxisPixels,this.xPixels+this.widthPixels,this.xAxisPixels),e&&this.sketch.p5.line(this.yAxisPixels,this.yPixels,this.yAxisPixels,this.yPixels+this.heightPixels)}},{key:"plotFunction",value:function(t){this.sketch.p5.stroke("black"),this.sketch.p5.noFill(),this.sketch.p5.beginShape();for(var e=this.xPixels;e<this.xPixels+this.widthPixels;e+=1){var h=t({x:(e-this.yAxisPixels)/this.xScalePixels}),n=this.xAxisPixels-h*this.yScalePixels;n>this.yPixels&&n<this.yPixels+this.heightPixels&&this.sketch.p5.vertex(e,n)}this.sketch.p5.endShape()}},{key:"plotRoot",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"black";this.sketch.p5.stroke(e),this.sketch.p5.noFill(),this.sketch.p5.circle(this.yAxisPixels+t*this.xScalePixels,this.xAxisPixels,this.sketch.p5.width/75),this.sketch.p5.noStroke(),this.sketch.p5.fill("black"),this.sketch.p5.text(t.toFixed(2),this.yAxisPixels+t*this.xScalePixels,this.xAxisPixels+this.sketch.p5.width/40)}},{key:"plotLineUpToFunction",value:function(t,e){var h=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"black";this.sketch.p5.stroke(h);var n=t({x:e});this.sketch.p5.line(this.yAxisPixels+e*this.xScalePixels,this.xAxisPixels,this.yAxisPixels+e*this.xScalePixels,this.xAxisPixels-n*this.yScalePixels)}},{key:"plotLinearInterpolation",value:function(t,a,b){var e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"black";this.sketch.p5.stroke(e);var h=t({x:a}),n=t({x:b});this.sketch.p5.line(this.yAxisPixels+a*this.xScalePixels,this.xAxisPixels-h*this.yScalePixels,this.yAxisPixels+b*this.xScalePixels,this.xAxisPixels-n*this.yScalePixels)}}]),t}(),y=function(){function t(e,h){Object(l.a)(this,t),this.sketch=e,this.keyframes=h,this.variables=x({},this.keyframes[0].variables),this.keyframe=x({},h[0]),this.keyframeIndex=0,this.frameTime=0,this.lastTime=0}return Object(c.a)(t,[{key:"getNextKeyframeIndex",value:function(){return this.keyframeIndex===this.keyframes.length-1?0:this.keyframeIndex+1}},{key:"update",value:function(){var t=this;if(!this.sketch.paused)if(this.frameTime+=this.sketch.time-this.lastTime,this.frameTime>this.keyframe.wait+this.keyframe.transition)this.keyframeIndex=this.getNextKeyframeIndex(),this.keyframe=x({},this.keyframes[this.keyframeIndex]),this.variables=x({},this.keyframe.variables),this.frameTime=0;else if(this.frameTime>this.keyframe.wait){var progress=(this.frameTime-this.keyframe.wait)/this.keyframe.transition,e=Math.pow(progress,3);Object.entries(this.keyframe.variables).forEach((function(h){var n=Object(r.a)(h,2),l=n[0],c=n[1],o=t.keyframes[t.getNextKeyframeIndex()];t.variables[l]=c+(o.variables[l]-c)*e}))}this.lastTime=this.sketch.time}}]),t}()},323:function(t,e,h){"use strict";h.r(e);var n=h(313);e.default=function(t){var e,h,r="black",l=function(t){var e=t.x;return Math.pow(e,3)-.5*Math.pow(e,2)+e-.5},c=new n.a(t,(function(s){e=.5+Math.cos(4*s.time)/8,h=l({x:e}),r=h>0?"red":"blue"})),o=c.addGraph(.05,.15,.9,.8,0,.5,1,2);t.draw=function(){c.update(),c.background(),o.plotAxes(),o.plotFunction(l),o.plotLineUpToFunction(l,e,r),o.plotRoot(.5),c.displayDictionary({x:e.toFixed(2),y:h.toFixed(2)})}}}}]);