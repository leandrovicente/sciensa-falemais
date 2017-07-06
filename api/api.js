var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.route('/health')
  .get(function(req, res) {
    res.json({message:'Api running!'});
  });

app.route('/calc')
  .get(function(req, res) {

    var from = req.query.from;
    var to = req.query.to;
    var plan = req.query.plan;
    var min = req.query.minutes;

    if(from && to && plan && min){
      res.json(getTotalCost(from, to, min, plan));
    } else {
      res.json({message:'bad request'});
    }

  });

var costs = {
  '011': {'016': 1.90,'017': 1.70,'018': 0.90},
  '016': {'011': 2.90},
  '017': {'011': 2.70},
  '018': {'011': 1.90}
};

var plans = {
  '1': 30,
  '2': 60,
  '3': 120
};

function getCost(from, to){
  return costs[from][to];
}

function getMinPlan(plan){
  return plans[plan];
}

function getCostWithoutPlan(from, to, min){
  return getCost(from, to) * min;
}

function getCostWithPlan(from, to, min, plan){
  var minPlan = getMinPlan(plan);
  var minSurplus = min - minPlan < 0 ? 0 : min - minPlan;
  var cost = getCost(from, to);

  return ((cost * minSurplus) || 0) * 1.1;
}

function getTotalCost(from, to, min, plan){

  var withPlan = getCostWithPlan(from, to, min, plan);
  var withoutPlan = getCostWithoutPlan(from, to, min);

  if(withoutPlan){
    return {'withPlan': '$ ' + parseFloat(withPlan).toFixed(2),
            'withoutPlan': '$ ' + parseFloat(withoutPlan).toFixed(2)};
  }
  return {'withPlan': '-', 'withoutPlan': '-'};

}

app.listen(3001);

module.exports = app;
