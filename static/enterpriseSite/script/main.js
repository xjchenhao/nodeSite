window.onload=function(){			
						/*产品展示*/
	var speed=30;
	var marquePic2=document.getElementById("marquePic2");
	if(marquePic2){
	marquePic2.innerHTML=marquePic1.innerHTML;
	function Marquee(){ 
		if(demo.scrollLeft>=marquePic1.scrollWidth){ 
		demo.scrollLeft=0;
		}
		else{ 
			demo.scrollLeft++ ;
		}
	} 
	var MyMar=setInterval(Marquee,speed) 
	demo.onmouseover=function(){clearInterval(MyMar)} 
	demo.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
	}

						/*滚动新闻*/
	var newest_news=document.getElementById("newest_news");
	if(newest_news){
		var newest_li=newest_news.getElementsByTagName("li");
		var newest_bh=0;
		var newest_li_left=900;
		function newestInitialize(newest_bh){
			for(var i=0,li_length=newest_li.length;i<li_length;i++){
				if(i!==newest_bh){
					newest_li[i].style.display="none";
					newest_li[i].style.marginLeft="0";
				}
				else{
					newest_li[i].style.display="block";
					newest_li[i].style.marginLeft=newest_li_left+"px";
				}
			}
		}
		function newestGd(){
			newest_li_left-=1;
			newest_li[newest_bh].style.marginLeft=newest_li_left+"px";
			if(newest_li_left<=-200){
				newest_li[newest_bh].style.marginLeft="0";
				newest_bh+=1;
				newestInitialize(newest_bh);
				newest_li_left=900;
				if(newest_bh>=newest_li.length){
					newest_bh=0;
					newest_li_left=900;
					newestInitialize(newest_bh);
				}
			}
		}
		if(newest_li[0]){
			newestInitialize(newest_bh);
			setInterval(function(){newestGd();},15);
		}
	}
					/*导航条下拉*/
	startList = function() {
			navRoot = document.getElementById("nav");
			for (i=0; i<navRoot.childNodes.length; i++) {
				node = navRoot.childNodes[i];
				if (node.nodeName=="LI") {
					node.onmouseover=function() {
						this.className+=" over";
					}
					node.onmouseout=function() {
						this.className=this.className.replace(" over", "");
					}
				}
			}
		}
	startList();
}