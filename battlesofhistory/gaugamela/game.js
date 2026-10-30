'use strict';
const canvas=document.querySelector('#field'),ctx=canvas.getContext('2d');
const $=s=>document.querySelector(s);
let mode='watch',paused=false,elapsed=0,last=0,selected=null,units=[];
const phases=[
 {at:0,title:'Initial deployment',text:'Darius spreads his army across the plain. Alexander places his phalanx in the centre, cavalry on the wings, and reserves behind.'},
 {at:12,title:'The oblique advance',text:'Alexander moves to his right. Persian cavalry extends outward to prevent an attack on its flank.'},
 {at:26,title:'The chariots charge',text:'Persian scythed chariots rush forward. Macedonian light troops and openings in the ranks help blunt their impact.'},
 {at:39,title:'Alexander strikes',text:'A gap opens in the Persian line. Alexander leads the Companion cavalry in a decisive thrust toward Darius.'},
 {at:55,title:'The Persian centre breaks',text:'Darius retreats as the centre gives way. The Macedonian left still fights for survival.'},
 {at:69,title:'The aftermath',text:'Alexander turns to assist his left wing. The Persian army withdraws; the victory opens the heart of the empire.'}
];
function make(){units=[];const add=(side,type,x,y,n)=>units.push({side,type,x,y,homeX:x,homeY:y,n,hp:100,goal:null});
for(let i=0;i<6;i++)add('mac','Phalanx',.34+i*.067,.73,110);
add('mac','Companions',.78,.73,65);add('mac','Hypaspists',.75,.68,70);add('mac','Thessalian cavalry',.17,.75,65);add('mac','Agrianians',.69,.64,55);
for(let i=0;i<8;i++)add('pers','Infantry',.19+i*.085,.28,95);
add('pers','Darius & royal guard',.52,.21,65);add('pers','Bactrian cavalry',.14,.31,75);add('pers','Persian cavalry',.88,.31,80);
for(let i=0;i<5;i++)add('pers','Scythed chariot',.30+i*.105,.40,16);
}
function resize(){const r=canvas.getBoundingClientRect();canvas.width=Math.round(r.width*devicePixelRatio);canvas.height=Math.round(r.height*devicePixelRatio)}
new ResizeObserver(resize).observe(canvas);
function update(dt){if(paused)return;elapsed+=dt;if(mode==='watch'){let p=phases[0];for(const q of phases)if(elapsed>=q.at)p=q;$('#phase').textContent=p.title;$('#narration').textContent=p.text;
for(const u of units){let x=u.homeX,y=u.homeY;if(elapsed>12&&u.side==='mac'&&u.homeX>.67){x+=Math.min(.09,(elapsed-12)*.004);y-=Math.min(.07,(elapsed-12)*.003)}if(elapsed>26&&u.type==='Scythed chariot')y+=Math.min(.22,(elapsed-26)*.012);if(elapsed>39&&['Companions','Hypaspists'].includes(u.type)){x-=Math.min(.18,(elapsed-39)*.012);y-=Math.min(.32,(elapsed-39)*.013)}if(elapsed>55&&u.side==='pers'&&u.type!=='Scythed chariot')y-=Math.min(.17,(elapsed-55)*.008);u.x=x;u.y=y}if(elapsed>80){elapsed=0;make()}}
else{for(const u of units){if(u.goal){const dx=u.goal.x-u.x,dy=u.goal.y-u.y,d=Math.hypot(dx,dy);if(d<.005)u.goal=null;else{const speed=u.type.includes('cavalry')||u.type==='Companions'?.075:.042;u.x+=dx/d*Math.min(d,dt*speed);u.y+=dy/d*Math.min(d,dt*speed)}}}
for(const a of units.filter(u=>u.side==='mac'))for(const b of units.filter(u=>u.side==='pers'))if(Math.hypot(a.x-b.x,a.y-b.y)<.045){a.hp=Math.max(0,a.hp-dt*1.7);b.hp=Math.max(0,b.hp-dt*2.1)}units=units.filter(u=>u.hp>0);if(selected&&!units.includes(selected))selected=null;}
$('#status').textContent=(mode==='watch'?'Watch History':'Command the Battle')+' · '+Math.floor(elapsed/60)+':'+String(Math.floor(elapsed%60)).padStart(2,'0')+(paused?' · Paused':'');
}
function draw(){const w=canvas.width,h=canvas.height;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,w,h);ctx.scale(w,h);let grad=ctx.createLinearGradient(0,0,0,1);grad.addColorStop(0,'#b7a178');grad.addColorStop(1,'#d5bd85');ctx.fillStyle=grad;ctx.fillRect(0,0,1,1);
let rand=17;function random(){rand=(rand*1664525+1013904223)>>>0;return rand/4294967296}
for(let i=0;i<450;i++){let x=random(),y=random();ctx.fillStyle=i%4===0?'#807b4b40':'#f3d69b40';ctx.fillRect(x,y,.002+random()*.006,.001+random()*.004)}
ctx.strokeStyle='#8b79515a';ctx.lineWidth=.002;for(let i=0;i<7;i++){ctx.beginPath();ctx.moveTo(0,.08+i*.13);ctx.bezierCurveTo(.3,.1+i*.13,.65,.06+i*.13,1,.1+i*.13);ctx.stroke()}
ctx.fillStyle='#4b4031';ctx.font='.019px Georgia';ctx.fillText('PERSIAN FRONT',.43,.11);ctx.fillText('MACEDONIAN FRONT',.40,.91);
for(const u of units){const cavalry=/cavalry|Companions|chariot/i.test(u.type);const rw=cavalry?.046:.048,rh=cavalry?.027:.032;ctx.save();ctx.translate(u.x,u.y);ctx.fillStyle=u.side==='mac'?'#194c8d':'#a33c32';ctx.strokeStyle=u===selected?'#fff5a6':'#322b20';ctx.lineWidth=u===selected?.004:.0018;ctx.fillRect(-rw/2,-rh/2,rw,rh);ctx.strokeRect(-rw/2,-rh/2,rw,rh);
ctx.fillStyle=u.side==='mac'?'#b4d8ff':'#ffd1a0';for(let j=0;j<3;j++)for(let k=0;k<2;k++){ctx.beginPath();ctx.arc((j-1)*rw*.26,(k-.5)*rh*.47,.003,0,Math.PI*2);ctx.fill()}
if(u.type==='Scythed chariot'){ctx.strokeStyle='#f6e4b2';ctx.beginPath();ctx.moveTo(-.024,0);ctx.lineTo(.024,0);ctx.stroke()}
if(u===selected){ctx.fillStyle='#fff';ctx.font='.014px system-ui';ctx.textAlign='center';ctx.fillText(u.type,0,-.029)}ctx.restore()}
ctx.fillStyle='#3b3a31';ctx.font='.017px Georgia';ctx.fillText('N ↑',.035,.07);ctx.fillText('SCHEMATIC RECONSTRUCTION · NOT TO SCALE',.025,.97);
}
function frame(t){if(!last)last=t;update(Math.min(.05,(t-last)/1000));last=t;draw();requestAnimationFrame(frame)}
function setMode(m){mode=m;paused=false;elapsed=0;selected=null;make();$('#watch').classList.toggle('active',m==='watch');$('#command').classList.toggle('active',m==='command');$('#pause').textContent='Pause';$('#phase').textContent=m==='watch'?'Initial deployment':'Command the Macedonians';$('#narration').textContent=m==='watch'?phases[0].text:'Select a blue formation, then click or tap its destination. Enemy formations fight when in contact.';$('#help').textContent=m==='watch'?'Watch the reconstructed sequence of the battle. Switch to Command the Battle to move Macedonian formations.':'Select a blue formation, then click or tap the battlefield to move it. Bring units into contact to engage.'}
$('#watch').onclick=()=>setMode('watch');$('#command').onclick=()=>setMode('command');$('#pause').onclick=()=>{paused=!paused;$('#pause').textContent=paused?'Resume':'Pause'};$('#reset').onclick=()=>setMode(mode);
canvas.addEventListener('pointerdown',e=>{if(mode!=='command')return;const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;let hit=units.filter(u=>u.side==='mac').sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y))[0];if(hit&&Math.hypot(hit.x-x,hit.y-y)<.05){selected=hit;$('#selected').textContent=hit.type+' · Strength '+Math.round(hit.hp)+'%';return}if(selected){selected.goal={x:Math.max(.03,Math.min(.97,x)),y:Math.max(.06,Math.min(.94,y))};$('#selected').textContent=selected.type+' · Moving to destination'}});
make();requestAnimationFrame(frame);
