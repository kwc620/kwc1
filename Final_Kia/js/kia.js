function Gnb(){
    this.init=function (){
        this.gnbColor();
    }

    this.gnbColor = function(){
        var banner = document.querySelector("#gnb")
        var logo=document.querySelector("#logo img")
        var texts = document.querySelectorAll(".gnb li")
        banner.addEventListener("mouseover", function (){
            banner.style.color="black";
            banner.style.backgroundColor="white";
            document.querySelector(".black_logo").style.display="inline-block";
            document.querySelector(".white_logo").style.display="none";
        } )
        banner.addEventListener("mouseout", function (){
            banner.style.color="white";
            banner.style.backgroundColor="rgba(255,255,255,0)";
            document.querySelector(".black_logo").style.display="none";
            document.querySelector(".white_logo").style.display="inline-block";
        })
    }
}

function Try(){
    this.activeIndex = 0;
    this.selectedIndex = -1;
    this.pagingBtnList = null;
    this.imgList = null;
    this.pagingBtnTemplate=null;
    this.timer= null;
    this.timerDuration= 10000;
    this.arrowRight= null;
    this.arrowLeft= null;
    this.playStopBtn= null;
    this.playStopNum= 0;
    this.playBtn= null;
    this.pauseBtn= null;

    this.init = function (a,b,c,d,e,f,g){
        this.imgList=$(a);
        this.resetPagingBtns(b,c,d,e,f);
        this.registEvent(f,g);
        this.indexControl();
        this.startTimer();
    }

    this.resetPagingBtns=function (b,c,d,e,f,g){
        this.pagingBtnList = $(b);
        this.arrowRight = $(c);
        this.arrowLeft=$(d);
        this.playStopBtn=$(e);
        this.playBtn=$(f);
        this.pauseBtn=$(g);
    }

    /*Event Handler 등록*/
    this.registEvent= function (f,g){
        var _this=this;

        /*여기서 함수는 콜백함수*/
        this.pagingBtnList.on("click", function (){
            _this.activeIndex=_this.pagingBtnList.index(this);
            if(this.playStopNum%2==0){
                _this.resetTimer();
            }
            _this.indexControl();
        })

        this.arrowLeft.on("click", function (){
            _this.before();
            if(this.playStopNum%2==0){
                _this.resetTimer();
            }
        })
        this.arrowRight.on("click", function (){
            _this.next();
            if(this.playStopNum%2==0){
                _this.resetTimer();
            }
        })

        this.playStopBtn.on("click",function (){
            _this.playStop(f,g);
        })
    }

    this.playStop=function (f,g){
        this.playStopNum++;

        if(this.playStopNum%2==0){
            document.querySelector(f).style.display="none";
            document.querySelector(g).style.display="inline-block";
            this.startTimer();
            console.log("play");
        }else{
            document.querySelector(f).style.display="inline-block";
            document.querySelector(g).style.display="none";
            this.endTimer();
            console.log("pause");
        }
    }

    this.startTimer=function (){
        if(this.timer){
            return;
        }
        var _this=this;
        this.timer=setInterval(function (){
            _this.next();
        }, this.timerDuration );
    }

    this.resetTimer= function (){
        this.endTimer();
        this.startTimer();
    }

    this.endTimer = function (){
        if(this.timer){
            clearInterval(this.timer);
        }

        this.timer=null;
        console.log("멈춤실행");
    }

    /*화살표 눌렀을시*/
    this.next= function(){
        this.activeIndex++;
        if(this.activeIndex>=this.imgList.length){
            this.activeIndex=0;
        }
        this.indexControl();
    }

    this.before= function(){
        this.activeIndex--;
        if(this.activeIndex<0){
            this.activeIndex=this.imgList.length-1;
        }
        this.indexControl();
    }

    this.indexControl= function (){
        if(this.activeIndex==this.selectedIndex){
            return;
        }

        this.pagingBtnList.removeClass("on");
        this.pagingBtnList.eq(this.activeIndex).addClass("on");

        // todo  image move
        var _this=this;
        this.imgList.each(function (){
            var currentIndex=_this.imgList.index(this);
            var diffIndex = currentIndex - _this.activeIndex;
            var destPer = diffIndex*100;

            TweenMax.to(this, 0.5, {left: destPer + "%", ease:Cubic.easeOut})
        })

        this.selectedIndex=this.activeIndex;
    }
}

