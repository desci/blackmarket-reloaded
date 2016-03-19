define(["angular"],function(){var t={list:["Shooting","Fight Club","Pickpocket","Scam","Car Theft","Theft of Jewels","Hacking","Arms Sales","Drugs Sales"],inflation:[1.09,1.15,1.15,1.14,1.13,1.12,1.11,1.1,1.09],progress:new Array,owned:new Array,price:[4,92,2116,48668,1119364,25745372,592143556,13619301788,313243941124],reward:[1,23,529,12167,279841,6436343,148035889,3404825447,78310985281],rewardMultiplier:new Array,totalRewardMultiplier:1,time:[1.5,3,6,12,24,96,384,1536,6144],timeMultiplier:new Array,totalTimeMultiplier:1,reputation:[1,3,9,27,81,243,729,2187,6561],reputationMultiplier:new Array,reputationDivider:6,totalReputationMultiplier:1,gainedMoneyThisRun:0,gainedRepThisRun:0,buy:1,getRep:function(t){return this.reputation[t]/this.reputationDivider*Math.pow(1.01,this.owned[t])*this.reputationMultiplier[t]*this.totalReputationMultiplier},getTime:function(t){return this.time[t]/this.timeMultiplier[t]/this.totalTimeMultiplier},getReward:function(t){return this.owned[t]*this.reward[t]*this.rewardMultiplier[t]*this.totalRewardMultiplier},getPrice:function(t){var i=this.price[t]*Math.pow(this.inflation[t],this.owned[t]);return i},getPerSec:function(t){var i=this.getReward(t),e=this.getTime(t);return i/e},multiplierN:function(t){t=parseFloat(t),t>=1&&500>=t?this.buy=t:this.buy=1,$("#action-buy-button").html("Buy x"+this.buy),this.display()},multiplier:function(){this.buy>=1&&this.buy<10?this.buy=10:this.buy>=10&&this.buy<100?this.buy=100:this.buy>=100&&this.buy<250?this.buy=250:this.buy>=250&&this.buy<500?this.buy=500:this.buy=1,$("#buySlider").val(this.buy),this.display()},upgrade:function(t){var i=(this.getPrice(t),this.buy);if(i>1)for(var e=0;i>e;e++)this.upgradeOnce(t);else this.upgradeOnce(t)},upgradeOnce:function(t){var i=this.getPrice(t);game.money<i||(game.money-=i,this.owned[t]++,game.achievements.loop(),this.display(),$("#action-upgrade-"+(t+1)).html("Upgrade"))},run:function(t,i){if(!game.options.pause)for(var e=0;e<this.list.length;e++)if(this.owned[e]>0){var s=game.options.fps,r=this.getTime(e),n=this.getReward(e),a=this.getRep(e);this.progress[e]+=t/s,moneyAction=Math.floor(this.progress[e]/r)*n,game.gainMoney(moneyAction),repAction=Math.floor(this.progress[e]/r)*a,game.gainRep(repAction),i===!0&&(this.gainedMoneyThisRun+=moneyAction,this.gainedRepThisRun+=repAction),game.repLevelUp(),this.progress[e]%=r;var o=this.progress[e]/r*100;.2>r&&(o=100,repWidth=100),o=Math.max(o,1),$("#action-progress-"+(e+1)).css("width",o+"%"),$("#action-progress-"+(e+1)+"-info").html(Math.floor(o)+"%"),$("#action-cost-"+(e+1)).html("Cost $"+fix(this.displayPrice(e))).attr("class",this.getColor(this.displayPrice(e)))}},getColor:function(t){return game.money>=t?"colorGreen":"colorRed"},display:function(){for(var t=0;t<this.list.length;t++){var i=this.displayPrice(t),e=this.getReward(t),s=this.getTime(t),r=this.getPerSec(t),n=(this.displayPrice(t),this.reputation[t],this.getRep(t));$("#action-name-"+(t+1)).html(this.list[t]+" (lvl. "+this.owned[t]+")"),$("#action-info-"+(t+1)).html("+$"+fix(e)+" <span>($"+fix(r,3)+"/sec)</span><br>"+fix(s)+" sec.<br>+"+fix(n,0)+" rep."),$("#action-cost-"+(t+1)).html("Cost $"+fix(i)).attr("class",this.getColor(i))}var a=game.research.getCheapest(0);if("undefined"!=typeof game.research.actions.list[a]){var o={name:game.research.actions.list[a].name,desc:game.research.actions.list[a].desc,price:game.research.actions.list[a].price};$("#action-quickbuy-button").html(o.name+" ($"+fix(o.price,0)+")")}else $("#action-quickbuy-button").removeAttr("onclick").prop("disabled",!0).attr("disabled","disabled").addClass("btn-disabled").html("All Upgrades bought!");$("#action-buy-button").html("Buy x"+this.buy)},displayPrice:function(t){var i=this.buy,e=this.owned[t],s=i+this.owned[t],r=this.price[t]*(Math.pow(this.inflation[t],s)-Math.pow(this.inflation[t],e))/(this.inflation[t]-1);return r},varInit:function(){for(var t=0;t<this.list.length;t++)this.progress.push(0),this.rewardMultiplier.push(1),this.timeMultiplier.push(1),this.owned.push(0),this.owned[0]=1,this.reputationMultiplier.push(1)},domInit:function(){for(var t=0;t<this.list.length;t++)$("#action-upgrade-"+(t+1)).attr("onclick","game.actions.upgrade("+t+");"),this.owned[t]<1?$("#action-upgrade-"+(t+1)).html("Unlock"):$("#action-upgrade-"+(t+1)).html("Upgrade"),$("#buySlider").val(this.buy),game.achievements.loop(!0),this.display();$("#buySlider").on("input change",function(){game.actions.multiplierN(this.value)})},angularInit:function(){this.domInit()},init:function(){this.varInit(),window.game.actions=this,log("Actions init.")}};return t.init()});