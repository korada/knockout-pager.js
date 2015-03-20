//Knockout Pager Plugin
// Author: Venkata Aditya Korada

(function (pager) {
    if (typeof require == "function" && typeof module === "object") {
        pager(require("knockout"));
    } else if (typeof define == "function" && define["amd"]) {
        define(["knockout"], pager);
    } else {
        pager(ko);
    }
}(function (ko) {
    var pager = function (itemCount) {
        var pg = this;
        pg.itemCount = ko.observable(itemCount || 0);
        pg.pageSize = ko.observable(5);
        pg.currentPage = ko.observable(1);
        pg.framePagesCount = ko.observable();
        pg.currentFramePages = ko.observableArray();
        pg.startPage = ko.observable(0);
        pg.endPage = ko.observable(0);
        pg.frame = ko.observable(0);
        pg.totalPages = ko.computed(function () {
            return Math.ceil(pg.itemCount() / pg.pageSize());
        });
        /*Functions*/
        pg.updatePageNumbers = function (pageNumber) {
            var i;
            pg.currentFramePages.removeAll();
            if (pageNumber > 0 && pageNumber <= pg.totalPages()) {
                pg.frame(Math.ceil(pageNumber / pg.framePagesCount()));
                pg.startPage(pg.framePagesCount() * (pg.frame() - 1) + 1);
                pg.endPage(pg.framePagesCount() * (pg.frame() - 1) + pg.framePagesCount());
                if (pg.endPage() > pg.totalPages()) {
                    pg.endPage(pg.totalPages());
                }
            }
            for (i = pg.startPage() ; i <= pg.endPage() ; i++) {
                pg.currentFramePages.push(i);
            }
        }

        pg.setPage = function (pageNumber) {
            if (pageNumber <= pg.totalPages() && pageNumber >= 1) {
                pg.currentPage(pageNumber);
                pg.updatePageNumbers(pageNumber);
            }
        }

        pg.setPagesize = function (size) {
            pg.pageSize(size > 0 ? size : 0);
            pg.currentPage(1);
            pg.updatePageNumbers(1);
        }

        pg.firstPage = function () {
            pg.setPage(1);
        }
        pg.lastPage = function () {
            pg.setPage(pg.totalPages());
        }

        pg.nextPage = function () {
            pg.setPage(pg.currentPage() + 1);
        }
        pg.previousPage = function () {
            pg.setPage(pg.currentPage() - 1);
        }

        pg.nextFrame = function () {
            changeFrame('right');
        }
        pg.previousFrame = function () {
            changeFrame('left');
        }


        pg.hasNextFrame = function () {
            return pg.frame() >= 1 && pg.frame() < Math.ceil(pg.totalPages() / pg.framePagesCount());
        }

        pg.hasPreviousFrame = function () {
            return pg.frame() <= Math.ceil(pg.totalPages() / pg.framePagesCount()) && pg.frame()!=1;
        }
        pg.itemCount.subscribe(function () {
            pg.updatePageNumbers(1);
        });
        pg.currentPage.subscribe(function (val) {
            pg.updatePageNumbers(val);
        });
        function changeFrame(direction) {
            if (direction == 'left') {
                if (pg.frame() > 1) {
                    pg.updatePageNumbers(pg.framePagesCount() * (pg.frame() - 1));
                }
            } else {
                if (pg.frame() <= Math.ceil(pg.totalPages() / pg.framePagesCount())) {
                    pg.updatePageNumbers(pg.framePagesCount() * (pg.frame()) + 1);
                }
            }
        }

    }
    ko.pager = function (itemCount) { return new pager(itemCount); }

}));
