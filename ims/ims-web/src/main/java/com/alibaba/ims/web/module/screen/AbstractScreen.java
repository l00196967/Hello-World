/*
 * Copyright 2014 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.module.screen;

import com.alibaba.ims.web.vo.ActionResult;
import com.alibaba.ims.web.vo.ActionResult.ResultCode;


/**
 * 类AbstractScreen.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2014年12月10日 下午10:08:38
 */
public abstract class AbstractScreen {

    public static final ActionResult<Object> SUCCESS = new ActionResult<Object>(ResultCode.SUCCESS);

    public static final ActionResult<Object> FAIL    = new ActionResult<Object>(ResultCode.FAIL);

}
