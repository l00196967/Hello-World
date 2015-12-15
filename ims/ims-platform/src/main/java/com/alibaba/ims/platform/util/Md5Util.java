package com.alibaba.ims.platform.util;

import org.apache.commons.lang.StringUtils;

import com.taobao.security.actionjs.ver.MD5;

/**
 * MD5加密
 *
 * @author randy.ly 2015年4月14日 上午10:18:45
 */
public class Md5Util {

    /**
     * 返回MD5加密字符串
     *
     * @param input
     * @return
     */
    public static String getMD5String(String input) {
        if (StringUtils.isBlank(input)) {
            return null;
        }

        return MD5.encrypt(input);
    }

    /**
     * 返回指定长度MD5字符串
     *
     * @param input
     * @param length
     * @return
     */
    public static String getMD5Substring(String input, int length) {
        String md5 = getMD5String(input);
        if (md5 == null || md5.length() < length) {
            return md5;
        }

        return md5.substring(0, length);
    }
}
