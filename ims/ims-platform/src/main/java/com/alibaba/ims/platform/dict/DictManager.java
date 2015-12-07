/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.dict;

import java.util.Enumeration;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import com.alibaba.citrus.util.StringUtil;

/**
 * 数据字典服务类
 *
 * @author randy.ly 2015年6月10日 下午2:16:41
 */
public class DictManager {

    private static final Logger      logger  = LoggerFactory.getLogger(DictManager.class);

    private static final Pattern     PATTERN = Pattern.compile("([\\w-]+)");

    private static final DictElement ROOT    = new DictElement();

    public static void init() {
        Resource resource = null;
        try {
            resource = new PathMatchingResourcePatternResolver().getResources("classpath:conf/dict.properties")[0];
            LinkedProperties properties = new LinkedProperties();
            properties.load(resource.getInputStream());

            for (Enumeration<Object> e = properties.keys(); e.hasMoreElements();) {
                String key = (String) e.nextElement();
                put(key, properties.getProperty(key));
            }
        } catch (Exception e) {
            logger.error("Init data dict error.", e);
        } finally {
        }
    }

    /**
     * 新增字典
     *
     * @param key
     * @param value
     */
    public static void put(String key, String value) {
        if (StringUtils.isBlank(key)) {
            return;
        }
        getElement(key, true).setValue(value);
    }

    /**
     * 获取字典值
     *
     * @param key
     * @return
     */
    public static String get(String key) {
        if (StringUtils.isBlank(key)) {
            return null;
        }
        DictElement element = getElement(key, false);
        return element == null ? null : element.getValue();
    }

    /**
     * 返回所有字典配置
     *
     * @return
     */
    public static Map<String, Object> getAll() {
        return ROOT.asMap();
    }

    private static DictElement getElement(String key, boolean autoAppend) {
        Matcher matcher = PATTERN.matcher(key);
        DictElement current = ROOT;
        DictElement child = null;
        while (matcher.find()) {
            String segment = matcher.group(1);
            if (StringUtil.isBlank(segment)) {
                break;
            }
            child = current.getChild(segment);
            if (child == null) {
                if (autoAppend) {
                    child = new DictElement(segment);
                    current.addChild(child);
                } else {
                    return null;
                }
            }
            current = child;
        }

        return current;
    }
}
