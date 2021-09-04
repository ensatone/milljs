var mill={
crossdata:undefined,
tags:undefined,
eventsandfuncs:[],
createevent:function(eve){
window.addEventListener(eve,function(event){
this.eventname=eve;
for (var ev=0;ev<mill.eventsandfuncs.length;ev++){
if (mill.eventsandfuncs[ev].eventname==this.eventname){
this.tag=mill.eventsandfuncs[ev].tag;
this.script=mill.eventsandfuncs[ev].func;
this.ptag=mill.eventsandfuncs[ev].ptag;
eval(mill.eventsandfuncs[ev].func);
}

}
});
},
endmill:function(){
for (var e=0;e<mill.tags.length;e++){
mill.tags[e].remove();

}
},
getptag:function(t){
this.result;
if(t.parentNode.className=='mill'){

mill.getptag(t.parentNode);
}else{
this.result=t;
}
return this.result;
},
framesize:function(wid,hei,ex=0,ey=0,ewid=1,ehei=1){
this.width=document.documentElement.clientWidth;
this.height=document.documentElement.clientHeight;
this.distance=Math.abs(this.width-this.height);
this.ratio=0;
this.xpercent=0; this.ypercent=0;
this.widthpercent=100;
this.heightpercent=100;
this.distancepercent=0;
if (this.width>this.height){
this.distancepercent=(this.distance/this.width)*100;

this.widthpercent=100-this.distancepercent;


}else {
this.distancepercent=(this.distance/this.height)*100;
this.heightpercent=100-this.distancepercent;
}
this.dis=Math.abs(wid-hei);
if (wid>hei){
this.heightpercent=this.heightpercent/(wid/hei);

}else{
this.widthpercent=this.widthpercent/(hei/wid);

}
this.xpercent=this.widthpercent*ex;
this.ypercent=this.heightpercent*ey;
this.widthpercent*=ewid;
this.heightpercent*=ehei;
return {x:String(this.xpercent+'%'),y:String(this.ypercent+'%'),width:String(this.widthpercent+'%'),height:String(this.heightpercent+'%')}

},
setup:function(){
mill.tags=document.querySelectorAll('.mill');
for (var t=0;t<mill.tags.length;t++){
if (mill.tags[t].getAttribute('event')){
this.tag=mill.tags[t];
if(mill.tags[t].getAttribute('event')=='keydown' || mill.tags[t].getAttribute('event')=='keyup' || mill.tags[t].getAttribute('event')=='resize'){
this.tag=mill.tags[t];
mill.eventsandfuncs.push({
tag:this.tag,
ptag:mill.getptag(this.tag),
eventname:this.tag.getAttribute('event'),
func:mill.getptag(this.tag).querySelector('#mill').innerHTML
});
}else if(mill.tags[t].getAttribute('event')=='none'){
this.tag=mill.tags[t];
this.ptag=mill.getptag(this.tag);
this.script=this.ptag.querySelector('#mill').innerHTML;
eval(this.script);
}else{
this.tag=mill.tags[t];
this.script;
this.tag.addEventListener(this.tag.getAttribute('event'),function(event){
this.tag=this;
this.ptag=mill.getptag(this);
this.script=this.ptag.querySelector('#mill').innerHTML;
eval(this.script);
});
}
}


}
}
};
function MillMerge(pages,page,crossscript){
this.id=1;
this.crossdata=undefined;
this.screxecuted=false;
this.scrloading;
this.pagename=page;
this.pages=document.getElementById(pages).cloneNode(true);
this.cscript=document.getElementById(crossscript).cloneNode(true);
this.newpage=function(){
document.getElementById(this.pagename+this.id).appendChild(this.pages);
document.getElementById(this.pagename+this.id).appendChild(this.cscript);
document.querySelector('html').innerHTML=document.getElementById(this.pagename+this.id).innerHTML;
screxecuted=false;
}
this.setup=function(merge){
merge.newpage();
merge.scrloading=setInterval(function(event){
if (!merge.screxecuted){
eval(document.getElementById('exe').innerHTML);
merge.screxecuted=true;
}
clearInterval(merge.scrloading);
},1000/60);
}
}
//var millmerge=new MillMerge('pagesid','pageno','scriptid');
//millmerge.setup(millmerge);
//mill.setup();

