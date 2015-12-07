package com.alibaba.ims.web.valve;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.service.pipeline.PipelineContext;
import com.alibaba.citrus.service.pipeline.support.AbstractValve;

/**
 * 鉴权拦截器
 *
 * @author randy.ly 2015年3月18日 下午4:23:41
 */
public class PermissionValve extends AbstractValve {

    @Autowired
    HttpServletRequest  request;

    @Autowired
    HttpServletResponse response;

    @Override
    public void invoke(PipelineContext pipelineContext) throws Exception {
    }
}
