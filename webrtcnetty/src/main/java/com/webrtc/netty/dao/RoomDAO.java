package com.webrtc.netty.dao;

import java.util.List;


import com.free4lab.utils.sql.AbstractDAO;
import com.free4lab.utils.sql.IEntityManagerHelper;
import com.free4lab.utils.sql.entitymanager.NoCacheEntityManagerHelper;

public class RoomDAO extends AbstractDAO<Room>{
	@SuppressWarnings("rawtypes")
	@Override
	public Class getEntityClass() {
		return Room.class;
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
	
	
	/**
	 * Get the Room Object according to the roomid
	 * @param roomid of the Room
	 * @return If the Room towards the roomid exist, return the Room Object. Otherwise, return null.
	 */
	public Room findRoomByRoomId(String roomid){
		List<Room> RoomList = findByProperty("roomid", roomid);
		if(RoomList.isEmpty()){
			return null;
		}
		return RoomList.get(0);
	}
	public static void main(String[] args){
		
		RoomDAO roomDao = new RoomDAO();
		
		Room room = roomDao.findRoomByRoomId("2014");
		if(room != null){
			System.out.println(room.getRoomid()+room.getConfid()+room.getCreator()+room.getMemberNum()+room.getCreateAt()+room.getDescription()+room.getType()+room.getDuration()+room.getTheme());
		}

	}
	
}
