//Knockout Pager Plugin
// Author: Venkata Aditya Korada

(function(pager) {
    if(typeof require=="function"&&typeof exports==="object"&&typeof module==="object") {
        pager(require("knockout"),exports);
    } else if(typeof define=="function"&&define["amd"]) {
        define(["knockout","exports"],pager);
    } else {
        pager(ko,ko.pager=function() { });
    }
}(function(ko,exports) {
    var pager=function(itemcount) {
        var _=this;
        _.itemCount=ko.observable(itemcount||0);
        _.pageSize=ko.observable(5);
        _.currentPage=ko.observable(1);
        _.frameSize=ko.observable();
        _.currentFramePages=ko.observableArray();
        _.startPage=ko.observable(0);
        _.endPage=ko.observable(0);
        _.frame=ko.observable(0);
        _.totalPages=ko.computed(function() {
            return Math.ceil(_.itemCount()/_.pageSize());
        });
        /*Functions*/
        _.updatePageNumbers=function(pageNumber) {
            var i;
            _.currentFramePages.removeAll();
            if(pageNumber>0&&pageNumber<=_.totalPages()) {
                _.frame(Math.ceil(pageNumber/_.frameSize()));
                _.startPage(_.frameSize()*(_.frame()-1)+1);
                _.endPage(_.frameSize()*(_.frame()-1)+_.frameSize());
                if(_.endPage()>_.totalPages()) {
                    _.endPage(_.totalPages());
                }
            }
            for(i=_.startPage() ;i<=_.endPage() ;i++) {
                _.currentFramePages.push(i);
            }
        }
        _.setPage=function(pageNumber) {
            if(pageNumber<=_.totalPages()&&pageNumber>=1) {
                _.currentPage(pageNumber);
                _.updatePageNumbers(pageNumber);
            }
        }

        _.setPagesize=function(size) {
            _.pageSize(size>0? size: 0);
            _.currentPage(1);
            _.updatePageNumbers(1);
        }

        _.firstPage=function() {
            _.setPage(1);
        }
        _.lastPage=function() {
            _.setPage(_.totalPages());
        }

        _.nextPage=function() {
            _.setPage(_.currentPage()+1);
        }
        _.previousPage=function() {
            _.setPage(_.currentPage()-1);
        }

        _.nextFrame=function() {
            changeFrame('right');
        }
        _.previousFrame=function() {
            changeFrame('left');
        }


        _.hasNextFrame=function() {
            return _.frame()>1&&_.totalPages()>_.frameSize();
        }

        _.hasPreviousFrame=function() {
            return _.frame()>Math.ceil(_.totalPages()/_.frameSize())&&_.totalPages()>_.frameSize();
        }
        _.itemCount.subscribe(function() {
            _.updatePageNumbers(1);
        });
        _.currentPage.subscribe(function(val) {
            _.updatePageNumbers(val);
        });
        _.frameSize.subscribe(function(){
            _.updatePageNumbers(1);
        });
        function changeFrame(direction) {
            if(direction=='left') {
                if(_.frame()>1) {
                    _.updatePageNumbers(_.frameSize()*(_.frame()-1));
                }
            } else {
                if(_.frame()<=Math.ceil(_.totalPages()/_.frameSize())) {
                    _.updatePageNumbers(_.frameSize()*(_.frame())+1);
                }
            }
        }

    }
    ko.pager=function (itemcount){return new pager(itemcount)}; 

}));
