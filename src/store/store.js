import { configureStore, createSlice } from '@reduxjs/toolkit'
import regionListJson from './json/regionList.json'

const excelData = createSlice({
    name: 'excelData',
    initialState: [],
    reducers: {
        setExcelData(state, action) {
            return action.payload
        }
    }
})

export const {setExcelData} = excelData.actions

const searchRegion = createSlice({
    name: 'searchRegion',
    initialState: '',
    reducers: {
        setSearchRegion(state, action) {
            return action.payload
        }   
    }
})

export const {setSearchRegion} = searchRegion.actions

const searchRegionList = createSlice({
    name: 'searchRegionList',
    initialState: regionListJson.region.slice(0,5),
    reducers: {
        setSearchRegionList(state, action) {
            return action.payload
        }   
    }
})

export const {setSearchRegionList} = searchRegionList.actions

const regionList = createSlice({
    name: 'regionList',
    initialState: regionListJson.region,
    reducers: {
        setRegionList(state, action) {
            return action.payload
        }
    }
})

export const {setRegionList} = regionList.actions

const searchHistory = createSlice({
    name: 'searchHistory',
    initialState: regionListJson.region,
    reducers: {
        setSearchHistory(state, action) {
            return action.payload
        }
    }
})

export const {setSearchHistory} = searchHistory.actions

const viewMenu = createSlice({
    name: 'viewMenu',
    initialState: 'main',
    reducers: {
        setViewMenu(state, action) {
            return action.payload
        }
    }
})

export const {setViewMenu} = viewMenu.actions

export default configureStore({
    reducer: {
        excelData: excelData.reducer,
        searchRegion: searchRegion.reducer,
        searchRegionList: searchRegionList.reducer,
        regionList: regionList.reducer,
        searchHistory: searchHistory.reducer,
        viewMenu: viewMenu.reducer,
    }
}) 