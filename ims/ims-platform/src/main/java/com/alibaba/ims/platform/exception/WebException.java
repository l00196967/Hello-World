/*
 * Copyright 2014 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.exception;

import java.text.MessageFormat;

import org.apache.commons.lang.StringUtils;

/**
 * 统一异常类
 *
 * @author randy.ly 2014年12月6日 下午3:31:28
 */
public class WebException extends RuntimeException {

    private static final long serialVersionUID = -4679602727805199556L;

    private String            message;

    public WebException(){
    }

    public WebException(String message, Throwable cause){
        super(message, cause);
        this.message = message;
    }

    public WebException(String message){
        super(message);
        this.message = message;
    }

    public WebException(Throwable cause){
        super(cause);
    }

    public WebException(String message, Object... params){
        if (StringUtils.isBlank(message)) {
            return;
        }
        this.message = MessageFormat.format(message, params);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
