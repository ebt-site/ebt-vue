(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{552:function(t,e,n){"use strict";n.r(e);var r=n(9),c=(n(45),{asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,t.params,e.next=3,n("wiki").only(["title","order","description","img","slug","author"]).sortBy("order","title","asc").fetch();case 3:return r=e.sent,e.abrupt("return",{items:r,article:{slugDir:"wiki"}});case 5:case"end":return e.stop()}}),e)})))()},components:{EbtArticleItems:n(125).default}}),o=n(21),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nuxt-content ebt-toc"},[n("h1",[t._v("Wiki Contents")]),t._v(" "),n("ebt-article-items",{attrs:{article:t.article,items:t.items}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{EbtArticleItems:n(125).default})}}]);