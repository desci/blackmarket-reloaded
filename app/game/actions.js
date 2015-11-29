define([], function() {
    var actions = {
        list: ["Shooting", "Street fight", "Pickpocket", "Scam", "Steal car", "Jewelry robbery", "Hacking", "Arms sales"],
		inflation: [1.10, 1.11, 1.12, 1.13, 1.13, 1.12, 1.11, 1.10],
		progress: [],
		owned: [],
		price: [2.5, 85, 1997, 49941, 1103113, 25923155, 777694650, 33052022625],
		pricePromo: [],
		reward: [0.32, 34, 798, 19976, 441245, 10369262, 311077860, 13220809050],
		rewardMultiplier: [],
		totalRewardMultiplier: 1,
		time: [2.5, 7.5, 22.5, 67.5, 202.5, 607.5, 1822.5, 5437.5],
		timeMultiplier: [],
		totalTimeMultiplier: 1,

        getTime: function(index) {
            return ((this.time[index] / this.timeMultiplier[index]) / this.totalTimeMultiplier);
        },

        getReward: function(index) {
            return ((this.owned[index] * this.reward[index] * this.rewardMultiplier[index]) * this.totalRewardMultiplier);
        },

        getPrice: function(index) {
            var initial = (this.price[index] * Math.pow(this.inflation[index], this.owned[index]));
        	if (this.pricePromo[index] > 0)
        		return (initial * (this.pricePromo[index] / 100));
        	else
        		return initial;
        },

        getPerSec: function(index) {
            var reward = this.getReward(index);
        	var time = this.getTime(index);
        	return (reward / time);
        },

        upgrade: function(index) {
            var price = this.getPrice(index);
        	if (game.money >= price) {
        		game.money -= price;
        		this.owned[index]++;
        		$("#action-upgrade-" + (index+1)).html("Upgrade");
        	};
        	this.display();
        },

        run: function(times) {
            if (!game.options.pause) {
        		for (var i = 0; i < this.list.length; i++) {
        			if (this.owned[i] > 0) {
        				var fps = game.options.fps;
        				var time = this.getTime(i);
        				var reward = this.getReward(i);
        				this.progress[i] += times/fps;
        				game.gainMoney(Math.floor(this.progress[i]/time) * reward);
        				this.progress[i] %= time;
        				var width = ((this.progress[i]/time) * 100)
        				if (time < 0.15)
        					width = 100;
        				width = Math.max(width, 1);
        				$("#action-progress-" + (i+1)).css('width', width + '%');
        				$("#action-nb-" + (i+1)).html(Math.floor(width) + "%");
        			};
        		}
        	};
        },

        display: function() {
            for (var i = 0; i < this.list.length; i++) {
        		var price = this.getPrice(i);
        		var reward = this.getReward(i);
        		var time = this.getTime(i);
        		var perSec = this.getPerSec(i);
        		$("#action-name-" + (i+1)).html(this.list[i] + " (lvl. " + this.owned[i] + ")");
        		$("#action-info-" + (i+1)).html("+$" + beautify.fix(reward) + " <span>($" + beautify.fix(perSec, 3) + "/sec)</span><br>" + beautify.fix(time) + " sec");
        		$("#action-cost-" + (i+1)).html("Cost $" + beautify.fix(price));
        	};
        },

        varInit: function() {
            for (var i = 0; i < this.list.length; i++) {
                this.progress.push(0);
        		this.rewardMultiplier.push(1);
        		this.timeMultiplier.push(1);
        		this.pricePromo.push(0);
        		this.owned.push(0);
        		this.owned[0] = 1;
            };
        },

        domInit: function() {
            for (var i = 0; i < this.list.length; i++) {
                $("#action-upgrade-" + (i+1)).attr('onclick', 'game.actions.upgrade(' + i + ');');

        		if (this.owned[i] < 1)
        			$("#action-upgrade-" + (i+1)).html("Unlock");
        		else
        			$("#action-upgrade-" + (i+1)).html("Upgrade");

                this.display();
            };
        },

        angularInit: function() {
            this.domInit();
        },

        init: function() {
            this.varInit();

            window["game"]["actions"] = this;
            log("Actions init.");
        }
    };

    return actions.init();
});