/*allCar*/
var commonCarVisual = {
    activeIndex : 0
    ,selectedIndex : -1
    ,pagingBtnList : null
    ,imgList : null
    ,pagingBtnTemplate:null
    ,timer: null
    ,timerDuration: 20000
    ,arrowRight: null
    ,arrowLeft: null
    ,playStopBtn: null
    ,playStopNum: 0
    ,playBtn: null
    ,pauseBtn: null

    ,init : function (){
        this.imgList=$("#visualImgCon2 .scene2");
        this.resetPagingBtns();
        this.registEvent();
        this.indexControl();
        this.startTimer();
    }

    ,resetPagingBtns:function (){
        this.pagingBtnList = $("#allCarPaging .dot2");
        this.arrowRight = $(".arrow_right_gray");
        this.arrowLeft=$(".arrow_left_gray");
        this.playStopBtn=$("#allCarPaging .pBtnAllCar");
        this.playBtn=$("#allCarPaging .playAllCar");
        this.pauseBtn=$("#allCarPaging .pauseAllCar");
    }

    /*Event Handler 등록*/
    ,registEvent: function (){
        var _this=this;

        /*여기서 함수는 콜백함수*/
        this.pagingBtnList.on("click", function (){
            _this.activeIndex=_this.pagingBtnList.index(this);
            if(this.playStopNum%2==0){
                _this.resetTimer();
            }
            _this.indexControl();
        })

        this.arrowLeft.on("click", function (){
            _this.before();
            if(this.playStopNum%2==0){
                _this.resetTimer();
            }
        })
        this.arrowRight.on("click", function (){
            _this.next();
            if(this.playStopNum%2==0){
                _this.resetTimer();
            }
        })

        this.playStopBtn.on("click",function (){
            _this.playStop();
        })
    }

    ,playStop:function (){
        this.playStopNum++;

        if(this.playStopNum%2==0){
            document.querySelector("#allCarPaging> .playAllCar").style.display="none";
            document.querySelector("#allCarPaging> .pauseAllCar").style.display="inline-block";
            this.startTimer();
        }else{
            document.querySelector("#allCarPaging> .playAllCar").style.display="inline-block";
            document.querySelector("#allCarPaging> .pauseAllCar").style.display="none";
            this.endTimer();
        }
    }

    ,startTimer:function (){
        if(this.timer){
            return;
        }
        var _this=this;
        this.timer=setInterval(function (){
            _this.next();
        }, this.timerDuration );
    }

    ,resetTimer: function (){
        this.endTimer();
        this.startTimer();
    }

    ,endTimer: function (){
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer=null;
    }

    /*화살표 눌렀을시*/
    ,next: function(){
        this.activeIndex++;
        if(this.activeIndex>5){
            this.activeIndex=0;
        }
        this.indexControl();
    }

    ,before: function(){
        this.activeIndex--;
        if(this.activeIndex<0){
            this.activeIndex=5;
        }
        this.indexControl();
    }

    ,indexControl: function (){
        if(this.activeIndex==this.selectedIndex){
            return;
        }

        this.pagingBtnList.removeClass("on");
        this.pagingBtnList.eq(this.activeIndex).addClass("on");

        // todo  image move
        var _this=this;
        this.imgList.each(function (){
            var currentIndex=_this.imgList.index(this);
            var diffIndex = currentIndex - _this.activeIndex;
            var destPer = diffIndex*100;

            TweenMax.to(this, 0.5, {left: destPer + "%", ease:Cubic.easeOut});
        })
        this.pictureUpper();
        this.selectedIndex=this.activeIndex;
    }

    ,pictureUpper:function (){
        this.imgList.removeClass("bigger");
        this.imgList.removeClass("notOver");
        this.imgList.eq(this.activeIndex+1).addClass("notOver")
        this.imgList.eq(this.activeIndex+3).addClass("notOver")
        this.imgList.eq(this.activeIndex+2).addClass("bigger");
        this.imgList.eq(this.activeIndex+2).removeClass("notOver");
        this.imgList.removeClass("bluring");
        this.imgList.eq(this.activeIndex).addClass("bluring");
        this.imgList.eq(this.activeIndex+4).addClass("bluring");
    }

}

