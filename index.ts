import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import fs from "fs";
// import chalk from "chalk";
import JSON5 from "json5";
import Handlebars from "handlebars";

// const appName: string = `${chalk.bold.greenBright("Retrieve")}${chalk.bold.yellowBright("SDGs")}`
const appName: string = `Retrieve SDGs`

const baseUrl: string = "https://unstats.un.org/SDGAPI/v1/sdg";
const axiosConfig: AxiosRequestConfig = {
	headers: {
		Accept: "application/json",
	},
}

/** Indicator/List
 * ======================================
 * https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorListGet
 * this is initial (pure) list without any additional parameters to be retrieved
 */

/**
 * Interface describing Sdg Indicators
 */
 export interface SdgBase {
	key: string,
 }

/**
 * Interface describing Sdg Indicators
 */
export interface SdgIndicator extends SdgBase {
	goal: string,
	target: string,
	code: string,
	description: string,
	tier: string,
	uri: string,
	series: {
		goal: string[],
		target: string[],
		indicator: string[],
		release: string,
		code: string,
		description: string,
		uri: string
	  }[];
};

export interface ApiObservationPage {
	size: number;
	totalElements: number;
	totalPages: number;
}

/**
 * Interface describing Sdg Indicator Pivot Data
 * https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorDataGet
 */
 export interface SdgIndicatorPivotData extends SdgBase {
	/** The number of elements in the page  */
	size: number;
	goal: string,
	target: string,
	indicator: string;
	code: string,
	description: string,
	tier: string,
	uri: string,
	years: any;
	series: {
		goal: string[],
		target: string[],
		indicator: string[],
		release: string,
		code: string,
		description: string,
		uri: string
	  }[];
};

export interface SdgIndicatorPivotDataList extends ApiObservationPage {
	attributes: any[];
	dimensions: any[];
	data: SdgIndicatorPivotData[];
}

/**
 * Interface describing Sdg Indicators Data
 * https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorDataGet
 */
 export interface SdgIndicatorData extends SdgBase {
	/** The number of elements in the page  */
	size: number;
	goal: string,
	target: string,
	indicator: string;
	code: string,
	description: string,
	tier: string,
	uri: string,
	series: {
		goal: string[],
		target: string[],
		indicator: string[],
		release: string,
		code: string,
		description: string,
		uri: string
	  }[];
};

export interface SdgIndicatorDataList extends ApiObservationPage {
	attributes: any[];
	dimensions: any[];
	data: SdgIndicatorData[];
}

export interface ISdgIndicatorListGet {
	dataName: string;
	urlSuffix: string;
	resultPath: string;
}

export interface ISdgIndicatorDataGet {
	dataName: string;
	urlSuffix: string;
	params: {
		indicatorCode: string,
		pageSize: number,
	},
	resultPath: string;
}

export interface ISdgIndicatorPivotDataGet {
	dataName: string;
	urlSuffix: string;
	params: {
		indicatorCode: string,
		pageSize: number,
	},
	resultPath: string;
}

const DEBUG_DATA_NO = 1;
const DEBUG_DATA_SERIALIZE = false;

// collects the list of indicator from https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorListGet
/**
 * gets SDG indicators list and stores it into JSON file
 */
 export const sdgIndicatorPivotDataGet = async (sdgIndicatorPivotDataGetInfo: ISdgIndicatorPivotDataGet): Promise<SdgIndicatorPivotDataList> => {
	// build url path
	const urlSuffixCompiled = Handlebars.compile(sdgIndicatorPivotDataGetInfo.urlSuffix);
	const urlSuffixBuilt: string = urlSuffixCompiled(sdgIndicatorPivotDataGetInfo.params);
	const url: string = `${baseUrl}/${urlSuffixBuilt}`;

	// load data
	const result: AxiosResponse<SdgIndicatorPivotDataList> = await axios.get<SdgIndicatorPivotDataList>(url, axiosConfig);
	console.log(`mResult (for indicatorCode="${sdgIndicatorPivotDataGetInfo.params.indicatorCode}") (first ${DEBUG_DATA_NO} data entries): ${JSON.stringify(result.data.data.slice(0, Math.min(result.data.data.length, DEBUG_DATA_NO)), null, DEBUG_DATA_SERIALIZE ? 4 : undefined)}`);

	// enrich and purify data
	for(const data of result.data.data) {
		data.key = (data as SdgIndicatorPivotData).indicator;
		data.years = JSON.parse(data.years);
	}


	// build store path
	const resultPathCompiled = Handlebars.compile(sdgIndicatorPivotDataGetInfo.resultPath);
	const resultPathBuilt: string = resultPathCompiled(sdgIndicatorPivotDataGetInfo.params);

	// store data
	console.log(`[${appName}] storing "${sdgIndicatorPivotDataGetInfo.dataName}" to [${resultPathBuilt}] ...`);
	const resultStr: string = JSON.stringify(result.data, null, 4);
	fs.writeFileSync(resultPathBuilt, resultStr, {encoding: "utf8"});
	console.log(`[${appName}] stored "${sdgIndicatorPivotDataGetInfo.dataName}" to [${resultPathBuilt}]`);

	return result.data;
}

