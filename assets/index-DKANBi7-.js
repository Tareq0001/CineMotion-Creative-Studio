(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t=`easeInOut`){let n=Math.max(0,Math.min(1,e));switch(t){case`linear`:return n;case`easeIn`:return n*n*n;case`easeOut`:return 1-(1-n)**3;case`easeInOut`:return n<.5?4*n*n*n:1-(-2*n+2)**3/2;case`spring`:{let e=2*Math.PI/3;return n===0?0:n===1?1:2**(-10*n)*Math.sin((n*10-.75)*e)+1}default:return n}}function t(t,n,r){if(!t||t.length===0)return r;let i=[...t].sort((e,t)=>e.time-t.time);if(n<=i[0].time)return i[0].value;if(n>=i[i.length-1].time)return i[i.length-1].value;for(let t=0;t<i.length-1;t++){let r=i[t],a=i[t+1];if(n>=r.time&&n<=a.time){let t=a.time-r.time;if(t===0)return r.value;let i=e((n-r.time)/t,a.easing||`easeInOut`);return r.value+(a.value-r.value)*i}}return r}function n(e,t=30){let n=Math.max(0,e),r=Math.floor(n/3600),i=Math.floor(n%3600/60),a=Math.floor(n%60),o=Math.floor((n-Math.floor(n))*t),s=e=>e.toString().padStart(2,`0`);return`${s(r)}:${s(i)}:${s(a)}:${s(o)}`}function r(e){switch(e){case`16:9`:return{width:1920,height:1080};case`9:16`:return{width:1080,height:1920};case`1:1`:return{width:1080,height:1080};case`4:5`:return{width:1080,height:1350};case`21:9`:return{width:2560,height:1080};default:return{width:1920,height:1080}}}function i(e,n){let r=n-e.startTime,i=e.keyframes;return{x:t(i.x||[],r,e.transform.x),y:t(i.y||[],r,e.transform.y),scale:t(i.scale||[],r,e.transform.scale),rotation:t(i.rotation||[],r,e.transform.rotation),opacity:t(i.opacity||[],r,e.transform.opacity)}}var a=[{id:`track-v2`,nameKey:`videoTrack2`,type:`video`,order:2,muted:!1,solo:!1,locked:!1,hidden:!1},{id:`track-g1`,nameKey:`graphicsTrack`,type:`graphics`,order:1,muted:!1,solo:!1,locked:!1,hidden:!1},{id:`track-v1`,nameKey:`videoTrack1`,type:`video`,order:0,muted:!1,solo:!1,locked:!1,hidden:!1},{id:`track-a1`,nameKey:`audioTrack`,type:`audio`,order:3,muted:!1,solo:!1,locked:!1,hidden:!1}],o=[{id:`cyberpunk-trailer`,nameKey:`template1Title`,descKey:`template1Desc`,aspectRatio:`16:9`,duration:15,audioMood:`synthwave`,showVisualizer:!1,shaderFX:{filmGrain:25,chromaticAberration:45,crtGlitch:35,bloom:40,vignette:40,duotone:!1},colorGrading:{preset:`cyber-neon`,exposure:5,contrast:20,saturation:30,temperature:-15,tint:25},tracks:a,clips:[{id:`clip-cyber-bg`,trackId:`track-v1`,name:`Cyber Horizon 3D Grid`,type:`generative`,startTime:0,duration:15,color:`#3b82f6`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{scale:[{time:0,value:100,easing:`linear`},{time:15,value:115,easing:`linear`}]},generativeData:{sceneType:`cyber-grid`,colorA:`#00f0ff`,colorB:`#a855f7`,speed:1.2}},{id:`clip-cyber-title`,trackId:`track-g1`,name:`Neo-Tokyo 2099 // نيو طوكيو`,type:`text`,startTime:1,duration:13,color:`#00f0ff`,blendMode:`source-over`,transform:{x:0,y:-60,scale:100,rotation:0,opacity:100},keyframes:{scale:[{time:0,value:70,easing:`spring`},{time:1.2,value:100,easing:`spring`}],opacity:[{time:0,value:0,easing:`easeOut`},{time:.8,value:100,easing:`easeOut`}]},textData:{text:`NEO-TOKYO 2099 // صَحوة السايبورغ`,fontFamily:`Orbitron`,fontSize:68,textColor:`#ffffff`,strokeColor:`#00f0ff`,strokeWidth:2,neonGlow:!0,glowColor:`#00f0ff`,textAlign:`center`}},{id:`clip-cyber-badge`,trackId:`track-g1`,name:`Cyber Lower-Third Banner`,type:`shape`,startTime:2.5,duration:11,color:`#a855f7`,blendMode:`source-over`,transform:{x:0,y:380,scale:100,rotation:0,opacity:100},keyframes:{y:[{time:0,value:500,easing:`spring`},{time:1,value:380,easing:`spring`}]},shapeData:{shapeType:`lower-third`,fillColor:`#00f0ff`,strokeColor:`#a855f7`,strokeWidth:1,cornerRadius:12,width:720,height:80,subText:`CINEMOTION DIGITAL ENGINE // الجيل القادم للإنتاج المرئي`}},{id:`clip-cyber-audio`,trackId:`track-a1`,name:`Cyber Synthwave 120 BPM`,type:`audio`,startTime:0,duration:15,color:`#10b981`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},audioData:{mood:`synthwave`,volume:.85}}]},{id:`kinfolk-moodboard`,nameKey:`template2Title`,descKey:`template2Desc`,aspectRatio:`4:5`,duration:12,audioMood:`kinfolk`,showVisualizer:!1,shaderFX:{filmGrain:65,chromaticAberration:0,crtGlitch:0,bloom:15,vignette:55,duotone:!1},colorGrading:{preset:`kinfolk-warm`,exposure:0,contrast:-10,saturation:-15,temperature:30,tint:-5},tracks:a,clips:[{id:`clip-kinfolk-bg`,trackId:`track-v1`,name:`Earth Tone Organic Waves`,type:`generative`,startTime:0,duration:12,color:`#d97706`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},generativeData:{sceneType:`fluid-blobs`,colorA:`#d4a373`,colorB:`#ccd5ae`,speed:.6}},{id:`clip-kinfolk-title`,trackId:`track-g1`,name:`Kinfolk Serenity Typography`,type:`text`,startTime:.5,duration:11.5,color:`#78350f`,blendMode:`source-over`,transform:{x:0,y:-40,scale:100,rotation:0,opacity:100},keyframes:{opacity:[{time:0,value:0,easing:`easeInOut`},{time:1.5,value:100,easing:`easeInOut`}]},textData:{text:`SERENITY // إشراقة السكينة والطبيعة`,fontFamily:`Playfair Display`,fontSize:54,textColor:`#292524`,strokeColor:`#000000`,strokeWidth:0,neonGlow:!1,glowColor:``,textAlign:`center`}},{id:`clip-kinfolk-frame`,trackId:`track-g1`,name:`Minimalist Frame Border`,type:`shape`,startTime:0,duration:12,color:`#a16207`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},shapeData:{shapeType:`rectangle`,fillColor:`transparent`,strokeColor:`#57534e`,strokeWidth:2,cornerRadius:0,width:900,height:1150}},{id:`clip-kinfolk-audio`,trackId:`track-a1`,name:`Kinfolk Organic Ambient`,type:`audio`,startTime:0,duration:12,color:`#10b981`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},audioData:{mood:`kinfolk`,volume:.75}}]},{id:`tiktok-ad`,nameKey:`template3Title`,descKey:`template3Desc`,aspectRatio:`9:16`,duration:10,audioMood:`tiktok`,showVisualizer:!1,shaderFX:{filmGrain:15,chromaticAberration:20,crtGlitch:0,bloom:30,vignette:25,duotone:!1},colorGrading:{preset:`teal-orange`,exposure:10,contrast:30,saturation:35,temperature:10,tint:0},tracks:a,clips:[{id:`clip-tiktok-bg`,trackId:`track-v1`,name:`Kinetic Neon Aurora BG`,type:`generative`,startTime:0,duration:10,color:`#ec4899`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},generativeData:{sceneType:`aurora`,colorA:`#ec4899`,colorB:`#3b82f6`,speed:1.8}},{id:`clip-tiktok-title`,trackId:`track-g1`,name:`SUPER SALE 70% OFF`,type:`text`,startTime:.5,duration:9.5,color:`#f43f5e`,blendMode:`source-over`,transform:{x:0,y:-200,scale:100,rotation:0,opacity:100},keyframes:{scale:[{time:0,value:40,easing:`spring`},{time:.8,value:110,easing:`spring`},{time:1.4,value:100,easing:`easeInOut`}],rotation:[{time:0,value:-12,easing:`spring`},{time:.8,value:0,easing:`spring`}]},textData:{text:`خصم حارق 70% // FLASH SALE`,fontFamily:`Tajawal`,fontSize:76,textColor:`#ffe600`,strokeColor:`#000000`,strokeWidth:4,neonGlow:!0,glowColor:`#ff007f`,textAlign:`center`}},{id:`clip-tiktok-badge`,trackId:`track-g1`,name:`Limited Offer Badge`,type:`shape`,startTime:1.2,duration:8.8,color:`#e11d48`,blendMode:`source-over`,transform:{x:0,y:140,scale:100,rotation:-6,opacity:100},keyframes:{scale:[{time:0,value:0,easing:`spring`},{time:.6,value:105,easing:`spring`}]},shapeData:{shapeType:`badge`,fillColor:`#ff0055`,strokeColor:`#ffffff`,strokeWidth:3,cornerRadius:16,width:520,height:110,subText:`⚡ اطلب الآن قبل نفاد الكمية! ⚡`}},{id:`clip-tiktok-audio`,trackId:`track-a1`,name:`Punchy Pop 128 BPM`,type:`audio`,startTime:0,duration:10,color:`#10b981`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},audioData:{mood:`tiktok`,volume:.9}}]},{id:`lofi-audiogram`,nameKey:`template4Title`,descKey:`template4Desc`,aspectRatio:`1:1`,duration:15,audioMood:`lofi`,showVisualizer:!0,shaderFX:{filmGrain:40,chromaticAberration:15,crtGlitch:10,bloom:20,vignette:50,duotone:!0,duotoneColor1:`#240046`,duotoneColor2:`#ff9e00`,vhsRetro:45},colorGrading:{preset:`vintage-kodak`,exposure:0,contrast:15,saturation:10,temperature:25,tint:15},tracks:a,clips:[{id:`clip-lofi-bg`,trackId:`track-v1`,name:`Sliced Sunset Sun & Sea`,type:`generative`,startTime:0,duration:15,color:`#f97316`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},generativeData:{sceneType:`lofi-sunset`,colorA:`#ff8359`,colorB:`#a2395b`,speed:.8}},{id:`clip-lofi-text`,trackId:`track-g1`,name:`Chill Beats Typography`,type:`text`,startTime:.5,duration:14.5,color:`#fbbf24`,blendMode:`source-over`,transform:{x:0,y:-260,scale:100,rotation:0,opacity:100},keyframes:{},textData:{text:`CHILL BEATS TO CODE // نغمات الغروب`,fontFamily:`Cairo`,fontSize:52,textColor:`#ffffff`,strokeColor:`#000000`,strokeWidth:3,neonGlow:!0,glowColor:`#ff9e00`,textAlign:`center`}},{id:`clip-lofi-audio`,trackId:`track-a1`,name:`Lofi Sunset Chords 84 BPM`,type:`audio`,startTime:0,duration:15,color:`#10b981`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},audioData:{mood:`lofi`,volume:.85}}]}],s={filmGrain:0,chromaticAberration:0,crtGlitch:0,bloom:0,vignette:0,duotone:!1,duotoneColor1:`#0f172a`,duotoneColor2:`#00f0ff`,vhsRetro:0},c=class{grainCanvas;grainCtx;offscreenCanvas;offscreenCtx;grainPattern=null;frameCount=0;constructor(){this.grainCanvas=document.createElement(`canvas`),this.grainCanvas.width=256,this.grainCanvas.height=256,this.grainCtx=this.grainCanvas.getContext(`2d`),this.offscreenCanvas=document.createElement(`canvas`),this.offscreenCtx=this.offscreenCanvas.getContext(`2d`),this.generateGrainNoise()}generateGrainNoise(){if(!this.grainCtx)return;let e=this.grainCtx.createImageData(256,256),t=e.data;for(let e=0;e<t.length;e+=4){let n=Math.random()*255|0;t[e]=n,t[e+1]=n,t[e+2]=n,t[e+3]=Math.random()*120|0}this.grainCtx.putImageData(e,0,0),this.grainPattern=this.grainCtx.createPattern(this.grainCanvas,`repeat`)}applyPostProcessing(e,t,n,r,i){this.frameCount++,this.frameCount%4==0&&this.generateGrainNoise(),i.chromaticAberration>0&&this.applyChromaticAberration(e,t,n,i.chromaticAberration),i.bloom>0&&this.applyBloom(e,t,n,i.bloom),i.crtGlitch>0&&this.applyCrtGlitch(e,t,n,r,i.crtGlitch),i.vhsRetro>0&&this.applyVhsRetro(e,t,n,r,i.vhsRetro),i.duotone&&this.applyDuotone(e,t,n,i.duotoneColor1,i.duotoneColor2),i.filmGrain>0&&this.applyFilmGrain(e,t,n,i.filmGrain),i.vignette>0&&this.applyVignette(e,t,n,i.vignette)}applyChromaticAberration(e,t,n,r){let i=r/100*16;i<=.5||(this.ensureOffscreen(t,n),this.offscreenCtx&&(this.offscreenCtx.clearRect(0,0,t,n),this.offscreenCtx.drawImage(e.canvas,0,0),e.save(),e.globalCompositeOperation=`screen`,e.fillStyle=`rgba(255, 0, 0, 0.4)`,e.drawImage(this.offscreenCanvas,-i,0,t,n),e.fillStyle=`rgba(0, 255, 255, 0.4)`,e.drawImage(this.offscreenCanvas,i,0,t,n),e.restore()))}applyBloom(e,t,n,r){e.save(),e.globalCompositeOperation=`screen`,e.filter=`blur(${Math.max(4,r/100*24)}px) brightness(1.3)`,e.globalAlpha=r/100*.7,e.drawImage(e.canvas,0,0),e.restore()}applyCrtGlitch(e,t,n,r,i){e.save(),e.fillStyle=`rgba(0, 0, 0, ${i/100*.35})`;for(let r=0;r<n;r+=4)e.fillRect(0,r,t,1.5);let a=i/100*.4;if(Math.random()<a){let r=Math.random()*n,a=Math.random()*40+10,o=(Math.random()-.5)*(i/100)*50;e.drawImage(e.canvas,0,r,t,a,o,r,t,a),e.fillStyle=Math.random()>.5?`rgba(0, 255, 255, 0.2)`:`rgba(255, 0, 128, 0.2)`,e.fillRect(0,r,t,a)}e.restore()}applyVhsRetro(e,t,n,r,i){e.save();let a=(Math.sin(r*3)*.5+.5)*n;e.fillStyle=`rgba(255, 255, 255, ${i/100*.25})`,e.fillRect(0,a,t,6),e.globalCompositeOperation=`color-dodge`,e.fillStyle=`rgba(180, 100, 20, ${i/100*.15})`,e.fillRect(0,0,t,n),Math.random()<i/100*.15&&e.drawImage(e.canvas,(Math.random()-.5)*8,0,t,n),e.restore()}applyDuotone(e,t,n,r,i){e.save(),e.globalCompositeOperation=`multiply`,e.fillStyle=r,e.fillRect(0,0,t,n),e.globalCompositeOperation=`screen`,e.fillStyle=i,e.fillRect(0,0,t,n),e.restore()}applyFilmGrain(e,t,n,r){if(!this.grainPattern)return;e.save(),e.globalCompositeOperation=`overlay`,e.globalAlpha=r/100*.5,e.fillStyle=this.grainPattern;let i=Math.random()*256|0,a=Math.random()*256|0;e.translate(i,a),e.fillRect(-i,-a,t+i,n+a),e.restore()}applyVignette(e,t,n,r){e.save();let i=t/2,a=n/2,o=Math.sqrt(i*i+a*a),s=e.createRadialGradient(i,a,o*.35,i,a,o);s.addColorStop(0,`rgba(0, 0, 0, 0)`),s.addColorStop(1,`rgba(0, 0, 0, ${r/100*.85})`),e.fillStyle=s,e.fillRect(0,0,t,n),e.restore()}ensureOffscreen(e,t){(this.offscreenCanvas.width!==e||this.offscreenCanvas.height!==t)&&(this.offscreenCanvas.width=e,this.offscreenCanvas.height=t)}},l={preset:`none`,exposure:0,contrast:0,saturation:0,temperature:0,tint:0,shadows:0,highlights:0,sharpness:0};function u(e,t,n,r){if(r.preset!==`none`||r.exposure!==0||r.contrast!==0||r.saturation!==0||r.temperature!==0||r.tint!==0||r.shadows!==0||r.highlights!==0||r.sharpness!==0){if(1+r.exposure/100,1+r.contrast/100,1+r.saturation/100,e.save(),r.preset===`teal-orange`){let r=e.createLinearGradient(0,0,t,n);r.addColorStop(0,`rgba(0, 180, 200, 0.15)`),r.addColorStop(1,`rgba(255, 140, 40, 0.15)`),e.globalCompositeOperation=`overlay`,e.fillStyle=r,e.fillRect(0,0,t,n)}else if(r.preset===`cyber-neon`){let r=e.createLinearGradient(0,0,t,n);r.addColorStop(0,`rgba(0, 240, 255, 0.18)`),r.addColorStop(.5,`rgba(168, 85, 247, 0.12)`),r.addColorStop(1,`rgba(255, 0, 128, 0.18)`),e.globalCompositeOperation=`color-dodge`,e.fillStyle=r,e.fillRect(0,0,t,n)}else r.preset===`kinfolk-warm`?(e.globalCompositeOperation=`soft-light`,e.fillStyle=`rgba(235, 180, 130, 0.22)`,e.fillRect(0,0,t,n)):r.preset===`bw-contrast`?(e.globalCompositeOperation=`color`,e.fillStyle=`#808080`,e.fillRect(0,0,t,n),e.globalCompositeOperation=`overlay`,e.fillStyle=`rgba(0, 0, 0, 0.25)`,e.fillRect(0,0,t,n)):r.preset===`vintage-kodak`&&(e.globalCompositeOperation=`multiply`,e.fillStyle=`rgba(255, 240, 210, 0.9)`,e.fillRect(0,0,t,n),e.globalCompositeOperation=`screen`,e.fillStyle=`rgba(40, 20, 10, 0.15)`,e.fillRect(0,0,t,n));if(r.temperature!==0&&(e.globalCompositeOperation=`overlay`,e.fillStyle=r.temperature>0?`rgba(255, 140, 30, ${r.temperature/100*.25})`:`rgba(30, 140, 255, ${Math.abs(r.temperature)/100*.25})`,e.fillRect(0,0,t,n)),r.tint!==0&&(e.globalCompositeOperation=`soft-light`,e.fillStyle=r.tint>0?`rgba(255, 20, 147, ${r.tint/100*.2})`:`rgba(34, 197, 94, ${Math.abs(r.tint)/100*.2})`,e.fillRect(0,0,t,n)),r.highlights>0)e.globalCompositeOperation=`screen`,e.fillStyle=`rgba(255, 255, 255, ${r.highlights/100*.25})`,e.fillRect(0,0,t,n);else if(r.highlights<0){e.globalCompositeOperation=`multiply`;let i=255-Math.abs(r.highlights);e.fillStyle=`rgba(${i}, ${i}, ${i}, 0.25)`,e.fillRect(0,0,t,n)}r.shadows>0?(e.globalCompositeOperation=`screen`,e.fillStyle=`rgba(80, 80, 80, ${r.shadows/100*.2})`,e.fillRect(0,0,t,n)):r.shadows<0&&(e.globalCompositeOperation=`multiply`,e.fillStyle=`rgba(0, 0, 0, ${Math.abs(r.shadows)/100*.3})`,e.fillRect(0,0,t,n)),e.restore()}}var d=class{ctx=null;masterGain=null;analyser=null;isPlaying=!1;isMuted=!1;volume=.8;currentMood=`synthwave`;loopTimer=null;step=0;bpm=120;vinylNode=null;constructor(){}init(){if(this.ctx)return;let e=window.AudioContext||window.webkitAudioContext;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.volume,this.ctx.currentTime),this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=256,this.analyser.smoothingTimeConstant=.8,this.masterGain.connect(this.analyser),this.analyser.connect(this.ctx.destination)}setMood(e){switch(this.currentMood=e,e){case`synthwave`:this.bpm=120;break;case`kinfolk`:this.bpm=72;break;case`tiktok`:this.bpm=128;break;case`lofi`:this.bpm=84}}play(){this.init(),this.ctx&&(this.ctx.state===`suspended`&&this.ctx.resume(),!this.isPlaying&&(this.isPlaying=!0,this.step=0,this.startSequencer()))}stop(){if(this.isPlaying=!1,this.loopTimer!==null&&(clearInterval(this.loopTimer),this.loopTimer=null),this.vinylNode){try{this.vinylNode.stop()}catch{}this.vinylNode=null}}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(this.isMuted?0:this.volume,this.ctx.currentTime)}toggleMute(){return this.isMuted=!this.isMuted,this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(this.isMuted?0:this.volume,this.ctx.currentTime),this.isMuted}getFrequencyData(){if(!this.analyser)return new Uint8Array(64);let e=new Uint8Array(this.analyser.frequencyBinCount);return this.analyser.getByteFrequencyData(e),e}getWaveformData(){if(!this.analyser)return new Uint8Array(64);let e=new Uint8Array(this.analyser.frequencyBinCount);return this.analyser.getByteTimeDomainData(e),e}startSequencer(){if(!this.ctx)return;let e=60/this.bpm/4*1e3;this.loopTimer=window.setInterval(()=>{this.isPlaying&&this.ctx&&(this.triggerStep(this.step%16),this.step++)},e)}triggerStep(e){if(!this.ctx||!this.masterGain)return;let t=this.ctx.currentTime;switch(this.currentMood){case`synthwave`:this.stepSynthwave(e,t);break;case`kinfolk`:this.stepKinfolk(e,t);break;case`tiktok`:this.stepTikTok(e,t);break;case`lofi`:this.stepLofi(e,t)}}stepSynthwave(e,t){e%4==0&&this.playKick(t,120,35,.25),(e===4||e===12)&&this.playSnare(t,.2),e%2==1&&this.playHiHat(t,.05,.04);let n=[[110,130.81,164.81],[87.31,130.81,174.61],[130.81,164.81,196],[98,123.47,146.83]],r=n[Math.floor(this.step/16)%n.length],i=r[e%r.length];this.playSynthBass(t,i,.12)}stepKinfolk(e,t){e===0&&this.playKick(t,65,30,.4),e===0&&[220,261.63,329.63,392].forEach((e,n)=>{this.playPad(t,e,2.5,.06/(n+1))}),(e===6||e===14)&&this.playBell(t,523.25*(e===6?1:1.25),.8,.04)}stepTikTok(e,t){(e===0||e===6||e===10)&&this.playKick(t,140,42,.3),(e===4||e===12)&&this.playSnare(t,.15,!0),(e%2==0||e===7||e===15)&&this.playHiHat(t,.03,.06),(e===0||e===3||e===8||e===11)&&this.playSynthStab(t,261.63,.1)}stepLofi(e,t){if((e===0||e===7)&&this.playKick(t,90,40,.3),(e===4||e===12)&&this.playSnare(t,.1,!1,800),e%2==1&&this.playHiHat(t,.06,.03,5e3),e===0){let e=[[174.61,220,261.63,329.63],[164.81,196,246.94,293.66],[146.83,174.61,220,261.63],[130.81,164.81,196,246.94]];e[Math.floor(this.step/16)%e.length].forEach(e=>this.playRhodes(t,e,1.6,.04))}}playKick(e,t,n,r){if(!this.ctx||!this.masterGain)return;let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.frequency.setValueAtTime(t,e),i.frequency.exponentialRampToValueAtTime(n,e+r),a.gain.setValueAtTime(.7,e),a.gain.exponentialRampToValueAtTime(.001,e+r),i.connect(a),a.connect(this.masterGain),i.start(e),i.stop(e+r)}playSnare(e,t,n=!1,r=3e3){if(!this.ctx||!this.masterGain)return;let i=this.ctx.sampleRate*t,a=this.ctx.createBuffer(1,i,this.ctx.sampleRate),o=a.getChannelData(0);for(let e=0;e<i;e++)o[e]=Math.random()*2-1;let s=this.ctx.createBufferSource();s.buffer=a;let c=this.ctx.createBiquadFilter();c.type=n?`highpass`:`bandpass`,c.frequency.value=r;let l=this.ctx.createGain();l.gain.setValueAtTime(.35,e),l.gain.exponentialRampToValueAtTime(.001,e+t),s.connect(c),c.connect(l),l.connect(this.masterGain),s.start(e),s.stop(e+t)}playHiHat(e,t,n=.05,r=8e3){if(!this.ctx||!this.masterGain)return;let i=this.ctx.sampleRate*t,a=this.ctx.createBuffer(1,i,this.ctx.sampleRate),o=a.getChannelData(0);for(let e=0;e<i;e++)o[e]=Math.random()*2-1;let s=this.ctx.createBufferSource();s.buffer=a;let c=this.ctx.createBiquadFilter();c.type=`highpass`,c.frequency.value=r;let l=this.ctx.createGain();l.gain.setValueAtTime(n,e),l.gain.exponentialRampToValueAtTime(.001,e+t),s.connect(c),c.connect(l),l.connect(this.masterGain),s.start(e),s.stop(e+t)}playSynthBass(e,t,n){if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createBiquadFilter(),a=this.ctx.createGain();r.type=`sawtooth`,r.frequency.setValueAtTime(t,e),i.type=`lowpass`,i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(150,e+n),a.gain.setValueAtTime(.25,e),a.gain.exponentialRampToValueAtTime(.001,e+n),r.connect(i),i.connect(a),a.connect(this.masterGain),r.start(e),r.stop(e+n)}playPad(e,t,n,r){if(!this.ctx||!this.masterGain)return;let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`sine`,i.frequency.setValueAtTime(t,e),a.gain.setValueAtTime(.001,e),a.gain.linearRampToValueAtTime(r,e+.6),a.gain.exponentialRampToValueAtTime(.001,e+n),i.connect(a),a.connect(this.masterGain),i.start(e),i.stop(e+n)}playBell(e,t,n,r){if(!this.ctx||!this.masterGain)return;let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`sine`,i.frequency.setValueAtTime(t,e),a.gain.setValueAtTime(r,e),a.gain.exponentialRampToValueAtTime(.001,e+n),i.connect(a),a.connect(this.masterGain),i.start(e),i.stop(e+n)}playSynthStab(e,t,n){if(!this.ctx||!this.masterGain)return;let r=this.ctx.createOscillator(),i=this.ctx.createGain();r.type=`square`,r.frequency.setValueAtTime(t,e),i.gain.setValueAtTime(.15,e),i.gain.exponentialRampToValueAtTime(.001,e+n),r.connect(i),i.connect(this.masterGain),r.start(e),r.stop(e+n)}playRhodes(e,t,n,r){if(!this.ctx||!this.masterGain)return;let i=this.ctx.createOscillator(),a=this.ctx.createGain();i.type=`triangle`,i.frequency.setValueAtTime(t,e),a.gain.setValueAtTime(r,e),a.gain.exponentialRampToValueAtTime(.001,e+n),i.connect(a),a.connect(this.masterGain),i.start(e),i.stop(e+n)}},f=class{canvas;ctx;shaderEngine;shaderFX={...s};colorGrading={...l};showVisualizerOverlay=!1;imageCache=new Map;constructor(e){this.canvas=e;let t=e.getContext(`2d`,{willReadFrequently:!0});if(!t)throw Error(`Could not acquire 2D canvas context`);this.ctx=t,this.shaderEngine=new c}render(e,t,n=!0){let r=this.canvas.width,i=this.canvas.height,a=this.ctx,o=e.currentTime;a.save(),a.globalCompositeOperation=`source-over`,a.fillStyle=`#0a0d14`,a.fillRect(0,0,r,i),a.restore();let s=[...e.tracks].sort((e,t)=>e.order-t.order);for(let t of s){if(t.hidden||t.muted)continue;let n=e.clips.filter(e=>e.trackId===t.id&&o>=e.startTime&&o<=e.startTime+e.duration);for(let e of n)this.renderClip(e,o,r,i)}if(this.showVisualizerOverlay&&t&&this.renderAudioSpectrumOverlay(t,r,i),u(a,r,i,this.colorGrading),this.shaderEngine.applyPostProcessing(a,r,i,o,this.shaderFX),n&&e.selectedClipId){let t=e.clips.find(t=>t.id===e.selectedClipId);t&&o>=t.startTime&&o<=t.startTime+t.duration&&this.drawTransformGizmo(t,o,r,i)}}renderClip(e,t,n,r){let a=i(e,t),o=t-e.startTime,s=this.ctx;s.save(),s.globalAlpha=Math.max(0,Math.min(1,a.opacity/100)),s.globalCompositeOperation=e.blendMode||`source-over`;let c=n/2+a.x,l=r/2+a.y;switch(s.translate(c,l),s.rotate(a.rotation*Math.PI/180),s.scale(a.scale/100,a.scale/100),e.type){case`generative`:this.renderGenerativeClip(e,o,n,r);break;case`text`:this.renderTextClip(e);break;case`shape`:this.renderShapeClip(e,o);break;case`image`:this.renderImageClip(e)}s.restore()}renderGenerativeClip(e,t,n,r){let i=this.ctx,a=e.generativeData,o=a?.sceneType||`cyber-grid`,s=a?.colorA||`#00f0ff`,c=a?.colorB||`#a855f7`,l=a?.speed||1,u=n/2,d=r/2;if(o===`cyber-grid`){let e=i.createLinearGradient(0,-d,0,d);e.addColorStop(0,`#050710`),e.addColorStop(.5,`#120b29`),e.addColorStop(1,`#020308`),i.fillStyle=e,i.fillRect(-u,-d,n,r),i.strokeStyle=s,i.lineWidth=3,i.beginPath(),i.moveTo(-u,0),i.lineTo(u,0),i.stroke(),i.save(),i.beginPath(),i.rect(-u,0,n,d),i.clip(),i.strokeStyle=c,i.lineWidth=1.5;for(let e=-18;e<=18;e++)i.beginPath(),i.moveTo(e*n/7.2,0),i.lineTo(e*n/1.44,d),i.stroke();let a=t*l*60%40;for(let e=10;e<d;e+=e*.22+2){let t=e+e/d*a;t>d||(i.strokeStyle=s,i.globalAlpha=Math.min(1,t/(d*.7)),i.beginPath(),i.moveTo(-u,t),i.lineTo(u,t),i.stroke())}i.restore();let o=i.createLinearGradient(0,-d*.7,0,0);o.addColorStop(0,`#ff007f`),o.addColorStop(1,`#ffe600`),i.fillStyle=o,i.beginPath(),i.arc(0,-50,160,Math.PI,0,!1),i.fill()}else if(o===`aurora`){let e=i.createLinearGradient(-u,-d,u,d);e.addColorStop(0,`#02101e`),e.addColorStop(1,`#081e19`),i.fillStyle=e,i.fillRect(-u,-d,n,r);for(let e=0;e<3;e++){i.beginPath(),i.moveTo(-u,d);for(let n=-u;n<=u;n+=30){let r=Math.sin(n*.004+t*l*1.5+e)*120+Math.cos(n*.008-t*l*.8)*80;i.lineTo(n,r-e*60)}i.lineTo(u,d),i.closePath();let n=i.createLinearGradient(0,-d,0,d);n.addColorStop(0,e%2==0?s:c),n.addColorStop(1,`transparent`),i.fillStyle=n,i.globalAlpha=.45,i.fill()}}else if(o===`lofi-sunset`){let e=i.createLinearGradient(0,-d,0,d);e.addColorStop(0,`#1b0d2b`),e.addColorStop(.5,`#4a154b`),e.addColorStop(.7,`#a2395b`),e.addColorStop(1,`#ff8359`),i.fillStyle=e,i.fillRect(-u,-d,n,r),i.save();for(let e=0;e<10;e++){let t=-170+e*30,n=30-e*2;n<=0||(i.fillStyle=e%2==0?`#ffea00`:`#ff5500`,i.beginPath(),i.arc(0,-20,150,0,Math.PI*2),i.clip(),i.fillRect(-150,t,300,n))}i.restore(),i.fillStyle=`rgba(255, 230, 0, 0.2)`;for(let e=0;e<d;e+=25){let t=u*.6*(1-e/d);i.fillRect(-t/2,e,t,4)}}else if(o===`matrix-code`){i.fillStyle=`#010803`,i.fillRect(-u,-d,n,r),i.font=`16px monospace`;let e=n/40;for(let n=0;n<40;n++){let a=-u+n*e,o=-d+(t*l*200+n*150)%(r+300);i.fillStyle=s,i.fillText(String.fromCharCode(12448+(n+(t*10|0))%96),a,o),i.fillStyle=`#16a34a`;for(let e=1;e<8;e++)i.globalAlpha=1-e*.12,i.fillText(String.fromCharCode(12448+(n+e)%96),a,o-e*18)}}else if(o===`fluid-blobs`){i.fillStyle=`#f6f4ee`,i.fillRect(-u,-d,n,r);for(let e=0;e<3;e++){let n=Math.sin(t*l*.8+e*2)*200,r=Math.cos(t*l*.6+e*3)*150,a=i.createRadialGradient(n,r,40,n,r,320);a.addColorStop(0,e===0?s:c),a.addColorStop(1,`transparent`),i.fillStyle=a,i.globalAlpha=.35,i.beginPath(),i.arc(n,r,320,0,Math.PI*2),i.fill()}}else if(o===`particle-stars`){i.fillStyle=`#030308`,i.fillRect(-u,-d,n,r);for(let e=0;e<120;e++){let a=e*137.5%(Math.PI*2),o=(t*l*180+e*25)%(Math.max(n,r)*.7),u=Math.cos(a)*o,d=Math.sin(a)*o,f=Math.max(1,o/(Math.max(n,r)*.7)*4.5);i.fillStyle=e%3==0?s:e%3==1?c:`#ffffff`,i.beginPath(),i.arc(u,d,f,0,Math.PI*2),i.fill()}}}renderTextClip(e){let t=e.textData;if(!t)return;let n=this.ctx;n.font=`bold ${t.fontSize}px '${t.fontFamily||`Cairo`}', sans-serif`,n.textAlign=t.textAlign||`center`,n.textBaseline=`middle`,t.neonGlow&&(n.save(),n.shadowColor=t.glowColor||`#00f0ff`,n.shadowBlur=30,n.fillStyle=t.glowColor||`#00f0ff`,n.fillText(t.text,0,0),n.shadowBlur=15,n.fillText(t.text,0,0),n.restore()),t.strokeWidth>0&&(n.strokeStyle=t.strokeColor||`#000000`,n.lineWidth=t.strokeWidth,n.strokeText(t.text,0,0)),n.fillStyle=t.textColor||`#ffffff`,n.fillText(t.text,0,0)}renderShapeClip(e,t){let n=e.shapeData;if(!n)return;let r=this.ctx,i=n.width||300,a=n.height||160,o=i/2,s=a/2;switch(r.fillStyle=n.fillColor||`#00f0ff`,r.strokeStyle=n.strokeColor||`#ffffff`,r.lineWidth=n.strokeWidth||0,n.shapeType){case`rectangle`:r.fillRect(-o,-s,i,a),n.strokeWidth>0&&r.strokeRect(-o,-s,i,a);break;case`rounded-rect`:{let e=n.cornerRadius||16;r.beginPath(),r.roundRect(-o,-s,i,a,e),r.fill(),n.strokeWidth>0&&r.stroke();break}case`circle`:{let e=Math.min(i,a)/2;r.beginPath(),r.arc(0,0,e,0,Math.PI*2),r.fill(),n.strokeWidth>0&&r.stroke();break}case`star`:{let e=Math.min(i,a)/2,t=e*.45,o=Math.PI/2*3,s=Math.PI/5;r.beginPath(),r.moveTo(0,-e);for(let n=0;n<5;n++){let n=Math.cos(o)*e,i=Math.sin(o)*e;r.lineTo(n,i),o+=s,n=Math.cos(o)*t,i=Math.sin(o)*t,r.lineTo(n,i),o+=s}r.lineTo(0,-e),r.closePath(),r.fill(),n.strokeWidth>0&&r.stroke();break}case`badge`:r.beginPath(),r.moveTo(-o+20,-s),r.lineTo(o,-s),r.lineTo(o-20,s),r.lineTo(-o,s),r.closePath(),r.fill(),n.strokeWidth>0&&r.stroke(),n.subText&&(r.fillStyle=`#ffffff`,r.font=`bold 20px Cairo, sans-serif`,r.textAlign=`center`,r.textBaseline=`middle`,r.fillText(n.subText,0,0));break;case`lower-third`:{let t=Math.max(i,540),o=Math.max(a,90),s=t/2,c=o/2;r.fillStyle=`rgba(15, 23, 42, 0.88)`,r.beginPath(),r.roundRect(-s,-c,t,o,12),r.fill(),r.fillStyle=n.fillColor||`#00f0ff`,r.beginPath(),r.roundRect(-s,-c,10,o,[12,0,0,12]),r.fill(),r.fillStyle=`#ffffff`,r.font=`bold 24px Cairo, sans-serif`,r.textAlign=`right`,r.textBaseline=`middle`,r.fillText(e.name,s-30,-12),r.fillStyle=`#94a3b8`,r.font=`16px Cairo, sans-serif`,r.fillText(n.subText||`CineMotion Digital Broadcast // بث حي ومباشر`,s-30,18);break}}}renderImageClip(e){let t=e.imageData;if(!t||!t.url)return;let n=this.imageCache.get(t.url);if(n||(n=new Image,n.crossOrigin=`anonymous`,n.src=t.url,this.imageCache.set(t.url,n)),n.complete&&n.naturalWidth>0){let e=t.width||n.naturalWidth,r=t.height||n.naturalHeight;this.ctx.drawImage(n,-e/2,-r/2,e,r)}}renderAudioSpectrumOverlay(e,t,n){let r=this.ctx;r.save();let i=(t-480)/2,a=n-90;for(let t=0;t<48;t++){let n=(e[t%e.length]||0)/255*80,o=i+t*10,s=r.createLinearGradient(o,a,o,a-n);s.addColorStop(0,`#00f0ff`),s.addColorStop(1,`#ec4899`),r.fillStyle=s,r.beginPath(),r.roundRect(o,a-n,6,n,3),r.fill()}r.restore()}drawTransformGizmo(e,t,n,r){let a=i(e,t),o=this.ctx;o.save();let s=n/2+a.x,c=r/2+a.y;o.translate(s,c),o.rotate(a.rotation*Math.PI/180);let l=a.scale/100;o.scale(l,l);let u=this.getClipBaseBounds(e),d=u.w/2,f=u.h/2;o.strokeStyle=`#00f0ff`,o.lineWidth=2/l,o.strokeRect(-d,-f,u.w,u.h);let p=10/l;o.fillStyle=`#ffffff`,o.strokeStyle=`#00f0ff`,o.lineWidth=2/l;let m=[[-d,-f],[d,-f],[-d,f],[d,f]];for(let[e,t]of m)o.fillRect(e-p/2,t-p/2,p,p),o.strokeRect(e-p/2,t-p/2,p,p);let h=30/l;o.beginPath(),o.moveTo(0,-f),o.lineTo(0,-f-h),o.stroke(),o.beginPath(),o.arc(0,-f-h,p/1.5,0,Math.PI*2),o.fillStyle=`#00f0ff`,o.fill(),o.stroke(),o.restore()}getClipBaseBounds(e){return e.shapeData?{w:e.shapeData.width||300,h:e.shapeData.height||160}:e.textData?{w:(e.textData.text.length||10)*(e.textData.fontSize*.65),h:e.textData.fontSize*1.4}:e.imageData?{w:e.imageData.width||400,h:e.imageData.height||300}:{w:600,h:400}}},p={ar:{appTitle:`استوديو سينيموشن`,appSubtitle:`استوديو المونتاج والتصميم الإبداعي الرقمي`,project:`المشروع`,newProject:`مشروع جديد`,saveProject:`حفظ المشروع JSON`,loadProject:`فتح مشروع JSON`,exportVideo:`تصدير فيديو WebM`,exportSnapshot:`لقطة شاشة بدقة فائقة`,templates:`قوالب جاهزة`,aspectRatio:`نسبة الأبعاد`,zoom:`تكبير العرض`,resolution:`دقة العرض`,playback:`التحكم بالتشغيل`,play:`تشغيل`,pause:`إيقاف مؤقت`,loop:`تكرار مستمر`,rewind:`إلى البداية`,forward:`إلى النهاية`,splitClip:`قص عند المؤشر`,deleteClip:`حذف العنصر`,duplicateClip:`مضاعفة العنصر`,addTrack:`إضافة مسار`,tracks:`المسارات`,videoTrack1:`فيديو V1 (الأساس)`,videoTrack2:`فيديو V2 (الطبقة العلوية)`,graphicsTrack:`نصوص وموشن G1`,audioTrack:`صوت وموسيقى A1`,mute:`كتم`,unmute:`إلغاء الكتم`,solo:`عزل`,lock:`قفل`,unlock:`إلغاء القفل`,hide:`إخفاء`,show:`إظهار`,inspector:`مفتش الخصائص`,transform:`التحويل والموضع`,posX:`الموضع الأفقي X`,posY:`الموضع الرأسي Y`,scale:`الحجم والتحجيم`,rotation:`زاوية الدوران`,opacity:`الشفافية`,blendMode:`نمط الدمج`,keyframes:`النقاط المفتاحية (Keyframes)`,addKeyframe:`إضافة نقطة مفتاحية`,removeKeyframe:`حذف النقطة`,easing:`منحنى الحركة (Easing)`,textProperties:`خصائص النص`,textContent:`نص المحتوى`,fontFamily:`نوع الخط`,fontSize:`حجم الخط`,textColor:`لون النص`,strokeColor:`لون الإطار (Stroke)`,strokeWidth:`سمك الإطار`,neonGlow:`توهج نيون مشع`,shapeProperties:`خصائص الشكل`,shapeType:`نوع الشكل`,fillColor:`لون التعبئة`,cornerRadius:`تدوير الحواف`,shadersAndFX:`المؤثرات البصرية والشيدر (Shaders & FX)`,filmGrain:`حبيبات الفيلم 35mm`,chromaticAberration:`انحراف لوني (RGB Split)`,crtGlitch:`تأثير الشاشة القديمة وخطوط CRT`,bloom:`توهج سينمائي (Bloom)`,vignette:`إعتام الحواف (Vignette)`,duotone:`تدرج ثنائي اللون (Duotone)`,vhsRetro:`تأثير كاسيت VHS العتيق`,colorGrading:`التدرج اللوني وموازنة الألوان`,lutPreset:`نمط التلوين السينمائي (LUT)`,exposure:`التعريض الضوئي`,contrast:`التباين`,saturation:`التشبع اللوني`,temperature:`حرارة اللون`,tint:`درجة اللون (Tint)`,shadows:`الظلال`,highlights:`الإضاءات العالية`,audioEngine:`محرك الصوت والمؤثرات`,audioMood:`اللحن والإيقاع التوليدي`,audioVolume:`مستوى الصوت`,visualizer:`محلل الترددات الطيفي`,visualizerOverlay:`عرض أشرطة الصوت التفاعلية في المشهد`,assetLibrary:`مكتبة العناصر والذكاء الاصطناعي`,aiStudio:`استوديو التوليد الذكي للصور والمشاهد`,aiPrompt:`وصف المشهد المطلوب (Prompt)`,aiStyles:`الأنماط الفنية`,generateScene:`توليد مشهد فوري`,addTextLayer:`إضافة طبقة نص`,addShapeLayer:`إضافة شكل هندسي`,addLowerThird:`إضافة شريط سفلي (Lower-Third)`,uploadMedia:`رفع صورة / فيديو`,template1Title:`تريلر سايبربانك نيو طوكيو`,template1Desc:`16:9 • شيدر غليتش • نيون وخطوط عربية مستقبلية • بيت إلكتروني`,template2Title:`لوحة إلهام عضوية (Kinfolk)`,template2Desc:`4:5 • حبيبات سينمائية • نغمات ترابية دافئة • خطوط هادئة وأثيرية`,template3Title:`إعلان تيك توك وتخفيضات ديناميكي`,template3Desc:`9:16 • نصوص حركية قافزة • حركة نابضة • إيقاع بوب سريع`,template4Title:`أوديوغرام غروب لوفاي (Lofi Sunset)`,template4Desc:`1:1 • أشرطة طيفية تفاعلية • شيدر VHS عتيق • نغمات شيل باص`,exportModalTitle:`تصدير الفيديو والتصاميم`,renderingVideo:`جاري تسجيل وتصيير المشهد التفاعلي...`,downloadReady:`الملف جاهز للتحميل فوراً!`,cancel:`إلغاء`,close:`إغلاق`,timecode:`الرمز الزمني`,duration:`المدة الإجمالية`,fps:`معدل الإطارات`,seconds:`ثانية`,noClipSelected:`اختر عنصراً من شريط المشاهد لتعديل خصائصه`,linear:`خطي (Linear)`,easeIn:`تسارع تدريجي (Ease In)`,easeOut:`تباطؤ تدريجي (Ease Out)`,easeInOut:`ناعم متوازن (Ease In-Out)`,spring:`ارتداد نابض (Spring/Elastic)`},en:{appTitle:`CineMotion Studio`,appSubtitle:`Next-Gen Video & Digital Graphics Creator`,project:`Project`,newProject:`New Project`,saveProject:`Save JSON Project`,loadProject:`Load JSON Project`,exportVideo:`Export WebM Video`,exportSnapshot:`High-Res Frame Snapshot`,templates:`Turnkey Templates`,aspectRatio:`Aspect Ratio`,zoom:`Timeline Zoom`,resolution:`Preview Quality`,playback:`Playback Controls`,play:`Play`,pause:`Pause`,loop:`Loop Playback`,rewind:`Rewind to Start`,forward:`Jump to End`,splitClip:`Split at Playhead`,deleteClip:`Delete Clip`,duplicateClip:`Duplicate Clip`,addTrack:`Add Track`,tracks:`Timeline Tracks`,videoTrack1:`Video V1 (Base)`,videoTrack2:`Video V2 (Overlay)`,graphicsTrack:`Graphics & Text G1`,audioTrack:`Audio & Music A1`,mute:`Mute`,unmute:`Unmute`,solo:`Solo`,lock:`Lock`,unlock:`Unlock`,hide:`Hide`,show:`Show`,inspector:`Properties Inspector`,transform:`Transform & Layout`,posX:`Position X`,posY:`Position Y`,scale:`Scale (%)`,rotation:`Rotation (°)`,opacity:`Opacity (%)`,blendMode:`Blend Mode`,keyframes:`Keyframe Motion Animation`,addKeyframe:`Add Keyframe`,removeKeyframe:`Remove Keyframe`,easing:`Easing Curve`,textProperties:`Typography & Text`,textContent:`Text Content`,fontFamily:`Font Family`,fontSize:`Font Size`,textColor:`Fill Color`,strokeColor:`Stroke Outline Color`,strokeWidth:`Stroke Width`,neonGlow:`Neon Cyber Glow`,shapeProperties:`Vector Shape Properties`,shapeType:`Shape Type`,fillColor:`Fill Color`,cornerRadius:`Corner Radius`,shadersAndFX:`WebGL Post-Processing Shaders & FX`,filmGrain:`35mm Film Grain Simulation`,chromaticAberration:`Chromatic Aberration (RGB Shift)`,crtGlitch:`CRT Scanlines & Glitch Twitch`,bloom:`Cinematic Bloom & Glow`,vignette:`Lens Vignette Falloff`,duotone:`Duotone Palette Split`,vhsRetro:`Vintage VHS Tape Artifacts`,colorGrading:`Color Grading & Cinematic LUTs`,lutPreset:`Cinematic LUT Preset`,exposure:`Exposure`,contrast:`Contrast`,saturation:`Saturation`,temperature:`Color Temperature`,tint:`Tint (Green/Magenta)`,shadows:`Shadows Lift`,highlights:`Highlights Recovery`,audioEngine:`Procedural Audio Synthesizer`,audioMood:`Synthesizer Music Mood`,audioVolume:`Master Volume`,visualizer:`FFT Frequency Spectrum`,visualizerOverlay:`Overlay Reactive Audio Bars on Canvas`,assetLibrary:`Assets & Generative AI Studio`,aiStudio:`Generative AI Scene Generator`,aiPrompt:`Prompt Description`,aiStyles:`Artistic Style Tags`,generateScene:`Generate Scene to Timeline`,addTextLayer:`Add Text Layer`,addShapeLayer:`Add Vector Shape`,addLowerThird:`Add Animated Lower-Third`,uploadMedia:`Upload Image / Video`,template1Title:`Neo-Tokyo Cyberpunk Trailer`,template1Desc:`16:9 • Glitch Shaders • Neon Arabic/English Typography • Synthwave Beat`,template2Title:`Kinfolk Organic Moodboard`,template2Desc:`4:5 • 35mm Grain • Warm Earth Tones • Serene Minimalist Typography`,template3Title:`Viral TikTok Product Ad`,template3Desc:`9:16 • Kinetic Spring Motion • Sale Badges • High Contrast Dance Beat`,template4Title:`Lofi Sunset Music Audiogram`,template4Desc:`1:1 • Reactive Spectrum Bars • Vintage VHS Overlay • Chill Boom-Bap Chords`,exportModalTitle:`Render & Export Studio`,renderingVideo:`Recording real-time video stream...`,downloadReady:`Export complete! Your download is ready.`,cancel:`Cancel`,close:`Close`,timecode:`Timecode`,duration:`Duration`,fps:`Framerate`,seconds:`sec`,noClipSelected:`Select a clip on the timeline or viewport to inspect its properties`,linear:`Linear`,easeIn:`Ease In (Accelerate)`,easeOut:`Ease Out (Decelerate)`,easeInOut:`Ease In-Out (Smooth)`,spring:`Spring / Elastic Dynamic`}},m=`ar`,h=[];function g(e){m=e,document.documentElement.lang=e,document.documentElement.dir=e===`ar`?`rtl`:`ltr`,h.forEach(t=>t(e))}function _(){return m}function v(e){return p[m][e]||p.en[e]||e}var y=class{container;canvas;compositor;callbacks;state;isDragging=!1;dragMode=`none`;dragStartMouse={x:0,y:0};initialTransform={x:0,y:0,scale:100,rotation:0};initialBounds={w:300,h:160};constructor(e,t,n){this.container=e,this.state=t,this.callbacks=n,this.container.innerHTML=`
      <div class="viewport-toolbar">
        <div class="viewport-left-tools">
          <div class="ratio-selector-group">
            <span class="toolbar-label">${v(`aspectRatio`)}:</span>
            <select id="ratio-select" class="studio-select">
              <option value="16:9" ${t.aspectRatio===`16:9`?`selected`:``}>16:9 (Cinema / YouTube)</option>
              <option value="9:16" ${t.aspectRatio===`9:16`?`selected`:``}>9:16 (TikTok / Reels)</option>
              <option value="1:1" ${t.aspectRatio===`1:1`?`selected`:``}>1:1 (Square Feed)</option>
              <option value="4:5" ${t.aspectRatio===`4:5`?`selected`:``}>4:5 (Portrait)</option>
              <option value="21:9" ${t.aspectRatio===`21:9`?`selected`:``}>21:9 (Anamorphic UltraWide)</option>
            </select>
          </div>
          <span class="res-badge" id="viewport-res-badge">${t.canvasWidth} × ${t.canvasHeight}</span>
        </div>

        <div class="viewport-right-tools">
          <button id="btn-snapshot" class="studio-btn-sm" title="${v(`exportSnapshot`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <span>${v(`exportSnapshot`)}</span>
          </button>
        </div>
      </div>

      <div class="canvas-viewport-container" id="canvas-wrapper">
        <div class="canvas-frame" id="canvas-frame">
          <canvas id="studio-canvas"></canvas>
        </div>
      </div>
    `,this.canvas=this.container.querySelector(`#studio-canvas`),this.compositor=new f(this.canvas),this.resizeCanvas(),this.setupEventListeners()}updateState(e){this.state=e;let t=this.container.querySelector(`#viewport-res-badge`);t&&(t.textContent=`${e.canvasWidth} × ${e.canvasHeight}`)}resizeCanvas(){this.canvas.width=this.state.canvasWidth,this.canvas.height=this.state.canvasHeight,this.updateViewportFit()}updateViewportFit(){let e=this.container.querySelector(`#canvas-wrapper`),t=this.container.querySelector(`#canvas-frame`);if(!e||!t)return;let n=e.clientWidth-40,r=e.clientHeight-40,i=Math.min(n/this.state.canvasWidth,r/this.state.canvasHeight,1),a=this.state.canvasWidth*i,o=this.state.canvasHeight*i;t.style.width=`${a}px`,t.style.height=`${o}px`}setupEventListeners(){this.container.querySelector(`#ratio-select`)?.addEventListener(`change`,e=>{let t=e.target.value;this.callbacks.onAspectRatioChange(t)}),this.container.querySelector(`#btn-snapshot`)?.addEventListener(`click`,()=>{this.exportSnapshot()}),window.addEventListener(`resize`,()=>this.updateViewportFit()),this.canvas.addEventListener(`mousedown`,e=>this.handleMouseDown(e)),window.addEventListener(`mousemove`,e=>this.handleMouseMove(e)),window.addEventListener(`mouseup`,()=>this.handleMouseUp())}getCanvasPoint(e){let t=this.canvas.getBoundingClientRect(),n=this.canvas.width/t.width,r=this.canvas.height/t.height;return{x:(e.clientX-t.left)*n,y:(e.clientY-t.top)*r}}handleMouseDown(e){if(!this.state.selectedClipId)return;let t=this.state.clips.find(e=>e.id===this.state.selectedClipId);if(!t)return;let n=this.getCanvasPoint(e),r=i(t,this.state.currentTime),a=this.canvas.width/2+r.x,o=this.canvas.height/2+r.y,s=n.x-a,c=n.y-o,l=-r.rotation*Math.PI/180,u=(s*Math.cos(l)-c*Math.sin(l))/(r.scale/100),d=(s*Math.sin(l)+c*Math.cos(l))/(r.scale/100),f=this.compositor.getClipBaseBounds(t),p=f.w/2,m=f.h/2,h=30/(r.scale/100);if(Math.hypot(u-0,d-(-m-h))<25){this.isDragging=!0,this.dragMode=`rotate`,this.dragStartMouse={x:n.x,y:n.y},this.initialTransform={...r};return}let g=[[-p,-m],[p,-m],[-p,m],[p,m]];for(let[e,t]of g)if(Math.hypot(u-e,d-t)<25){this.isDragging=!0,this.dragMode=`scale`,this.dragStartMouse={x:n.x,y:n.y},this.initialTransform={...r},this.initialBounds={...f};return}Math.abs(u)<=p&&Math.abs(d)<=m&&(this.isDragging=!0,this.dragMode=`body`,this.dragStartMouse={x:n.x,y:n.y},this.initialTransform={...r})}handleMouseMove(e){if(!this.isDragging||!this.state.selectedClipId)return;let t=this.state.clips.find(e=>e.id===this.state.selectedClipId);if(!t)return;let n=this.getCanvasPoint(e);if(this.dragMode===`body`){let e=n.x-this.dragStartMouse.x,r=n.y-this.dragStartMouse.y;this.callbacks.onClipTransformChange(t.id,{x:Math.round(this.initialTransform.x+e),y:Math.round(this.initialTransform.y+r),scale:this.initialTransform.scale,rotation:this.initialTransform.rotation})}else if(this.dragMode===`scale`){let e=this.canvas.width/2+this.initialTransform.x,r=this.canvas.height/2+this.initialTransform.y,i=Math.hypot(this.dragStartMouse.x-e,this.dragStartMouse.y-r),a=Math.hypot(n.x-e,n.y-r);if(i>0){let e=a/i,n=Math.max(10,Math.min(500,Math.round(this.initialTransform.scale*e)));this.callbacks.onClipTransformChange(t.id,{x:this.initialTransform.x,y:this.initialTransform.y,scale:n,rotation:this.initialTransform.rotation})}}else if(this.dragMode===`rotate`){let e=this.canvas.width/2+this.initialTransform.x,r=this.canvas.height/2+this.initialTransform.y,i=Math.atan2(n.y-r,n.x-e),a=Math.round(i*180/Math.PI)+90;this.callbacks.onClipTransformChange(t.id,{x:this.initialTransform.x,y:this.initialTransform.y,scale:this.initialTransform.scale,rotation:(a+360)%360})}}handleMouseUp(){this.isDragging=!1,this.dragMode=`none`}exportSnapshot(){let e=document.createElement(`a`);e.download=`CineMotion_Snapshot_${Date.now()}.png`,e.href=this.canvas.toDataURL(`image/png`),e.click()}},b=class{container;state;callbacks;pixelsPerSecond=40;isScrubbing=!1;draggingClipId=null;dragMode=`none`;dragStartX=0;initialClipStart=0;initialClipDur=0;constructor(e,t,n){this.container=e,this.state=t,this.callbacks=n,this.render(),this.setupGlobalEvents()}updateState(e){this.state=e,this.updatePlayheadOnly(),this.updateTimecodeDisplay(),this.renderClipsOnly(),this.updateTransportButtons()}render(){this.container.innerHTML=`
      <div class="timeline-header-bar">
        <div class="transport-controls">
          <button id="btn-rewind" class="transport-btn" title="${v(`rewind`)}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/></svg>
          </button>
          <button id="btn-play" class="transport-btn play-btn" title="${v(`play`)} / ${v(`pause`)}">
            <svg id="play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <button id="btn-loop" class="transport-btn ${this.state.isLooping?`active`:``}" title="${v(`loop`)}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          </button>
        </div>

        <div class="timecode-display-box" id="timecode-box">
          <span class="tc-label">TC</span>
          <span class="tc-digits" id="timecode-digits">00:00:00:00</span>
          <span class="fps-badge">30 FPS</span>
        </div>

        <div class="timeline-action-tools">
          <button id="btn-split" class="tool-btn" title="${v(`splitClip`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
            <span>${v(`splitClip`)}</span>
          </button>
          <button id="btn-dup" class="tool-btn" title="${v(`duplicateClip`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>${v(`duplicateClip`)}</span>
          </button>
          <button id="btn-del" class="tool-btn danger" title="${v(`deleteClip`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span>${v(`deleteClip`)}</span>
          </button>
        </div>

        <div class="timeline-zoom-control">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          <input type="range" id="zoom-slider" min="20" max="100" value="${this.pixelsPerSecond}" class="studio-slider-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
      </div>

      <div class="timeline-workspace-wrapper">
        <!-- Left Tracks Header -->
        <div class="tracks-header-column">
          <div class="ruler-corner-spacer">
            <span>TRACKS</span>
          </div>
          <div class="tracks-header-list" id="tracks-header-list">
            ${this.renderTrackHeaders()}
          </div>
        </div>

        <!-- Right Tracks Timeline Grid & Ruler -->
        <div class="tracks-content-scroll" id="tracks-content-scroll">
          <div class="timeline-inner-canvas" id="timeline-inner-canvas" style="width: ${this.state.duration*this.pixelsPerSecond+200}px;">
            <!-- Interactive Time Ruler -->
            <div class="timeline-ruler" id="timeline-ruler">
              ${this.renderRulerTicks()}
            </div>

            <!-- Playhead Needle -->
            <div class="timeline-playhead" id="timeline-playhead">
              <div class="playhead-handle"></div>
              <div class="playhead-line"></div>
            </div>

            <!-- Tracks lanes container -->
            <div class="tracks-lanes-container" id="tracks-lanes-container">
              ${this.renderTrackLanes()}
            </div>
          </div>
        </div>
      </div>
    `,this.attachEvents(),this.updatePlayheadOnly(),this.updateTimecodeDisplay()}renderTrackHeaders(){return this.state.tracks.map(e=>`
      <div class="track-header-item ${e.locked?`locked`:``} ${e.muted?`muted`:``}" data-track-id="${e.id}">
        <div class="track-info">
          <span class="track-indicator ${e.type}"></span>
          <span class="track-name">${v(e.nameKey)}</span>
        </div>
        <div class="track-toggles">
          <button class="track-toggle-btn ${e.muted?`active`:``}" data-action="muted" title="${v(`mute`)}">M</button>
          <button class="track-toggle-btn ${e.solo?`active`:``}" data-action="solo" title="${v(`solo`)}">S</button>
          <button class="track-toggle-btn ${e.locked?`active`:``}" data-action="locked" title="${v(`lock`)}">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </button>
        </div>
      </div>
    `).join(``)}renderRulerTicks(){let e=Math.ceil(this.state.duration)+2,t=``;for(let r=0;r<=e;r++){let e=r*this.pixelsPerSecond,i=n(r,30);t+=`
        <div class="ruler-major-tick" style="left: ${e}px;">
          <span class="tick-label">${i.slice(3,8)}</span>
        </div>
      `;let a=(r+.5)*this.pixelsPerSecond;t+=`<div class="ruler-minor-tick" style="left: ${a}px;"></div>`}return t}renderTrackLanes(){return this.state.tracks.map(e=>{let t=this.state.clips.filter(t=>t.trackId===e.id);return`
        <div class="track-lane-row" data-track-id="${e.id}">
          <div class="lane-grid-lines"></div>
          ${t.map(e=>this.renderClipPill(e)).join(``)}
        </div>
      `}).join(``)}renderClipPill(e){let t=e.startTime*this.pixelsPerSecond,n=Math.max(16,e.duration*this.pixelsPerSecond),r=e.id===this.state.selectedClipId,i=Object.values(e.keyframes||{}).reduce((e,t)=>e+(t?.length||0),0);return`
      <div class="timeline-clip-pill ${r?`selected`:``}"
           data-clip-id="${e.id}"
           style="left: ${t}px; width: ${n}px; --clip-color: ${e.color};">
        <div class="clip-trim-handle start" data-handle="start"></div>
        <div class="clip-content-body" data-handle="body">
          <span class="clip-pill-icon">${this.getClipIcon(e.type)}</span>
          <span class="clip-pill-title">${e.name}</span>
          <span class="clip-pill-dur">${e.duration.toFixed(1)}s</span>
          ${i>0?`<span class="clip-kf-badge">◆ ${i}</span>`:``}
        </div>
        <div class="clip-trim-handle end" data-handle="end"></div>
      </div>
    `}getClipIcon(e){switch(e){case`generative`:return`✦`;case`text`:return`T`;case`shape`:return`◆`;case`audio`:return`♫`;case`image`:return`🖼`;default:return`▶`}}renderClipsOnly(){let e=this.container.querySelector(`#tracks-lanes-container`);e&&(e.innerHTML=this.renderTrackLanes())}updatePlayheadOnly(){let e=this.container.querySelector(`#timeline-playhead`);if(e){let t=this.state.currentTime*this.pixelsPerSecond;e.style.left=`${t}px`}}updateTimecodeDisplay(){let e=this.container.querySelector(`#timecode-digits`);e&&(e.textContent=n(this.state.currentTime,30))}updateTransportButtons(){let e=this.container.querySelector(`#play-icon`);e&&(e.outerHTML=this.state.isPlaying?`<svg id="play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`:`<svg id="play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`);let t=this.container.querySelector(`#btn-loop`);t&&t.classList.toggle(`active`,this.state.isLooping)}attachEvents(){this.container.querySelector(`#btn-play`)?.addEventListener(`click`,()=>{this.callbacks.onPlayToggle()}),this.container.querySelector(`#btn-rewind`)?.addEventListener(`click`,()=>{this.callbacks.onSeek(0)}),this.container.querySelector(`#btn-loop`)?.addEventListener(`click`,()=>{this.callbacks.onLoopToggle()}),this.container.querySelector(`#btn-split`)?.addEventListener(`click`,()=>{this.state.selectedClipId&&this.callbacks.onClipSplit(this.state.selectedClipId)}),this.container.querySelector(`#btn-dup`)?.addEventListener(`click`,()=>{this.state.selectedClipId&&this.callbacks.onClipDuplicate(this.state.selectedClipId)}),this.container.querySelector(`#btn-del`)?.addEventListener(`click`,()=>{this.state.selectedClipId&&this.callbacks.onClipDelete(this.state.selectedClipId)}),this.container.querySelector(`#zoom-slider`)?.addEventListener(`input`,e=>{this.pixelsPerSecond=Number(e.target.value),this.render()}),this.container.querySelector(`#tracks-header-list`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.track-toggle-btn`);if(!t)return;let n=t.closest(`.track-header-item`)?.dataset.trackId,r=t.dataset.action;n&&r&&this.callbacks.onTrackToggle(n,r)}),this.container.querySelector(`#timeline-ruler`)?.addEventListener(`mousedown`,e=>{this.isScrubbing=!0,this.scrubToMouse(e)}),this.container.querySelector(`#tracks-lanes-container`)?.addEventListener(`mousedown`,e=>{let t=e.target.dataset.handle,n=e.target.closest(`.timeline-clip-pill`);if(n&&t){let r=n.dataset.clipId;this.callbacks.onClipSelect(r);let i=this.state.clips.find(e=>e.id===r);if(!i)return;this.draggingClipId=r,this.dragStartX=e.clientX,this.initialClipStart=i.startTime,this.initialClipDur=i.duration,this.dragMode=t===`start`?`trim-start`:t===`end`?`trim-end`:`move`,e.stopPropagation()}else this.callbacks.onClipSelect(null),this.isScrubbing=!0,this.scrubToMouse(e)})}setupGlobalEvents(){window.addEventListener(`mousemove`,e=>{if(this.isScrubbing)this.scrubToMouse(e);else if(this.draggingClipId&&this.dragMode!==`none`){let t=(e.clientX-this.dragStartX)/this.pixelsPerSecond;if(this.dragMode===`move`){let e=Math.max(0,this.initialClipStart+t);this.callbacks.onClipMove(this.draggingClipId,Math.round(e*30)/30)}else if(this.dragMode===`trim-start`){let e=Math.max(0,this.initialClipStart+t),n=this.initialClipStart+this.initialClipDur-.2,r=Math.min(e,n),i=this.initialClipStart+this.initialClipDur-r;this.callbacks.onClipTrim(this.draggingClipId,Math.round(r*30)/30,Math.round(i*30)/30)}else if(this.dragMode===`trim-end`){let e=Math.max(.2,this.initialClipDur+t);this.callbacks.onClipTrim(this.draggingClipId,this.initialClipStart,Math.round(e*30)/30)}}}),window.addEventListener(`mouseup`,()=>{this.isScrubbing=!1,this.draggingClipId=null,this.dragMode=`none`}),window.addEventListener(`keydown`,e=>{e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||(e.code===`Space`?(e.preventDefault(),this.callbacks.onPlayToggle()):(e.code===`Delete`||e.code===`Backspace`)&&this.state.selectedClipId&&(e.preventDefault(),this.callbacks.onClipDelete(this.state.selectedClipId)))})}scrubToMouse(e){let t=this.container.querySelector(`#tracks-content-scroll`);if(!t)return;let n=t.getBoundingClientRect(),r=e.clientX-n.left+t.scrollLeft,i=Math.max(0,Math.min(this.state.duration,r/this.pixelsPerSecond));this.callbacks.onSeek(Math.round(i*30)/30)}},x=class{container;state;shaderFX;colorGrading;audioMood;audioVolume;showVisualizer;callbacks;activeTab=`clip`;constructor(e,t,n,r,i,a,o,s){this.container=e,this.state=t,this.shaderFX=n,this.colorGrading=r,this.audioMood=i,this.audioVolume=a,this.showVisualizer=o,this.callbacks=s,this.render()}update(e,t,n,r,i,a){this.state=e,this.shaderFX=t,this.colorGrading=n,this.audioMood=r,this.audioVolume=i,this.showVisualizer=a,this.render()}render(){this.container.innerHTML=`
      <div class="inspector-tabs-nav">
        <button class="insp-tab-btn ${this.activeTab===`clip`?`active`:``}" data-tab="clip" title="${v(`inspector`)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>${v(`inspector`)}</span>
        </button>
        <button class="insp-tab-btn ${this.activeTab===`shaders`?`active`:``}" data-tab="shaders" title="${v(`shadersAndFX`)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>FX</span>
        </button>
        <button class="insp-tab-btn ${this.activeTab===`grading`?`active`:``}" data-tab="grading" title="${v(`colorGrading`)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20v-20z"/></svg>
          <span>LUT</span>
        </button>
        <button class="insp-tab-btn ${this.activeTab===`audio`?`active`:``}" data-tab="audio" title="${v(`audioEngine`)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>AUDIO</span>
        </button>
      </div>

      <div class="inspector-scroll-area">
        ${this.renderActiveTabContent()}
      </div>
    `,this.attachEvents()}renderActiveTabContent(){switch(this.activeTab){case`clip`:return this.renderClipInspector();case`shaders`:return this.renderShadersInspector();case`grading`:return this.renderColorGradingInspector();case`audio`:return this.renderAudioInspector()}}renderClipInspector(){let e=this.state.clips.find(e=>e.id===this.state.selectedClipId);if(!e)return`
        <div class="empty-inspector-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <p>${v(`noClipSelected`)}</p>
        </div>
      `;let t=e.transform,n=Math.max(0,this.state.currentTime-e.startTime);return`
      <!-- Transform & Motion -->
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          <span>${v(`transform`)}</span>
        </div>

        <div class="insp-field-row">
          <label>${v(`posX`)}</label>
          <div class="insp-input-group">
            <input type="number" id="inp-pos-x" class="studio-input-num" value="${t.x}">
            <button class="kf-toggle-btn ${this.hasKeyframe(e,`x`,n)?`active`:``}" data-prop="x" title="${v(`keyframes`)}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`posY`)}</label>
          <div class="insp-input-group">
            <input type="number" id="inp-pos-y" class="studio-input-num" value="${t.y}">
            <button class="kf-toggle-btn ${this.hasKeyframe(e,`y`,n)?`active`:``}" data-prop="y" title="${v(`keyframes`)}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`scale`)}</label>
          <div class="insp-input-group">
            <input type="range" id="inp-scale" min="10" max="300" value="${t.scale}" class="studio-slider">
            <span class="val-display">${t.scale}%</span>
            <button class="kf-toggle-btn ${this.hasKeyframe(e,`scale`,n)?`active`:``}" data-prop="scale" title="${v(`keyframes`)}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`rotation`)}</label>
          <div class="insp-input-group">
            <input type="range" id="inp-rotation" min="-180" max="180" value="${t.rotation}" class="studio-slider">
            <span class="val-display">${t.rotation}°</span>
            <button class="kf-toggle-btn ${this.hasKeyframe(e,`rotation`,n)?`active`:``}" data-prop="rotation" title="${v(`keyframes`)}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`opacity`)}</label>
          <div class="insp-input-group">
            <input type="range" id="inp-opacity" min="0" max="100" value="${t.opacity}" class="studio-slider">
            <span class="val-display">${t.opacity}%</span>
            <button class="kf-toggle-btn ${this.hasKeyframe(e,`opacity`,n)?`active`:``}" data-prop="opacity" title="${v(`keyframes`)}">◆</button>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`blendMode`)}</label>
          <select id="inp-blend" class="studio-select">
            <option value="source-over" ${e.blendMode===`source-over`?`selected`:``}>Normal</option>
            <option value="screen" ${e.blendMode===`screen`?`selected`:``}>Screen</option>
            <option value="multiply" ${e.blendMode===`multiply`?`selected`:``}>Multiply</option>
            <option value="overlay" ${e.blendMode===`overlay`?`selected`:``}>Overlay</option>
            <option value="color-dodge" ${e.blendMode===`color-dodge`?`selected`:``}>Color Dodge</option>
            <option value="luminosity" ${e.blendMode===`luminosity`?`selected`:``}>Luminosity</option>
          </select>
        </div>
      </div>

      <!-- Text Properties (if Text Clip) -->
      ${e.type===`text`&&e.textData?this.renderTextInspector(e):``}

      <!-- Shape Properties (if Shape Clip) -->
      ${e.type===`shape`&&e.shapeData?this.renderShapeInspector(e):``}
    `}renderTextInspector(e){let t=e.textData;return`
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
          <span>${v(`textProperties`)}</span>
        </div>

        <div class="insp-field-col">
          <label>${v(`textContent`)}</label>
          <textarea id="inp-text-content" class="studio-textarea" rows="2">${t.text}</textarea>
        </div>

        <div class="insp-field-row">
          <label>${v(`fontFamily`)}</label>
          <select id="inp-font-family" class="studio-select">
            <option value="Cairo" ${t.fontFamily===`Cairo`?`selected`:``}>Cairo (عربي عريض)</option>
            <option value="Tajawal" ${t.fontFamily===`Tajawal`?`selected`:``}>Tajawal (عربي رشيق)</option>
            <option value="Orbitron" ${t.fontFamily===`Orbitron`?`selected`:``}>Orbitron (Cyberpunk)</option>
            <option value="Inter" ${t.fontFamily===`Inter`?`selected`:``}>Inter (Modern Sans)</option>
            <option value="Bebas Neue" ${t.fontFamily===`Bebas Neue`?`selected`:``}>Bebas Neue (Headline)</option>
            <option value="Playfair Display" ${t.fontFamily===`Playfair Display`?`selected`:``}>Playfair Display (Editorial)</option>
          </select>
        </div>

        <div class="insp-field-row">
          <label>${v(`fontSize`)}</label>
          <input type="number" id="inp-font-size" class="studio-input-num" value="${t.fontSize}" min="16" max="200">
        </div>

        <div class="insp-field-row">
          <label>${v(`textColor`)}</label>
          <input type="color" id="inp-text-color" class="studio-color-picker" value="${t.textColor}">
        </div>

        <div class="insp-field-row">
          <label>${v(`strokeColor`)}</label>
          <input type="color" id="inp-stroke-color" class="studio-color-picker" value="${t.strokeColor}">
        </div>

        <div class="insp-field-row">
          <label>${v(`strokeWidth`)}</label>
          <input type="range" id="inp-stroke-width" min="0" max="20" value="${t.strokeWidth}" class="studio-slider">
        </div>

        <div class="insp-field-row">
          <label>${v(`neonGlow`)}</label>
          <input type="checkbox" id="inp-neon-glow" ${t.neonGlow?`checked`:``} class="studio-checkbox">
          <input type="color" id="inp-glow-color" class="studio-color-picker" value="${t.glowColor||`#00f0ff`}">
        </div>
      </div>
    `}renderShapeInspector(e){let t=e.shapeData;return`
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          <span>${v(`shapeProperties`)}</span>
        </div>

        <div class="insp-field-row">
          <label>${v(`fillColor`)}</label>
          <input type="color" id="inp-shape-fill" class="studio-color-picker" value="${t.fillColor}">
        </div>

        <div class="insp-field-row">
          <label>${v(`strokeColor`)}</label>
          <input type="color" id="inp-shape-stroke" class="studio-color-picker" value="${t.strokeColor}">
        </div>

        <div class="insp-field-row">
          <label>${v(`strokeWidth`)}</label>
          <input type="range" id="inp-shape-strokewidth" min="0" max="20" value="${t.strokeWidth}" class="studio-slider">
        </div>

        <div class="insp-field-row">
          <label>${v(`cornerRadius`)}</label>
          <input type="range" id="inp-shape-radius" min="0" max="60" value="${t.cornerRadius}" class="studio-slider">
        </div>
      </div>
    `}renderShadersInspector(){let e=this.shaderFX;return`
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${v(`shadersAndFX`)}</span>
        </div>

        <div class="insp-field-row">
          <label>${v(`filmGrain`)}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-film-grain" min="0" max="100" value="${e.filmGrain}" class="studio-slider">
            <span class="val-display">${e.filmGrain}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`chromaticAberration`)}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-chromatic" min="0" max="100" value="${e.chromaticAberration}" class="studio-slider">
            <span class="val-display">${e.chromaticAberration}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`crtGlitch`)}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-crt-glitch" min="0" max="100" value="${e.crtGlitch}" class="studio-slider">
            <span class="val-display">${e.crtGlitch}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`bloom`)}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-bloom" min="0" max="100" value="${e.bloom}" class="studio-slider">
            <span class="val-display">${e.bloom}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`vignette`)}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-vignette" min="0" max="100" value="${e.vignette}" class="studio-slider">
            <span class="val-display">${e.vignette}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`vhsRetro`)}</label>
          <div class="insp-input-group">
            <input type="range" id="fx-vhs" min="0" max="100" value="${e.vhsRetro}" class="studio-slider">
            <span class="val-display">${e.vhsRetro}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`duotone`)}</label>
          <div class="insp-input-group">
            <input type="checkbox" id="fx-duotone-toggle" ${e.duotone?`checked`:``} class="studio-checkbox">
            <input type="color" id="fx-duotone-col1" class="studio-color-picker" value="${e.duotoneColor1}">
            <input type="color" id="fx-duotone-col2" class="studio-color-picker" value="${e.duotoneColor2}">
          </div>
        </div>
      </div>
    `}renderColorGradingInspector(){let e=this.colorGrading;return`
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20v-20z"/></svg>
          <span>${v(`colorGrading`)}</span>
        </div>

        <div class="insp-field-row">
          <label>${v(`lutPreset`)}</label>
          <select id="cg-preset" class="studio-select">
            <option value="none" ${e.preset===`none`?`selected`:``}>None (Rec.709 Clean)</option>
            <option value="teal-orange" ${e.preset===`teal-orange`?`selected`:``}>Teal & Orange Blockbuster</option>
            <option value="cyber-neon" ${e.preset===`cyber-neon`?`selected`:``}>Cyberpunk Neon Matrix</option>
            <option value="kinfolk-warm" ${e.preset===`kinfolk-warm`?`selected`:``}>Kinfolk Warm Earth Film</option>
            <option value="bw-contrast" ${e.preset===`bw-contrast`?`selected`:``}>B&W High Contrast Noir</option>
            <option value="vintage-kodak" ${e.preset===`vintage-kodak`?`selected`:``}>70s Vintage Kodachrome</option>
          </select>
        </div>

        <div class="insp-field-row">
          <label>${v(`exposure`)}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-exposure" min="-100" max="100" value="${e.exposure}" class="studio-slider">
            <span class="val-display">${e.exposure}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`contrast`)}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-contrast" min="-100" max="100" value="${e.contrast}" class="studio-slider">
            <span class="val-display">${e.contrast}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`saturation`)}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-saturation" min="-100" max="100" value="${e.saturation}" class="studio-slider">
            <span class="val-display">${e.saturation}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`temperature`)}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-temp" min="-100" max="100" value="${e.temperature}" class="studio-slider">
            <span class="val-display">${e.temperature}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`tint`)}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-tint" min="-100" max="100" value="${e.tint}" class="studio-slider">
            <span class="val-display">${e.tint}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`highlights`)}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-highlights" min="-100" max="100" value="${e.highlights}" class="studio-slider">
            <span class="val-display">${e.highlights}</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`shadows`)}</label>
          <div class="insp-input-group">
            <input type="range" id="cg-shadows" min="-100" max="100" value="${e.shadows}" class="studio-slider">
            <span class="val-display">${e.shadows}</span>
          </div>
        </div>
      </div>
    `}renderAudioInspector(){return`
      <div class="inspector-section">
        <div class="section-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>${v(`audioEngine`)}</span>
        </div>

        <div class="insp-field-row">
          <label>${v(`audioMood`)}</label>
          <select id="audio-mood-select" class="studio-select">
            <option value="synthwave" ${this.audioMood===`synthwave`?`selected`:``}>Synthwave Cyber 120 BPM</option>
            <option value="kinfolk" ${this.audioMood===`kinfolk`?`selected`:``}>Kinfolk Organic Ambient 72 BPM</option>
            <option value="tiktok" ${this.audioMood===`tiktok`?`selected`:``}>TikTok Punchy Pop 128 BPM</option>
            <option value="lofi" ${this.audioMood===`lofi`?`selected`:``}>Lofi Sunset Rhodes 84 BPM</option>
          </select>
        </div>

        <div class="insp-field-row">
          <label>${v(`audioVolume`)}</label>
          <div class="insp-input-group">
            <input type="range" id="audio-vol-slider" min="0" max="100" value="${Math.round(this.audioVolume*100)}" class="studio-slider">
            <span class="val-display">${Math.round(this.audioVolume*100)}%</span>
          </div>
        </div>

        <div class="insp-field-row">
          <label>${v(`visualizerOverlay`)}</label>
          <input type="checkbox" id="audio-viz-overlay" ${this.showVisualizer?`checked`:``} class="studio-checkbox">
        </div>
      </div>
    `}hasKeyframe(e,t,n){let r=e.keyframes[t];return r?r.some(e=>Math.abs(e.time-n)<.1):!1}attachEvents(){this.container.querySelectorAll(`.insp-tab-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.tab;t&&(this.activeTab=t,this.render())})});let e=this.state.clips.find(e=>e.id===this.state.selectedClipId);if(e){let t=e=>Number(this.container.querySelector(e)?.value||0),n=()=>{this.callbacks.onClipPropertyChange(e.id,{transform:{x:t(`#inp-pos-x`),y:t(`#inp-pos-y`),scale:t(`#inp-scale`),rotation:t(`#inp-rotation`),opacity:t(`#inp-opacity`)}})};if(this.container.querySelector(`#inp-pos-x`)?.addEventListener(`input`,n),this.container.querySelector(`#inp-pos-y`)?.addEventListener(`input`,n),this.container.querySelector(`#inp-scale`)?.addEventListener(`input`,n),this.container.querySelector(`#inp-rotation`)?.addEventListener(`input`,n),this.container.querySelector(`#inp-opacity`)?.addEventListener(`input`,n),this.container.querySelector(`#inp-blend`)?.addEventListener(`change`,t=>{this.callbacks.onClipPropertyChange(e.id,{blendMode:t.target.value})}),this.container.querySelectorAll(`.kf-toggle-btn`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget.dataset.prop,r=Math.max(0,this.state.currentTime-e.startTime);this.hasKeyframe(e,n,r)?this.callbacks.onRemoveKeyframe(e.id,n):this.callbacks.onAddKeyframe(e.id,n,`easeInOut`)})}),e.type===`text`&&e.textData){let t=()=>{let t=this.container.querySelector(`#inp-text-content`)?.value||``,n=this.container.querySelector(`#inp-font-family`)?.value||`Cairo`,r=Number(this.container.querySelector(`#inp-font-size`)?.value||48),i=this.container.querySelector(`#inp-text-color`)?.value||`#ffffff`,a=this.container.querySelector(`#inp-stroke-color`)?.value||`#000000`,o=Number(this.container.querySelector(`#inp-stroke-width`)?.value||0),s=this.container.querySelector(`#inp-neon-glow`)?.checked||!1,c=this.container.querySelector(`#inp-glow-color`)?.value||`#00f0ff`;this.callbacks.onClipPropertyChange(e.id,{textData:{...e.textData,text:t,fontFamily:n,fontSize:r,textColor:i,strokeColor:a,strokeWidth:o,neonGlow:s,glowColor:c}})};this.container.querySelector(`#inp-text-content`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-font-family`)?.addEventListener(`change`,t),this.container.querySelector(`#inp-font-size`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-text-color`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-stroke-color`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-stroke-width`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-neon-glow`)?.addEventListener(`change`,t),this.container.querySelector(`#inp-glow-color`)?.addEventListener(`input`,t)}if(e.type===`shape`&&e.shapeData){let t=()=>{let t=this.container.querySelector(`#inp-shape-fill`)?.value||`#00f0ff`,n=this.container.querySelector(`#inp-shape-stroke`)?.value||`#ffffff`,r=Number(this.container.querySelector(`#inp-shape-strokewidth`)?.value||0),i=Number(this.container.querySelector(`#inp-shape-radius`)?.value||0);this.callbacks.onClipPropertyChange(e.id,{shapeData:{...e.shapeData,fillColor:t,strokeColor:n,strokeWidth:r,cornerRadius:i}})};this.container.querySelector(`#inp-shape-fill`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-shape-stroke`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-shape-strokewidth`)?.addEventListener(`input`,t),this.container.querySelector(`#inp-shape-radius`)?.addEventListener(`input`,t)}}let t=e=>Number(this.container.querySelector(e)?.value||0),n=()=>{this.callbacks.onShaderFXChange({filmGrain:t(`#fx-film-grain`),chromaticAberration:t(`#fx-chromatic`),crtGlitch:t(`#fx-crt-glitch`),bloom:t(`#fx-bloom`),vignette:t(`#fx-vignette`),vhsRetro:t(`#fx-vhs`),duotone:this.container.querySelector(`#fx-duotone-toggle`)?.checked||!1,duotoneColor1:this.container.querySelector(`#fx-duotone-col1`)?.value||`#0f172a`,duotoneColor2:this.container.querySelector(`#fx-duotone-col2`)?.value||`#00f0ff`})};[`#fx-film-grain`,`#fx-chromatic`,`#fx-crt-glitch`,`#fx-bloom`,`#fx-vignette`,`#fx-vhs`].forEach(e=>{this.container.querySelector(e)?.addEventListener(`input`,n)}),this.container.querySelector(`#fx-duotone-toggle`)?.addEventListener(`change`,n),this.container.querySelector(`#fx-duotone-col1`)?.addEventListener(`input`,n),this.container.querySelector(`#fx-duotone-col2`)?.addEventListener(`input`,n);let r=()=>{this.callbacks.onColorGradingChange({preset:this.container.querySelector(`#cg-preset`)?.value||`none`,exposure:t(`#cg-exposure`),contrast:t(`#cg-contrast`),saturation:t(`#cg-saturation`),temperature:t(`#cg-temp`),tint:t(`#cg-tint`),highlights:t(`#cg-highlights`),shadows:t(`#cg-shadows`)})};this.container.querySelector(`#cg-preset`)?.addEventListener(`change`,r),[`#cg-exposure`,`#cg-contrast`,`#cg-saturation`,`#cg-temp`,`#cg-tint`,`#cg-highlights`,`#cg-shadows`].forEach(e=>{this.container.querySelector(e)?.addEventListener(`input`,r)}),this.container.querySelector(`#audio-mood-select`)?.addEventListener(`change`,e=>{this.callbacks.onAudioMoodChange(e.target.value)}),this.container.querySelector(`#audio-vol-slider`)?.addEventListener(`input`,e=>{let t=Number(e.target.value)/100;this.callbacks.onAudioVolumeChange(t)}),this.container.querySelector(`#audio-viz-overlay`)?.addEventListener(`change`,e=>{this.callbacks.onVisualizerOverlayToggle(e.target.checked)})}},S=class{container;callbacks;activeTab=`templates`;constructor(e,t){this.container=e,this.callbacks=t,this.render()}render(){this.container.innerHTML=`
      <div class="assets-tabs-nav">
        <button class="asset-tab-btn ${this.activeTab===`templates`?`active`:``}" data-tab="templates">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>${v(`templates`)}</span>
        </button>
        <button class="asset-tab-btn ${this.activeTab===`ai`?`active`:``}" data-tab="ai">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>AI STUDIO</span>
        </button>
        <button class="asset-tab-btn ${this.activeTab===`layers`?`active`:``}" data-tab="layers">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          <span>${v(`tracks`)}</span>
        </button>
      </div>

      <div class="assets-content-area">
        ${this.renderActiveTab()}
      </div>
    `,this.attachEvents()}renderActiveTab(){switch(this.activeTab){case`templates`:return this.renderTemplatesTab();case`ai`:return this.renderAiTab();case`layers`:return this.renderLayersTab()}}renderTemplatesTab(){return`
      <div class="templates-grid">
        ${o.map(e=>`
          <div class="template-card" data-template-id="${e.id}">
            <div class="template-card-header">
              <span class="template-ratio-tag">${e.aspectRatio}</span>
              <span class="template-dur-tag">${e.duration}s</span>
            </div>
            <div class="template-card-body">
              <h4 class="template-title">${v(e.nameKey)}</h4>
              <p class="template-desc">${v(e.descKey)}</p>
            </div>
            <button class="template-load-btn" data-template-id="${e.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>تحميل المشروع الفوري</span>
            </button>
          </div>
        `).join(``)}
      </div>
    `}renderAiTab(){return`
      <div class="ai-studio-panel">
        <div class="ai-header-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>CINEMOTION NEURAL ENGINE // استوديو التوليد الرقمي</span>
        </div>

        <div class="ai-input-group">
          <label class="ai-label">${v(`aiPrompt`)}:</label>
          <textarea id="ai-prompt-input" class="studio-textarea" rows="3" placeholder="مثال: أفق مستقبلي نيون مع شبكة رقمية متوهجة وسماء أرجوانية..."></textarea>
        </div>

        <div class="ai-styles-section">
          <label class="ai-label">${v(`aiStyles`)}:</label>
          <div class="ai-tags-cloud">
            ${[{id:`cyber`,label:`Cyberpunk Neo-Tokyo`,scene:`cyber-grid`},{id:`cinema`,label:`Cinematic Film 8K`,scene:`aurora`},{id:`kinfolk`,label:`Kinfolk Minimalist`,scene:`fluid-blobs`},{id:`lofi`,label:`Lofi Sunset Polaroid`,scene:`lofi-sunset`},{id:`matrix`,label:`Digital Matrix Stream`,scene:`matrix-code`},{id:`stars`,label:`3D Hyperspace Stars`,scene:`particle-stars`}].map(e=>`
              <button class="ai-tag-chip" data-scene="${e.scene}" data-tag="${e.label}">
                ✦ ${e.label}
              </button>
            `).join(``)}
          </div>
        </div>

        <button id="btn-generate-scene" class="studio-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          <span>${v(`generateScene`)}</span>
        </button>
      </div>
    `}renderLayersTab(){return`
      <div class="layer-factory-grid">
        <!-- Text Layers -->
        <div class="factory-group">
          <span class="group-title">${v(`textProperties`)}</span>
          <button class="factory-action-card" id="btn-add-text-title">
            <span class="card-icon">T</span>
            <div class="card-info">
              <strong>عنوان نيون سينمائي</strong>
              <small>نص ضخم بتوهج نيون مستقبلي</small>
            </div>
          </button>
          <button class="factory-action-card" id="btn-add-text-sub">
            <span class="card-icon">t</span>
            <div class="card-info">
              <strong>نص توضيحي عربي أنيق</strong>
              <small>خط تجوال ناصع وواضح</small>
            </div>
          </button>
        </div>

        <!-- Lower Thirds & Badges -->
        <div class="factory-group">
          <span class="group-title">الشارات والأشرطة التلفزيونية</span>
          <button class="factory-action-card" id="btn-add-lower-third">
            <span class="card-icon">▬</span>
            <div class="card-info">
              <strong>${v(`addLowerThird`)}</strong>
              <small>شريط إخباري أو تعريفي متحرك</small>
            </div>
          </button>
          <button class="factory-action-card" id="btn-add-badge">
            <span class="card-icon">🏷</span>
            <div class="card-info">
              <strong>شارة عروض وتخفيضات</strong>
              <small>شارة مائلة ذات تباين مرتفع</small>
            </div>
          </button>
        </div>

        <!-- Geometric Shapes -->
        <div class="factory-group">
          <span class="group-title">${v(`shapeProperties`)}</span>
          <div class="shape-buttons-row">
            <button class="shape-btn" data-shape="rectangle" title="مستطيل">▭</button>
            <button class="shape-btn" data-shape="rounded-rect" title="مستطيل مستدير">▢</button>
            <button class="shape-btn" data-shape="circle" title="دائرة">◯</button>
            <button class="shape-btn" data-shape="star" title="نجمة">★</button>
          </div>
        </div>

        <!-- Media Upload -->
        <div class="factory-group">
          <span class="group-title">${v(`uploadMedia`)}</span>
          <label class="media-upload-dropzone">
            <input type="file" id="media-file-input" accept="image/*,video/*" style="display: none;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>اختر صورة أو فيديو محلي</span>
          </label>
        </div>
      </div>
    `}attachEvents(){this.container.querySelectorAll(`.asset-tab-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.tab;t&&(this.activeTab=t,this.render())})}),this.container.querySelectorAll(`.template-load-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.templateId,n=o.find(e=>e.id===t);n&&this.callbacks.onLoadTemplate(n)})});let e=`cyber-grid`,t=`Cyberpunk Neo-Tokyo`;this.container.querySelectorAll(`.ai-tag-chip`).forEach(n=>{n.addEventListener(`click`,n=>{this.container.querySelectorAll(`.ai-tag-chip`).forEach(e=>e.classList.remove(`selected`));let r=n.currentTarget;r.classList.add(`selected`),e=r.dataset.scene||`cyber-grid`,t=r.dataset.tag||`Cyberpunk`;let i=this.container.querySelector(`#ai-prompt-input`);i&&(i.value=`${t} with vibrant volumetric lighting, 8K ultra detail`)})}),this.container.querySelector(`#btn-generate-scene`)?.addEventListener(`click`,()=>{this.callbacks.onAddGenerativeScene(e,t)}),this.container.querySelector(`#btn-add-text-title`)?.addEventListener(`click`,()=>{this.callbacks.onAddTextLayer({text:`CINEMOTION // رؤية رقمية خارقة`,fontSize:64,neon:!0})}),this.container.querySelector(`#btn-add-text-sub`)?.addEventListener(`click`,()=>{this.callbacks.onAddTextLayer({text:`إبداع تصميم ومونتاج رقمي في المتصفح`,fontSize:36,neon:!1})}),this.container.querySelector(`#btn-add-lower-third`)?.addEventListener(`click`,()=>{this.callbacks.onAddLowerThird()}),this.container.querySelector(`#btn-add-badge`)?.addEventListener(`click`,()=>{this.callbacks.onAddShapeLayer(`badge`)}),this.container.querySelectorAll(`.shape-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.shape;t&&this.callbacks.onAddShapeLayer(t)})}),this.container.querySelector(`#media-file-input`)?.addEventListener(`change`,e=>{let t=e.target.files;t&&t.length>0&&this.callbacks.onUploadMedia(t[0])})}},C=class{state;shaderFX;colorGrading;audioEngine;audioMood=`synthwave`;audioVolume=.8;showVisualizer=!1;viewportView;timelineView;inspectorView;assetsView;lastTime=0;animationFrameId=null;mediaRecorder=null;recordedChunks=[];isExportingVideo=!1;constructor(){let e=o[0],t=r(e.aspectRatio);this.state={currentTime:0,duration:e.duration,fps:30,isPlaying:!1,isLooping:!0,selectedClipId:e.clips[1]?.id||null,tracks:JSON.parse(JSON.stringify(e.tracks)),clips:JSON.parse(JSON.stringify(e.clips)),aspectRatio:e.aspectRatio,canvasWidth:t.width,canvasHeight:t.height},this.shaderFX={...s,...e.shaderFX},this.colorGrading={...l,...e.colorGrading},this.audioMood=e.audioMood,this.showVisualizer=e.showVisualizer,this.audioEngine=new d,this.audioEngine.setMood(this.audioMood),this.audioEngine.setVolume(this.audioVolume),this.initDOM(),this.initViews(),this.startRenderLoop()}initDOM(){let e=document.getElementById(`app`);e.innerHTML=`
      <!-- Top Navigation Bar -->
      <header class="studio-topbar">
        <div class="topbar-brand">
          <div class="brand-icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
          <div class="brand-title">
            <span>CINEMOTION</span>
            <span class="brand-badge">STUDIO PRO</span>
          </div>
        </div>

        <div class="topbar-actions">
          <button id="btn-save-project" class="studio-btn-sm" title="${v(`saveProject`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            <span>${v(`saveProject`)}</span>
          </button>

          <label class="studio-btn-sm" title="${v(`loadProject`)}" style="cursor: pointer; margin: 0;">
            <input type="file" id="input-load-project" accept=".json,.cinemotion" style="display: none;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>${v(`loadProject`)}</span>
          </label>

          <button id="btn-lang-toggle" class="lang-btn">
            ${_()===`ar`?`English`:`العربية`}
          </button>

          <button id="btn-export-video" class="studio-btn-accent" title="${v(`exportVideo`)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            <span>${v(`exportVideo`)}</span>
          </button>
        </div>
      </header>

      <!-- Main Workspace -->
      <main class="studio-workspace-main">
        <!-- Left Dock: Assets & AI -->
        <aside class="studio-left-dock" id="left-dock"></aside>

        <!-- Center Stage: Viewport -->
        <section class="studio-center-stage" id="center-stage"></section>

        <!-- Right Dock: Inspector -->
        <aside class="studio-right-dock" id="right-dock"></aside>
      </main>

      <!-- Bottom Dock: NLE Multi-Track Timeline -->
      <footer class="studio-bottom-timeline" id="bottom-timeline"></footer>

      <!-- Export Modal Container -->
      <div id="export-modal-root"></div>
    `,document.getElementById(`btn-save-project`)?.addEventListener(`click`,()=>this.saveProjectJSON()),document.getElementById(`input-load-project`)?.addEventListener(`change`,e=>{let t=e.target.files;t&&t.length>0&&this.loadProjectJSON(t[0])}),document.getElementById(`btn-lang-toggle`)?.addEventListener(`click`,()=>{g(_()===`ar`?`en`:`ar`),this.initDOM(),this.initViews()}),document.getElementById(`btn-export-video`)?.addEventListener(`click`,()=>{this.startVideoExport()})}initViews(){let e=document.getElementById(`left-dock`),t=document.getElementById(`center-stage`),n=document.getElementById(`right-dock`),i=document.getElementById(`bottom-timeline`);this.assetsView=new S(e,{onLoadTemplate:e=>this.loadTemplate(e),onAddTextLayer:e=>this.addTextLayer(e),onAddShapeLayer:e=>this.addShapeLayer(e),onAddLowerThird:()=>this.addLowerThird(),onAddGenerativeScene:(e,t)=>this.addGenerativeScene(e,t),onUploadMedia:e=>this.uploadMediaFile(e)}),this.viewportView=new y(t,this.state,{onClipTransformChange:(e,t)=>{let n=this.state.clips.find(t=>t.id===e);n&&(n.transform.x=t.x,n.transform.y=t.y,n.transform.scale=t.scale,n.transform.rotation=t.rotation,this.syncInspector())},onClipSelect:e=>{this.state.selectedClipId=e,this.syncViews()},onAspectRatioChange:e=>{this.state.aspectRatio=e;let t=r(e);this.state.canvasWidth=t.width,this.state.canvasHeight=t.height,this.viewportView.resizeCanvas(),this.viewportView.updateState(this.state)}}),this.viewportView.compositor.shaderFX=this.shaderFX,this.viewportView.compositor.colorGrading=this.colorGrading,this.viewportView.compositor.showVisualizerOverlay=this.showVisualizer,this.inspectorView=new x(n,this.state,this.shaderFX,this.colorGrading,this.audioMood,this.audioVolume,this.showVisualizer,{onClipPropertyChange:(e,t)=>{let n=this.state.clips.find(t=>t.id===e);n&&(Object.assign(n,t),this.syncTimeline())},onAddKeyframe:(e,t,n)=>{let r=this.state.clips.find(t=>t.id===e);if(!r)return;r.keyframes[t]||(r.keyframes[t]=[]);let i=Math.max(0,this.state.currentTime-r.startTime);r.keyframes[t]=r.keyframes[t].filter(e=>Math.abs(e.time-i)>=.1),r.keyframes[t].push({time:Math.round(i*30)/30,value:r.transform[t],easing:n}),this.syncViews()},onRemoveKeyframe:(e,t)=>{let n=this.state.clips.find(t=>t.id===e);if(!n||!n.keyframes[t])return;let r=Math.max(0,this.state.currentTime-n.startTime);n.keyframes[t]=n.keyframes[t].filter(e=>Math.abs(e.time-r)>=.1),this.syncViews()},onShaderFXChange:e=>{Object.assign(this.shaderFX,e),this.viewportView.compositor.shaderFX=this.shaderFX},onColorGradingChange:e=>{Object.assign(this.colorGrading,e),this.viewportView.compositor.colorGrading=this.colorGrading},onAudioMoodChange:e=>{this.audioMood=e,this.audioEngine.setMood(e)},onAudioVolumeChange:e=>{this.audioVolume=e,this.audioEngine.setVolume(e)},onVisualizerOverlayToggle:e=>{this.showVisualizer=e,this.viewportView.compositor.showVisualizerOverlay=e}}),this.timelineView=new b(i,this.state,{onPlayToggle:()=>this.togglePlayback(),onSeek:e=>{this.state.currentTime=e,this.syncViews()},onLoopToggle:()=>{this.state.isLooping=!this.state.isLooping,this.syncTimeline()},onClipMove:(e,t)=>{let n=this.state.clips.find(t=>t.id===e);n&&(n.startTime=t,this.syncTimeline())},onClipTrim:(e,t,n)=>{let r=this.state.clips.find(t=>t.id===e);r&&(r.startTime=t,r.duration=n,this.syncTimeline())},onClipSelect:e=>{this.state.selectedClipId=e,this.syncViews()},onClipSplit:e=>{this.splitClipAtPlayhead(e)},onClipDuplicate:e=>{this.duplicateClip(e)},onClipDelete:e=>{this.deleteClip(e)},onTrackToggle:(e,t)=>{let n=this.state.tracks.find(t=>t.id===e);n&&(n[t]=!n[t],this.syncViews())}})}startRenderLoop(){this.lastTime=performance.now();let e=t=>{let n=(t-this.lastTime)/1e3;this.lastTime=t,this.state.isPlaying&&(this.state.currentTime+=n,this.state.currentTime>=this.state.duration&&(this.state.isLooping?this.state.currentTime=0:(this.state.currentTime=this.state.duration,this.stopPlayback())),this.timelineView.updateState(this.state));let r=this.audioEngine.getFrequencyData();this.viewportView.compositor.render(this.state,r,!0),this.animationFrameId=requestAnimationFrame(e)};this.animationFrameId=requestAnimationFrame(e)}togglePlayback(){this.state.isPlaying?this.stopPlayback():this.startPlayback()}startPlayback(){this.state.currentTime>=this.state.duration&&(this.state.currentTime=0),this.state.isPlaying=!0,this.audioEngine.play(),this.syncTimeline()}stopPlayback(){this.state.isPlaying=!1,this.audioEngine.stop(),this.syncTimeline()}syncViews(){this.viewportView.updateState(this.state),this.timelineView.updateState(this.state),this.inspectorView.update(this.state,this.shaderFX,this.colorGrading,this.audioMood,this.audioVolume,this.showVisualizer)}syncTimeline(){this.timelineView.updateState(this.state)}syncInspector(){this.inspectorView.update(this.state,this.shaderFX,this.colorGrading,this.audioMood,this.audioVolume,this.showVisualizer)}loadTemplate(e){this.stopPlayback(),this.state.aspectRatio=e.aspectRatio;let t=r(e.aspectRatio);this.state.canvasWidth=t.width,this.state.canvasHeight=t.height,this.state.duration=e.duration,this.state.currentTime=0,this.state.tracks=JSON.parse(JSON.stringify(e.tracks)),this.state.clips=JSON.parse(JSON.stringify(e.clips)),this.state.selectedClipId=e.clips[0]?.id||null,this.shaderFX={...s,...e.shaderFX},this.colorGrading={...l,...e.colorGrading},this.audioMood=e.audioMood,this.showVisualizer=e.showVisualizer,this.audioEngine.setMood(this.audioMood),this.viewportView.compositor.shaderFX=this.shaderFX,this.viewportView.compositor.colorGrading=this.colorGrading,this.viewportView.compositor.showVisualizerOverlay=this.showVisualizer,this.viewportView.resizeCanvas(),this.viewportView.updateState(this.state),this.timelineView.render(),this.syncViews()}splitClipAtPlayhead(e){let t=this.state.clips.find(t=>t.id===e);if(!t)return;let n=this.state.currentTime;if(n<=t.startTime||n>=t.startTime+t.duration)return;let r=n-t.startTime,i=t.duration-r;t.duration=Math.round(r*30)/30;let a=JSON.parse(JSON.stringify(t));a.id=`clip_`+Date.now(),a.startTime=Math.round(n*30)/30,a.duration=Math.round(i*30)/30,a.name=t.name+` (Part 2)`,this.state.clips.push(a),this.state.selectedClipId=a.id,this.syncViews()}duplicateClip(e){let t=this.state.clips.find(t=>t.id===e);if(!t)return;let n=JSON.parse(JSON.stringify(t));n.id=`clip_`+Date.now(),n.startTime=Math.min(this.state.duration-t.duration,t.startTime+1),n.name=t.name+` (Copy)`,this.state.clips.push(n),this.state.selectedClipId=n.id,this.syncViews()}deleteClip(e){this.state.clips=this.state.clips.filter(t=>t.id!==e),this.state.selectedClipId===e&&(this.state.selectedClipId=null),this.syncViews()}addTextLayer(e){let t=`text_`+Date.now(),n={id:t,trackId:`track-g1`,name:`نص موشن جرافيك جديد`,type:`text`,startTime:Math.round(this.state.currentTime*30)/30,duration:6,color:`#00f0ff`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{scale:[{time:0,value:50,easing:`spring`},{time:.8,value:100,easing:`spring`}]},textData:{text:e?.text||`نص احترافي جديد // CineMotion`,fontFamily:`Cairo`,fontSize:e?.fontSize||60,textColor:`#ffffff`,strokeColor:`#000000`,strokeWidth:2,neonGlow:e?.neon??!0,glowColor:`#00f0ff`,textAlign:`center`}};this.state.clips.push(n),this.state.selectedClipId=t,this.syncViews()}addShapeLayer(e){let t=`shape_`+Date.now(),n={id:t,trackId:`track-g1`,name:`شكل ${e}`,type:`shape`,startTime:Math.round(this.state.currentTime*30)/30,duration:5,color:`#a855f7`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},shapeData:{shapeType:e,fillColor:`#00f0ff`,strokeColor:`#ffffff`,strokeWidth:2,cornerRadius:16,width:320,height:180,subText:e===`badge`?`⚡ خصم حصري ومميز ⚡`:void 0}};this.state.clips.push(n),this.state.selectedClipId=t,this.syncViews()}addLowerThird(){let e=`l3_`+Date.now(),t={id:e,trackId:`track-g1`,name:`أ. طارق ابوعشي // معلم المهارات الرقمية`,type:`shape`,startTime:Math.round(this.state.currentTime*30)/30,duration:8,color:`#00f0ff`,blendMode:`source-over`,transform:{x:0,y:380,scale:100,rotation:0,opacity:100},keyframes:{y:[{time:0,value:500,easing:`spring`},{time:.8,value:380,easing:`spring`}]},shapeData:{shapeType:`lower-third`,fillColor:`#00f0ff`,strokeColor:`#a855f7`,strokeWidth:1,cornerRadius:12,width:760,height:84,subText:`متوسطة أبها الأهلية // استوديو سينيموشن الرقمي`}};this.state.clips.push(t),this.state.selectedClipId=e,this.syncViews()}addGenerativeScene(e,t){let n=`gen_`+Date.now(),r={id:n,trackId:`track-v1`,name:`AI: ${t}`,type:`generative`,startTime:Math.round(this.state.currentTime*30)/30,duration:10,color:`#3b82f6`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},generativeData:{sceneType:e,colorA:`#00f0ff`,colorB:`#a855f7`,speed:1}};this.state.clips.push(r),this.state.selectedClipId=n,this.syncViews()}uploadMediaFile(e){let t=URL.createObjectURL(e),n=`media_`+Date.now(),r={id:n,trackId:`track-v2`,name:e.name,type:`image`,startTime:Math.round(this.state.currentTime*30)/30,duration:8,color:`#ec4899`,blendMode:`source-over`,transform:{x:0,y:0,scale:100,rotation:0,opacity:100},keyframes:{},imageData:{url:t,width:600,height:400}};this.state.clips.push(r),this.state.selectedClipId=n,this.syncViews()}saveProjectJSON(){let e={version:`1.0.0`,appName:`CineMotion Creative Studio`,state:this.state,shaderFX:this.shaderFX,colorGrading:this.colorGrading,audioMood:this.audioMood,audioVolume:this.audioVolume,showVisualizer:this.showVisualizer},t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`CineMotion_Project_${Date.now()}.cinemotion`,n.click()}loadProjectJSON(e){let t=new FileReader;t.onload=e=>{try{let t=JSON.parse(e.target?.result);t.state&&Array.isArray(t.state.clips)&&(this.state=t.state,t.shaderFX&&(this.shaderFX=t.shaderFX),t.colorGrading&&(this.colorGrading=t.colorGrading),t.audioMood&&(this.audioMood=t.audioMood),t.audioVolume&&(this.audioVolume=t.audioVolume),t.showVisualizer!==void 0&&(this.showVisualizer=t.showVisualizer),this.audioEngine.setMood(this.audioMood),this.viewportView.compositor.shaderFX=this.shaderFX,this.viewportView.compositor.colorGrading=this.colorGrading,this.viewportView.compositor.showVisualizerOverlay=this.showVisualizer,this.viewportView.resizeCanvas(),this.timelineView.render(),this.syncViews())}catch{alert(`ملف المشروع غير صالح أو تالف`)}},t.readAsText(e)}startVideoExport(){if(this.isExportingVideo)return;this.isExportingVideo=!0,this.stopPlayback();let e=this.viewportView.canvas.captureStream(30);this.recordedChunks=[];try{this.mediaRecorder=new MediaRecorder(e,{mimeType:`video/webm;codecs=vp9`,videoBitsPerSecond:8e6})}catch{this.mediaRecorder=new MediaRecorder(e)}this.mediaRecorder.ondataavailable=e=>{e.data.size>0&&this.recordedChunks.push(e.data)},this.mediaRecorder.onstop=()=>{let e=new Blob(this.recordedChunks,{type:`video/webm`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`CineMotion_Render_${Date.now()}.webm`,n.click(),this.isExportingVideo=!1,this.closeExportModal()},this.showExportModal(),this.state.currentTime=0,this.state.isPlaying=!0,this.mediaRecorder.start();let t=this.state.duration*1e3,n=performance.now(),r=setInterval(()=>{let e=performance.now()-n,i=Math.min(100,e/t*100),a=document.getElementById(`modal-export-fill`),o=document.getElementById(`modal-export-pct`);a&&(a.style.width=`${i}%`),o&&(o.textContent=`${Math.round(i)}%`),e>=t&&(clearInterval(r),this.stopPlayback(),this.mediaRecorder&&this.mediaRecorder.state!==`inactive`&&this.mediaRecorder.stop())},100)}showExportModal(){let e=document.getElementById(`export-modal-root`);e.innerHTML=`
      <div class="studio-modal-backdrop">
        <div class="studio-modal-card">
          <div class="modal-header">
            <h3>${v(`exportModalTitle`)}</h3>
            <span id="modal-export-pct" style="color: var(--accent-cyan); font-weight: 700;">0%</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 12px;">${v(`renderingVideo`)}</p>
          <div class="modal-progress-bar">
            <div class="modal-progress-fill" id="modal-export-fill"></div>
          </div>
        </div>
      </div>
    `}closeExportModal(){let e=document.getElementById(`export-modal-root`);e&&(e.innerHTML=``)}};window.addEventListener(`DOMContentLoaded`,()=>{new C});