/*news*/
var newsVisual = {
    activeIndex : 0
    ,selectedIndex : -1
    ,pagingBtnList : null
    ,imgList : null
    ,pagingBtnTemplate:null
    ,timer: null
    ,timerDuration: 17000
    ,arrowRight: null
    ,arrowLeft: null

    ,init : function (){
        this.imgList=$("#newsImgCon .news");
        this.resetPagingBtns();
        this.registEvent();
        this.indexControl();
        this.startTimer();
    }

    ,resetPagingBtns:function (){
        this.pagingBtnList = $("#newsPaging .newsDot");
        this.arrowRight = $(".arrow_right");
        this.arrowLeft=$(".arrow_left");
        this.playStopBtn=$("#newsPaging .pBtnNews");
        this.playBtn=$("#newsPaging .playNews");
        this.pauseBtn=$("#newsPaging .pauseNews");
    }

    /*Event Handler 등록*/
    ,registEvent: function (){
        var _this=this;

        /*여기서 함수는 콜백함수*/
        this.pagingBtnList.on("click", function (){
            _this.activeIndex=_this.pagingBtnList.index(this);
            _this.resetTimer();
            _this.indexControl();
        })

        this.arrowLeft.on("click", function (){
            _this.before();
            _this.resetTimer();
        })
        this.arrowRight.on("click", function (){
            _this.next();
            _this.resetTimer();
        })
    }

    ,startTimer:function (){
        if(this.timer){
            return;
        }
        var _this=this;
        this.timer=setInterval(function (){
            _this.next();
        }, this.timerDuration );
    }

    ,resetTimer: function (){
        this.endTimer();
        this.startTimer();
    }

    ,endTimer: function (){
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer=null;
    }

    /*화살표 눌렀을시*/
    ,next: function(){
        this.activeIndex++;
        if(this.activeIndex>2){
            this.activeIndex=0;
        }
        this.indexControl();
    }

    ,before: function(){
        this.activeIndex--;
        if(this.activeIndex<0){
            this.activeIndex=2;
        }
        this.indexControl();
    }

    ,indexControl: function (){
        if(this.activeIndex==this.selectedIndex){
            return;
        }

        this.pagingBtnList.removeClass("on");
        this.pagingBtnList.eq(this.activeIndex).addClass("on");

        this.imgList.removeClass("blur");
        this.imgList.eq(this.activeIndex+2).addClass("blur");

        // todo  image move
        var _this=this;
        this.imgList.each(function (){
            var currentIndex=_this.imgList.index(this);
            var diffIndex = currentIndex - _this.activeIndex;
            var destPer = diffIndex*100;

            TweenMax.to(this, 0.5, {left: destPer + "%", ease:Cubic.easeOut});
        })
        this.selectedIndex=this.activeIndex;
    }
}

window.addEventListener("load", onWindowLoaded);

function onWindowLoaded(){
    var myGnb = new Gnb();
    myGnb.init();

    var mainVisualSetting = new Try();
    mainVisualSetting.init("#visualImgCon .scene", "#visualPaging > .dot", ".arrow_right", ".arrow_left", ".pBtnNewCar","#visualPaging .playNewCar", "#visualPaging .pauseNewCar");

    commonCarVisual.init();

    var eventSetting = new Try();
    eventSetting.init("#eventImgCon .event", "#eventPaging > .eventDot", "#left_Event > .arrow_right", "#left_Event > .arrow_left", "#eventPaging> .pBtnEvent","#eventPaging > .playEvent", "#eventPaging > .pauseEvent");

    var channelSetting = new Try();
    channelSetting.init("#channelImgCon .channel", "#channelPaging > .channelDot", "#right_channel > .arrow_right", "#right_channel > .arrow_left", "#channelPaging> .pBtnChannel","#channelPaging > .playChannel", "#channelPaging > .pauseChannel");



    newsVisual.init();

}

