package com.ssafy.proma.model.dto.chat;

import com.ssafy.proma.model.dto.chat.ChatMessageDto.ChatMessageListRes;
import com.ssafy.proma.model.entity.chat.TeamChatRoom;
import com.ssafy.proma.model.entity.team.Team;
import java.util.List;
import lombok.Getter;

public class TeamChatRoomDto {

  public static TeamChatRoom toEntity(Team team) {
    return TeamChatRoom.builder().team(team).build();
  }

  @Getter
  public static class TeamChatRoomRes {
    Integer roomNo;
    List<ChatMessageListRes> messageList;

    public TeamChatRoomRes(Integer roomNo, List<ChatMessageListRes> messageList) {
      this.roomNo = roomNo;
      this.messageList = messageList;
    }
  }

}