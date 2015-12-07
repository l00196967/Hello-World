/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.dal.dao.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.ims.dal.dao.BankDAO;
import com.alibaba.ims.dal.domain.BankAccountDO;
import com.alibaba.ims.dal.domain.BankRecordDO;

/**
 * 类BankAccountDAOImpl.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月5日 下午2:55:34
 */
public class BankDAOImpl extends AbstractDAO implements BankDAO {

    public void addAccount(BankAccountDO account) {
        insert("bank.add_account", account);
    }

    public BankAccountDO getAccount(String accountId) {
        return (BankAccountDO) selectOne("bank.get_account", accountId);
    }

    public List<BankAccountDO> getAccountList(String accountId) {
        return selectList("bank.get_accounts", accountId);
    }

    public void updateBalance(BankAccountDO account) {
        update("bank.update_balance", account);
    }

    public void addRecord(BankRecordDO record) {
        insert("bank.add_record", record);
    }

    public List<BankRecordDO> getRecords(String account, Date from, Date to) {
        Map<String, Object> cond = new HashMap<String, Object>();
        cond.put("account", account);
        cond.put("from", from);
        cond.put("to", to);

        return selectList("bank.get_records", cond);
    }
}
