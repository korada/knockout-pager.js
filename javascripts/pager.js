
	var vm= function(){
		var self=this;
	self.pager=ko.pager(0);
	self.pager.frameSize(5);
	self.pager.itemCount(10);
	}

ko.applyBindings(new vm(),document.getElementById("koPager"));