/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.dal.dao;

import java.util.Date;
import java.util.List;

import com.alibaba.ims.dal.domain.BankAccountDO;
import com.alibaba.ims.dal.domain.BankRecordDO;

/**
 * 类BankAccountDAO.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月5日 下午2:19:00
 */
public interface BankDAO {

    public void addAccount(BankAccountDO account);

    public BankAccountDO getAccount(String accountId);

    public List<BankAccountDO> getAccountList(String key);

    public void updateBalance(BankAccountDO account);

    public void addRecord(BankRecordDO record);

    public List<BankRecordDO> getRecords(String account, Date from, Date to);
}
