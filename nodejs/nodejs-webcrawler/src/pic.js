/*
*	使用Node.js获取网页上的图片
*	madeby KeKelovely
*	示例：
*
*	Input: getImg("https://static.hdslb.com/images/akari.jpg","example.jpg");
*
*	Output: res/example.jpg
*
*	Have Fun And Enjoy it!
*/

const fs = require("fs");
const url = require("url");

var getImg = function(sUrl, filename) {
	var urlObj = url.parse(sUrl);
	var http = "";
	filename = "../res/" + filename;
	// 判断协议类型，引入相应模块
	if (urlObj.protocol === "http:") {
		http = require("http");
	} else if (urlObj.protocol === "https:") {
		http = require("https");
	} else {
		console.log("Please input the Protocol_name!!");
	}
	// 设置options参数，传入http.request()中，http.request()允许显式地给服务器发送请求
	var imgOptions = {
		"hostname": urlObj.hostname,
		"path": urlObj.path
	}

	var req = http.request(imgOptions, (res) => {
		var arr = [];
		// 监听data事件，传输数据
		res.on('data', (chunk) => {
			arr.push(chunk);
		});
		// 监听end事件，当数据传输完后将其载入图片文件中
		res.on('end', () => {
			let bufferData = Buffer.concat(arr);
			let ws = fs.createWriteStream(filename,'utf-8');
			ws.write(bufferData);
			ws.end();
			console.log("写入文件成功！");
		});
		// 监听error事件
		res.on('error', (e) => {
			console.log(`请求遇到问题:${e.message}`);
		});
	});
		req.on('error', (e) => {
			console.log(`请求遇到问题:${e.message}`);
	});
	// 结束发送请求
	req.end();
}

getImg("https://static.hdslb.com/images/akari.jpg", "example.jpg");
