<!doctype html>
<html>
<head>
    {{> project/hdMeta}}
    <title>{{title}}</title>
    <link rel="stylesheet" href="/libs/bootstrap/dist/css/bootstrap.min.css"/>
</head>
<body>
{{{body}}}
<script src="/libs/requirejs/require.js"></script>
{{!--<script src="/themes/script/config.js"></script>--}}
<script>
    require(['module/base']);
</script>
</body>
</html>