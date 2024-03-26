import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { setExcelData } from "../store/store.js"
import * as XLSX from 'xlsx';

const ExcelReader = ()=>{
    const dispatch = useDispatch()

    useEffect(() => {
        const readExcel = async () => {
            // 엑셀 파일 경로
            const excelPath = '/weatherAPI.xlsx';

            // 엑셀 파일 읽기
            const response = await fetch(excelPath);
            const blob = await response.blob();
            const data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.readAsArrayBuffer(blob);
            });

            // 엑셀 데이터 파싱
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // 첫 번째 열의 데이터 가져오기
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            dispatch(setExcelData(jsonData))
        };

        readExcel();
    }, []);
}

export default ExcelReader