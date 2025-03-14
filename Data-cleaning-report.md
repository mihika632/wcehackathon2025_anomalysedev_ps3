# Data Cleaning Report
### 1. General Summary

| Site ID   | Total Entries | Missing PM2.5 | Missing PM10 | Mean PM2.5 | Mean PM10 | Max PM2.5 | Max PM10 | Min PM2.5 | Min PM10 |
|-----------|--------------|---------------|--------------|------------|------------|------------|------------|------------|------------|
| site_5963 | 59,251       | 39,278 (66%)  | 39,335 (66%) | 44.45      | 94.30      | 628.13     | 879.38     | 0.03       | 0.23       |
| site_5964 | 59,251       | 37,389 (63%)  | 37,216 (63%) | 39.05      | 86.72      | 247.09     | 663.45     | 0.04       | 2.79       |
| site_5681 | 28,781 (48.6%) | 28,289 (47.7%) | 35.10 | 76.35  | 985.07 | 997.99 | 0.06 | 0.01 | 42   | 71    |
| site_5686 | 27,525 (46.4%) | 27,608 (46.6%) | 28.69 | 69.09  | 544.52  | 995.45 | 0.01 | 0.01 | 2    | 15    |
| site_5729 | 31,780 (53.6%) | 31,714 (53.5%) | 33.63 | 70.12  | 964.86  | 966.16  | 0.01 | 1.00 | 4    | 12    |
| site_5807 | 32,178 (54.3%) | 32,196 (54.3%) | 39.49 | 81.58  | 965.88  | 976.70  | 0.14 | 0.05 | 27   | 41    |
| site_5810 | 30,738 (51.9%) | 30,648 (51.7%) | 45.38 | 116.86 | 638.56  | 705.97  | 0.01 | 0.64 | 4    | 34    |
| site_5811 | 31,102 (52.5%) | 31,126 (52.5%) | 42.71 | 90.69  | 805.62  | 990.89 | 0.08 | 0.33 | 7    | 11    |
| site_5814 | 30,090 (50.8%) | 30,114 (50.8%) | 41.73 | 98.40  | 841.60  | 999.94 | 0.02 | 1.23 | 8    | 30    |
| site_5852 | 38,836 (65.6%) | 100% missing | 137.88 | - | - | 998.99 | 0.01 | - | 305  | -     |
| site_5960 | 36,540 (61.7%) | 36,509 (61.6%) | 38.77 | 79.20  | 597.49  | 697.67  | 0.68 | 0.39 | 4    | 6     |
| site_5961 | 42,420 (71.6%) | 42,887 (72.4%) | 50.67 | 121.56 | 319.84  | 861.54 | 0.02 | 1.41 | -    | 40    |
| site_5962 | 41,384 (69.8%) | 41,473 (70%) | 50.83 | 82.83  | 495.89  | 896.28 | 0.01 | 1.54 | -    | 52    |
| site_5238 | 59,251       | 3,014         | 2,746        | 55.47      | 106.91    | 483.40    | 925.00   | 0.80      | 3.00     |
| site_5393 | 59,251       | 33,839        | 27,598       | 93.81      | 243.78    | 931.80    | 996.00   | 0.10      | 1.75     |
| site_5394 | 59,251       | 14,368        | 7,728        | 71.28      | 110.88    | 999.85    | 999.49   | 0.01      | 0.05     |
| site_5395 | 59,251       | 34,263        | 35,337       | 97.29      | 159.59    | 997.60    | 997.60   | 0.25      | 0.40     |
| site_5396 | 59,251       | 15,634        | 15,662       | 66.82      | 125.94    | 732.32    | 973.21   | 0.01      | 1.56     |
| site_5397 | 59,251       | 11,008        | 11,063       | 44.04      | 90.74     | 821.04    | 977.90   | 0.24      | 0.69     |
| site_5398 | 59,251       | 15,140        | 15,211       | 56.12      | 117.56    | 995.35    | 990.23   | 0.03      | 0.75     |
| site_5399 | 59,251       | 19,313        | 19,363       | 57.25      | 110.02    | 970.39    | 983.70   | 0.01      | 0.45     |
| site_5400 | 59,251       | 16,069        | 16,096       | 49.14      | 106.37    | 604.77    | 997.17   | 0.28      | 1.34     |
| site_5401 | 59,251       | 22,922        | 19,130       | 46.78      | 118.65    | 865.17    | 995.23   | 0.01      | 2.81     |
| site_5402 | 59,251       | 15,517        | 15,411       | 58.66      | 98.57     | 687.56    | 945.30   | 0.35      | 0.54     |
| site_5106 | 59,251       | 12,568        | 12,117       | 45.71      | 135.92    | 985.00    | 985.00   | 0.20      | 2.79     |
| site_5107 | 59,251       | 3,827         | 4,149        | 34.53      | 124.68    | 985.00    | 985.00   | 1.00      | 1.40     |
| site_5110 | 59,251       | 3,562         | 3,536        | 47.38      | 100.35    | 589.34    | 884.51   | 0.54      | 7.62     |
| site_5111 | 59,251       | 2,020         | 2,036        | 52.27      | 104.33    | 452.09    | 763.14   | 2.30      | 1.96     |
| site_5112 | 59,251       | 4,842         | 6,694        | 39.44      | 93.70     | 772.00    | 985.00   | 0.73      | 4.00     |
| site_5113 | 59,251       | 6,454         | 10,409       | 32.78      | 76.33     | 297.00    | 1000.00  | 0.17      | 0.40     |
| site_5115 | 59,251       | 8,062         | 11,465       | 40.07      | 95.39     | 394.00    | 985.00   | 0.09      | 0.40     |
| site_5119 | 59,251       | 3,808         | 5,240        | 44.51      | 114.72    | 985.00    | 985.00   | 0.10      | 2.00     |
| site_5120 | 59,251       | 10,840        | 8,665        | 37.44      | 93.17     | 985.00    | 985.00   | 0.10      | 0.40     |
| site_5126 | 59,251       | 3,640         | 3,060        | 41.60      | 81.46     | 341.46    | 621.90   | 1.80      | 5.90     |
| site_5129 | 59,251       | 3,486         | 3,509        | 49.99      | 97.13     | 616.05    | 991.87   | 0.02      | 5.00     |
| site_251  | 59,251       | 5,271         | 4,698        | 39.68      | 86.55     | 87.0      | 188.0    | 1.00      | 1.00     |
| site_262  | 59,251       | 7,498         | 8,527        | 29.02      | 78.14     | 87.0      | 188.0    | 1.00      | 1.00     |
| site_275  | 59,251       | 19,473        | 20,950       | 44.69      | 102.89    | 87.0      | 188.0    | 1.00      | 1.00     |
| site_294  | 59,251       | 2,777         | 59,251       | 50.26      | NaN       | 966.0     | NaN      | NaN       | NaN      |
| site_296  | 59,251       | 5,160         | 4,997        | 53.86      | 113.12    | 736.4     | 982.7    | -5.00     | 0.00     |
| site_298  | 59,251       | 7,263         | 6,739        | 47.44      | 110.84    | 87.0      | 188.0    | 1.00      | 1.00     |
| site_301  | 59,251       | 6,883         | 6,933        | 139.77     | 319.71    | 998.0     | 1000.0   | 1.00      | 1.00     |
| site_309  | 59,251       | 3,180         | 3,114        | 52.31      | 105.40    | 983.5     | 995.0    | 0.20      | 2.80     |
| site_5024 | 59,251       | 2,445         | 2,651        | 108.18     | 208.02    | 922.0     | 998.0    | 1.00      | 1.00     |
| site_5102 | 59,251       | 15,253        | 15,597       | 35.72      | 125.20    | 124.0     | 985.0    | 0.11      | 2.00     |
| site_5104 | 59,251       | 8,116         | 10,201       | 38.72      | 136.99    | 985.0     | 995.9    | 0.24      | 1.80     |
| site_1558 | 59,251       | 8,006         | 8,036        | 34.98      | 95.77     | 873.0     | 898.0    | 1.00      | 1.00     |
| site_1560 | 59,251       | 2,059         | 1,804        | 128.97     | 250.98    | 975.0     | 1000.0   | 1.00      | 1.00     |
| site_1561 | 59,251       | 2,414         | 2,985        | 130.01     | 284.32    | 973.0     | 1000.0   | 1.00      | 1.00     |
| site_1562 | 59,251       | 1,756         | 1,890        | 90.41      | 171.56    | 876.0     | 986.0    | 1.00      | 2.00     |
| site_1563 | 59,251       | 2,741         | 2,774        | 100.20     | 228.36    | 886.0     | 997.0    | 1.00      | 1.00     |
| site_162  | 59,251       | 9,475         | 9,364        | 29.03      | 65.91     | 904.67    | 999.99   | 0.03      | 0.03     |
| site_163  | 59,251       | 16,299        | 14,416       | 33.56      | 67.54     | 999.99    | 999.99   | 0.01      | 0.36     |
| site_165  | 59,251       | 59,251        | 16,478       | NaN        | 80.82     | NaN       | 966.92   | NaN       | 0.36     |
| site_166  | 59,251       | 59,251        | 14,695       | NaN        | 44.01     | NaN       | 953.80   | NaN       | 0.36     |
| site_199  | 59,251       | 11,262        | 11,036       | 42.18      | 99.70     | 88.0      | 189.0    | 1.00      | 1.00     |

