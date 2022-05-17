```ts
/** Indicator/{indicatorCode}/Series/List
 * ======================================
 * https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorByIndicatorCodeSeriesListGet
 * this is sub-list with the following parameters:
 * indicatorCode: the code for which we want to collect the list
 * GET /v1/sdg/Indicator/{indicatorCode}/Series/List
 * where `indicatorCode` is for example: `1.1.1`
 * so the link would be: https://unstats.un.org/SDGAPI/v1/sdg/Indicator/1.1.1/Series/List
 * It is ALREADY collected in the full list retrieved by `SdgIndicatorListGet`
 */
```

```ts
/** Indicator/{indicatorCode}/GeoAreas
 * ======================================
 * https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorByIndicatorCodeGeoAreasGet
 * this is sub-list with the following parameters:
 * indicatorCode: the code for which we want to collect the list of geo areas that provide data for the indicator
 * GET /v1/sdg/Indicator/{indicatorCode}/GeoAreas
 * where `indicatorCode` is for example: `1.1.1`
 * so the link would be: https://unstats.un.org/SDGAPI/v1/sdg/Indicator/1.1.1/GeoAreas
 */
```

```ts
/** Indicator/Data
 * ======================================
 * https://unstats.un.org/SDGAPI/swagger/#!/Indicator/V1SdgIndicatorByIndicatorCodeGeoAreasGet
 * this is sub-list with the following parameters:
 * + `indicator`: the code for which we want to collect the list of geo areas that provide data for the indicator (for example: `1.1.1`)
 * + `timePeriodStart`: Time series start point (for example: `2020`)
 * + `timePeriodEnd`: Time series start point (for example: `2022`)
 * + `pageSize`: Number of records per page (for example: `400`)
 * GET /v1/sdg/Indicator/Data
 * **NOTE**: It didn't return any data `no content` 
 * + [(500 - Internal Server Error)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)
 * 	+ The server has encountered a situation it does not know how to handle.
 * so the link would be: https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data?indicator=1.1.1&timePeriodStart=2020&timePeriodEnd=2022&pageSize=400
 */
```