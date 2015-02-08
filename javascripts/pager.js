
	var vm= function(){
		var self=this;
	self.pager=ko.pager();
	self.pager.framePagesCount(5);
	self.pager.itemCount(10);
	}

ko.applyBindings(new vm(),document.getElementById("koPager"));
