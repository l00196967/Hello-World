/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.vo;

import com.alibaba.ims.dal.domain.UserDO;

/**
 * 类UserVO.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月26日 下午3:18:47
 */
public class UserVO extends PageVO {

    private UserDO model = new UserDO();

    public UserDO getModel() {
        return model;
    }

    public void setModel(UserDO model) {
        this.model = model;
    }

}
