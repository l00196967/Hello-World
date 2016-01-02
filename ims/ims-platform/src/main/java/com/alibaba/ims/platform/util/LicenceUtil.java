/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.util;

import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.taobao.security.util.Base64;

/**
 * 类LicenceUtil.java的实现描述：TODO 类实现描述
 *
 * @author randy.ly 2015年12月26日 下午6:30:18
 */
public class LicenceUtil {

    private static boolean isValid = false;

    private String         licence;

    private String         code;

    public static String encode(String code, String expire) {
        return Base64.encode(code + "^" + expire, "UTF-8");
    }

    public static String decode(String input) {
        return Base64.decode(input, "UTF-8");
    }

    public boolean validLicence() {
        if (licence == null) {
            return false;
        }

        if (isValid) {
            return true;
        }

        String decode = decode(licence);
        if (StringUtils.isBlank(decode)) {
            isValid = false;
            return isValid;
        }

        isValid = DateUtil.parse(decode.split("\\^")[1], "yyy-MM-dd").after(new Date());

        return isValid;
    }

    public String getLicence() {
        return licence;
    }

    public void setLicence(String licence) {
        this.licence = licence;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
