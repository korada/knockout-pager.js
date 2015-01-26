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
    var pager=function(itemCount) {
        var _=this;
        _.itemCount=ko.observable(itemCount||0);
        _.pageSize=ko.observable(5);
        _.currentPage=ko.observable(1);
        _.framePagesCount=ko.observable();
        _.currentFramePages=ko.observableArray();
        _.startPage=ko.observable(1);
        _.endPage=ko.observable(5);
        _.frame=ko.observable(1);
        _.totalPages=ko.computed(function() {
            return Math.ceil(_.itemCount()/_.pageSize());
        });
        /*Functions*/
        _.updatePageNumbers=function(pageNumber) {
            var i;
            _.currentFramePages.removeAll();
            if(pageNumber>0&&pageNumber<=_.totalPages()) {
                _.frame(Math.ceil(pageNumber/_.framePagesCount()));
                _.startPage(_.framePagesCount()*(_.frame()-1)+1);
                _.endPage(_.framePagesCount()*(_.frame()-1)+_.framePagesCount());
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
            if(size>0) {
                _.pageSize(size);
            } else {
                _.pageSize(5);
            }
            _.currentPage(0);
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
            return _.frame()>1&&_.totalPages()>_.framePagesCount();
        }

        _.hasPreviousFrame=function() {
            return _.frame()>Math.ceil(_.totalPages()/_.framePagesCount())&&_.totalPages()>_.framePagesCount();
        }
        _.itemCount.subscribe(function() {
            _.updatePageNumbers(1);
        });
        _.currentPage.subscribe(function(val) {
            _.updatePageNumbers(val);
        });
        function changeFrame(direction) {
            if(direction=='left') {
                if(_.frame()>1) {
                    _.updatePageNumbers(_.framePagesCount()*(_.frame()-1));
                }
            } else {
                if(_.frame()<=Math.ceil(_.totalPages()/_.framePagesCount())) {
                    _.updatePageNumbers(_.framePagesCount()*(_.frame())+1);
                }
            }
        }

    }
    exports.pager=function(itemCount) { return new pager(itemCount); }

}));
