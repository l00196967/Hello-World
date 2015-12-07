/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 日期工具类
 *
 * @author randy.ly 2015年4月6日 上午8:51:09
 */
public class DateUtil {

    private static final Logger logger = LoggerFactory.getLogger(DateUtil.class);

    /**
     * 日期格式化
     *
     * @param date
     * @return
     */
    public static String format(Date date) {
        if (date == null) {
            return "";
        }
        return DateFormatUtils.format(date, "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 指定格式
     *
     * @param date
     * @param pattern
     * @return
     */
    public static String format(Date date, String pattern) {
        if (date == null) {
            return "";
        }
        return DateFormatUtils.format(date, pattern);
    }

    /**
     * 解析日期
     *
     * @param dateStr
     * @param pattern
     * @return
     */
    public static Date parse(String dateStr, String pattern) {
        if (StringUtils.isBlank(dateStr)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        try {
            return simpleDateFormat.parse(dateStr);
        } catch (ParseException e) {
            logger.error("Parse string to date error.", e);
            return null;
        }
    }

    /**
     * 解析日期
     *
     * @param dateStr
     * @return
     */
    public static Date parse(String dateStr) {
        if (StringUtils.isBlank(dateStr)) {
            return null;
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            return simpleDateFormat.parse(dateStr);
        } catch (ParseException e) {
            logger.error("Parse string to date error.", e);
            return null;
        }
    }

    /**
     * 返回指定天数后的日期
     *
     * @param day
     * @return
     */
    public static Date addDay(int amount) {
        return DateUtils.addDays(new Date(), amount);
    }

    /**
     * 与当前日期相差天数
     *
     * @param date
     * @return
     */
    public static long minus(Date date) {
        if (date == null) {
            return Long.MAX_VALUE;
        }
        return ((date.getTime() - System.currentTimeMillis() - 1) / DateUtils.MILLIS_PER_DAY) + 1;
    }

    /**
     * 日期相差天数
     *
     * @param date1
     * @param date2
     * @return
     */
    public static long minus(Date date1, Date date2) {
        if (date1 == null || date2 == null) {
            return Long.MAX_VALUE;
        }
        return ((date1.getTime() - date2.getTime() - 1) / DateUtils.MILLIS_PER_DAY) + 1;
    }

    /**
     * 获取UTC时间
     *
     * @return
     */
    public static long getUTCTimeInMillis() {
        Calendar cal = Calendar.getInstance();
        return cal.getTimeInMillis() - cal.get(Calendar.ZONE_OFFSET);
    }

}
