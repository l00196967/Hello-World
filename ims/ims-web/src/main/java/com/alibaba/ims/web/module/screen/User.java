/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.module.screen;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.ims.dal.dao.UserDAO;
import com.alibaba.ims.dal.domain.UserDO;
import com.alibaba.ims.platform.exception.ExceptionCode;
import com.alibaba.ims.platform.exception.WebException;
import com.alibaba.ims.platform.util.Md5Util;
import com.alibaba.ims.web.vo.ActionResult;
import com.alibaba.ims.web.vo.ActionResult.ResultCode;

/**
 * 类Bank.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月5日 下午3:29:49
 */
public class User extends AbstractScreen {

    private static final Logger logger = LoggerFactory.getLogger(User.class);

    @Autowired
    private UserDAO             userDAO;

    public ActionResult<Object> doSubmit(@Param("name") String name, @Param("role") String role) {
        if (StringUtils.isBlank(name) || StringUtils.isBlank(role)) {
            return FAIL;
        }

        try {
            String[] usernames = name.split("\n");
            for (String username : usernames) {
                UserDO user = new UserDO();
                user.setName(username);
                user.setRole(role);
                user.setPwd(Md5Util.getMD5String("000000"));
                user.setCreateTime(new Date());
                userDAO.add(user);
            }
        } catch (Exception e) {
            logger.error("Add user error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }

        return SUCCESS;
    }

    public ActionResult<List<UserDO>> doQuery() {
        try {
            return new ActionResult<List<UserDO>>(ResultCode.SUCCESS, userDAO.getList(new UserDO()));
        } catch (Exception e) {
            logger.error("Query user list error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }
    }

    public ActionResult<Object> doDelete(@Param("id") Long id) {
        if (id == null || id <= 0) {
            return FAIL;
        }
        try {
            userDAO.delete(id);
            return SUCCESS;
        } catch (Exception e) {
            logger.error("Delete user error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }
    }

    public void doAdd() {

    }

    public void doList() {

    }
}
