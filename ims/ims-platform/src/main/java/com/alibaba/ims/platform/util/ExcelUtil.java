/*
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the
 * confidential and proprietary information of Alibaba.com ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered
 * into with Alibaba.com.
 */
package com.alibaba.ims.platform.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.SystemUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Excel文件工具类
 *
 * @author randy.ly 2015年4月6日 上午12:17:02
 */
public class ExcelUtil {

    private static final Logger logger = LoggerFactory.getLogger(ExcelUtil.class);

    /**
     * 读取总行数
     *
     * @param inputStream
     * @return
     */
    public static int getRowCount(InputStream inputStream) {
        Workbook workbook = createWorkbook(inputStream);
        return workbook == null ? 0 : workbook.getSheetAt(0).getPhysicalNumberOfRows();
    }

    /**
     * 读取总行数
     *
     * @param file
     * @return
     */
    public static int getRowCount(File file) {
        Workbook workbook = createWorkbook(file);
        return workbook == null ? 0 : workbook.getSheetAt(0).getPhysicalNumberOfRows();
    }

    /**
     * 从文件读取数据
     *
     * @param file
     * @return
     */
    public static List<String[]> read(File file) {
        return readFromWorkbook(createWorkbook(file));
    }

    /**
     * 从输入流读取数据
     *
     * @param inputStream
     * @return
     */
    public static List<String[]> read(InputStream inputStream) {
        return readFromWorkbook(createWorkbook(inputStream));
    }

    private static Workbook createWorkbook(File file) {
        try {
            return WorkbookFactory.create(file);
        } catch (Exception e) {
            logger.error("Read workbook from file error, file:" + file.getPath(), e);
        }
        return null;
    }

    private static Workbook createWorkbook(InputStream inputStream) {
        try {
            return WorkbookFactory.create(inputStream);
        } catch (Exception e) {
            logger.error("Read workbook from inputStream error.", e);
            return null;
        }
    }

    /**
     * 读数据
     *
     * @param workbook
     * @return
     */
    private static List<String[]> readFromWorkbook(Workbook workbook) {
        List<String[]> rowList = new ArrayList<String[]>();
        if (workbook == null) {
            return rowList;
        }

        Sheet sheet = workbook.getSheetAt(0);
        if (sheet.getPhysicalNumberOfRows() <= 0) {
            return rowList;
        }

        for (Row row : sheet) {
            int last = Math.min(row.getLastCellNum(), 20);
            String[] rowContent = new String[last];
            for (int i = 0; i < last; i++) {
                Cell cell = row.getCell(i, Row.RETURN_BLANK_AS_NULL);
                if (cell != null) {
                    rowContent[i] = getCellValue(cell);
                }
            }
            rowList.add(rowContent);
        }
        return rowList;
    }

    private static String getCellValue(Cell cell) {
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                return cell.getRichStringCellValue().getString();
            case Cell.CELL_TYPE_NUMERIC:
                if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell)) {
                    return DateUtil.format(cell.getDateCellValue(), "yyyy-MM-dd");
                } else {
                    return new DecimalFormat("0").format(cell.getNumericCellValue());
                }
            case Cell.CELL_TYPE_BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case Cell.CELL_TYPE_FORMULA:
                return cell.getCellFormula();
            default:
                return null;
        }
    }

    /**
     * 写入到 Excel
     *
     * @param rows 数据行列表
     * @param path 目标文件目录
     * @param fileName 目标文件名
     * @return
     * @throws Exception
     */
    public static File Write(List<List<String>> rows, String path, String fileName) throws IOException {
        if (CollectionUtils.isEmpty(rows)) {
            return null;
        }

        if (StringUtils.isBlank(path)) {
            path = SystemUtils.JAVA_IO_TMPDIR;
        }

        File parent = new File(path);
        if (!parent.exists()) {
            @SuppressWarnings("unused")
            boolean b = parent.mkdirs();
        }

        if (StringUtils.isBlank(fileName)) {
            fileName = UUID.randomUUID().toString();
        }

        File target = new File(path + File.separator + fileName + ".xslx");
        try {
            write(rows, target);
        } catch (IOException e) {
            logger.error("Write content to excel file error.", e);
            throw e;
        }
        return target;
    }

    private static void write(List<List<String>> rows, File file) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("sheet1");

        for (int i = 0; i < rows.size(); i++) {
            Row row = sheet.createRow(i);
            for (int j = 0; j < rows.get(i).size(); j++) {
                Cell cell = row.createCell(j);
                cell.setCellValue(rows.get(i).get(j));
            }
        }

        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(file);
            workbook.write(fos);
        } finally {
            if (fos != null) {
                IOUtils.closeQuietly(fos);
            }
        }
    }
}
