if (self.CavalryLogger) { CavalryLogger.start_js(["y7L4P"]); }

__d("CoverPromotionHandler",["AsyncDialog","AsyncRequest","BanzaiODS"],(function a(b,c,d,e,f,g){var h={handleChooseClick:function i(j,k){j.subscribe("itemclick",function(l,m){c("BanzaiODS").bumpEntityKey("cover_photo_upsell","choose");var n=new(c("AsyncRequest"))(m.item.getValue()).setRelativeTo(k);c("AsyncDialog").send(n,function(o){})})}};f.exports=h}),null);
__d("LinkedGroupsTooltipHandler",["EventEmitter","BasicFBNux","Run"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h,i,j="XOUT_LINKED_GROUPS_NUX";h=babelHelpers.inherits(k,c("EventEmitter"));i=h&&h.prototype;k.prototype.register=function(l,m){this.addListener(j,function(){this.showNUX(l,m)}.bind(this))};k.prototype.showNUX=function(l,m){c("Run").onAfterLoad(function(){l.show();c("BasicFBNux").onView(m);c("BasicFBNux").subscribeHide(l,m)})};k.prototype.emitXoutLinkedGroupsUpsell=function(){this.emit(j)};function k(){h.apply(this,arguments)}f.exports=new k()}),null);
__d("GroupMallContextRow",["CSS"],(function a(b,c,d,e,f,g){var h={setDismissHandler:function i(j){j.setDismissHandler(function(){c("CSS").hide(j.getRoot())})}};f.exports=h}),null);
__d("GroupsPostTagContentStrings",["fbt"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();f.exports={getSearchPostTagPlaceholder:function i(){return h._("Search for a Topic")},getPostTagNameTooltip:function i(){return h._("Topics can only contain numbers, letters and spaces.")},getNameTagPlaceholder:function i(){return h._("Name your topic...")},getCreatePostTagDialogTitle:function i(){return h._("Create a Topic for Posts")},getEditPostTagDialogTitle:function i(){return h._("Edit this Post Topic")},getDialogCancelButtonLabel:function i(){return h._("Cancel")},getDialogSaveButtonLabel:function i(){return h._("Save")},getAddPostTagInStorySubtitleNux:function i(){return h._("New! Make this post easier to find by adding topics for it.")},getCreateTagButtonLabel:function i(){return h._("Create Topic")},getPostTagPlaceholder:function i(){return h._("Choose up to 5 topics to describe this post.")},getPostTagComposerNux:function i(){return h._("Add topics to help members find the information they want.")},getPostTagComposerAddTags:function i(){return h._("Add Topics")},getPostTagComposerTooltip:function i(){return h._("Add topics to your post.")},getTagsLimitDialogText:function i(j){return h._({"*":{"s":"You can only select {composer_topics_limit} topic for a post.","p":"You can only select {composer_topics_limit} topics for a post."}},[h.param("composer_topics_limit",j,[0]),h["enum"](j===1?"s":"p",{s:" topic",p:" topics"})])},getInvalidPostTagDialogTitle:function i(){return h._("Invalid Post Topic Name")}}}),null);
__d("GroupPostTagsAddTagToPostNUXMessage.react",["AsyncRequest","GroupsPostTagContentStrings","React","XBasicFBNuxDismissController","XBasicFBNuxViewController","XUIAmbientNUX.react"],(function a(b,c,d,e,f,g){__p&&__p();var h,i,j=5293;h=babelHelpers.inherits(k,c("React").PureComponent);i=h&&h.prototype;function k(){var l,m;"use strict";for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m=(l=i.constructor).call.apply(l,[this].concat(o)),this.state={isVisible:true},this.onCloseButtonClick=function(){this.setState({isVisible:false});var q=c("XBasicFBNuxDismissController").getURIBuilder().setInt("nux_id",j).getURI();new(c("AsyncRequest"))().setURI(q).send()}.bind(this),m}k.prototype.componentDidMount=function(){"use strict";var l=c("XBasicFBNuxViewController").getURIBuilder().setInt("nux_id",j).getURI();new(c("AsyncRequest"))().setURI(l).send()};k.prototype.render=function(){"use strict";return c("React").createElement(c("XUIAmbientNUX.react"),{context:this.props.addTagComponent,onCloseButtonClick:this.onCloseButtonClick,position:"right",shown:this.state.isVisible},c("GroupsPostTagContentStrings").getAddPostTagInStorySubtitleNux())};f.exports=k}),null);
__d("GroupPostTagsAddTagToPostNUX",["csx","DOM","DOMQuery","GroupPostTagsAddTagToPostNUXMessage.react","React","ReactDOM","$"],(function a(b,c,d,e,f,g,h){"use strict";var i={showNux:function j(){var k=c("DOMQuery").scry(c("$")("pagelet_group_mall"),".addTagToPostInSubtitle");if(k!==null&&k.length>0){var l=c("DOM").create("div");c("DOM").insertAfter(c("$")("pagelet_group_mall"),l);c("ReactDOM").render(c("React").createElement(c("GroupPostTagsAddTagToPostNUXMessage.react"),{addTagComponent:k[0]}),l)}}};f.exports=i}),null);
__d("GroupsCreatePostTagDialog.react",["ix","BootloadedComponent.react","GroupsPostTagContentStrings","Image.react","JSResource","React","XUIButton.react","fbglyph"],(function a(b,c,d,e,f,g,h){__p&&__p();var i,j;i=babelHelpers.inherits(k,c("React").Component);j=i&&i.prototype;k.prototype.render=function(){"use strict";return c("React").createElement(c("BootloadedComponent.react"),{bootloadLoader:c("JSResource")("GroupsCreatePostTagDialogBootloadedComponent.react").__setRef("GroupsCreatePostTagDialog.react"),bootloadPlaceholder:c("React").createElement(c("XUIButton.react"),{label:c("GroupsPostTagContentStrings").getCreateTagButtonLabel(),image:c("React").createElement(c("Image.react"),{src:h("115408")}),disabled:true}),groupID:this.props.groupID,domID:this.props.domID})};function k(){"use strict";i.apply(this,arguments)}f.exports=k}),null);
__d("FileFormDisableInFlight",["Form"],(function a(b,c,d,e,f,g){__p&&__p();function h(i){"use strict";this._form=i}h.prototype.enable=function(){"use strict";this._subscription=this._form.subscribe(["submit","initial"],this._handle.bind(this))};h.prototype.disable=function(){"use strict";this._subscription.unsubscribe();this._subscription=null};h.prototype._handle=function(i){"use strict";if(i==="submit")setTimeout(c("Form").setDisabled.bind(null,this._form.getRoot(),true),0);else c("Form").setDisabled(this._form.getRoot(),false)};f.exports=h}),null);
__d("XUINotice",["invariant","Event"],(function a(b,c,d,e,f,g,h){__p&&__p();function i(j,k){this._root=j;this._closeButton=k}Object.assign(i.prototype,{getRoot:function j(){return this._root},isDismissable:function j(){return!!this._closeButton},setDismissHandler:function j(k){this.isDismissable()||h(0);this.removeDismissHandler();this._listener=c("Event").listen(this._closeButton,"click",k)},removeDismissHandler:function j(){this._listener&&this._listener.remove();this._listener=null},destroy:function j(){this.removeDismissHandler();this._root=null;this._closeButton=null}});f.exports=i}),null);