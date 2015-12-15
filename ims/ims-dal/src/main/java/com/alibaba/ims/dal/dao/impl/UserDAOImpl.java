/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.dal.dao.impl;

import java.util.List;

import com.alibaba.ims.dal.dao.UserDAO;
import com.alibaba.ims.dal.domain.UserDO;

/**
 * 类UserDAOImpl.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月14日 下午11:09:07
 */
public class UserDAOImpl extends AbstractDAO implements UserDAO {

    @Override
    public void add(UserDO user) {
        insert("user.add", user);
    }

    @Override
    public List<UserDO> getList(UserDO user) {
        return selectList("user.get_list", user);
    }

    @Override
    public void delete(Long id) {
        delete("user.delete", id);
    }

}
