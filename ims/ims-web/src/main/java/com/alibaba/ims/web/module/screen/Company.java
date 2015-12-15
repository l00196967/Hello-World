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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.turbine.dataresolver.Params;
import com.alibaba.ims.dal.dao.CompanyDAO;
import com.alibaba.ims.dal.domain.CompanyDO;
import com.alibaba.ims.platform.exception.ExceptionCode;
import com.alibaba.ims.platform.exception.WebException;
import com.alibaba.ims.platform.util.DateUtil;
import com.alibaba.ims.web.vo.ActionResult;
import com.alibaba.ims.web.vo.ActionResult.ResultCode;

/**
 * 类Bank.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月5日 下午3:29:49
 */
public class Company extends AbstractScreen {

    private static final Logger logger = LoggerFactory.getLogger(Company.class);

    @Autowired
    private CompanyDAO          companyDAO;

    public ActionResult<Object> doSubmit(@Params CompanyDO company) {
        try {
            company.setCreateTime(new Date());
            company.setExpireTime(DateUtil.parse(company.getExpireString(), "yyyy-MM-dd"));
            company.setRegistNo("JS00001");
            company.setTaxNo("JS00001");
            company.setCode("JS00001");
            companyDAO.add(company);
        } catch (Exception e) {
            logger.error("Add company error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }

        return SUCCESS;
    }

    public ActionResult<List<CompanyDO>> doQuery() {
        try {
            return new ActionResult<List<CompanyDO>>(ResultCode.SUCCESS, companyDAO.getList(new CompanyDO()));
        } catch (Exception e) {
            logger.error("Query company list error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }
    }

    public void doAdd() {

    }

    public void doPrint() {

    }

    public void doList() {

    }
}
