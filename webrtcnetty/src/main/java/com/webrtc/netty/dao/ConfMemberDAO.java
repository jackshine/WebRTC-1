package com.webrtc.netty.dao;

import java.util.List;

import com.free4lab.utils.sql.AbstractDAO;
import com.free4lab.utils.sql.IEntityManagerHelper;
import com.free4lab.utils.sql.entitymanager.NoCacheEntityManagerHelper;




public class ConfMemberDAO extends AbstractDAO<ConfMember>{
	@SuppressWarnings("rawtypes")
	@Override
	public Class getEntityClass() {
		return ConfMember.class;
	}

	public static final String PU_NAME = "WebrtcCSPU";
	@Override
	public String getPUName() {
		return PU_NAME;
	}
	
	

	@Override
	public IEntityManagerHelper getEntityManagerHelper() {
		return new NoCacheEntityManagerHelper();
	}
	
	public String getClassName() {
		return getEntityClass().getName();
	}
	
	public ConfMember findConfMemberByRoomIdAndMember(String id,String member ){
		List<ConfMember> ConfMemberList = findByProperty2("id", id,"member",member);
		if(ConfMemberList.isEmpty()){
			return null;
		}
		return ConfMemberList.get(0);
	}
	/*查询会议成员 add by pq 2016-3-2*/
	public List<ConfMember> findConfMemberByRoomId(String id){
		List<ConfMember> ConfMemberList = findByProperty("id",id);
		if(ConfMemberList.isEmpty()){
			return null;
		}
		return ConfMemberList;
	}

//	public static void main(String[] args){
//		ConfMemberDAO confmemberDao = new ConfMemberDAO();
//		
//		ConfMember confmember = confmemberDao.findConfMemberByRoomIdAndMember("2014","guo");
//		if(confmember != null){
//			System.out.println(confmember.getId()+ " "+confmember.getMember()+ " "+confmember.getJoinAt()+ " "+confmember.getConnId());
//		}
//	}
	
	public static void main(String[] args){
		ConfMemberDAO confmemberDao = new ConfMemberDAO();
		
		//ConfMember confmember = confmemberDao.findConfMemberByRoomIdAndMember("0uBK","1");
		List<ConfMember> confmember = confmemberDao.findConfMemberByRoomId("1aBm");
		if(confmember != null){
			//System.out.println(confmember.getId());
			System.out.println(confmember.get(0).getId()+ " "+confmember.get(0).getMember());
			System.out.println(confmember.get(1).getId()+ " "+confmember.get(1).getMember());
		}
	}
	
}
