/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.util;

import org.apache.commons.lang.StringUtils;

import com.alibaba.ims.platform.exception.ExceptionCode;
import com.alibaba.ims.platform.exception.WebException;

/**
 * 断言工具类
 *
 * @author randy.ly 2015年6月27日 下午11:16:53
 */
public class WebAssert {

    public static void notNull(Object... inputs) {
        if (inputs == null || inputs.length == 0) {
            return;
        }
        for (int i = 0; i < inputs.length; i++) {
            if (inputs[i] instanceof String) {
                if (StringUtils.isBlank((String) inputs[i])) {
                    throw new WebException(ExceptionCode.Common.PARAM_ERROR);
                }
            } else {
                if (inputs[i] == null) {
                    throw new WebException(ExceptionCode.Common.PARAM_ERROR);
                }
            }
        }
    }

    public static void isPositive(Long input) {
        if (input == null || input <= 0) {
            throw new WebException(ExceptionCode.Common.PARAM_ERROR);
        }
    }
}
