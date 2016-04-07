/* global _:false */
export function HelperService(
  
) {"ngInject";
  
  this.basename = (str) =>
  {
    var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
      base = base.substring(0, base.lastIndexOf("."));
    return base;
  };
  
  this.containsChange = (changes, source, target) => {
    return _(changes)
    .find(i => {
      return (i[0] == source && i[1] == target) 
      || (i[1] == source && i[0] == target);
      
    }) != undefined;
  }
  this.makeEdges = (data, changes) => {
    var edges = _(data.split("\n"))
      .filter(data => data.indexOf("#") != 0)
      .filter(data => data.length != 0)
      .map(data => data.split(" "));

    var nodes = _.unique(_.flatten(edges));
    
    var ret = [];
    for(let u in nodes) {
      var hasSome = false;
      for(let v in nodes) {
        if(u > v) continue;
        var change = this.containsChange(changes, u, v);
        var original = this.containsChange(edges, u, v);
        var changed = 0;
        if(change && original) {
          changed = -1;
        } else if(!change && original) {
          changed = 0;
        } else if(change && !original) {
          changed = 1;
        } else if(!change && !original) {
          continue;
        }
        hasSome = true;
        ret.push({data:{
          id: u+"-"+v, 
          source: u, 
          target: v,
          changed: changed
        }})
      }
      if(hasSome) {
        ret.push({data:{
          id: u 
        }})
      }
    }
    return ret;
  }
  
  
  this.transformResult = (resp) => {
    resp.stats_time_min = _.min(resp.stats, (a) => a.time).time;
    resp.stats_quality_max = _.max(resp.stats, (a) => a.quality).quality;
    resp.stats_failed_min = _.min(resp.stats, (a) => a.failed).failed;
    resp.stats_failed_percent_min = _.min(resp.stats, (a) => a.failed_percent).failed_percent;
    resp.name = this.basename(resp.options.config) + " : " + this.basename(resp.config.instances) + " - " + this.basename(resp.config.forbidden);
    return resp;
  }
  
  this.avg = (val) => _.reduce(val, (a,b) => a+b) / val.length;//calculate the average of the results
}
