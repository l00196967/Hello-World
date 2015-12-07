/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.module.screen;

import java.util.LinkedHashMap;
import java.util.Map;

import com.alibaba.ims.platform.dict.DictManager;
import com.alibaba.ims.web.vo.ActionResult;
import com.alibaba.ims.web.vo.ActionResult.ResultCode;

/**
 * 系统管理
 *
 * @author randy.ly 2015年4月5日 下午12:04:32
 */
public class System extends AbstractScreen {

    /**
     * 加载系统上下文
     *
     * @return
     */
    public ActionResult<Map<String, Object>> doLoadContext() {
        Map<String, Object> context = new LinkedHashMap<String, Object>();
        context.putAll(DictManager.getAll());
        return new ActionResult<Map<String, Object>>(ResultCode.SUCCESS, context);
    }

    public void doLicence() {

    }

}
