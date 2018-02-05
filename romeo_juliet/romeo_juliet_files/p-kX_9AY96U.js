if (self.CavalryLogger) { CavalryLogger.start_js(["TKeZ4"]); }

__d("ReactComposerFeedSurvey",["AsyncRequest","ComposerXSessionIDs"],(function a(b,c,d,e,f,g){var h="/ajax/react_composer/survey",i=999689740107123,j={onPostSucceeded:function k(l){new(c("AsyncRequest"))().setURI(h).setData({config_id:i,session_id:c("ComposerXSessionIDs").getSessionID(l),composer_id:l}).send()}};f.exports=j}),null);