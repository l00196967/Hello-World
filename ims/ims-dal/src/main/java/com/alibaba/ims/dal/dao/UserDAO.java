/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.dal.dao;

import java.util.List;

import com.alibaba.ims.dal.domain.UserDO;

/**
 * 类UserDAO.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月14日 下午11:08:12
 */
public interface UserDAO {

    public void add(UserDO user);

    public List<UserDO> getList(UserDO user);

    public void delete(Long id);
}