function Set(){
this.IDgetter=function(id){
return document.getElementById(id);
}
this.arrayed={
tags:function(unit){ 
this.count=-1;
for (var p=0;p<unit.ARRAY.length;p++){
for (var q=0;q<unit.ARRAY[p].length;q++){
if (unit.ARRAY[p][q]==1){
this.count++;
this.width=unit.width;
this.height=unit.height;
this.box=document.createElement(unit.TAG);
this.box.style.position='fixed';
this.box.style.left=(q*unit.WIDTH)+unit.X+'px';
this.box.style.top=(p*unit.HEIGHT)+unit.Y+'px';
this.box.style.width=unit.WIDTH;
this.box.style.height=unit.HEIGHT;
this.box.id=unit.ID+this.count;
document.body.insertBefore(this.box,document.body.childNodes[0]);
}
}
}
}
}
this.arrays=[];
this.mines=[];
this.redLight=function(red){
this.source=red;
this.source.activate=false;
this.mines.push(this.source);
}
this.reactivate=function(act){
this.reacti=act;
for (var r=0;r<this.mines.length;r++){
if (this.mines[r].key==this.reacti.key){
this.mines[r].activate=false;
}
}
}
this.greenLight=function(green){
this.active=green;
for (var mi=0;mi<this.mines.length;mi++){
if (this.mines[mi].key==this.active.key){
if (this.mines[mi].activate==false){
this.mines[mi].load();
this.mines[mi].activate=true;}
}
}
}
this.bunch_of={
tags:function(boxes){
for (var bcounts=0;bcounts<boxes.count;bcounts++){
this.box=document.createElement(boxes.TAG);
this.box.style.width=boxes.width+'px';
this.box.style.height=boxes.height+'px';
this.box.id=boxes.ID+bcounts;
this.box.style.position='fixed';
if (boxes.way=='lefttoright'){
this.box.style.top=boxes.y+boxes.space+'px';
this.box.style.left=boxes.x+bcounts*(boxes.width+boxes.space)+'px';
}
else if (boxes.way=='uptodown'){
this.box.style.left=boxes.x+boxes.space+'px';
this.box.style.top=boxes.y+bcounts*(boxes.height+boxes.space)+'px';
}
else if (boxes.way=='leftuptorightdown'){
this.box.style.left=boxes.x+bcounts*(boxes.width+boxes.space)+'px';
this.box.style.top=boxes.y+bcounts*(boxes.height+boxes.space)+'px';
}
else if (boxes.way=='rightuptoleftdown'){
this.box.style.left=boxes.x+bcounts*(boxes.width+boxes.space)+'px';
this.box.style.top=boxes.y-bcounts*(boxes.height+boxes.space)+'px';
}
else{
this.box.style.left=boxes.x+'px';
this.box.style.top=boxes.y+'px';
}
document.body.insertBefore(this.box,document.body.childNodes[0]);
}
}
}
this.position=function(element,x,y,width,height){
element.style.position='fixed';
element.style.left=x+'px';
element.style.top=y+'px';
element.style.width=width+'px';
element.style.height=height+'px';
}
this.tag=function(element){
this.element=element;
this.element=document.createElement(element.tag);
this.element.id=element.ID;
document.body.insertBefore(this.element,document.body.childNodes[0]);
element.create();
set.arrays.push({update:function(){element.update()}});
return document.getElementById(element.ID);
}
this.update=function(){
set.arrays.forEach(function(element){ element.update(); });
}
}
//var set=new Set();

