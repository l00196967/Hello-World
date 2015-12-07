/*
 * Copyright 2014 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.web.service;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * 启动服务类
 *
 * @author randy.ly 2014年12月11日 下午2:30:23
 */
public class StartupListener implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        // 配置JSON序列化参数
        initFastJson();

    }

    private void initFastJson() {
        int features = JSON.DEFAULT_GENERATE_FEATURE;
        features |= SerializerFeature.WriteDateUseDateFormat.getMask();
        features |= SerializerFeature.DisableCircularReferenceDetect.getMask();
        features |= SerializerFeature.UseISO8601DateFormat.getMask();
        JSON.DEFAULT_GENERATE_FEATURE = features;

        int parseFeatures = JSON.DEFAULT_PARSER_FEATURE;
        parseFeatures = Feature.config(parseFeatures, Feature.UseBigDecimal, false);
        JSON.DEFAULT_PARSER_FEATURE = parseFeatures;
    }

}
