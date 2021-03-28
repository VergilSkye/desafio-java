package dev.vergil.web.websocket;

import static dev.vergil.config.WebsocketConfiguration.IP_ADDRESS;

import dev.vergil.security.SecurityUtils;
import dev.vergil.web.websocket.dto.MessageDTO;
import java.security.Principal;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

/**
 * ChatService
 */

@Controller
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final SimpMessageSendingOperations messagingTemplate;

    public ChatService(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @SubscribeMapping("/chat/all")
    public void subscribe(StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        String login = SecurityUtils.getCurrentUserLogin().orElse("anonymoususer");
        String ipAddress = stompHeaderAccessor.getSessionAttributes().get(IP_ADDRESS).toString();
        log.debug("User {} subscribed to Chat from IP {}", login, ipAddress);
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setUserLogin("System");
        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
        messageDTO.setMessage(login + " joined the chat");
        messagingTemplate.convertAndSend("/chat/all", messageDTO);
    }

    @MessageMapping("/chat")
    @SendTo("/chat/all")
    public MessageDTO sendChat(@Payload MessageDTO messageDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        messageDTO.setUserLogin(principal.getName());
        return setupMessageDTO(messageDTO, stompHeaderAccessor, principal);
    }

    private MessageDTO setupMessageDTO(MessageDTO messageDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        messageDTO.setTime(dateTimeFormatter.format(ZonedDateTime.now()));
        log.debug("Sending user chat data {}", messageDTO);
        return messageDTO;
    }
}
