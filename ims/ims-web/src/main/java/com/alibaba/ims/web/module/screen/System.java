/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.module.screen;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.ims.dal.dao.UserDAO;
import com.alibaba.ims.dal.domain.UserDO;
import com.alibaba.ims.platform.ctx.DataContextHolder;
import com.alibaba.ims.platform.dict.DictManager;
import com.alibaba.ims.platform.exception.ExceptionCode;
import com.alibaba.ims.platform.exception.WebException;
import com.alibaba.ims.platform.util.LicenceUtil;
import com.alibaba.ims.platform.util.Md5Util;
import com.alibaba.ims.web.util.WebAssert;
import com.alibaba.ims.web.vo.ActionResult;
import com.alibaba.ims.web.vo.ActionResult.ResultCode;

/**
 * 系统管理
 *
 * @author randy.ly 2015年4月5日 下午12:04:32
 */
public class System extends AbstractScreen {

    @Autowired
    HttpServletRequest request;

    @Autowired
    private UserDAO    userDAO;

    /**
     * 加载系统上下文
     *
     * @return
     */
    public ActionResult<Map<String, Object>> doLoadContext() {
        Map<String, Object> context = new LinkedHashMap<String, Object>();
        context.putAll(DictManager.getAll());
        return new ActionResult<Map<String, Object>>(ResultCode.SUCCESS, context);
    }

    public ActionResult<Object> doSubmit(@Param("oldPwd") String oldPwd, @Param("newPwd") String pwd) {
        WebAssert.notNull(pwd);

        String loginName = DataContextHolder.getOperator(request);
        if (StringUtils.isBlank(loginName)) {
            throw new WebException(ExceptionCode.Common.LOGIN_ERROR);
        }

        UserDO user = userDAO.get(loginName);
        if (user == null) {
            throw new WebException(ExceptionCode.User.NOT_EXIST);
        }

        if (!user.getPwd().equals(Md5Util.getMD5String(oldPwd))) {
            throw new WebException(ExceptionCode.User.PWD_ERROR);
        }

        try {
            user.setPwd(Md5Util.getMD5String(pwd));
            userDAO.update(user);
        } catch (Exception e) {
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }

        return SUCCESS;
    }

    public ActionResult<Object> doGenLicence(@Param("code") String code, @Param("expire") String expire) {
        WebAssert.notNull(code, expire);

        Object encode = LicenceUtil.encode(code, expire);

        return new ActionResult<Object>(ResultCode.SUCCESS, encode);
    }

    public void doLicence() {

    }

    public void doModifyPwd() {
    }

}