/****How to utilize Set
var Input=set.tag({
tag:'input',
ID:'inp',
create:function(){
set.position(inp,100,100,100,100);
},
update:function(){}
});

alert (set.IDgetter('inp').width);


var Inputs=set.arrayed.tags({
TAG:'input',
ID:'arrayed_inputs',
X:0,
Y:0,
WIDTH:100,
HEIGHT:100,
ARRAY:[
[1,1,1]
]
});

alert (set.IDgetter('arrayed_inputs1').width);


var inputs=set.bunch_of.tags({
TAG:'input',
ID:'inputs',
x:0,
y:0,
width:100,
height:100,
count:5,
space:100,
way:'lefttoright' //We can also use 'uptodown','leftuptorightdown','rightuptoleftdown'
});

alert (set.IDgetter('inputs1').style.width);



--------------------Red and Green Lights
--------------------red light sets a function
--------------------green light runs the red light's function
--------------------If redLight once, greenLight once .... if we want to use the redLight once more,we need to reactivate
--------------------We can use them in looping functions like while or the common functions but the result is the same
--------------------Very useful for looping functions like while and setInterval
--------------------But do not put redLight and reactivate in loops.... They must only be called once

set.redLight({
key:'alerting',
load:function(){alert("Hello");}
});
set.greenLight({
key:'alerting'
});
set.reactivate({
key:'alerting'
});
set.greenLight({
key:'alerting'
});

****/
function noselect(){
document.write("<style>body{-webkit-touch-callout:none; -webkit-user-select:none; -khtml-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none; } </style>");
}
var pix=function(){
this.brush={
}
this.canvas;
this.ctx;
this.scripts=document.getElementsByTagName('script');
this.lines=[];
this.words=[];
this.canvas;
this.brush={
colorbox:[],
active:true,
x:0,
y:0,
width:0,
height:0,
color:undefined,
colorsetting:false,
colortoken:'',
skiptype:'',
skipgate:false,
skip:'',
};
for (var p=0;p<this.scripts.length;p++){
if (this.scripts[p].getAttribute('type')=='pix'){
this.lines=this.scripts[p].innerHTML.split('\n');
for (var l=0;l<this.lines.length;l++){
if (this.lines[l] && this.lines[l]!='' && this.lines[l]!=undefined && this.lines[l]!=null){
this.words=this.lines[l].split(' ');
for (var w=0;w<this.words.length;w++){
if (this.words[w] && this.words[w]!='' && this.words[w]!=undefined && this.words[w]!=null){
if (this.words[w]=='canvas'){
this.canvas=document.createElement('canvas');
this.canvas.width=Number(this.words[w+3]);
this.canvas.height=Number(this.words[w+4]);
this.canvas.style.position='fixed';
this.ctx=this.canvas.getContext('2d');
this.canvas.style.left=Number(this.words[w+1])+'px';
this.canvas.style.top=Number(this.words[w+2])+'px';
}else if(this.words[w]=='create'){
document.body.appendChild(this.canvas);
}else if(this.words[w]=='brush'){
this.brush.x=Number(this.words[w+1]);
this.brush.y=Number(this.words[w+2]);
this.brush.width=Number(this.words[w+3]);
this.brush.height=Number(this.words[w+4]);
}else if(this.words[w]=='color'){
this.brush.color='rgb('+this.words[w+1]+','+this.words[w+2]+','+this.words[w+3]+')';
}else if(this.words[w]=='setc'){
this.brush.colorbox[Number(this.words[w+1])]='rgb('+this.words[w+2]+','+this.words[w+3]+','+this.words[w+4]+')';
}
else{
for (var b=0;b<this.words[w].length;b++){
if (this.words[w].charAt(b)=='='){
if (this.brush.active==true){
this.ctx.beginPath();
this.ctx.fillStyle=this.brush.color;
this.ctx.fillRect(this.brush.x,this.brush.y,this.brush.width,this.brush.height);
}
}else 
if (this.words[w].charAt(b)=='+' && this.brush.skipgate==false){
this.brush.x+=this.brush.width;
if (this.brush.active==true){
this.ctx.beginPath();
this.ctx.fillStyle=this.brush.color;
this.ctx.fillRect(this.brush.x,this.brush.y,this.brush.width,this.brush.height);
}
}else 
if (this.words[w].charAt(b)=='-' && this.brush.skipgate==false){
this.brush.x-=this.brush.width;
if (this.brush.active==true){
this.ctx.beginPath();
this.ctx.fillStyle=this.brush.color;
this.ctx.fillRect(this.brush.x,this.brush.y,this.brush.width,this.brush.height);
}
}else if (this.words[w].charAt(b)=='{'){
this.brush.colortoken='';
this.brush.colorsetting=true;
}else if(this.words[w].charAt(b)=='}'){
this.brush.color=this.brush.colorbox[Number(this.brush.colortoken)];
this.brush.colorsetting=false;
}
else if(this.words[w].charAt(b)=='/' && this.brush.skipgate==false){
this.brush.x=0;
this.brush.y+=this.brush.height;
if (this.brush.active==true){
this.ctx.beginPath();
this.ctx.fillStyle=this.brush.color;
this.ctx.fillRect(this.brush.x,this.brush.y,this.brush.width,this.brush.height);
}
}else if(this.words[w].charAt(b)=='|' && this.brush.skipgate==false){
this.brush.x=0;
this.brush.y-=this.brush.height;
if (this.brush.active==true){
this.ctx.beginPath();
this.ctx.fillStyle=this.brush.color;
this.ctx.fillRect(this.brush.x,this.brush.y,this.brush.width,this.brush.height);
}
}
else if(this.words[w].charAt(b)=='n'){
this.brush.active=true;
}else if (this.words[w].charAt(b)=='f'){
this.brush.active=false;
}

else if(this.words[w].charAt(b)=='('){
this.brush.skip='';
this.brush.skiptype=this.words[w].charAt(b-1);
this.brush.skipgate=true;
}else if(this.words[w].charAt(b)==')'){
if (this.brush.skiptype=='y'){
this.brush.y+=Number(this.brush.skip)*this.brush.height;
}else{
this.brush.x+=Number(this.brush.skip)*this.brush.width;
}
this.brush.skipgate=false;
}else{
if (this.brush.skipgate==true){
this.brush.skip+=this.words[w].charAt(b);
}
if (this.brush.colorsetting==true){
this.brush.colortoken+=this.words[w].charAt(b);
}
}
}
}
}
}
}
}
}
}
}
pix();