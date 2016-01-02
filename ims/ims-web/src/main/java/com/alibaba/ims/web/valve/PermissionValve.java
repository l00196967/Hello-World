package com.alibaba.ims.web.valve;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.citrus.service.pipeline.PipelineContext;
import com.alibaba.citrus.service.pipeline.support.AbstractValve;
import com.alibaba.ims.platform.ctx.DataContextHolder;
import com.alibaba.ims.platform.exception.PermissionException;
import com.alibaba.ims.platform.util.LicenceUtil;

/**
 * 鉴权拦截器
 *
 * @author randy.ly 2015年3月18日 下午4:23:41
 */
public class PermissionValve extends AbstractValve {

    @Autowired
    HttpServletRequest          request;

    @Autowired
    HttpServletResponse         response;

    @Autowired
    private LicenceUtil         licenceUtil;

    private static List<String> WHITE_LIST = new ArrayList<String>();

    static {
        WHITE_LIST.add("/");
        WHITE_LIST.add("/index.htm");
        WHITE_LIST.add("/login.json");
        WHITE_LIST.add("/system/loadContext.json");
    }

    @Override
    public void invoke(PipelineContext pipelineContext) throws Exception {
        // Licence校验
        if (!licenceUtil.validLicence()) {
            throw new PermissionException();
        }

        // 登录校验
        String requestURI = request.getServletPath();
        for (String url : WHITE_LIST) {
            if (url.equals(requestURI)) {
                pipelineContext.invokeNext();
                return;
            }
        }

        if (DataContextHolder.getOperator(request) == null) {
            throw new PermissionException();
        }
        pipelineContext.invokeNext();
    }
}
