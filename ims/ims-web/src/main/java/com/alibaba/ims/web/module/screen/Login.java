/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.module.screen;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.ims.dal.dao.UserDAO;
import com.alibaba.ims.dal.domain.UserDO;
import com.alibaba.ims.platform.ctx.DataContextHolder;
import com.alibaba.ims.platform.util.Md5Util;
import com.alibaba.ims.web.util.WebAssert;
import com.alibaba.ims.web.vo.ActionResult;

/**
 * 类Logoin.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月26日 下午4:14:16
 */
public class Login extends AbstractScreen {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UserDAO            userDAO;

    public ActionResult<Object> execute(@Param("name") String name, @Param("pwd") String pwd) {
        WebAssert.notNull(name);
        WebAssert.notNull(pwd);

        UserDO user = userDAO.get(name);
        if (user == null || !user.getPwd().equals(Md5Util.getMD5String(pwd))) {
            return FAIL;
        }

        DataContextHolder.setOperator(request, user.getName());
        DataContextHolder.setRole(request, user.getRole());

        return SUCCESS;
    }

    public static void main(String[] args) {
        java.lang.System.out.println(Md5Util.getMD5String("000000"));
    }
}
