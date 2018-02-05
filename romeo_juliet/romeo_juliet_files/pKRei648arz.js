if (self.CavalryLogger) { CavalryLogger.start_js(["o8X1q"]); }

__d("OGIconEntryGrouper",["OGComposerIconPickerConfig"],(function a(b,c,d,e,f,g){__p&&__p();var h={getSortedGroupedEntries:function i(j,k){var l={};j.forEach(function(m){var n=m.getType();l[n]=l[n]||{entries:[]};l[n].entries.push(m)});return this._getCategoryOrdering(k).filter(function(m){return m in l}).map(function(m){return{entries:l[m].entries,typeID:m,typeName:c("OGComposerIconPickerConfig").TranslatedCategoryNames[m]}})},_getCategoryOrdering:function i(j){var k=c("OGComposerIconPickerConfig").ActionDefaultCategory[j]||c("OGComposerIconPickerConfig").DefaultCategory,l=c("OGComposerIconPickerConfig").OrderedCategories.slice(0),m=[null];l.forEach(function(n){if(n==k)m[0]=n;else m.push(n)});return m}};f.exports=h}),null);
__d("OGIconTypeaheadRenderer.react",["cx","DOM","DOMContainer.react","Image.react","OGIconEntryGrouper","React","SearchableEntry","ShimButton.react"],(function a(b,c,d,e,f,g,h){__p&&__p();var i,j,k,l,m,n,o=c("React").PropTypes;i=babelHelpers.inherits(p,c("React").Component);j=i&&i.prototype;function p(){var s,t;"use strict";for(var u=arguments.length,v=Array(u),w=0;w<u;w++)v[w]=arguments[w];return t=(s=j.constructor).call.apply(s,[this].concat(v)),this.$OGIconTypeaheadRenderer1=function(x,event){if(this.props.onSelect)this.props.onSelect(x,event)}.bind(this),t}p.prototype.render=function(){"use strict";var s;if(!this.props.queryString)s=c("OGIconEntryGrouper").getSortedGroupedEntries(this.props.entries,this.props.actionTypeID);else s=[{entries:this.props.entries}];return c("React").createElement("div",{className:"_v0d"},s.map(function(t,u){return c("React").createElement(r,{entryGroup:t,key:u,onEntryClick:this.$OGIconTypeaheadRenderer1,selectedEntry:this.props.selectedEntry})}.bind(this)))};p.propTypes={actionTypeID:o.number,entries:o.array.isRequired,selectedEntry:o.instanceOf(c("SearchableEntry")),onSelect:o.func};k=babelHelpers.inherits(q,c("React").Component);l=k&&k.prototype;function q(){var s,t;"use strict";for(var u=arguments.length,v=Array(u),w=0;w<u;w++)v[w]=arguments[w];return t=(s=l.constructor).call.apply(s,[this].concat(v)),this.$IconView1=function(x,y){return(x&&x.getUniqueID())==(y&&y.getUniqueID())},t}q.prototype.shouldComponentUpdate=function(s){"use strict";return!this.$IconView1(s.entry,this.props.entry)||this.$IconView1(s.selectedEntry,s.entry)||this.$IconView1(this.props.selectedEntry,this.props.entry)};q.prototype.render=function(){"use strict";var s=this.props.entry,t=this.props.selectedEntry,u=s.getAuxiliaryData().name||s.getTitle();return c("React").createElement(c("ShimButton.react"),{"aria-label":u,className:"_v08"+(t&&t.getUniqueID()==s.getUniqueID()?" _3dms":""),onClick:function(event){return this.props.onClick(s,event)}.bind(this)},c("React").createElement(c("Image.react"),{src:s.getAuxiliaryData().ix}))};q.propTypes={entry:o.instanceOf(c("SearchableEntry")).isRequired,onClick:o.func.isRequired,selectedEntry:o.instanceOf(c("SearchableEntry"))};m=babelHelpers.inherits(r,c("React").Component);n=m&&m.prototype;r.prototype.render=function(){"use strict";var s=this.props.entryGroup,t=s.entries.map(function(w,x){return c("React").createElement(q,{entry:w,key:x,onClick:this.props.onEntryClick,selectedEntry:this.props.selectedEntry})}.bind(this)),u=null;if(s.typeName){var v="_v0a _50f5";u=c("React").createElement(c("DOMContainer.react"),null,c("DOM").create("div",{className:v},s.typeName))}return c("React").createElement("div",{className:"_v0b clearfix"},u,c("React").createElement("div",{className:"_v0c"},t))};function r(){"use strict";m.apply(this,arguments)}r.propTypes={entryGroup:o.shape({entries:o.arrayOf(o.instanceOf(c("SearchableEntry"))).isRequired,typeID:o.string,typeName:o.object}).isRequired,onEntryClick:o.func.isRequired,selectedEntry:o.instanceOf(c("SearchableEntry"))};f.exports=p}),null);
__d("OGIconGridTypeahead.react",["cx","fbt","AbstractTypeahead.react","OGIconTypeaheadRenderer.react","React","XUISpinner.react"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=c("React").PropTypes,k=200,l=c("React").createClass({displayName:"OGIconGridTypeahead",_presenter:c("OGIconTypeaheadRenderer.react"),propTypes:{actionTypeID:j.number,placeholder:j.string,searchSource:j.object.isRequired,onSelect:j.func.isRequired},getDefaultProps:function m(){return{placeholder:i._("Search")}},getInitialState:function m(){return{hasLoadedEntries:false,queryString:"",selectedEntry:null}},focus:function m(){this.refs.typeahead.focusInput()},_onSelect:function m(n){this.setState({queryString:"",selectedEntry:n});this.props.onSelect(n)},_onInputChange:function m(event){var n={queryString:event.target.value};this.setState(n)},render:function m(){var n={ViewRenderer:c("OGIconTypeaheadRenderer.react"),maxEntries:k,extraRendererProps:{actionTypeID:this.props.actionTypeID,selectedEntry:this.state.selectedEntry}},o=null;if(!this.state.hasLoadedEntries)o=c("React").createElement("div",{className:"_5a9d"},c("React").createElement(c("XUISpinner.react"),{size:"large"}));return c("React").createElement("div",null,c("React").createElement(c("AbstractTypeahead.react"),{ref:"typeahead",hideViewWithEntries:false,inputClassName:"_s4t",placeholder:this.props.placeholder,presenter:n,queryString:this.state.queryString,showEntriesOnFocus:true,searchSource:this.props.searchSource,selectedEntry:this.state.selectedEntry,onEntriesFound:this._reflectFoundEntries,onSelectAttempt:this._onSelect,onChange:this._onInputChange,focusedOnInit:true}),o)},_reflectFoundEntries:function m(){if(!this.state.hasLoadedEntries)this.setState({hasLoadedEntries:true})}});f.exports=l}),null);
__d("OGIconPopoverHook",["cx","Arbiter","Banzai","Event","Image.react","OGIconGridTypeahead.react","React","ReactDOM"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j,k){"use strict";__p&&__p();this.$OGIconPopoverHook1=k.dialog;this.$OGIconPopoverHook2=k.triggerElement;this.$OGIconPopoverHook3=k.actionTypeID;this.$OGIconPopoverHook4=k.targetName;var l=c("ReactDOM").render(c("React").createElement(c("OGIconGridTypeahead.react"),{searchSource:k.searchSource,onSelect:this.$OGIconPopoverHook5.bind(this),actionTypeID:k.actionTypeID}),j);c("Event").listen(k.triggerElement,"click",function(m){this.$OGIconPopoverHook1.show()}.bind(this));k.dialog.subscribe("show",function(){c("Arbiter").inform("composer/ogIconPickerOpened",{action_type_id:this.$OGIconPopoverHook3});l.focus()}.bind(this));if(k.preopen)k.dialog.show()}i.prototype.$OGIconPopoverHook5=function(j){"use strict";var k=j.getAuxiliaryData().preview_ix||j.getAuxiliaryData().ix,l=c("React").createElement(c("Image.react"),{src:k,className:"_agk"});c("ReactDOM").render(l,this.$OGIconPopoverHook2);c("Arbiter").inform("composer/ogCustomIconSelected",{icon_id:j.getUniqueID(),iconURI:k.uri,action_type_id:this.$OGIconPopoverHook3,triggerElement:this.$OGIconPopoverHook2,targetName:this.$OGIconPopoverHook4});c("Banzai").post("composer_waterfall",{session_id:this.$OGIconPopoverHook6,icon_id:j.getUniqueID(),action_type_id:this.$OGIconPopoverHook3});this.$OGIconPopoverHook1.hide()};f.exports=i}),null);