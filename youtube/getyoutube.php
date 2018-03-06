<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Download Youtube</title>

    <style media="screen">
        table {
            border-collapse: collapse;
            margin: 10px;
        }
        th, td {
            padding: 5px;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2
        }
        
        tr {
            width: 100%;
        }
        a {
            word-wrap: break-word;
            word-break: break-all;
        }
            
    </style>

</head>

<body>
    <table>
        <thead>
            <tr>
                <th>Quality</th>
                <th>Url</th>
            </tr>
        </thead>
        <tbody id="urls"></tbody>
    </table>
    

    <?php
        $file = file_get_contents($_GET["url"]);
        $file = explode('<div id="player-api" class="player-width player-height off-screen-target player-api" tabIndex="-1"></div>', $file)[1];
        $file = explode('<div id="watch-queue-mole"', $file)[0];
        echo $file;
    ?>

    <script>
        let data = ytplayer.config.args.url_encoded_fmt_stream_map;
        console.log('data', data);
        
        
        let urls = [];
        for (let urlWithData of data.split(',')) {
            let curMap = {};
            urlWithData.split('\u0026').forEach(item => {
                curMap[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
            });
        
            urls.push(curMap);
        }
        console.log('urls', urls);
        console.log('first url', urls[0].url);
        
        document.getElementById('urls').innerHTML = urls.reduce((total, item) => {
            if (typeof total != 'string') {
                total = `
                    <tr>
                        <td>${total.quality}</td>
                        <td><a href="${total.url}" target="_blank">${total.url}</td>
                    </tr>
                `;
            } 
            return total + `
                <tr>
                    <td>${item.quality}</td>
                    <td><a href="${item.url}" target="_blank">${item.url}</td>
                </tr>
            `;
        });
    </script>
</body>

</html>
