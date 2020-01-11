package com.adxl.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;


@Controller
public class ResponseController
{

    @MessageMapping("/chatapp")
    @SendTo("/feed/response")
    public Response respond(Message message)
    {
        return new Response(HtmlUtils.htmlEscape(message.getUsername()),HtmlUtils.htmlEscape(message.getText()));
    }

}
