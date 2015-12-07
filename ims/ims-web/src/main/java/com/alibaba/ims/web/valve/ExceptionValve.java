/*
 * Copyright 2014 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.valve;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.service.pipeline.PipelineContext;
import com.alibaba.citrus.service.pipeline.support.AbstractValve;
import com.alibaba.ims.platform.exception.ExceptionCode;
import com.alibaba.ims.platform.exception.WebException;

/**
 * 统一异常处理类
 *
 * @author randy.ly 2014年12月11日 上午10:53:10
 */
public class ExceptionValve extends AbstractValve {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionValve.class);

    @Autowired
    HttpServletResponse         response;

    @Override
    public void invoke(PipelineContext pipelineContext) throws Exception {
        try {
            pipelineContext.invokeNext();
        } catch (Exception e) {
            response.setStatus(HttpStatus.SC_INTERNAL_SERVER_ERROR);
            logger.error(e.getMessage(), e);
            try {
                Throwable cause = e.getCause().getCause().getCause();
                if (cause instanceof WebException) {
                    response.getWriter().write(((WebException) cause).getMessage());
                } else {
                    response.getWriter().write(ExceptionCode.Common.INNER_ERROR);
                }
            } catch (NullPointerException ne) {
                response.getWriter().write(ExceptionCode.Common.INNER_ERROR);
            }
        }
    }
}
