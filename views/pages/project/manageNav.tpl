<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>项目导航</title>
    <link href="/libs/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <style>
        body{ background: #f0f4fd; width: 100%; height: 100%; margin:0;padding: 0}
        a{ text-decoration: none !important;color: #8895b5; font-size: 18px;}
        .nav-list{margin-top: 30px}
        .nav-list .thumbnail{padding:15px 25px;border-radius: 0;background: #fff no-repeat 90% bottom;}
        .nav-list a .tit{font-size: 30px}
        .nav-list a span{ display: block;}
        .footer{text-align: center;}
    </style>
</head>
<body>
<div class="container">
    <div class="row">
        <h2>项目导航</h2>
    </div>
    <div class="row">
        <ul class="nav-list list-unstyled clearfix">
            {{#each manage}}
                <li class="col-sm-6 col-lg-4">
                    <div class="thumbnail" style="{{#if image}}background-image:url({{image}}){{/if}}">
                        <a href="{{link}}">
                            <div class="tit">{{projectName}}</div>
                            <span>{{describeCn}}</span>
                            <span>{{describeEn}}</span>
                        </a>
                    </div>
                </li>
            {{/each}}
        </ul>
    </div>
    <footer class="footer">
        <!--{{helper-footer}}-->
    </footer>
</div>
<script src="/libs/jquery/dist/jquery.min.js"></script>
<script src="/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/libs/requirejs/require.js"></script>
<script src="/scripts/module/require-config.js"></script>
</body>
</html>