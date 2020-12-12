(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{225:function(e,t,n){},390:function(e,t,n){"use strict";n.r(t);var a,r=n(8),i=n(0),c=n.n(i),o=n(32),s=n.n(o),u=(n(225),n(85)),l=n(34),p=n(45),d=n(46),h=n(53),j=n(52),b=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(r.jsx)("h1",{children:"\u6b22\u8fce\u4f7f\u7528\u7535\u5f71\u7ba1\u7406\u7cfb\u7edf"})}}]),n}(c.a.Component),f=n(24),m=n.n(f),v=n(37),O=n(43),x=n(217),y=n(395),g=n(397),w=n(115),k=n(398),C=n(399),I=n(42),S=n(401),_=n(394),M=n(396),L=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={showModal:!1},e}return Object(d.a)(n,[{key:"getUploadContent",value:function(){return this.props.value?null:Object(r.jsxs)("div",{children:[Object(r.jsx)(S.a,{}),Object(r.jsx)("div",{style:{color:"gray"},children:"\u7535\u5f71\u6d77\u62a5"})]})}},{key:"getFileList",value:function(){return this.props.value?[{uid:this.props.value,name:this.props.value,url:this.props.value}]:[]}},{key:"handleRequest",value:function(){var e=Object(v.a)(m.a.mark((function e(t){var n,a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append(t.filename,t.file),a=new Request(t.action,{method:"post",body:n}),e.next=5,fetch(a).then((function(e){return e.json()}));case 5:(r=e.sent).err?x.b.error(r.err):this.props.onChange&&this.props.onChange(r.data);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(r.jsxs)("div",{children:[Object(r.jsx)(_.a,{action:"/api/upload",name:"imgfile",accept:".jpg,.png,.gif",listType:"picture-card",fileList:this.getFileList(),customRequest:this.handleRequest.bind(this),onRemove:function(){e.props.onChange&&e.props.onChange("")},onPreview:function(){e.setState({showModal:!0})},children:this.getUploadContent()}),Object(r.jsx)(M.a,{visible:this.state.showModal,title:this.props.value,footer:null,onCancel:function(){e.setState({showModal:!1})},children:Object(r.jsx)("img",{alt:"",style:{width:"100%"},src:this.props.value})})]})}}]),n}(c.a.Component),P={labelCol:{span:5},wrapperCol:{span:19}},A={wrapperCol:{offset:5,span:19}},q=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this,t=function(){var t=Object(v.a)(m.a.mark((function t(n){var a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(n),!n){t.next=6;break}return t.next=4,e.props.onSubmit(n);case 4:(a=t.sent)?x.b.error(a):x.b.success("\u63d0\u4ea4\u6210\u529f",2,(function(){e.props.history.push("/movie")}));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),n=[];if(this.props.movie){for(var a=Object.keys(this.props.movie),i=Object.values(this.props.movie),c=0;c<a.length;c++){var o={name:a[c],value:i[c]};n.push(o)}console.log(a,i,n)}return Object(r.jsxs)(y.a,Object(O.a)(Object(O.a)({onFinish:t},P),{},{style:{width:"400px",padding:"1em"},fields:n,children:[Object(r.jsx)(y.a.Item,{label:"\u7535\u5f71\u540d\u79f0",name:"name",rules:[{required:!0,message:"\u7535\u5f71\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a"}],children:Object(r.jsx)(g.a,{})}),Object(r.jsx)(y.a.Item,{label:"\u5c01\u9762",name:"poster",getValueFromEvent:function(e){return e},noStyle:!0,children:Object(r.jsx)(L,{})}),Object(r.jsx)(y.a.Item,{label:"\u53d1\u884c\u5730\u533a",name:"areas",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5730\u533a"}],children:Object(r.jsx)(w.a.Group,{options:["\u4e2d\u56fd\u5927\u9646","\u7f8e\u56fd","\u65e5\u672c","\u97e9\u56fd"]})}),Object(r.jsx)(y.a.Item,{label:"\u5f71\u7247\u7c7b\u578b",name:"types",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u7535\u5f71\u7c7b\u578b"}],children:Object(r.jsx)(w.a.Group,{options:["\u559c\u5267","\u60b2\u5267","\u5408\u5bb6\u6b22","\u6218\u4e89","\u79d1\u5e7b","\u60ca\u609a"]})}),Object(r.jsx)(y.a.Item,{label:"\u65f6\u957f",name:"timeLong",initialValue:120,rules:[{required:!0,message:"\u8bf7\u586b\u5199\u65f6\u957f"}],children:Object(r.jsx)(k.a,{min:30,max:240,step:10})}),Object(r.jsx)(y.a.Item,{label:"\u6b63\u5728\u70ed\u6620",name:"isHot",valuePropName:"checked",initialValue:!1,children:Object(r.jsx)(C.a,{})}),Object(r.jsx)(y.a.Item,{label:"\u5373\u5c06\u4e0a\u6620",name:"isComing",valuePropName:"checked",initialValue:!1,children:Object(r.jsx)(C.a,{})}),Object(r.jsx)(y.a.Item,{label:"\u7ecf\u5178\u5f71\u7247",valuePropName:"checked",name:"isClassic",initialValue:!1,children:Object(r.jsx)(C.a,{})}),Object(r.jsx)(y.a.Item,{label:"\u5f71\u7247\u63cf\u8ff0",name:"description",children:Object(r.jsx)(g.a.TextArea,{rows:4})}),Object(r.jsx)(y.a.Item,Object(O.a)(Object(O.a)({},A),{},{children:Object(r.jsx)(I.a,{type:"primary",htmlType:"submit",children:"Submit"})}))]}))}}]),n}(c.a.Component),D=Object(l.e)(q),N=n(106),F=n.n(N),V=function(){function e(){Object(p.a)(this,e)}return Object(d.a)(e,null,[{key:"add",value:function(){var e=Object(v.a)(m.a.mark((function e(t){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.post("/api/movie",t);case 2:return n=e.sent,a=n.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"edit",value:function(){var e=Object(v.a)(m.a.mark((function e(t,n){var a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.put("/api/movie/".concat(t),n);case 2:return a=e.sent,r=a.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(v.a)(m.a.mark((function e(t){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.delete("/api/movie/".concat(t));case 2:return n=e.sent,a=n.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getById",value:function(){var e=Object(v.a)(m.a.mark((function e(t){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.get("/api/movie/".concat(t));case 2:return n=e.sent,a=n.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(v.a)(m.a.mark((function e(t){var n,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.a.get("/api/movie/",{params:t});case 2:return n=e.sent,a=n.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),H=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(r.jsx)(D,{onSubmit:function(){var e=Object(v.a)(m.a.mark((function e(t){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.add(t);case 2:if(!(n=e.sent).err){e.next=5;break}return e.abrupt("return",n.err);case 5:return e.abrupt("return","");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()})}}]),n}(c.a.Component),R=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={movie:void 0},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(v.a)(m.a.mark((function e(){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.getById(this.props.match.params.id);case 2:(t=e.sent).data&&this.setState({movie:t.data});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(r.jsx)(D,{movie:this.state.movie,onSubmit:function(){var t=Object(v.a)(m.a.mark((function t(n){var a;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,V.edit(e.props.match.params.id,n);case 2:if(!(a=t.sent).err){t.next=5;break}return t.abrupt("return",a.err);case 5:return t.abrupt("return","");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()})}}]),n}(c.a.Component),z=n(400),T=n(393),B=n.p+"static/media/default.d456d3ad.jpg";!function(e){e.isHot="isHot",e.isComing="isComing",e.isClassic="isClassic"}(a||(a={}));var K=n(402),E=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.props.onLoad&&this.props.onLoad()}},{key:"getFilterDropdown",value:function(e){var t=this;return Object(r.jsxs)("div",{style:{padding:8},children:[Object(r.jsx)(g.a,{style:{width:188,marginBottom:8,display:"block"},value:this.props.condition.key,onChange:function(e){return t.props.onKeyChange(e.target.value)},onPressEnter:this.props.onSearch}),Object(r.jsx)(I.a,{type:"primary",icon:Object(r.jsx)(K.a,{}),size:"small",style:{width:90,marginRight:8},onClick:this.props.onSearch,children:"\u641c\u7d22"}),Object(r.jsx)(I.a,{size:"small",style:{width:90},onClick:function(){t.props.onKeyChange(""),t.props.onSearch()},children:"\u91cd\u7f6e"})]})}},{key:"getColumns",value:function(){var e=this;return[{title:"\u5c01\u9762",dataIndex:"poster",render:function(e){return e?Object(r.jsx)("img",{alt:"",className:"tablePoster",src:e}):Object(r.jsx)("img",{alt:"",className:"tablePoster",src:B})}},{title:"\u540d\u79f0",dataIndex:"name",filterDropdown:this.getFilterDropdown.bind(this),filterIcon:Object(r.jsx)(K.a,{})},{title:"\u7c7b\u578b",dataIndex:"types",render:function(e){return e.join("\uff0c")}},{title:"\u5730\u533a",dataIndex:"areas",render:function(e){return e.join("\uff0c")}},{title:"\u65f6\u957f",dataIndex:"timeLong",render:function(e){return"".concat(e,"\u5206\u949f")}},{title:"\u662f\u5426\u70ed\u6620",dataIndex:"isHot",render:function(t,n){return Object(r.jsx)(C.a,{checked:t,onChange:function(t){e.props.onSwitchChange(a.isHot,t,n._id)}})}},{title:"\u5373\u5c06\u4e0a\u6620",dataIndex:"isComing",render:function(t,n){return Object(r.jsx)(C.a,{checked:t,onChange:function(t){e.props.onSwitchChange(a.isComing,t,n._id)}})}},{title:"\u7ecf\u5178\u5f71\u7247",dataIndex:"isClassic",render:function(t,n){return Object(r.jsx)(C.a,{checked:t,onChange:function(t){e.props.onSwitchChange(a.isClassic,t,n._id)}})}},{title:"\u64cd\u4f5c",dataIndex:"_id",render:function(t){return Object(r.jsxs)("div",{children:[Object(r.jsx)(u.b,{to:"/movie/edit/".concat(t),children:Object(r.jsx)(I.a,{type:"primary",size:"small",children:"\u7f16\u8f91"})}),Object(r.jsx)(z.a,{title:"\u662f\u5426\u786e\u5b9a\u5220\u9664\u8be5\u5f71\u7247\uff1f",onConfirm:Object(v.a)(m.a.mark((function n(){return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.props.onDelete(t);case 2:x.b.success("\u5220\u9664\u6210\u529f");case 3:case"end":return n.stop()}}),n)}))),okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",children:Object(r.jsx)(I.a,{type:"text",size:"small",children:"\u5220\u9664"})})]})}}]}},{key:"getPageConfig",value:function(){return 0!==this.props.total&&{current:this.props.condition.page,pageSize:this.props.condition.limit,total:this.props.total}}},{key:"handleChange",value:function(e){this.props.onChange(e.current)}},{key:"render",value:function(){return Object(r.jsx)(T.a,{rowKey:"_id",dataSource:this.props.data,columns:this.getColumns(),pagination:this.getPageConfig(),onChange:this.handleChange.bind(this),loading:this.props.isLoading})}}]),n}(c.a.Component),G=n(140),J=n(121);function U(e,t){return{type:"movie_save",payload:{movies:e,total:t}}}function Q(e){return{type:"movie_setLoading",payload:e}}function W(e){return{type:"movie_setCondition",payload:e}}function X(e){return{type:"movie_delete",payload:e}}function Y(e,t,n){return{type:"movie_switch",payload:{type:e,newVal:t,id:n}}}var Z={saveMoviesAction:U,setLoadingAction:Q,setConditionAction:W,deleteAction:X,fetchMovie:function(e){return function(){var t=Object(v.a)(m.a.mark((function t(n,a){var r,i;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(Q(!0)),n(W(e)),r=a().movie.condition,t.next=5,V.get(r);case 5:i=t.sent,n(U(i.data,i.total)),n(Q(!1));case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},deleteMovie:function(e){return function(){var t=Object(v.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(Q(!0)),t.next=3,V.delete(e);case 3:n(X(e)),n(Q(!1));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},changeSwitch:function(e,t,n){return function(){var a=Object(v.a)(m.a.mark((function a(r){return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r(Q(!0)),r(Y(e,t,n)),a.next=4,V.edit(n,Object(J.a)({},e,t));case 4:r(Q(!1));case 5:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},changeSwitchAction:Y};var $=Object(G.b)((function(e){return e.movie}),(function(e){return{onLoad:function(){e(Z.fetchMovie({page:1,limit:10,key:""}))},onSwitchChange:function(t,n,a){e(Z.changeSwitch(t,n,a))},onDelete:function(t){return Object(v.a)(m.a.mark((function n(){return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e(Z.deleteMovie(t));case 1:case"end":return n.stop()}}),n)})))()},onChange:function(t){e(Z.fetchMovie({page:t}))},onKeyChange:function(t){e(Z.setConditionAction({key:t}))},onSearch:function(){e(Z.fetchMovie({page:1}))}}}))(E),ee=function(e){Object(h.a)(n,e);var t=Object(j.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(r.jsx)($,{})}}]),n}(c.a.Component),te=n(392),ne=n(95),ae=te.a.Header,re=te.a.Sider,ie=te.a.Content,ce=function(){return Object(r.jsx)("div",{className:"container",children:Object(r.jsxs)(te.a,{children:[Object(r.jsx)(ae,{className:"header",children:Object(r.jsx)(u.b,{to:"/",children:"\u7535\u5f71\u7ba1\u7406\u7cfb\u7edf"})}),Object(r.jsxs)(te.a,{children:[Object(r.jsx)(re,{children:Object(r.jsxs)(ne.a,{mode:"inline",theme:"dark",children:[Object(r.jsx)(ne.a.Item,{children:Object(r.jsx)(u.b,{to:"/movie",children:"\u7535\u5f71\u5217\u8868"})},"1"),Object(r.jsx)(ne.a.Item,{children:Object(r.jsx)(u.b,{to:"/movie/add",children:"\u6dfb\u52a0\u7535\u5f71"})},"2")]})}),Object(r.jsx)(ie,{children:Object(r.jsxs)("div",{className:"main",children:[Object(r.jsx)(l.a,{path:"/",component:b,exact:!0}),Object(r.jsx)(l.a,{path:"/movie",component:ee,exact:!0}),Object(r.jsx)(l.a,{path:"/movie/add",component:H}),Object(r.jsx)(l.a,{path:"/movie/edit/:id",component:R})]})})]})]})})},oe=n(92),se={data:[],condition:{page:1,limit:10,key:""},total:0,isLoading:!1,totalPage:0},ue=function(e,t){return Object(O.a)(Object(O.a)({},e),{},{data:t.payload.movies,total:t.payload.total,totalPage:Math.ceil(t.payload.total/e.condition.limit)})},le=function(e,t){var n=Object(O.a)(Object(O.a)({},e),{},{condition:Object(O.a)(Object(O.a)({},e.condition),t.payload)});return n.totalPage=Math.ceil(n.total/n.condition.limit),n},pe=function(e,t){return Object(O.a)(Object(O.a)({},e),{},{isLoading:t.payload})},de=function(e,t){return Object(O.a)(Object(O.a)({},e),{},{data:e.data.filter((function(e){return e._id!==t.payload})),total:e.total-1,totalPage:Math.ceil((e.total-1)/e.condition.limit)})},he=function(e,t){var n=e.data.find((function(e){return e._id===t.payload.id}));if(!n)return e;var a=Object(O.a)({},n);a[t.payload.type]=t.payload.newVal;var r=e.data.map((function(e){return e._id===t.payload.id?a:e}));return Object(O.a)(Object(O.a)({},e),{},{data:r})},je=Object(oe.c)({movie:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"movie_delete":return de(e,t);case"movie_save":return ue(e,t);case"movie_setCondition":return le(e,t);case"movie_setLoading":return pe(e,t);case"movie_switch":return he(e,t);default:return e}}}),be=n(208),fe=n.n(be),me=n(209),ve=Object(oe.d)(je,Object(oe.a)(me.a,fe.a)),Oe=function(){return Object(r.jsx)(G.a,{store:ve,children:Object(r.jsx)(u.a,{children:Object(r.jsx)(l.a,{path:"/",component:ce})})})};n(389);s.a.render(Object(r.jsx)(Oe,{}),document.getElementById("root"))}},[[390,1,2]]]);
//# sourceMappingURL=main.a8a078a5.chunk.js.map