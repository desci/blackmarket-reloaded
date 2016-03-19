define([],function(){var t={money:0,totalMoney:0,allTimeMoney:0,level:1,reputation:0,totalReputation:0,allTimeReputation:0,reputationNeed:100,moneyActions:new Array,repActions:new Array,gameInterval:void 0,options:{},setFPS:function(e){e=parseInt(e),e=e>=1&&60>=e?e:20,this.stopGame(),this.options.fps=e,this.options.interval=1e3/e,$("#choosedFPS").html(t.options.fps),this.runGame()},getObjLength:function(t){var e,o=0;for(e in t)t.hasOwnProperty(e)&&o++;return o},scope:function(t){return angular.element(t).scope()},togglePause:function(){this.options.pause=!this.options.pause,this.options.pause?notify.pop("alert","<strong>Game paused...</strong>"):notify.pop("alert","<strong>Game un-paused.</strong>")},gainMoney:function(t){this.money+=t,this.totalMoney+=t,this.allTimeMoney+=t},gainRep:function(t){this.reputation+=t,this.totalReputation+=t,this.allTimeReputation+=t},repLevelUp:function(){if(this.reputation>=this.reputationNeed)for(;this.reputation>=this.reputationNeed;)this.level++,this.reputation-=this.reputationNeed,this.reputationNeed=Math.floor(100*Math.pow(1.3,this.level))},menuSwitch:function(t){this.options.menu=t,this.menuType()},menuType:function(){var t=this.options.menu;"sidebar"==t?($('li[id^="navbar-menu"]').fadeOut("fast",function(){$("#navbar-sidebarmenu").fadeIn("fast")}),sidebar.activated=!0):($("#navbar-sidebarmenu").fadeOut("fast",function(){$('li[id^="navbar-menu"]').fadeIn("fast")}),sidebar.activated=!1)},animateMenu:function(t){var e=".navbar-menu-"+t;$(e).addClass("glow").delay(1e3).queue(function(){$(this).removeClass("glow").dequeue()})},toggleModal:function(t){t="#"+t,$(t).modal({keyboard:!1,backdrop:"static"}),$(t).fadeIn("slow")},closeModal:function(e){t.options.pause=!1,t.options.firstTime=!1,t.options.softReset=!1,window.setTimeout(function(){$(e).remove()},3e3)},display:function(){$("#sidebar-version").html("v"+this.options.version),$(".navbar-brand").html("$"+beautify.fix(t.money)+" - reputation lvl. "+this.level+" <small>("+fix(this.reputation,0)+"/"+fix(this.reputationNeed,0)+")"),this.production.displayDrugs()},coreLoop:function(){var e=t;e.options.now=(new Date).getTime();var o=e.options.now-e.options.before;o>e.options.interval?o>2e3?(e.updateGame(Math.floor(o/e.options.interval),!0),notify.pop("success","While you were offline, you gained:<br>$"+fix(t.actions.gainedMoneyThisRun,3)+"<br>"+fix(t.actions.gainedRepThisRun,3)+" rep.")):e.updateGame(Math.floor(o/e.options.interval),!1):e.updateGame(1,!1),e.options.before=(new Date).getTime()},updateGame:function(e,o){t.actions.run(e,o),t.statistics.display(),t.production.run(e),this.display()},domInit:function(){$("#navbar-save").attr("onclick",'game.save.save("user");')},runGame:function(){this.gameInterval=window.setInterval(function(){t.coreLoop()},t.options.interval)},stopGame:function(){window.clearInterval(this.gameInterval)},init:function(){window.game=this,window.log=console.info.bind(console,"BR-"+this.options.version+" :"),window.warn=console.warn.bind(console),window.debug=console.debug.bind(console),require(["beautify","sidebar","notify","helper"],function(){log("----------"),require(["actions","research-center","achievements","production","prestige","collections","save","statistics","options"],function(){t.save.load(),null===localStorage.getItem(t.save.name+t.save.salt)&&(t.options.before=(new Date).getTime()),log("----------"),require(["angular","bootstrap"],function(){t.options.firstTime||t.options.softReset?t.options.firstTime?window.setTimeout(function(){t.toggleModal("modal-newPlayer")},1e3):t.options.softReset&&window.setTimeout(function(){t.toggleModal("modal-reset")},1e3):t.options.pause=!1,t.domInit(),t.options.init=!0,log("Angular & Bootstrap init. Ready to play."),t.setFPS(t.options.fps)})})})}};return t.init()});