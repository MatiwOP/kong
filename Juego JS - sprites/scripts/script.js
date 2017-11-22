$(document).ready(inicio);
$(document).keydown (manejar_evento);

function inicio(){
	lienzo = $("#lienzo")[0];
	contexto =lienzo.getContext("2d");
	buffer = document.createElement("canvas");
	kong = new Kong();
	barriles= new Barriles();
	bam= new Bam();
	animar();
}



function manejar_evento(event){
	//alert(event.which);
	if(event.which==37){
		kong.mover("izquierda");
	}
	if(event.which==39){
		kong.mover("derecha");
	}
	if(event.which==16){
		kong.mover("turbo");
	}
	if(event.which==17){
		kong.mover("freno");
	}
	if(event.which==32){
		reinicio();
	}
}



function Bam(){
	this.x=-200;
	this.y=-200
	this.img =$("#DK_dead")[0];
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.img, this.x,this.y);
	}
	
}



function Barriles(){
	this.x =(Math.random() *(lienzo.width-100))+1;
	this.y=-200;
	this.vel=6;
	this.frameIndex =0;
	this.count=0;
	this.updatePerFrame=6;
	this.nFrames=16;
	
	this.img =$("#barrel")[0];
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.img,(this.frameIndex * this.img.width / this.nFrames),0, this.img.width/this.nFrames,this.img.height ,this.x,this.y, this.img.width/this.nFrames,this.img.height);
	}
	
	this.actualizar=function(){
		this.count+=1;
		if(this.count>this.updatePerFrame){
			this.count=0;
			this.frameIndex+=1;
			// If the current frame index is in range
			if(this.frameIndex< this.nFrames-1){
			this.frameIndex+=1;
			}else {
				this.frameIndex=0;
			}
		} 
		
		this.y += this.vel;
		if(this.y>= lienzo.height){
			this.y=-200;
			this.x=(Math.random() *(lienzo.width-100))+1;
			this.vel+=0.25;
		}		
	}
	
		

}




function Kong(){
	this.x =200;
	this.y=470;
	this.vel=3;
	this.frameIndex =0;
	this.count=0;
	this.updatePerFrame=6;
	this.nFrames=6;
	this.img =$("#DK_L")[0];
	
	
	this.dibujar = function(ctx){
		ctx.drawImage(this.img,(this.frameIndex * this.img.width / this.nFrames),0, this.img.width/this.nFrames,this.img.height ,this.x,this.y, this.img.width/this.nFrames,this.img.height);
	}		 
	
	this.actualizar=function(){
		this.count+=1;
		if(this.count>this.updatePerFrame){
			this.count=0;
			this.frameIndex+=1;
			// If the current frame index is in range
			if(this.frameIndex< this.nFrames-1){
			this.frameIndex+=1;
			}else {
				this.frameIndex=0;
			}
		}
		
		
		
		if(this.vel<=0){
			this.img =$("#DK_L")[0];
		}else {
			this.img =$("#DK_R")[0];
			}

		this.x += this.vel;
		if(this.x>= lienzo.width -130|| this.x <= lienzo.width/1000){
			this.vel *=-1;
		}		
	}	
	this.mover=function(accion){
		if(accion=="izquierda" && this.vel>0){
		this.vel *=-1;
		}if(accion=="derecha" && this.vel<0){
		this.vel *=-1;
		}if(accion=="turbo"){
			this.vel*=2;
		}if(accion=="freno"){
			if(this.vel<0){
			this.vel=-2;
			}else
			this.vel=2;
		
		
					
	}	
	
}

reinicio=function(accion){
		
			inicio();
			
			kong.vel=2;
			barriles.vel=2;
			bam.x=-200;
		}
	}




function colision(kx,ky,bx,by){
	if(kx+80>bx && kx<bx+80 && ky+80>by && ky<by+80){
		kong.vel=0;
		kong.y=-100;
		barriles.vel=0;
		bam.x=kx;
		bam.y=ky;
	}
	
}

function animar(){
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	
	contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
	
	kong.dibujar(contextoBuffer);
	barriles.dibujar(contextoBuffer);
	bam.dibujar(contextoBuffer);
	
	colision(kong.x,kong.y,barriles.x,barriles.y);
	
	kong.actualizar();	
	barriles.actualizar();
	
	contexto.clearRect(0,0,lienzo.width,lienzo.height);
	contexto.drawImage(buffer,0,0);
	
	setTimeout("animar()",20);
}

