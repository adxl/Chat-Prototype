package com.adxl.chat;

public class Response
{
    private String username;
    private String content;

    public Response()
    {
    }

    public Response(String username)
    {
        this.username=username;
    }

    public Response(String username, String content)
    {
        this.username=username;
        this.content=content;
    }

    public String getContent()
    {
        return content;
    }

    public String getUsername()
    {
        return username;
    }
}
