/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.ctx;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * 数据上下文
 *
 * @author randy.ly 2015年6月28日 上午10:23:31
 */
public class DataContextHolder {

    private static final ThreadLocal<Map<String, Object>> CONTEXT      = new ThreadLocal<Map<String, Object>>();

    private static final String                           CUR_OPERATOR = "cur_operator";

    private static final String                           CUR_ROLE     = "cur_role";

    public static Map<String, Object> getContext() {
        Map<String, Object> attrMap = CONTEXT.get();
        if (attrMap == null) {
            attrMap = new HashMap<String, Object>();
            CONTEXT.set(attrMap);
        }
        return attrMap;
    }

    /**
     * 设置当前登录用户
     *
     * @param request
     */
    public static void setOperator(HttpServletRequest request, String operator) {
        request.getSession().setAttribute(CUR_OPERATOR, operator);
    }

    public static String getOperator(HttpServletRequest request) {
        return (String) request.getSession().getAttribute(CUR_OPERATOR);
    }

    /**
     * 设置当前操作权限名称
     *
     * @param name
     */
    public static void setRole(HttpServletRequest request, String role) {
        request.getSession().setAttribute(CUR_ROLE, role);
    }

    /**
     * 获取当前操作权限名称
     *
     * @return
     */
    public static String getRole(HttpServletRequest request) {
        return (String) request.getSession().getAttribute(CUR_ROLE);
    }

}
