/**
 * add by yck
 * 前端与自动总机的会话消息交互
 */
var eid = 0; //企业id号
var sessionID = ""; //等待createAutoSession后产生
var userName = "";
var from = "";
var to = "AUTO";
var lastmenu = com.webrtc.protocol.RTCAutoSessionCurMenu["UNKNOWN"]; //菜单初始状态
var MessagePrefix = "Msg";

//首次与自动总机会话（初次进入，或点击进入自动总机会话的时候）
var createAutoSession = function()
{   
	//创建自动总机会话session
	sessionID = guid(); //生成会话标识
	var autoUserSession = new com.webrtc.AutoUserSession();
	var userSessionBase = new com.webrtc.WUserSessionBase();
	
	autoUserSession.calleeName = to;
	autoUserSession.init(onResponse);
	
	$.extend( true, autoUserSession,userSessionBase);
	autoUserSession.setSessionID(sessionID);
	com.webrtc.app.AddSession(autoUserSession);
	
	var autoMsg = new com.webrtc.protocol.RTCAutoMessage(com.webrtc.protocol.RTCMsgType["autoswitchboard"],from,to,com.webrtc.protocol.RTCAutoSessionState["begin"],"hello", sessionID,eid); 
	com.webrtc.app.usersessionlist[sessionID].SendMessage(autoMsg);	
};

//发送消息访问自动总机（用户输入真实姓名）
var sendQuestionToAuto = function(question)
{
	$inputbox = $('#input_box');
	$inputbox.focus();
	
	if(question != "")
	{
		$inputbox.val(""); //清空输入框文本
		showChatMe(question);//显示我的气泡

		if(lastmenu == com.webrtc.protocol.RTCAutoSessionCurMenu["QUERYBYKEYWORD"]
		|| lastmenu == com.webrtc.protocol.RTCAutoSessionCurMenu["QUERYBYUSERNAME"]) //是按关键字查找  or 按账号查找 时才发送给后台自动总机
		{
			var autoMsg = new com.webrtc.protocol.RTCAutoMessage(com.webrtc.protocol.RTCMsgType["autoswitchboard"],from,to,com.webrtc.protocol.RTCAutoSessionState["chat"],question, sessionID,eid); 
			com.webrtc.app.usersessionlist[sessionID].SendMessage(autoMsg);
		}
	}
};

//发送特殊符号访问自动总机（用户点击链接）
var sendSignalToAuto = function(signal,question)
{
	//显示我的气泡
	showChatMe(question);
	
	var autoMsg = new com.webrtc.protocol.RTCAutoMessage(com.webrtc.protocol.RTCMsgType["autoswitchboard"],from,to,com.webrtc.protocol.RTCAutoSessionState["chat"],signal, sessionID,eid); 
	com.webrtc.app.usersessionlist[sessionID].SendMessage(autoMsg);
}

//结束会话（点击小叉）
var endAutoSession = function()
{
    if(true == com.webrtc.app.isExistSession(sessionID))
    {
    	//通知自动总机客户端删除session，并返回感谢词
    	var autoMsg = new com.webrtc.protocol.RTCAutoMessage(com.webrtc.protocol.RTCMsgType["autoswitchboard"],from,to,com.webrtc.protocol.RTCAutoSessionState["end"],'', sessionID,eid); 
		com.webrtc.app.usersessionlist[sessionID].SendMessage(autoMsg);
		
	    //对话框消失
	    $('.switchboard_box').remove();
	    
	    //删除AUTO类型会话sessionID
		com.webrtc.app.usersessionlist[sessionID].HangUp("AUTO");
	    
	    //感谢词
	    $.fillTipBox({type:'info', icon:'glyphicon-info-sign', content:"感谢您的使用，欢迎下次再来"});
	    
	    lastmenu = com.webrtc.protocol.RTCAutoSessionCurMenu["UNKNOWN"];//恢复状态标记
    }
    else
    {
        console.log("UserSession do not exist!");
    }
};

////点击呼叫，弹出与用户chatFriendId的聊天框
//var callUser = function(chatFriendId){
//	
//	//判断chatFriendId窗口是否已经存在
//	if(getChatWindowDiv(chatFriendId) == null) //不存在
//		$("body").append(createChatWindow(chatFriendId));//弹出对话框
//}
//
////关闭聊天对话框
//var exitChatWindow = function(chatFriendId){
//	$(document.getElementById( MessagePrefix + chatFriendId)).remove();
//};

//挂断视频（点击小叉关闭）
var HangUpvideo = function(gRemoteUserID,SessionID)
{
    if(true == com.webrtc.app.isExistSession(SessionID))
    {
        com.webrtc.app.usersessionlist[SessionID].HangUp(gRemoteUserID,com.webrtc.UserSession.MODULE_TYPE.VIDEO);
    }
    else
    {
        console.log("UserSession do not exist!");
    }
};

//挂断音频（点击小叉关闭）
var HangUpaudio = function(gRemoteUserID,SessionID)
{
    if(true == com.webrtc.app.isExistSession(SessionID))
    {
        com.webrtc.app.usersessionlist[SessionID].HangUp(gRemoteUserID,com.webrtc.UserSession.MODULE_TYPE.AUDIO);
    }
    else
    {
        console.log("UserSession do not exist!");
    }
};