// collects the list of indicator from https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorListGet
/**
 * gets SDG indicators list and stores it into JSON file
 */
 export const sdgIndicatorDataGet = async (sdgIndicatorDataGetInfo: ISdgIndicatorDataGet): Promise<SdgIndicatorDataList> => {
	// build url path
	const urlSuffixCompiled = Handlebars.compile(sdgIndicatorDataGetInfo.urlSuffix);
	const urlSuffixBuilt: string = urlSuffixCompiled(sdgIndicatorDataGetInfo.params);
	const url: string = `${baseUrl}/${urlSuffixBuilt}`;

	// load data
	const result: AxiosResponse<SdgIndicatorDataList> = await axios.get<SdgIndicatorDataList>(url, axiosConfig);
	console.log(`mResult (for indicatorCode="${sdgIndicatorDataGetInfo.params.indicatorCode}") (first ${DEBUG_DATA_NO} data entries): ${JSON.stringify(result.data.data.slice(0, Math.min(result.data.data.length, DEBUG_DATA_NO)), null, DEBUG_DATA_SERIALIZE ? 4 : undefined)}`);

	// enrich and purify data
	for(const data of result.data.data) {
		data.key = (data as SdgIndicatorData).indicator;
	}


	// build store path
	const resultPathCompiled = Handlebars.compile(sdgIndicatorDataGetInfo.resultPath);
	const resultPathBuilt: string = resultPathCompiled(sdgIndicatorDataGetInfo.params);

	// store data
	console.log(`[${appName}] storing "${sdgIndicatorDataGetInfo.dataName}" to [${resultPathBuilt}] ...`);
	const resultStr: string = JSON.stringify(result.data, null, 4);
	fs.writeFileSync(resultPathBuilt, resultStr, {encoding: "utf8"});
	console.log(`[${appName}] stored "${sdgIndicatorDataGetInfo.dataName}" to [${resultPathBuilt}]`);

	return result.data;
}

// collects the list of indicator from https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorListGet
/**
 * gets SDG indicators list and stores it into JSON file
 */
export const sdgIndicatorListGet = async (sdgIndicatorListGetInfo: ISdgIndicatorListGet): Promise<any> => {
	// load data
	const url: string = `${baseUrl}/${sdgIndicatorListGetInfo.urlSuffix}`;
	const result: AxiosResponse<SdgIndicator[]> = await axios.get<SdgIndicator[]>(url, axiosConfig);
	console.log(`mResult (first 5 data): ${JSON.stringify(result.data.slice(0, Math.min(result.data.length, 5)), null, 4)}`);

	// enrich and purify data
	for(const data of result.data) {
		data.key = data.code;
	}

	// store data
	console.log(`[${appName}] storing "${sdgIndicatorListGetInfo.dataName}" to [${sdgIndicatorListGetInfo.resultPath}] ...`);
	const resultStr: string = JSON.stringify(result.data, null, 4);
	fs.writeFileSync(sdgIndicatorListGetInfo.resultPath, resultStr, {encoding: "utf8"});
	console.log(`[${appName}] stored "${sdgIndicatorListGetInfo.dataName}" to [${sdgIndicatorListGetInfo.resultPath}]`);
}

const sdgIndicatorListGetInfo: ISdgIndicatorListGet = {
	dataName: "SdgIndicator",
	urlSuffix: "Indicator/Data",
	resultPath: "./data/collected/sdgIndicator.json5",

}

const sdgIndicatorDataGetInfo: ISdgIndicatorDataGet = {
	dataName: "SdgIndicatorData",
	params: {
		indicatorCode: "1.1.1",
		pageSize: 400,
	},
	urlSuffix: "Indicator/Data?indicator={{indicatorCode}}&timePeriodStart=2020&timePeriodEnd=2022&pageSize={{pageSize}}",
	resultPath: "./data/collected/sdgIndicatorData__{{indicatorCode}}.json5",
}

const sdgIndicatorPivotDataGetInfo: ISdgIndicatorPivotDataGet = {
	dataName: "SdgIndicatorPivotData",
	params: {
		indicatorCode: "1.1.1",
		pageSize: 400,
	},
	urlSuffix: "Indicator/PivotData?indicator={{indicatorCode}}&pageSize={{pageSize}}",
	resultPath: "./data/collected/sdgIndicatorPivotData__{{indicatorCode}}.json5",
}

// v0
// import path from 'path';
// const nodePath = path.resolve(process.argv[1]);
// import { fileURLToPath } from 'url'
// const modulePath = path.resolve(fileURLToPath(import.meta.url))

// console.log(`called directly. nodePath="${nodePath}", modulePath="${modulePath}"`);

// https://stackoverflow.com/questions/6398196/detect-if-called-through-require-or-directly-by-command-line

// v1
const isLocal = () => {
    // generate a stack trace
    const stack = (new Error()).stack;
    // the third line refers to our caller
    const stackLine = stack?.split("\n")[2];
    // extract the module name from that line
	if(stackLine){
		const callerModuleName = /\((.*):\d+:\d+\)$/.exec(stackLine)?.[1];
		console.log(`require.main?.filename = "${require.main?.filename}" === callerModuleName = "${callerModuleName}"`);
		const calledLocally = require.main?.filename === callerModuleName;
		console.log(calledLocally ? `Called locally` : `Called externally`)
		return calledLocally;
	} else {
		console.error(`Problem identifying locality`);
		return false;
	}

};

// v2
// if (require.main === module) {
//     console.log(`called directly. require.main="${require.main.path}", module="${module.path}"`);

// 	// console.log(`[${appName}] starting ...`)
// 	// run().then((result) => {
// 	// 	console.log(`[${appName}] finished`);
// 	// }).catch((error) => {
// 	// 	console.log(`[${appName}] error: ${error}`);
// 	// })	
// } else {
//     console.log('required as a module');
// }

const run = async (): Promise<void> => {
	// await SdgIndicatorListGet(sdgIndicatorListGetInfo);
	// await sdgIndicatorDataGet(sdgIndicatorDataGetInfo);
	await sdgIndicatorPivotDataGet(sdgIndicatorPivotDataGetInfo);
}

if(isLocal()){
	console.log(`[${appName}] starting ...`)
	run().then((result) => {
		console.log(`[${appName}] finished`);
	}).catch((error) => {
		console.log(`[${appName}] error: ${error}`);
	})
}

