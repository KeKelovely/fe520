/*
 *	使用Node.js抓取哔哩哔哩上的番剧信息
 *	madeby KeKelovely
 *	示例：
 *
 *	Input: getBangumiInfo("https://bangumi.bilibili.com/anime/23850","超能力女儿");
 *
 *	Output: res/example.html
 *
 *	Have Fun And Enjoy it!
 */

const fs = require("fs");
const url = require("url");
const JSDOM = require('jsdom').JSDOM;
// index表示重定向次数
var index = 0;

var getBangumiInfo = function(sUrl, filename) {
	urlFilename = '../res/' + filename + '.html';
	index++;
	var urlObj = url.parse(sUrl),
		http = "";
	if (urlObj.protocol == "http:") {
		http = require("http");
	} else if (urlObj.protocol == "https:") {
		http = require("https");
	} else {
		console.log('Please Add the protocol!');
	}

	var options = {
		'hostname': urlObj.hostname,
		'path': urlObj.path
	}

	var req = http.request(options, (res) => {
		if (res.statusCode == 200) {
			var str = '';
			res.on('data', (chunk) => {
				str += chunk;
			});
			res.on('end', () => {
				var DOM = new JSDOM(str),
					document = DOM.window.document,
					htmlInfo1 = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
								<title>${filename}</title></head><body>`,
					htmlInfo2 = `</body></html>`,
					bangumiTitle = "<h1>" + document.querySelector('.info-title').innerHTML + "</h1>",
					bangumiInfoItem = document.querySelectorAll('.info-style-item'),
					bangumiInfo = "",
					bangumiDesc = document.querySelector('.info-desc').innerHTML,
					bangumiPreview = document.querySelector('.bangumi-preview').firstElementChild.src;
				// 处理番剧的标签信息
				for (let i = 0; i < bangumiInfoItem.length; i++) {
					bangumiInfo = bangumiInfo + " " + bangumiInfoItem[i].innerHTML;
				}
				bangumiInfo = "<h3>" + bangumiInfo + "</h3>"
				// 加入番剧的图片引用
				var bangumiImg = `<img src="https:${bangumiPreview}" alt="bangumiImg">`;
				// 整合HTML代码
				var result = htmlInfo1 + bangumiTitle + "<br>" + bangumiImg + "<br>" +
					bangumiInfo + "<br>" + bangumiDesc + htmlInfo2;
				var ws = fs.createWriteStream(urlFilename, 'utf-8');
				ws.write(result, 'utf-8');
				ws.end();
			});
		} else if (res.statusCode == 302 || res.statusCode == 301) {
			console.log(`this is the ${index} times to resetUrl!`);
			getBangumiInfo(res.headers.location);
		}

		res.on('error', (e) => {
			console.log(`请求遇到问题:${e.message}`);
		});
	});
	// 监听请求过程中的错误
	req.on('error', (e) => {
		console.log(`请求遇到问题：${e.message}`);
	})
	// 结束发送请求
	req.end(() => {
		console.log('写入文件成功！');
	});
};

getBangumiInfo("http://bangumi.bilibili.com/anime/23829", "Comic Grils!");
