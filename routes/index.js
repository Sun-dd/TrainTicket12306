

var express = require('express');
var router = express.Router();


var fs = require('fs');

var OL_TrainTickects = require('./../TrainTickects');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '火车票查询工具' });
});



// 查询火车票
router.post('/tickect', function(req, res, next) {
	var Config = {
		date         : req.body.date,   		// '2017-07-24',	// 日期, 格式"yyyy-mm-dd"
		from_station : req.body.from_station,   //  'SZQ',			// 始发站车站代码
		end_station  : req.body.end_station,    //  'XMS',			// 终到站车站代码
		print        : false,					// 是否打印
	};
	OL_TrainTickects.QueryTickects(Config, function(err, tickects) {
		if(!err) {
			res.json({success:"SUCCESS", data:tickects})
		}
		else {
			res.json({error:err})
		}
	});
});


// 更新火车站数据文件
router.post('/rebase', function(req, res, next) {
	OL_TrainTickects.CollectStations(function(err, data) {
		var fs = require('fs');
		// 写入js文件
		var dir = "./public/js/"
		if(!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		fs.writeFile(dir+'stations_py.js', "var StationData = "+JSON.stringify(data));
		
		if(!err) {
			res.json({success:"SUCCESS"})
		}
		else {
			res.json({error:err})
		}
		
	})
});

// 查询途径站点
router.post('/stations', function(req, res, next) {
	var Config = {
		train_no     : req.body.train_no,   	// '6i000D40920A',	// 列车编号
		from_station : req.body.from_station,   //  'SZQ',			// 始发站车站代码
		end_station  : req.body.end_station,    //  'XMS',			// 终到站车站代码
		date         : req.body.date,   		// '2017-07-24',	// 日期, 格式"yyyy-mm-dd"
		print        : false,					// 是否打印
	};
	OL_TrainTickects.QueryStations(Config, function(err, sList) {
		if(!err) {
			res.json({success:"SUCCESS", data:sList})
		}
		else {
			res.json({error:err})
		}
	});
});





module.exports = router;
