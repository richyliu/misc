if (self.CavalryLogger) { CavalryLogger.start_js(["PMIb6"]); }

__d("AppCustomEventType",[],(function a(b,c,d,e,f,g){f.exports={FB_MOBILE_ACTIVATE_APP:"fb_mobile_activate_app",FB_MOBILE_COMPLETE_REGISTRATION:"fb_mobile_complete_registration",FB_MOBILE_CONTENT_VIEW:"fb_mobile_content_view",FB_MOBILE_SEARCH:"fb_mobile_search",FB_MOBILE_RATE:"fb_mobile_rate",FB_MOBILE_TUTORIAL_COMPLETION:"fb_mobile_tutorial_completion",FB_MOBILE_ADD_TO_CART:"fb_mobile_add_to_cart",FB_MOBILE_ADD_TO_WISHLIST:"fb_mobile_add_to_wishlist",FB_MOBILE_INITIATED_CHECKOUT:"fb_mobile_initiated_checkout",FB_MOBILE_ADD_PAYMENT_INFO:"fb_mobile_add_payment_info",FB_MOBILE_PURCHASE:"fb_mobile_purchase",FB_MOBILE_LEVEL_ACHIEVED:"fb_mobile_level_achieved",FB_MOBILE_ACHIEVEMENT_UNLOCKED:"fb_mobile_achievement_unlocked",FB_MOBILE_SPENT_CREDITS:"fb_mobile_spent_credits",FB_DIRECT_INSTALL_SUCCESS:"fb_direct_install_success",APPMANAGER_CRASH_REPORT:"appmanager_crash_report",FB_PAGE_VIEW:"fb_page_view",FB_WEB_NEW_USER:"fb_web_new_user",FB_OTHER:"fb_other",FB_MESSENGER_BOT_NEW_USER:"fb_messenger_bot_new_user",FB_MESSENGER_BOT_MESSAGE_SENT:"fb_messenger_bot_message_sent",FB_MESSENGER_BOT_MESSAGE_RECEIVED:"fb_messenger_bot_message_received",FB_MESSENGER_BOT_THREAD_DELETED:"fb_messenger_bot_thread_deleted",FB_MESSENGER_BOT_STOPPED:"fb_messenger_bot_stopped",FB_MESSENGER_BOT_STARTED:"fb_messenger_bot_started",FB_MESSENGER_BOT_POSTBACK_CALLED:"fb_messenger_bot_postback_called",FB_INSTANT_EXPERIENCES_LAUNCH:"fb_instant_experiences_launch",FB_INSTANT_EXPERIENCES_NEW_USER:"fb_instant_experiences_new_user",FB_INSTANT_ARTICLES_CTA_SIGN_UP:"fb_instant_articles_cta_sign_up",FB_INSTANT_ARTICLES_CTA_IMPRESSION:"fb_instant_articles_cta_impression",FB_INSTANT_ARTICLES_NEW_USER:"fb_instant_articles_new_user",FB_INSTANT_ARTICLES_CLICK:"fb_instant_articles_click",FB_INSTANT_GAMES_NEW_USER:"fb_instant_games_new_user",FB_INSTANT_GAMES_LAUNCH:"fb_instant_games_launch",FB_INSTANT_GAMES_UPDATE_SENT:"fb_instant_games_update_sent",FB_INSTANT_GAMES_UPDATE_CLICK:"fb_instant_games_update_click",FB_INSTANT_GAMES_BOT_MESSAGE_SEND:"fb_instant_games_bot_message_sent",FB_INSTANT_GAMES_BOT_MESSAGE_CLICK:"fb_instant_games_bot_message_click",FB_INSTANT_GAMES_SESSION_PLAY:"fb_instant_games_session_play",FB_INSTANT_GAMES_PLATFORM_EVENT:"fb_instant_games_platform_event",FB_OFFLINE_PURCHASE:"fb_offline_purchase",FB_OFFLINE_NEW_USER:"fb_offline_new_user",FB_OFFLINE_LEAD:"fb_offline_lead",FB_PAGES_POST_REACTION:"fb_pages_post_reaction",FB_PAGES_POST_COMMENT:"fb_pages_post_comment",FB_PAGES_POST_SHARE:"fb_pages_post_share",FB_PAGES_POST_ANSWER:"fb_pages_post_answer",FB_PAGES_POST_RSVP:"fb_pages_post_rsvp",FB_PAGES_PAGE_CHECKIN:"fb_pages_page_checkin",FB_PAGES_MESSAGING_THREAD_READ:"fb_pages_messaging_thread_read",FB_PAGES_MESSAGING_MESSAGE_RECEIVED:"fb_pages_messaging_message_received",FB_PAGES_MESSAGING_MESSAGE_SENT:"fb_pages_messaging_message_sent",FB_PAGES_MESSAGING_BLOCK:"fb_pages_messaging_block",FB_PAGES_MESSAGING_DELETE_THREAD:"fb_pages_messaging_delete_thread",FB_PAGES_MESSAGING_MARK_SPAM:"fb_pages_messaging_mark_spam",FB_PAGES_MESSAGING_LABEL_ADDED:"fb_pages_messaging_label_added",FB_PAGES_MESSAGING_LABEL_REMOVED:"fb_pages_messaging_label_removed",FB_PAGES_MESSAGING_NEW_CONVERSATION:"fb_pages_messaging_new_conversation",FB_PAGES_POST_VIDEO_PLAY_CLICK:"fb_pages_post_video_play_click",FB_PAGES_POST_PHOTO_VIEW_CLICK:"fb_pages_post_photo_view_click",FB_PAGES_NEW_USER:"fb_pages_new_user",FB_CAMERA_EFFECT_OPENED:"fb_camera_effect_opened",FB_CAMERA_EFFECT_SHARED:"fb_camera_effect_shared",FB_CAMERA_EFFECT_SHARE_IMPRESSION:"fb_camera_effect_share_impression",FB_CAMERA_EFFECT_TIME_SPENT:"fb_camera_effect_time_spent",FB_CAMERA_EFFECT_POST_IMPRESSION:"fb_camera_effect_post_impression",FB_CAMERA_EFFECT_CAMERA_CAPTURE:"fb_camera_effect_camera_capture",FB_VIDEO_ASSET_VIDEO_VIEW:"fb_video_asset_video_view",FB_VIDEO_ASSET_IMPRESSION:"fb_video_asset_impression",FB_VIDEO_ASSET_REACTION:"fb_video_asset_reaction",FB_VIDEO_ASSET_COMMENT:"fb_video_asset_comment",FB_VIDEO_ASSET_SHARE:"fb_video_asset_share",FB_VIDEO_POST_VIDEO_VIEW:"fb_video_post_video_view",FB_VIDEO_POST_IMPRESSION:"fb_video_post_impression",FB_VIDEO_POST_REACTION:"fb_video_post_reaction",FB_VIDEO_POST_COMMENT:"fb_video_post_comment",FB_VIDEO_POST_SHARE:"fb_video_post_share",FB_MOBILE_INSTALL:"fb_mobile_first_app_launch",FB_MOBILE_DEACTIVATE_APP:"fb_mobile_deactivate_app",FB_BASE_EVENT:"fb_base_event",FB_NEW_USER:"fb_new_user",FB_PURCHASE:"fb_purchase",FB_PAGE_MESSAGING_ACTIVE_CONVERSATION:"fb_pages_messaging_active_conversation"}}),null);
__d("FileFormResetOnSubmit",["DOMQuery","Event","emptyFunction"],(function a(b,c,d,e,f,g){__p&&__p();function h(j,k){var l=c("Event").listen(j,"change",c("emptyFunction").thatReturnsFalse,c("Event").Priority.URGENT);try{k()}catch(m){throw m}finally{l.remove()}}function i(j){"use strict";this._form=j}i.prototype.enable=function(){"use strict";var j=this._reset.bind(this);this._subscription=this._form.subscribe("submit",function(){setTimeout(j,0)})};i.prototype.disable=function(){"use strict";this._subscription.unsubscribe();this._subscription=null};i.prototype._reset=function(){"use strict";var j=this._form.getRoot();h(j,function(){var k=c("DOMQuery").scry(j,'input[type="file"]');k.forEach(function(l){l.value=""})})};f.exports=i}),null);
__d("PagesDispatcher",["ExplicitRegistrationDispatcher"],(function a(b,c,d,e,f,g){"use strict";f.exports=new(c("ExplicitRegistrationDispatcher"))({strict:false})}),null);
__d("FormSubmitOnChange",["Event","submitForm"],(function a(b,c,d,e,f,g){__p&&__p();function h(i){"use strict";this._form=i}h.prototype.enable=function(){"use strict";this._listener=c("Event").listen(this._form.getRoot(),"change",this._submit.bind(this))};h.prototype.disable=function(){"use strict";this._listener.remove();this._listener=null};h.prototype._submit=function(){"use strict";c("submitForm")(this._form.getRoot())};Object.assign(h.prototype,{_listener:null});f.exports=h}),null);
__d("ExpandableText.react",["cx","fbt","React"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j,k,l=50;function m(o,p){if(o.length>p)return o.substr(0,p).trim();return o}j=babelHelpers.inherits(n,c("React").Component);k=j&&j.prototype;function n(o){__p&&__p();k.constructor.call(this,o);this.showMore=function(p){if(!this.props.propagateEvent)p.stopPropagation();this.setState({cutoff:this.state.cutoff+this.props.grow})}.bind(this);this.showLess=function(p){if(!this.props.propagateEvent)p.stopPropagation();this.setState({cutoff:this.state.cutoff-this.props.grow})}.bind(this);this.toggleMore=function(){var p=this.state.cutoff,q=this.props,r=q.text,s=q.grow,t=this.$ExpandableText1(r);if(p<t){var u=Math.ceil((t-p)/s);this.setState({cutoff:p+s*u})}else if(p>this.props.cutoff)this.setState({cutoff:this.props.cutoff})}.bind(this);this.state={cutoff:this.props.collapsed?this.props.cutoff:this.$ExpandableText1(this.props.text)}}n.prototype.render=function(){var o=this.props,p=o.text,q=o.noMargin,r=this.state.cutoff,s=this.$ExpandableText1(p),t=this.props.TextRenderer;if(!t)t="span";return c("React").createElement("p",{className:"_4etw"+(q?" _1tcr":"")},c("React").createElement(t,null,this.$ExpandableText2(p,r)),s>r?"... ":"",c("React").createElement("a",{href:"#",title:this.props.seeMoreText,className:r>=s?"_4a6u":"",onClick:this.showMore},this.props.seeMoreText),r>this.props.cutoff&&r<s&&this.props.seeLessText!==""?" | ":" ",c("React").createElement("a",{href:"#",title:this.props.seeLessText,className:r<=this.props.cutoff?"_4a6u":"",onClick:this.showLess},this.props.seeLessText))};n.prototype.$ExpandableText1=function(o){if(!this.props.penalizeNewLine)return o.length;var p=o.split(/\r\n|\r|\n/).length,q=this.props.countFirstLine?p:Math.max(0,p-1);return l*q+o.length};n.prototype.$ExpandableText2=function(o,p){__p&&__p();if(!this.props.penalizeNewLine)return m(o,p);var q=o.split(""),r=[],s=0,t=0;while(s<p&&t<o.length){if(q[t]==="\r"||q[t]==="\n"||q[t]==="\r\n")s+=l;else s+=1;if(s<p)r.push(q[t]);t++}return r.join("").replace(/^\s+|\s+$/g,"")};n.defaultProps={text:"",cutoff:500,collapsed:true,grow:500,seeMoreText:i._("More"),seeLessText:i._("Less"),penalizeNewLine:false,countFirstLine:true,propagateEvent:true};f.exports=n}),null);
__d("ResizeListener",["EventListener","SubscriptionList","requestAnimationFrame"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h=void 0,i=false,j=new(c("SubscriptionList"))(function(){h=c("EventListener").listen(window,"resize",k)},function(){h.remove()});function k(){if(!i){i=true;c("requestAnimationFrame")(function(){j.fireCallbacks();i=false})}}f.exports=j}),null);
__d("CompositeSearchSource",["Promise","AbstractSearchSource","Set"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h,i;h=babelHelpers.inherits(j,c("AbstractSearchSource"));i=h&&h.prototype;function j(k){i.constructor.call(this);this.$CompositeSearchSource1=k}j.prototype.bootstrapImpl=function(k){var l=this.$CompositeSearchSource1.map(function(m){return new(c("Promise"))(function(n){return m.bootstrap(n)})});c("Promise").all(l).done(k)};j.prototype.searchImpl=function(k,l,m){__p&&__p();var n=this.sourceInfo(k),o=n.map(function(r){return[]}),p=n.map(function(r){return undefined}),q=function q(){};n.forEach(function(r,s){var t=r.source,u=r.substituteQueryString,v=r.entryMapper,w=r.substituteOptions;t.search(u===undefined?k:u,function(x,k,y){o[s]=v?x.map(v):x;p[s]=y;q()},w||m)});q=function(){var r=this.$CompositeSearchSource2(o),s=this.$CompositeSearchSource3(p);if(m&&m.skipCallbackOnEmptyResults&&r.length==0&&s!="COMPLETE")return;l(r,k,s)}.bind(this);q()};j.prototype.sourceInfo=function(k){return this.$CompositeSearchSource1.map(function(l){return{source:l}})};j.prototype.$CompositeSearchSource2=function(k){var l=[],m=new(c("Set"))();k.forEach(function(n){n.forEach(function(o){var p=o.getUniqueID();if(!m.has(p)){m.add(p);l.push(o)}})});return l};j.prototype.$CompositeSearchSource3=function(k){__p&&__p();for(var l=k,m=Array.isArray(l),n=0,l=m?l:l[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var o;if(m){if(n>=l.length)break;o=l[n++]}else{n=l.next();if(n.done)break;o=n.value}var p=o;if(p==="ACTIVE")return"ACTIVE";else if(p!=="COMPLETE")return undefined}return"COMPLETE"};f.exports=j}),null);