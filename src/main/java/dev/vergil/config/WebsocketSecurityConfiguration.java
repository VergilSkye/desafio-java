package dev.vergil.config;

import dev.vergil.security.AuthoritiesConstants;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class WebsocketSecurityConfiguration extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    @Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
        messages
            .nullDestMatcher()
            .authenticated()
            .simpDestMatchers("/topic/tracker")
            .hasAuthority(AuthoritiesConstants.ADMIN)
            .simpDestMatchers("/topic/message")
            .authenticated()
            .simpDestMatchers("/topic/chat")
            .authenticated()
            .simpDestMatchers("/topic/chat/**")
            .authenticated()
            .simpDestMatchers("/topic/**")
            .authenticated()
            // message types other than MESSAGE and SUBSCRIBE
            .simpTypeMatchers(SimpMessageType.MESSAGE, SimpMessageType.SUBSCRIBE)
            .denyAll()
            // catch all
            .anyMessage()
            .denyAll();
    }

    /**
     * Disables CSRF for Websockets.
     */
    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }
}
