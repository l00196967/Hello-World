/*
 * Copyright 2014 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.vo;

import java.util.HashMap;
import java.util.Map;

/**
 * 结果类
 *
 * @author randy.ly 2014年12月10日 下午10:09:25
 */
public class ActionResult<T> {

    private int                 code;

    private String              message;

    private T                   data;

    private Integer             totalCount;

    private Map<String, Object> context;

    public ActionResult(){
    }

    public ActionResult(int code){
        this.code = code;
    }

    public ActionResult(int code, T data){
        this.code = code;
        this.setData(data);
    }

    public ActionResult(int code, String message){
        this.code = code;
        this.message = message;
    }

    public boolean isSuccess() {
        return this.code >= 0;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void seTotalCount(int count) {
        this.totalCount = count;
    }

    public Map<String, Object> getContext() {
        if (context == null) {
            context = new HashMap<String, Object>();
        }
        return context;
    }

    public static class ResultCode {

        public static final int SUCCESS = 0;

        public static final int FAIL    = -1;
    }

}
