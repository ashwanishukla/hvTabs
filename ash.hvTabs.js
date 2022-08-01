/**
 * Horizontal & Vertical Tabs (H-V Tabs)
 * 
 * This widget plugin has been developed in order to overcome the boundations of *jTabs* with structural dependency of <ul>-<li>-<div>-<a>
 * Defaults though have been intialised in accordance with what people have been using in jTabs so that they can easily shift from jTabs to hvTabs
 * This plugin has been developed to help people achieve better results with minimal efforts.
 * This is an open-source contribution from my side to the dev community
 * At this time I don't have any idea about the standards or licenses
 * 
 * @created June, 2014
 * @author Ashwani Shukla <ashwanishukla24@gmail.com>
 * @copyright  Ashwani Shukla <ashwanishukla24@gmail.com>
 * @note kindly provide tab content container ids to tabs attribute with # eg. href="#section1"
 */
$.widget("ash.hvTabs", {
    o: null,
    e: null,
    options: {
        tc: 'ul', //tabContainer
        ts: 'a', //tabSelector
        tsp: 'li', //tabSelector parent
        tsa: 'href', //tabSelAttr
        cth: 'tab-content', //classToHide
        ac: 'active', //activeClass
        lftbd: false, //loadFirstTabByDefault (true=>loadFirstTabByDefault, '#sectionId'=>load as FirstTabByDefault)
        pt: 'all', //previousTill (how many previous elements to apply previous tab class) values can be 1,2,3....all
        ptc: '' //previous tab class
    },
    _create: function() {
        var $t = this;
        var o = $t.o = $t.options;
        var e = $t.e = $t.element;
        var $this = $(e);
        console.log(o.cth);
        if (o.lftbd) {
//            console.log(typeof o.lftbd);
            if (typeof o.lftbd == 'boolean') {
                $this.find(o.tc).children().first().addClass(o.ac);
                var h = $this.find(o.tc).find(o.ts).first().attr(o.tsa);
                $('.' + o.cth).hide();
                $(h).show();
            } else if (typeof o.lftbd == 'string') {
                var $p = $(o.ts + '[' + o.tsa + '=' + o.lftbd + ']').parents(o.tsp).addClass(o.ac);
                if (o.ptc) {
                    if (o.pt == 'all') {
                        $p.prevAll().addClass(o.ptc);
                    } else if (typeof o.pt == 'number') {
                        for (var i = 1; i <= o.pt; i++) {
                            $p = $p.prev().addClass(o.ptc);
                        }
                    } else {
                        $p.prev().addClass(o.ptc);
                    }
                }
                $('.' + o.cth).hide();
                $(o.lftbd).show();
            }
        }
        $this.find(o.tc).find(o.ts).click(function() {
            var $ao = $(this);
            var $tcc = $this.find(o.tc).children();
            $tcc.removeClass(o.ac);
            var $p = $ao.parents(o.tsp).addClass(o.ac);
            if (o.ptc) {
                $tcc.removeClass(o.ptc);
                if (o.pt == 'all') {
                    $p.prevAll().addClass(o.ptc);
                } else if (typeof o.pt == 'number') {
                    for (var i = 1; i <= o.pt; i++) {
                        $p = $p.prev().addClass(o.ptc);
                    }
                } else {
                    $p.prev().addClass(o.ptc);
                }
//                $p.prev().addClass(o.ptc);
            }
            var id = $ao.attr(o.tsa);
            $('.' + o.cth).hide();
            $(id).show();
        });
    }
});