/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.dal.dao.impl;

import java.util.List;

import org.mybatis.spring.support.SqlSessionDaoSupport;

/**
 * DAO公共类
 *
 * @author randy.ly 2015年5月21日 下午8:38:50
 */
public abstract class AbstractDAO extends SqlSessionDaoSupport {

    public Object selectOne(String statement, Object param) {
        return getSqlSession().selectOne(statement, param);
    }

    public Object selectList(String statement) {
        return getSqlSession().selectList(statement);
    }

    public <E> List<E> selectList(String statement, Object param) {
        return getSqlSession().selectList(statement, param);
    }

    public Object insert(String statement, Object param) {
        return getSqlSession().insert(statement, param);
    }

    public int update(String statement, Object param) {
        return getSqlSession().update(statement, param);
    }

    public int delete(String statement, Object param) {
        return getSqlSession().delete(statement, param);
    }
}
