/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.module.screen;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.citrus.turbine.dataresolver.Params;
import com.alibaba.ims.dal.dao.BankDAO;
import com.alibaba.ims.dal.domain.BankAccountDO;
import com.alibaba.ims.dal.domain.BankRecordDO;
import com.alibaba.ims.platform.dict.DictManager;
import com.alibaba.ims.platform.exception.ExceptionCode;
import com.alibaba.ims.platform.exception.WebException;
import com.alibaba.ims.platform.util.DateUtil;
import com.alibaba.ims.platform.util.ExcelUtil;
import com.alibaba.ims.web.Constants;
import com.alibaba.ims.web.vo.ActionResult;
import com.alibaba.ims.web.vo.ActionResult.ResultCode;

/**
 * 类Bank.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月5日 下午3:29:49
 */
public class Bank extends AbstractScreen {

    private static final Logger logger = LoggerFactory.getLogger(Bank.class);

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BankDAO             bankDAO;

    public ActionResult<Object> doAddAccount(@Params BankAccountDO account) {
        BankAccountDO exist = bankDAO.getAccount(account.getAccount());
        if (exist != null) {
            throw new WebException(ExceptionCode.Bank.ACCOUNT_EXIST);
        }
        account.setCreateTime(new Date());

        try {
            bankDAO.addAccount(account);
        } catch (Exception e) {
            logger.error("Add bank account error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }

        return SUCCESS;
    }

    public ActionResult<List<BankAccountDO>> doQueryAccount(@Param("text") String text) {
        try {
            return new ActionResult<List<BankAccountDO>>(ResultCode.SUCCESS, bankDAO.getAccountList(text));
        } catch (Exception e) {
            logger.error("Query account list error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }
    }

    public ActionResult<Object> doSavingSubmit(@Params BankRecordDO record) {
        BankAccountDO account = bankDAO.getAccount(record.getAccount());
        if (account == null) {
            throw new WebException(ExceptionCode.Bank.ACCOUNT_NOT_EXIST);
        }

        double balance = 0;
        if (Constants.opType.CUN.equals(record.getOpType())) {
            balance = account.getBalance() + record.getAmount();
        } else {
            balance = account.getBalance() - record.getAmount();
            if (balance < 0) {
                throw new WebException(ExceptionCode.Bank.BALANCE_ZERO);
            }
        }
        record.setBalance(balance);
        record.setOpTime(new Date());
        account.setBalance(balance);

        try {
            bankDAO.addRecord(record);
            bankDAO.updateBalance(account);
        } catch (Exception e) {
            logger.error("Save operation error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }

        return SUCCESS;
    }

    public ActionResult<List<BankRecordDO>> doQueryRecords(@Param("account") String account, @Param("from") Date from,
                                                           @Param("to") Date to) {
        try {
            List<BankRecordDO> records = bankDAO.getRecords(account, from, to);
            return new ActionResult<List<BankRecordDO>>(ResultCode.SUCCESS, records);
        } catch (Exception e) {
            logger.error("Query record list.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }
    }

    public void doDownload(@Param("account") String account, @Param("from") Date from, @Param("to") Date to) {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); // 设置响应类型 xslx
        try {
            response.setHeader("Content-Disposition", "inline; filename=" + URLEncoder.encode("对账单.xlsx", "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            logger.error("Cannot set download file name.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        }

        File file = null;
        try {
            file = generateExcel(bankDAO.getRecords(account, from, to));
            IOUtils.copy(new FileInputStream(file), response.getOutputStream());
        } catch (Exception e) {
            logger.error("Download records file error.", e);
            throw new WebException(ExceptionCode.Common.INNER_ERROR);
        } finally {
            if (file != null) {
                FileUtils.deleteQuietly(file);
            }
        }
    }

    private File generateExcel(List<BankRecordDO> records) throws IOException {
        List<List<String>> rows = new ArrayList<List<String>>();

        List<String> header = new ArrayList<String>();
        header.add("交易日期");
        header.add("业务类型");
        header.add("金额");
        header.add("余额");
        rows.add(header);

        for (BankRecordDO record : records) {
            List<String> row = new ArrayList<String>();
            row.add(DateUtil.format(record.getOpTime()));
            row.add(DictManager.get("op_type." + record.getOpType()));
            row.add(String.valueOf(record.getAmount()));
            row.add(String.valueOf(record.getBalance()));
            rows.add(row);
        }

        return ExcelUtil.Write(rows, null, null);
    }

    public void doAdd() {

    }

    public void doSaving() {

    }

    public void doStatement() {

    }

    public void doPrinta() {

    }

    public void doPrintb() {

    }
}
