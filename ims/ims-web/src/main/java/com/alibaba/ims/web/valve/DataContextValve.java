/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.valve;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.service.pipeline.PipelineContext;
import com.alibaba.citrus.service.pipeline.support.AbstractValve;

/**
 * 设置数据上下文
 *
 * @author randy.ly 2015年4月2日 上午10:28:15
 */
public class DataContextValve extends AbstractValve {

    @Autowired
    HttpServletRequest request;

    @Override
    public void invoke(PipelineContext pipelineContext) throws Exception {

        pipelineContext.invokeNext();

    }

}
