/*
 * Copyright 2014 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.dict;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * 有序的Properties
 *
 * @author randy.ly 2014年12月11日 下午7:19:07
 */
public class LinkedProperties extends Properties {

    private static final long serialVersionUID = -7032434592318855760L;

    private List<Object>      keyList          = new ArrayList<Object>();

    @Override
    public synchronized Enumeration<Object> keys() {
        return Collections.enumeration(keyList);
    }

    @Override
    public synchronized Object put(Object key, Object value) {
        if (!containsKey(key)) {
            keyList.add(key);
        }

        return super.put(key, value);
    }

    @Override
    public synchronized Object remove(Object key) {
        keyList.remove(key);

        return super.remove(key);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Override
    public synchronized void putAll(Map values) {
        for (Object key : values.keySet()) {
            if (!containsKey(key)) {
                keyList.add(key);
            }
        }

        super.putAll(values);
    }
}
