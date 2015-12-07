/*
 * Copyright 2014 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.exception;

/**
 * 异常码常量类
 *
 * @author randy.ly 2014年12月13日 下午2:58:03
 */
public interface ExceptionCode {

    interface Common {

        String PARAM_ERROR       = "参数错误";

        // 内部错误
        String INNER_ERROR       = "系统内部错误";

        // 记录已存在
        String RECORD_EXIST      = "记录 [{0}] 已存在";

        // 记录不存在
        String RECORD_NOT_EXIST  = "该记录不存在或已被删除";

        // 无权限
        String PERMISSION_DENIED = "你没有该数据的访问权限";
    }

    interface Bank {

        String ACCOUNT_NOT_EXIST = "账户不存在";

        String ACCOUNT_EXIST     = "账户已存在";

        String BALANCE_ZERO      = "账户余额不足";
    }

}
