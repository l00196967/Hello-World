/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.util;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.ims.platform.ctx.DataContextHolder;

/**
 * 类PageUtil.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2016年1月1日 下午7:28:04
 */
public class PageUtil {

    @Autowired
    private HttpServletRequest request;

    public String getLoginName() {
        return DataContextHolder.getOperator(request);
    }

    public String getRole() {
        return DataContextHolder.getRole(request);
    }
}
