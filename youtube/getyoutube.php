<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Download Youtube</title>
</head>

<body>
    <a id="url"></a>
    
    <script>
        let rawData = `<?php
            $file = file_get_contents($_POST["url"]);
            $file = explode('var ytplayer = ytplayer || {};ytplayer.config = ', $file)[1];
            $file = explode('url_encoded_fmt_stream_map":"', $file)[1];
            $file = explode('","', $file)[0];
            echo $file;
        ?>`;
        let data = rawData;
        console.log(data);
        
        
        let urls = [];
        for (let url of data.split(',')) {
            let curMap = {};
            url.split('\u0026').forEach(item => {
                curMap[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
            });
        
            urls.push(curMap);
        }
        console.log(urls);
        console.log(urls[0].url);
        document.getElementById('url').href = urls[0].url;
        document.getElementById('url').innerHTML = urls[0].url;
        
        
        window.onmousedown = copyText;
        window.ontouchstart = copyText;
        
        function copyText() {
            let myelement = document.getElementById('url');
            let range = document.createRange();

            range.selectNode(myelement);
            window.getSelection().addRange(range);
            
            a = document.execCommand('copy');
        }
    </script>
</body>

</html>