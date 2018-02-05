if (self.CavalryLogger) { CavalryLogger.start_js(["33yVE"]); }

__d("AdsCommonTargetingConstants",[],(function a(b,c,d,e,f,g){var h={TABLE_LABEL_WIDTH:160+10,DEFAULT_COMPONENT_WIDTH:400,INCLUDE_EXCLUDE_SELECTOR_WIDTH:76};f.exports=h}),null);
__d("UFIReactionsTooltipImpl.react",["cx","fbt","ActorURI","AsyncRequest","DataStore","DOM","React","ReactDOM","Tooltip","UFIReactionTypes","XUFIReactionTooltipController","emptyFunction"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j,k,l=c("React").PropTypes,m=/(\r\n|[\r\n])/,n=c("UFIReactionTypes").reactions;j=babelHelpers.inherits(o,c("React").Component);k=j&&j.prototype;function o(p,q){"use strict";k.constructor.call(this);this.$UFIReactionsTooltip1=null;this.state={container:c("DOM").create("div"),count:p.feedback.reactioncountmap[p.reaction]["default"],onMouseEnter:this.onMouseEnter.bind(this)}}o.prototype.componentDidMount=function(){"use strict";this.renderTooltip();if(this.props.active)this.loadTooltip()};o.prototype.componentWillReceiveProps=function(p){"use strict";__p&&__p();var q=p.feedback.reactioncountmap[p.reaction]["default"];if(q!==this.state.count){this.$UFIReactionsTooltip1&&this.$UFIReactionsTooltip1.abort();this.$UFIReactionsTooltip1=null;var r=c("Tooltip").isActive(c("ReactDOM").findDOMNode(this));this.renderTooltip();this.setState({count:q,onMouseEnter:r?null:this.onMouseEnter.bind(this)});if(r)this.loadTooltip()}};o.prototype.componentWillUnmount=function(){"use strict";this.$UFIReactionsTooltip1&&this.$UFIReactionsTooltip1.abort();this.$UFIReactionsTooltip1=null};o.prototype.onMouseEnter=function(){"use strict";this.setState({onMouseEnter:c("emptyFunction")});this.loadTooltip()};o.prototype.loadTooltip=function(){"use strict";var p=c("ActorURI").create(c("XUFIReactionTooltipController").getURIBuilder().setString("ft_ent_identifier",this.props.feedback.entidentifier).setEnum("reaction_type",this.props.reaction).setInt("user_count",this.props.feedback.reactioncountmap[this.props.reaction]["default"]).getURI(),this.props.feedback.actorforpost);this.$UFIReactionsTooltip1=new(c("AsyncRequest"))(p).setHandler(function(q){this.$UFIReactionsTooltip1=null;this.renderTooltip(q)}.bind(this)).setErrorHandler(function(q){this.$UFIReactionsTooltip1=null;this.renderTooltip(q)}.bind(this));this.$UFIReactionsTooltip1.send()};o.prototype.renderTooltip=function(p){"use strict";__p&&__p();var q=c("ReactDOM").findDOMNode(this),r=p?p.getPayload():null,s;if(r!==null)s=r.split(m).filter(function(u){return u!==""}).map(function(u,v){return m.test(u)?c("React").createElement("br",{key:v}):u});else if(!p||p&&!p.getError()){s=i._("Loading...");if(c("Tooltip").isActive(q))return}var t=c("React").createElement("div",null,c("React").createElement("div",{className:"_1vea"},n[this.props.reaction].display_name),s);c("ReactDOM").render(t,this.state.container,function(){var r=this;c("DataStore").set(q,"tooltip",{alignH:"center",content:r,offsetY:"-3",overflowDisplay:false,position:"above",suppress:false});c("Tooltip").isActive(q)&&c("Tooltip").show(q)})};o.prototype.render=function(){"use strict";return c("React").createElement("a",babelHelpers["extends"]({"data-hover":"tooltip",onFocus:this.state.onMouseEnter,onMouseEnter:this.state.onMouseEnter},this.props),this.props.children)};o.propTypes={active:l.bool.isRequired,feedback:l.object.isRequired,reaction:l.number.isRequired};f.exports=o}),null);