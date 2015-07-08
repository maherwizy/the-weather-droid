(function() {
  var buildPath, def, getWeather, http, imgPath, opts;

  http = require('http');

  opts = {
    hostname: 'api.openweathermap.org',
    port: 80,
    withCredentials: false
  };

  imgPath = 'http://openweathermap.org/img/w/';

  def = '';

  exports.defaults = function(cfg) {
    var i, n, objs;
    objs = [];
    for (i in cfg) {
      n = cfg[i];
      objs.push(i + "=" + n);
    }
    return def = objs.join('&');
  };

  exports.opts = function(optsIn) {
    var i, n;
    if (optsIn == null) {
      optsIn = {};
    }
    for (i in optsIn) {
      n = optsIn[i];
      opts[i] = optsIn[i];
    }
    return this;
  };

  exports.find = function(cfg, cb) {
    opts.path = "/data/2.5/find?" + (buildPath(cfg));
    return getWeather(opts, function(err, json) {
      var item, j, len, ref;
      if (err != null) {
        return cb(err);
      }
      ref = json.list;
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(null, json);
    });
  };

  exports.now = function(cfg, cb) {
    opts.path = "/data/2.5/weather?" + (buildPath(cfg));
    return getWeather(opts, function(err, json) {
      if (err != null) {
        return cb(err);
      }
      if (200 === Number(json.cod)) {
        json.weather[0].iconUrl = "" + imgPath + json.weather[0].icon + ".png";
      }
      return cb(null, json);
    });
  };

  exports.forecast = function(cfg, cb) {
    opts.path = "/data/2.5/forecast?" + (buildPath(cfg));
    return getWeather(opts, function(err, json) {
      var item, j, len, ref;
      if (err != null) {
        return cb(err);
      }
      ref = json.list;
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(null, json);
    });
  };

  exports.daily = function(cfg, cb) {
    opts.path = "/data/2.5/forecast/daily?" + (buildPath(cfg));
    return getWeather(opts, function(err, json) {
      var item, j, len, ref;
      if (err != null) {
        return cb(err);
      }
      ref = json.list;
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(null, json);
    });
  };

  exports.history = function(cfg, cb) {
    opts.path = "/data/2.5/history/city?" + (buildPath(cfg));
    return getWeather(opts, function(err, json) {
      var item, j, len, ref;
      if (err != null) {
        return cb(err);
      }
      ref = json.list;
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        item.weather[0].iconUrl = "" + imgPath + item.weather[0].icon + ".png";
      }
      return cb(null, json);
    });
  };

  buildPath = function(cfg) {
    var i, n, objs;
    objs = [];
    for (i in cfg) {
      n = cfg[i];
      objs.push(i + "=" + n);
    }
    return def + "&" + (objs.join('&'));
  };

  getWeather = function(opts, cb) {
    return http.get(opts, function(res) {
      var buffer;
      buffer = '';
      res.on('data', function(data) {
        return buffer += data;
      });
      res.on('error', function(error) {
        return cb(error);
      });
      return res.on('end', function() {
        var error, json;
        try {
          json = JSON.parse(buffer);
        } catch (_error) {
          error = _error;
          return cb(error);
        }
        if (json.list == null) {
          json.list = [];
        }
        return cb(null, json);
      });
    });
  };

}).call(this);