- **Missing values** observed

-   `site_5963` and `site_5964` sites have **high missing values** (~65%).
-   `site_5852` has **100% missing `pm10cnc` values**, making it unusable for PM10 analysis.
-   Sites `site_5961` and `site_5962` have **~70% missing data**.
-  `site_5678` has 29,109 missing values.
-  `site_5412` has 14,406 missing values.
- `site_5393`, `site_5395` have more than 50% missing PM2.5 and PM10 values.
-   PM2.5 and PM10 values at `site_5963` are **higher on average** than `site_5964`.
-   `site_275` has 19,473 missing values for PM2.5 and 20,950 for PM10.
-   `site_5102` has over 15,000 missing values in both PM2.5 and PM10.
-   `site_294` has all missing values for PM10.
-   `site_165` and 166 have completely missing PM2.5 data (100% missing).
-   `site_163` has 27% missing PM2.5 data and 24% missing PM10 data.
-   `site_162` has 16% missing PM2.5 data and 15.8% missing PM10 data.

-   **Extreme values** observed:
    -   `site_5963` has **highest PM2.5 (628.13)** and **highest PM10 (879.38)**.
    -   `site_5852` has 305 extreme values** in PM2.5, making its data unreliable.
    -   Many sites have **PM10 values exceeding 900**, which may indicate sensor errors or incorrect scaling.
    -   `site_5964` has **lower max PM2.5 (247.09)** but still high PM10 (663.45).
    -   `site_301` has the highest PM2.5 outliers (844) and PM10 outliers (8,967).
    -   `site_5024` and `site_5104` also show PM10 readings exceeding 500 frequently.
    -   `site_296` has negative PM2.5 readings (-5.00), which is unrealistic.
    -   Some sites (e.g., `site_309`) have very low PM10 readings (e.g., 2.80), which should be verified.
    -   `site_1561` and `site_1560` have a very high number of PM10 outliers (>500), suggesting possible sensor errors.
    -   PM2.5 outliers are lower but still significant in `site_1560` and `site_1561`.
      
    -  **PM2.5 (Abnormal High Readings)**

		-   **site_5412:** 16 extreme values
		-   **site_5595:** 10 extreme values
		-   **site_5598:** 3 extreme values
		-   **site_5602:** 2 extreme values
		-   **site_5604:** 1 extreme values
		-   **site_5678:** 15 extreme values
		-    **site5_106:** 87 extreme values
		-   **site_5107:** 3 extreme values
		-   **site_5110:** 3 extreme values
		-   **site_5112:** 5 extreme values
		-   **site_5119:** 2 extreme values
		-   **site_5120:** 24 extreme values
		-   **site_5129:** 6 extreme values
    -  Some sites have **very high PM2.5 and PM10 values**, reaching nearly **999**, which is unrealistic and suggests possible errors.
    - **PM10 (Abnormal High Readings)**

		-   **site_5412:** 121 extreme values
		-   **site_5413:** 150 extreme values
		-   **site_5678:** 107 extreme values
		- **site_5106:** 1,083 extreme values
		-   **site_5107:** 94 extreme values
		-   **site_5110:** 19 extreme values
		-   **site_5111:** 25 extreme values
		-   **site_5112:** 94 extreme values
		-   **site_5113:** 48 extreme values
		-   **site_5115:** 36 extreme values
		-   **site_5119:** 205 extreme values
		-   **site_5120:** 44 extreme values
		-   **site_5126:** 9 extreme values
		-   **site_5129:** 36 extreme values
-   Other sites have relatively fewer extreme values, ranging from 5 to 33.

### 2. **Timestamp Consistency**
-   `site_5963` and `site_5964` sites have **59,251 unique timestamps**, meaning data collection is consistent.

### 3.  **extreme values Analysis**
-   **PM2.5 extreme values:**
    -   `site_5963`: **4 values above 500**.
    -   `site_5964`: **No PM2.5 extreme values** above 500.
-   **PM10 extreme values:**
    -   `site_5963`: **25 values above 500**.
    -   `site_5964`: **7 values above 500**.
