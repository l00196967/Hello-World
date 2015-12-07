/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.dict;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

/**
 * 数据字典节点元素
 *
 * @author randy.ly 2015年6月10日 下午2:06:07
 */
public class DictElement {

    private String                   name;

    private String                   value;

    private Map<String, DictElement> children;

    public DictElement(){
    }

    public DictElement(String name){
        this.name = name;
    }

    public DictElement(String name, String value){
        this.name = name;
        this.value = value;
    }

    /**
     * 增加子节点
     *
     * @param child
     */
    public void addChild(DictElement child) {
        if (children == null) {
            children = new LinkedHashMap<String, DictElement>();
        }
        children.put(child.getName(), child);
    }

    /**
     * 返回指定子节点
     *
     * @param name
     * @return
     */
    public DictElement getChild(String name) {
        if (children == null) {
            return null;
        }

        return children.get(name);
    }

    /**
     * Map形式返回当前节点
     *
     * @return
     */
    public Map<String, Object> asMap() {
        Map<String, Object> result = new LinkedHashMap<String, Object>();

        if (children == null) {
            return result;
        }

        for (Entry<String, DictElement> entry : children.entrySet()) {
            DictElement child = entry.getValue();
            if (child.getChildren() != null) {
                result.put(child.getName(), child.asMap());
            } else {
                result.put(child.getName(), child.getValue());
            }
        }

        return result;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Map<String, DictElement> getChildren() {
        return children;
    }

}
