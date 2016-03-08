<!doctype html>
<html>
<head>
    {{> qian360H5/hdMeta}}
    <title>{{title}}</title>
    {{> qian360H5/hdStyle}}
</head>
<body>
<section id="pageHome" class="page">
    <article class="viewport">
        <div class="slide-con" id="homeSlide"></div>
        <input id="slideImgList" type="hidden" value="{{stringify bannerList}}" />
        {{#with product}}
            <div class="product-con" id="homeProduct">
                <a href="product.html?borrowId={{borrowId}}" data-ajax="false">
                    <div class="tit">{{name}}</div>
                    <div class="cont">
                        <div class="main" style="background-image: url('/qian360H5/image/home-progressbar/{{helper-progressbar}}.png')">
                            <div class="tits">预期年化</div>
                            <div class="conts">
                                {{normalApr}}<small>%</small>
                            </div>
                            {{#if extraAwardApr}}
                                <div class="reward">+<span>{{extraAwardApr}}</span>%</div>
                            {{/if}}
                            {{#equal brType 3}}
                                <div class="time">随存随取</div>
                            {{else}}
                                {{#if isday}}
                                    <div class="time">期限 {{timeLimitDay}} 天</div>
                                {{else}}
                                    <div class="time">期限 {{timeLimit}} 月</div>
                                {{/if}}
                            {{/equal}}
                        </div>
                        <ul class="info">
                            <li>{{tenderTimes}}笔已投</li>
                            <li>{{lowestAccount}}元起投</li>
                        </ul>
                    </div>
                    <div class="operation"><span class="ui-btn red">立即投资</span></div>
                    <div class="tips"><i class="icon icon-security"></i>资金交易过程盗转盗用风险由阳光保险提供保障</div>
                    {{!--<div class="mark">{{helper-proMark}}</div>--}}
                </a>
            </div>
        {{/with}}
    </article>
</section>
<footer id="homeNavbar">
    <div class="viewport">
        <ul>
            <li><a href="#pageHome" data-rel="auto"><i class="icon icon-nav-home"></i><span>钱庄</span></a></li>
            <li><a href="#pageProList" data-rel="auto"><i class="icon icon-nav-list"></i><span>理财</span></a></li>
            <li><a href="#pageUser" data-rel="auto"><i class="icon icon-nav-user"></i><span>资产</span></a></li>
            <li><a href="#pageMore" data-rel="auto"><i class="icon icon-nav-me"></i><span>我</span></a></li>
        </ul>
    </div>
</footer>
{{!--<section id="pageLoading"></section>--}}
<script src="/qian360H5/script/sea.js"></script>
<script>
    seajs.use('page/home');
</script>
</body>
</html>